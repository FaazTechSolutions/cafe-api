import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'employees';

export const definition = {  
  employeeId: text('employeeId'),
  employeeName: text('employeeName'),
  profession:text('profession'),
  mobileNumber:text('mobileNumber'),
 
};

export const employeeTable = sqliteTable(tableName,{
    ...definition ,
    ...auditSchema
});