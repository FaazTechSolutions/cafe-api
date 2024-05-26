import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import location from "./location";
import { relations } from "drizzle-orm";



export const tableName = 'locationSeats';

export const locationSeatsTabledefinition = {  
  locationId:integer('locationId'),
  seatId:integer('seatId'),
  seatNo:text('seatNo'),
  orderUrl:text('orderUrl')
};

export const locationSeats = sqliteTable(tableName,{
    ...locationSeatsTabledefinition ,
    ...auditSchema
});

// export const postsRelations = relations(locationSeats, ({ one }) => ({
//   location: one(location, {
//     fields: [locationSeats.locationId],
//     references: [location.id],
//   }),
// }));

export default locationSeats