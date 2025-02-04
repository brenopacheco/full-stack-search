import { useQuery } from "@tanstack/react-query";
import { env } from "../../env";
import { z } from "zod";

export const zLocations = z.object({
  cities: z.array(z.object({ _id: z.string(), name: z.string() })),
  countries: z.array(z.object({ _id: z.string(), country: z.string() })),
  hotels: z.array(z.object({ _id: z.string(), hotel_name: z.string() })),
});

export const useLocations = (search: string| null) => {
  return useQuery({
    queryKey: ["locations", search],
    queryFn: () =>
      fetch(`${env.API_URL}/locations?search=${search}`)
        .then((res) => res.json())
        .then(delay)
        .then((data) => zLocations.parse(data)),
    enabled: Boolean(search),
  });
};

function delay<T>(data: T) {
  return new Promise((resolve) => setTimeout(() => resolve(data), window.DELAY_MS));
}
