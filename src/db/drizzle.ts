import { drizzle } from "drizzle-orm/d1";
import { Env } from "hono";
import { employeeTable } from "./schema/employee";
import { locationTable } from "./schema/location";
import { locationSeatsTable } from "./schema/locationSeat";

export const tables = {
    employee:employeeTable,
    location:locationTable,
    locationsseats:locationSeatsTable
  };