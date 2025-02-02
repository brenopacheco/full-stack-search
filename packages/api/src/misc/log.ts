import winston from "winston";

type LoggerOpts = {
  LOG_LEVEL?: "error" | "info" | "debug";
  LOG_FILE?: string | null;
};

export class Logger {
  _logger: winston.Logger;

  constructor(opts?: LoggerOpts) {
    const level = opts?.LOG_LEVEL ?? "info";
    const format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    );


    const transports = [];

    transports.push(new winston.transports.Console({ level, format }));

    if (opts?.LOG_FILE) {
      transports.push(
        new winston.transports.File({ level, format, filename: opts.LOG_FILE }),
      );
    }

    this._logger = new winston.Logger({ level, transports, format });
  }

  public info(message: string, meta?: object) {
    return this._logger.log("info", message, meta);
  }

  public debug(message: string, meta?: object) {
    return this._logger.log("debug", message, meta);
  }

  public error(message: string, meta?: object): void;
  public error(error: Error): void;
  public error(messageOrError: string | Error, meta?: object): void {
    if (messageOrError instanceof Error) {
      this._logger.log("error", messageOrError);
    } else {
      this._logger.log("error", messageOrError, meta);
    }
  }
}

export const defaultLogger = new Logger();
