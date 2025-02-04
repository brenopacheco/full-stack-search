import { useQuery } from "@tanstack/react-query";
import { env } from "../../env";
import { LocationType } from "./types";

export const useLocation = (location: LocationType, id?: string) => {
  return useQuery({
    queryKey: [location, id],
    queryFn: () =>
      fetch(`${env.API_URL}/${location}/${id}`).then(async (res) => {
        await delay(res);
        if (res.status === 404) return null;
        return res.json().then((data) => data as object);
      }),

    enabled: Boolean(id),
  });
};

function delay<T>(data: T, ms = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
