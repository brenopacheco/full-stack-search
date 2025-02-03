import mongoose from "mongoose";
import { Err, Ok, Result } from "src/misc/results";
import { seed, syncIndexes } from "src/misc/seed";
import { MongoMemoryServer } from "mongodb-memory-server";
import { citySchema, type CityModel } from "src/schema/city";
import { hotelSchema, type HotelModel } from "src/schema/hotel";
import { countrySchema, type CountryModel } from "src/schema/country";
import { Logger } from "src/misc/log";

type Models = {
  City: CityModel;
  Hotel: HotelModel;
  Country: CountryModel;
};

export class DBClient {
  public model: Models;
  private constructor(
    private conn: mongoose.Connection,
    private logger: Logger,
    private mongod?: MongoMemoryServer,
  ) {
    this.model = {
      City: citySchema(conn),
      Hotel: hotelSchema(conn),
      Country: countrySchema(conn),
    };
    this.logger.info("Database connected");
  }

  public async destroy() {
    await this?.conn?.close();
    await this?.mongod?.stop();
  }

  static async create(
    logger: Logger,
    dbURI: string,
  ): Promise<Result<DBClient, Error>> {
    try {
      logger.info("Connecting to database");
      const conn = await mongoose.createConnection(dbURI).asPromise();
      const instance = new DBClient(conn, logger);

      const syncResult = await syncIndexes(instance);
      if (!syncResult.ok) {
        await instance.destroy();
        return Err(syncResult.error);
      }

      return Ok(instance);
    } catch (err) {
      return Err(err as Error);
    }
  }

  static async createInMemory(
    logger: Logger,
    shouldSeed: boolean,
  ): Promise<Result<DBClient, Error>> {
    try {
      logger.info("Connecting to in-memory database");
      const mongod = await MongoMemoryServer.create();
      const dbURI = mongod.getUri();
      const conn = await mongoose.createConnection(dbURI).asPromise();
      const instance = new DBClient(conn, logger, mongod);

      if (shouldSeed) {
        logger.info("Seeding initial data");
        const seedResult = await seed(instance);
        if (!seedResult.ok) {
          await instance.destroy();
          return Err(seedResult.error);
        }
      }

      logger.info("Syncing indexes");
      const syncResult = await syncIndexes(instance);
      if (!syncResult.ok) {
        await instance.destroy();
        return Err(syncResult.error);
      }

      return Ok(instance);
    } catch (err) {
      return Err(err as Error);
    }
  }
}
