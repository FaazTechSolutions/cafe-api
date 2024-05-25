import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'locations';

export const definition = {  
  name:text('name'),
  status:text('status'),
  image:text('image'),
  officeBoy:text('officeBoy'),
  officeBoyMobile:text('officeBoyMobile') 
};

export const locationTable = sqliteTable(tableName,{
    ...definition ,
    ...auditSchema
});