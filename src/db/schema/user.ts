import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'users';

export const tableDefinition = {    
  userName: text('userName'),
  name:text('name'),
  email:text('email'),
  mobileNumber:text('mobileNumber'),
  password:text('password'),
 
};

export const users = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default users