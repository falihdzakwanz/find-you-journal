import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntries } from "@/lib/firebase/services";
import { decrypt } from "@/lib/webCrypto/encryption";
import { handleApiError, successResponse } from "@/lib/api/response";
import { UnauthorizedError } from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";

export async function GET(): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("GET", "/api/journal/history");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    Logger.databaseOperation("getJournalEntries", {}, userId);
    const entries = await getJournalEntries(userId);
    Logger.info("Entries retrieved from database", {
      userId,
      count: entries.length,
    });

    Logger.debug("Starting entry decryption", {
      userId,
      totalEntries: entries.length,
      encryptedEntries: entries.filter((e) => e.isEncrypted).length,
    });

    const decryptedEntries = await Promise.all(
      entries.map(async (entry) => {
        if (!entry.isEncrypted) {
          Logger.debug("Skipping decryption (already decrypted)", {
            userId,
            entryId: entry.id,
          });
          return entry;
        }

        try {
          Logger.encryptionOperation("decrypt", userId, entry.id);
          const decryptedAnswer = await decrypt(entry.answer);

          Logger.debug("Entry decrypted successfully", {
            userId,
            entryId: entry.id,
          });

          return {
            ...entry,
            answer: decryptedAnswer,
            isEncrypted: false,
          };
        } catch (decryptError) {
          Logger.error("Failed to decrypt entry", {
            userId,
            entryId: entry.id,
            error:
              decryptError instanceof Error
                ? decryptError.message
                : "Unknown decryption error",
          });

          return {
            ...entry,
            answer: "[Error: Could not decrypt]",
            isEncrypted: false,
          };
        }
      })
    );

    Logger.info("All entries processed successfully", {
      userId,
      totalEntries: decryptedEntries.length,
      failedDecryptions: decryptedEntries.filter((e) =>
        e.answer.includes("[Error:")
      ).length,
    });

    return successResponse(decryptedEntries);
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("GET /api/journal/history completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}
