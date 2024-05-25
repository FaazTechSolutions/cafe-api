import { BaseModel } from "./baseModel";
import { LocationSeats } from "./locationSeats";
import { z } from "zod";

export interface Location extends BaseModel {
  name: string;
  status: string;
  image: string;
  officeBoy: string;
  officeBoyMobile: string;
}

export interface LocationWithSeats extends Location {
  locationSeats: LocationSeats[];
}

export const LocationValidation = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
  image: z.string().optional(),
  officeBoy: z.string().min(1, "office Boy is required"),
  officeBoyMobile: z.string().min(10, "office Boy Mobile Number is required"),
});
