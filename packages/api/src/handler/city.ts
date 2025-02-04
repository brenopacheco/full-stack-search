import type { RequestHandler } from "express";
import container from "src/misc/container";
import http from "src/misc/http";

export const getCity: RequestHandler = async (req, res, next) => {
  const { repository } = container.get();

  const id = req.params["id"];

  const city = await repository.getCity(id);
  if (!city.ok) {
    return next(city.error);
  }

  if (!city.value) {
    return http.NotFound(res);
  }

  return http.Ok(res, city.value);
};
