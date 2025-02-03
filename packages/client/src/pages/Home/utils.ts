import { DropdownMenuProps } from "./DropdownMenu";
import { City, Country, Hotel } from "./types";

type MenuItem = DropdownMenuProps["menu"][number]["items"][number];

export function hotelToItem(hotels?: Hotel[]): MenuItem[] {
  if (!hotels) return [];
  return hotels.map((hotel) => ({
    path: `/hotel/${hotel._id}`,
    name: hotel.hotel_name,
  }));
}

export function countryToItem(countries?: Country[]): MenuItem[] {
  if (!countries) return [];
  return countries.map((country) => ({
    path: `/country/${country._id}`,
    name: country.country,
  }));
}

export function cityToItem(cities?: City[]): MenuItem[] {
  if (!cities) return [];
  return cities.map((country) => ({
    path: `/city/${country._id}`,
    name: country.name,
  }));
}
