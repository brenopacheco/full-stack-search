import { z } from "zod";
import { zLocations } from "./hooks";

export type Locations = z.infer<typeof zLocations>;
export type Hotel = Locations["hotels"][number];
export type City = Locations["cities"][number];
export type Country = Locations["countries"][number];
