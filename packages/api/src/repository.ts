import mongoose from "mongoose";
import { DBClient } from "src/db";
import { Logger } from "src/misc/log";
import { Err, Ok, Result } from "src/misc/results";
import { type City } from "src/schema/city";
import { type Country } from "src/schema/country";
import { type Hotel } from "src/schema/hotel";

type Locations = {
  cities: City[];
  countries: Country[];
  hotels: Partial<Hotel[]>;
};

export class Repository {
  constructor(
    private logger: Logger,
    private dbclient: DBClient,
  ) {}

  async findLocationsByPartialName(
    search: string,
    limit: number,
  ): Promise<Result<Locations, Error>> {
    try {
      const { City, Country, Hotel } = this.dbclient.model;

      const regex = { $regex: new RegExp(`^${search}`), $options: "i" };
      this.logger.debug("findLocationsByPartialName", { regex });

      const [cities, countries, hotels] = await Promise.all([
        City.find({ name: regex }).select(["name"]).limit(limit).lean(),
        Country.find({ country: regex })
          .select(["country"])
          .limit(limit)
          .lean(),
        Hotel.find({
          $or: [
            { chain_name: regex },
            { hotel_name: regex },
            { country: regex },
            { city: regex },
          ],
        })
          .select(["hotel_name", "chain_name", "city", "country"])
          .limit(limit)
          .lean(),
      ]);

      return Ok({ cities, hotels, countries });
    } catch (err) {
      return Err(err as Error);
    }
  }

  async getCity(id: string) {
    const ok = mongoose.Types.ObjectId.isValid(id);
    if (!ok) {
      return Ok(null);
    }

    try {
      const { City } = this.dbclient.model;
      const city = await City.findById(id).lean();

      return Ok(city);
    } catch (err) {
      return Err(err as Error);
    }
  }

  async getHotel(id: string) {
    const ok = mongoose.Types.ObjectId.isValid(id);
    if (!ok) {
      return Ok(null);
    }

    try {
      const { Hotel } = this.dbclient.model;
      const hotel = await Hotel.findById(id).lean();

      return Ok(hotel);
    } catch (err) {
      return Err(err as Error);
    }
  }

  async getCountry(id: string) {
    const ok = mongoose.Types.ObjectId.isValid(id);
    if (!ok) {
      return Ok(null);
    }

    try {
      const { Country } = this.dbclient.model;
      const country = await Country.findById(id).lean();

      return Ok(country);
    } catch (err) {
      return Err(err as Error);
    }
  }
}
