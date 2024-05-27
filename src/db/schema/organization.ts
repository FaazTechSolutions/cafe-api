import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'organizations';

export const tableDefinition = {  
  name: text('name'),
  shortCode:text('shortCode'), 
};

export const organizations = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default organizations