import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getJournalEntries } from "@/lib/firebase/services";
import { calculateJournalStats } from "@/utils/statsCalculator";
import { decrypt } from "@/lib/webCrypto/encryption";
import { handleApiError, successResponse } from "@/lib/api/response";
import { UnauthorizedError, ProcessingError } from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";

export async function GET(): Promise<NextResponse> {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;
  let statsCalculationTime = 0;
  let decryptionTime = 0;

  try {
    Logger.apiRequest("GET", "/api/journal/stats");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    Logger.databaseOperation("getJournalEntries", {}, userId);
    const dbStartTime = Date.now();
    const entries = await getJournalEntries(userId);
    const dbDuration = Date.now() - dbStartTime;

    Logger.info("Entries retrieved from database", {
      userId,
      entryCount: entries.length,
      dbDurationMs: dbDuration,
    });

    Logger.debug("Starting entry decryption", {
      userId,
      totalEntries: entries.length,
      encryptedEntries: entries.filter((e) => e.isEncrypted).length,
    });

    const decryptionStartTime = Date.now();
    const decryptedEntries = await Promise.all(
      entries.map(async (entry) => {
        if (!entry.isEncrypted) {
          Logger.trace("Skipping decryption (already decrypted)", {
            userId,
            entryId: entry.id,
          });
          return entry;
        }

        try {
          Logger.encryptionOperation("decrypt", userId, entry.id);
          const decryptedAnswer = await decrypt(entry.answer);

          Logger.trace("Entry decrypted successfully", {
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
    decryptionTime = Date.now() - decryptionStartTime;

    Logger.info("Decryption completed", {
      userId,
      decryptionTimeMs: decryptionTime,
      failedDecryptions: decryptedEntries.filter((e) =>
        e.answer.includes("[Error:")
      ).length,
    });

    Logger.debug("Starting stats calculation", { userId });
    const statsStartTime = Date.now();
    let stats;
    try {
      stats = calculateJournalStats(decryptedEntries);
      statsCalculationTime = Date.now() - statsStartTime;

      Logger.info("Stats calculated successfully", {
        userId,
        statsCalculationTimeMs: statsCalculationTime,
        metricsCalculated: Object.keys(stats).length,
      });
    } catch (statsError) {
      throw new ProcessingError("Failed to calculate statistics", {
        cause: statsError,
      });
    }

    return successResponse(stats);
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("GET /api/stats completed", {
      userId,
      totalDurationMs: duration,
      dbDurationMs: duration - decryptionTime - statsCalculationTime,
      decryptionDurationMs: decryptionTime,
      statsDurationMs: statsCalculationTime,
      status: errorOccurred ? "error" : "success",
    });
  }
}
