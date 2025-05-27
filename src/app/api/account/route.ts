import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { journalEntryRepository } from "@/lib/firebase/repositories";
import { handleApiError, successResponse } from "@/lib/api/response";
import { UnauthorizedError, DatabaseError } from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";

export async function DELETE() {
  const startTime = Date.now();
  let userId: string | undefined;
  let errorOccurred = false;

  try {
    Logger.apiRequest("DELETE", "/api/account");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new UnauthorizedError();
    }
    userId = session.user.email;

    Logger.info("Starting account data deletion", { userId });

    try {
      const deletionResult = await journalEntryRepository.deleteAll(userId);

      if (!deletionResult) {
        Logger.warn("No user data found to delete", { userId });
      } else {
        Logger.info("User data deleted successfully", { userId });
      }

      return successResponse();
    } catch (error) {
      throw new DatabaseError("Failed to delete user data", { cause: error });
    }
  } catch (error) {
    errorOccurred = true;
    return handleApiError(error);
  } finally {
    const duration = Date.now() - startTime;
    Logger.info("Account deletion completed", {
      userId,
      durationMs: duration,
      status: errorOccurred ? "error" : "success",
    });
  }
}
