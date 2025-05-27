type ErrorDetails = Record<string, unknown> | Error | undefined;

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public details?: ErrorDetails
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class EncryptionError extends AppError {
  constructor(message = "Encryption failed", details?: ErrorDetails) {
    super(message, 500, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed", details?: ErrorDetails) {
    super(message, 500, details);
  }
}

export class ProcessingError extends AppError {
  constructor(message = "Processing failed", details?: ErrorDetails) {
    super(message, 500, details);
  }
}
