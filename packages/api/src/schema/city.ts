import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
} as const);

export function citySchema(conn: mongoose.Connection) {
  return conn.model("City", schema, "cities");
}

export type CityModel = ReturnType<typeof citySchema>;
export type City = mongoose.InferSchemaType<typeof schema>;
