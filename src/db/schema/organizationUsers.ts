import { SQLiteBoolean, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'organizationUsers';

export const tableDefinition = {  
  organizationId: integer('organizationId'),
  //userId: integer('userId'),
  username:text('userName'),
  isDefault:integer('isDefault')
};

export const organizationUsers = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default organizationUsers