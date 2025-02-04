import { type Response } from "express";

export type ValidationError = { path: string; detail: string };

const Ok = (res: Response, body?: object) => {
  return res.status(200).json(body);
};

const BadRequest = (
  res: Response,
  detail: string,
  errors?: ValidationError[],
) => {
  return res.status(400).json({ title: "Bad Request", detail, errors });
};

const ServerError = (res: Response) => {
  return res.status(500).send();
};

const NotFound = (res: Response) => {
  return res.status(404).send();
};

export default { Ok, BadRequest, NotFound, ServerError };
