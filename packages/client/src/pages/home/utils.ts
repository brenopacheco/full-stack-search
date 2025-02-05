import { DropdownMenuGroupItem } from "./components/DropdownMenu";
import { City, Country, Hotel } from "./types";

export function hotelToItem(hotels?: Hotel[]): DropdownMenuGroupItem[] {
  if (!hotels) return [];
  return hotels.map((hotel) => ({
    key: hotel._id,
    path: `/hotel/${hotel._id}`,
    name: hotel.hotel_name,
  }));
}

export function countryToItem(countries?: Country[]): DropdownMenuGroupItem[] {
  if (!countries) return [];
  return countries.map((country) => ({
    key: country._id,
    path: `/country/${country._id}`,
    name: country.country,
  }));
}

export function cityToItem(cities?: City[]): DropdownMenuGroupItem[] {
  if (!cities) return [];
  return cities.map((city) => ({
    key: city._id,
    path: `/city/${city._id}`,
    name: city.name,
  }));
}
