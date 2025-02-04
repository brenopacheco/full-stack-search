import { DBClient } from "src/db";
import { Err, Ok, Result } from "src/misc/results";
import { cities } from "src/seed/cities";
import { countries } from "src/seed/countries";
import { hotels } from "src/seed/hotels";

export async function seed(dbclient: DBClient): Promise<Result<void, Error>> {
  try {
    await Promise.all([
      dbclient.model.City.insertMany(cities),
      dbclient.model.Country.insertMany(countries),
      dbclient.model.Hotel.insertMany(hotels),
    ]);
  } catch (err) {
    return Err(err as Error);
  }
  return Ok(undefined);
}

/** HACK: indexing should not be done like this */
export async function syncIndexes(
  dbclient: DBClient,
): Promise<Result<void, Error>> {
  try {
    await Promise.all([
      dbclient.model.City.syncIndexes(),
      dbclient.model.Country.syncIndexes(),
      dbclient.model.Hotel.syncIndexes(),
    ]);
  } catch (err) {
    return Err(err as Error);
  }
  return Ok(undefined);
}
