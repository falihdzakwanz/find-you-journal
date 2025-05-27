import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { journalEntryRepository } from "@/lib/firebase/repositories";
import { decrypt, encrypt } from "@/lib/webCrypto/encryption";
import { handleApiError, successResponse } from "@/lib/api/response";
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
  DatabaseError,
  EncryptionError,
} from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";
import { EntryValidator } from "@/lib/validators/entry.validator";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("GET", req.url);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      throw new ValidationError("Entry ID is required");
    }

    Logger.debug("Fetching journal entry", { userId, entryId: id });
    const entry = await journalEntryRepository.findById(userId, id);

    if (!entry) {
      throw new NotFoundError("Journal entry not found");
    }

    Logger.encryptionOperation("decrypt", userId, id);
    const decryptedEntry = {
      ...entry,
      answer: await decrypt(entry.answer),
    };

    Logger.info("Entry retrieved successfully", { userId, entryId: id });
    return successResponse(decryptedEntry);
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("GET entry completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("PUT", req.url);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    let updateData;
    try {
      updateData = await req.json();
      EntryValidator.validateUpdateRequest(updateData);
    } catch (error) {
      throw new ValidationError("Invalid update data", { cause: error });
    }

    Logger.debug("Updating journal entry", { userId, entryId: updateData.id });

    try {
      let encryptedAnswer: string;
      try {
        Logger.encryptionOperation("encrypt", userId, updateData.id);
        encryptedAnswer = await encrypt(updateData.answer);
      } catch (error) {
        throw new EncryptionError("Failed to encrypt answer", {
          cause: error,
        });
      }

      Logger.databaseOperation(
        "updateJournalEntry",
        { entryId: updateData.id },
        userId
      );

      await journalEntryRepository.updateEncryptedEntry(userId, updateData.id, {
        answer: encryptedAnswer,
        isEncrypted: true,
        updatedAt: new Date().toISOString(),
      });

      Logger.info("Entry updated successfully", {
        userId,
        entryId: updateData.id,
      });
      return successResponse();
    } catch (error) {
      throw new DatabaseError("Failed to update entry", { cause: error });
    }
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("PUT entry completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("DELETE", req.url);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      throw new ValidationError("Entry ID is required");
    }

    Logger.debug("Deleting journal entry", { userId, entryId: id });

    try {
      Logger.databaseOperation("deleteJournalEntry", { entryId: id }, userId);
      await journalEntryRepository.delete(userId, id);

      Logger.info("Entry deleted successfully", { userId, entryId: id });
      return successResponse();
    } catch (error) {
      throw new DatabaseError("Failed to delete entry", { cause: error });
    }
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("DELETE entry completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}
