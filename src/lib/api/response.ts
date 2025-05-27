import { NextResponse } from "next/server";
import { AppError } from "@/lib/exceptions/errors";
import Logger from "@/lib/pino/logger";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    Logger.error(error.message, {
      statusCode: error.statusCode,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: error.message,
        ...(error.details && { details: error.details }),
      },
      { status: error.statusCode }
    );
  }

  // Handle non-AppError cases
  const err = error as Error;
  Logger.fatal("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  return NextResponse.json(
    {
      error: "Internal server error",
    },
    { status: 500 }
  );
}

// Generic version for type-safe responses
export function successResponse<T = unknown>(data?: T): NextResponse {
  return NextResponse.json({
    success: true,
    ...(data && { data }),
  });
}

// Alternatively, with explicit response type
type SuccessResponse<T = unknown> = {
  success: true;
  data?: T;
};

export function typedSuccessResponse<T = unknown>(
  data?: T
): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({
    success: true,
    ...(data && { data }),
  });
}
