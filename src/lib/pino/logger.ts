import pino from "pino";
import { productionConfig, developmentConfig } from "./config";

const logger = pino(
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig
);

// Logging levels:
// - fatal: system is unusable
// - error: fatal for a particular request
// - warn: abnormal but not errors
// - info: normal operational messages
// - debug: detailed debug information
// - trace: very detailed traces

type LogContext = {
  userId?: string;
  entryId?: string;
  [key: string]: unknown;
};

class Logger {
  static fatal(message: string, context: LogContext = {}) {
    logger.fatal({ ...context }, message);
  }

  static error(message: string, context: LogContext = {}) {
    logger.error({ ...context }, message);
  }

  static warn(message: string, context: LogContext = {}) {
    logger.warn({ ...context }, message);
  }

  static info(message: string, context: LogContext = {}) {
    logger.info({ ...context }, message);
  }

  static debug(message: string, context: LogContext = {}) {
    logger.debug({ ...context }, message);
  }

  static trace(message: string, context: LogContext = {}) {
    logger.trace({ ...context }, message);
  }

  static apiRequest(method: string, path: string, userId?: string) {
    logger.info({ method, path, userId }, "API Request");
  }

  static databaseOperation(operation: string, data: unknown, userId?: string) {
    logger.debug({ operation, data, userId }, "Database operation");
  }

  static encryptionOperation(
    operation: string,
    userId?: string,
    entryId?: string
  ) {
    logger.debug({ operation, userId, entryId }, "Encryption operation");
  }
}

export default Logger;
