import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = 'employees';

export const tableDefinition = {  
  employeeId: text('employeeId'),
  employeeName: text('employeeName'),
  profession:text('profession'),
  mobileNumber:text('mobileNumber'),
 
};

export const employee = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default employee