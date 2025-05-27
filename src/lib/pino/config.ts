import pino from "pino";

export const productionConfig: pino.LoggerOptions = {
  level: "info",
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

export const developmentConfig: pino.LoggerOptions = {
  level: "debug",
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};
