import type { RequestHandler } from "express";
import container from "src/misc/container";
import http from "src/misc/http";

export const getCountry: RequestHandler = async (req, res, next) => {
  const { repository } = container.get();

  const id = req.params["id"];

  const country = await repository.getCountry(id);
  if (!country.ok) {
    return next(country.error);
  }

  if (!country.value) {
    return http.NotFound(res);
  }

  return http.Ok(res, country.value);
};
