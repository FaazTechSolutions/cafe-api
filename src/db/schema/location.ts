import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import locationSeats from "./locationSeat";
import { relations } from "drizzle-orm";



export const tableName = 'locations';

export const locationTabledefinition = {  
  name:text('name'),
  status:text('status'),
  image:text('image'),
  officeBoy:text('officeBoy'),
  officeBoyMobile:text('officeBoyMobile') 
};

export const location = sqliteTable(tableName,{
    ...locationTabledefinition ,
    ...auditSchema
});

// export  const locationTableRelations = relations(location, ({ many }) => ({
//   seats: many(locationSeats),
// }));


export default location