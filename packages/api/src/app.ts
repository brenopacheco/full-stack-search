import cors from "cors";
import express, { json, urlencoded } from "express";
import { logging, errorhandling } from "src/misc/middleware";
import * as handlers from "src/handler";

export default function () {
  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  app.use(logging);

  app.get("/locations", handlers.findLocations);
  app.get("/country/:id", handlers.getCountry);
  app.get("/city/:id", handlers.getCity);
  app.get("/hotel/:id", handlers.getHotel);

  // Override default error handler
  app.use(errorhandling);

  return app;
}
