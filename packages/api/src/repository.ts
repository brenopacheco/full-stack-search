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
    private dbClient: DBClient,
  ) {}

  async findLocationsByPartialName(
    search: string,
    limit: number,
  ): Promise<Result<Locations, Error>> {
    try {
      const { City, Country, Hotel } = this.dbClient.model;

      const regex = { $regex: new RegExp(`^${search}`), $options: "i" };

      const [cities, countries, hotels] = await Promise.all([
        City.find({ name: regex }).select(["name"]).limit(limit).lean(),
        Country.find({ country: regex })
          .select(["country"])
          .limit(limit)
          .lean(),
        Hotel.find({ hotel_name: regex })
          .select(["hotel_name"])
          .limit(limit)
          .lean(),
      ]);

      return Ok({ cities, hotels, countries });
    } catch (err) {
      return Err(err as Error);
    }
  }
}
