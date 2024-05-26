import { drizzle } from "drizzle-orm/d1";
import { Env } from "hono";
import { employeeTable } from "./schema/employee";
import { location } from "./schema/location";
import { locationSeats } from "./schema/locationSeat";

export const tables = {
    employee:employeeTable,
    location:location,
    locationsseats:locationSeats
  };