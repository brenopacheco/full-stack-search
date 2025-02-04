import type { RequestHandler } from "express";
import { z } from "zod";
import { parseQuery } from "src/misc/query";
import container from "src/misc/container";
import http from "src/misc/http";

const querySchema = z.object({
  search: z.string().min(1),
  limit: z.number({ coerce: true }).default(10),
});

export const findLocations: RequestHandler = async (req, res, next) => {
  const { repository } = container.get();

  const query = parseQuery(req.query, querySchema);
  if (!query.ok) {
    return http.BadRequest(res, "Invalid query parameters", query.error);
  }

  const { search, limit } = query.value;

  const locations = await repository.findLocationsByPartialName(search, limit);
  if (!locations.ok) {
    return next(locations.error);
  }

  return http.Ok(res, locations.value);
};
