import mongoose from "mongoose";

const schema = new mongoose.Schema({
  country: { type: String, required: true, index: true },
  countryisocode: { type: String, required: true },
});

export function countrySchema(conn: mongoose.Connection) {
  return conn.model("Country", schema, "countries");
}

export type CountryModel = ReturnType<typeof countrySchema>;
export type Country = mongoose.InferSchemaType<typeof schema>;
