import type { RequestHandler } from "express";
import container from "src/misc/container";
import http from "src/misc/http";

export const getHotel: RequestHandler = async (req, res, next) => {
  const { repository } = container.get();

  const id = req.params["id"];

  const hotel = await repository.getHotel(id);
  if (!hotel.ok) {
    return next(hotel.error);
  }

  if (!hotel.value) {
    return http.NotFound(res);
  }

  return http.Ok(res, hotel.value);
};
