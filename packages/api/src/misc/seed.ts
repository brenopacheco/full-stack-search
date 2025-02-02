import { DBClient } from "src/db";
import { Err, Ok, Result } from "src/misc/results";
import { cities } from "src/seed/cities";
import { countries } from "src/seed/countries";
import { hotels } from "src/seed/hotels";

export async function seed(dbClient: DBClient): Promise<Result<void, Error>> {
  try {
    await Promise.all([
      dbClient.model.City.insertMany(cities),
      dbClient.model.Country.insertMany(countries),
      dbClient.model.Hotel.insertMany(hotels),
    ]);
  } catch (err) {
    return Err(err as Error);
  }
  return Ok(undefined);
}

/** HACK: indexing should not be done like this */
export async function syncIndexes(
  dbClient: DBClient,
): Promise<Result<void, Error>> {
  try {
    const res = await Promise.all([
      dbClient.model.City.syncIndexes(),
      dbClient.model.Country.syncIndexes(),
      dbClient.model.Hotel.syncIndexes(),
    ]);
  } catch (err) {
    return Err(err as Error);
  }
  return Ok(undefined);
}
