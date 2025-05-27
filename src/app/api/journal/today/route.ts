import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { journalEntryRepository } from "@/lib/firebase/repositories";
import { encrypt } from "@/lib/webCrypto/encryption";
import type {
  JournalEntryInput,
  EncryptedJournalEntry,
} from "@/types/entry.type";
import { EntryValidator } from "@/lib/validators/entry.validator";
import { handleApiError, successResponse } from "@/lib/api/response";
import {
  UnauthorizedError,
  EncryptionError,
  DatabaseError,
  ValidationError,
} from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";

export async function POST(req: Request): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("POST", "/api/journal/today");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    let requestBody;
    try {
      requestBody = await req.json();
      EntryValidator.validateEntryArray(requestBody.entries);
      Logger.debug("Request body validated", {
        userId,
        entryCount: requestBody.entries.length,
      });
    } catch (error) {
      throw new ValidationError("Invalid request body", { cause: error });
    }

    requestBody.entries.forEach((entry: JournalEntryInput) => {
      EntryValidator.validateEntryInput(entry);
    });
    Logger.debug("All entries validated", { userId });

    const today = new Date();
    const clientTimezoneOffset = today.getTimezoneOffset() * 60000;
    const localDate = new Date(today.getTime() - clientTimezoneOffset);
    const dateString = localDate.toISOString().split("T")[0];

    Logger.info("Starting entry encryption", {
      userId,
      entryCount: requestBody.entries.length,
    });

    const encryptedEntries: EncryptedJournalEntry[] = await Promise.all(
      requestBody.entries.map(async (entry: JournalEntryInput) => {
        try {
          const encryptedAnswer = await encrypt(entry.answer);
          Logger.encryptionOperation("encrypt", userId);
          return {
            question: entry.question,
            answer: encryptedAnswer,
            isEncrypted: true,
            createdAt: today.toISOString(),
            date: dateString,
            ...(entry.category && { category: entry.category }),
          };
        } catch (error) {
          throw new EncryptionError("Failed to encrypt entry", {
            cause: error,
          });
        }
      })
    );

    Logger.info("Encryption completed", { userId });

    try {
      Logger.databaseOperation(
        "saveJournalEntries",
        { entryCount: encryptedEntries.length },
        userId
      );

      await journalEntryRepository.saveAll(userId, encryptedEntries);

      Logger.info("Entries saved successfully", {
        userId,
        entryCount: encryptedEntries.length,
      });

      return successResponse();
    } catch (error) {
      throw new DatabaseError("Failed to save entries", { cause: error });
    }
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("Request completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}
