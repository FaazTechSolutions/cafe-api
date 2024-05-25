import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";


export const tableName = 'locationSeats';

export const definition = {  
  locationId:integer('locationId'),
  seatId:integer('seatId'),
  seatNo:text('seatNo'),
  orderUrl:text('orderUrl')
};

export const locationSeatsTable = sqliteTable(tableName,{
    ...definition ,
    ...auditSchema
});