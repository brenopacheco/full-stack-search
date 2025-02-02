import { type Response } from "express";

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

export default { Ok, BadRequest, ServerError };

export type ValidationError = { path: string; detail: string };
