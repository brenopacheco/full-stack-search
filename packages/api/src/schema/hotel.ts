import mongoose from "mongoose";

const schema = new mongoose.Schema({
  chain_name: { type: String, required: false },
  hotel_name: { type: String, required: true },
  addressline1: { type: String, required: true },
  addressline2: { type: String, default: "" },
  zipcode: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: true },
  countryisocode: { type: String, required: true },
  star_rating: { type: Number, required: true, min: 1, max: 5 },
});

schema.index({ hotel_name: "text", country: "text", city: "text" });

export function hotelSchema(conn: mongoose.Connection) {
  return conn.model("Hotel", schema, "hotels");
}

export type HotelModel = ReturnType<typeof hotelSchema>;
export type Hotel = mongoose.InferSchemaType<typeof schema>;
