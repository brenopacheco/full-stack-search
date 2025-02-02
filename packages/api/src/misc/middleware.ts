import type { RequestHandler, ErrorRequestHandler } from "express";
import container from "src/misc/container";
import http from "src/misc/http";

export const errorhandling: ErrorRequestHandler = (error, _req, res, _next) => {
  const { logger } = container.get();
  logger.error(error);

  return http.ServerError(res);
};

export const logging: RequestHandler = (req, res, next) => {
  const { logger } = container.get();
  const { method, url } = req;
  const startTime = new Date().getTime();

  logger.info(`HTTP>`, { method, url });

  res.on("finish", () => {
    const { statusCode } = res;
    const endTime = new Date().getTime();
    const responseTimeMS = endTime - startTime;
    const data = { method, url, responseTimeMs: responseTimeMS, statusCode };
    logger.info(`HTTP<`, data);
  });

  next();
};
