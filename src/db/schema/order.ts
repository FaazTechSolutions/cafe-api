import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

import { relations } from "drizzle-orm"; // this import should be below to all refered tables imports



export const tableName = 'orders';

export const tableDefinition = {  
  orderId:text('orderId'),
  status:text('status'),
  locationId:integer('locationId'),
  totalAmount:real('totalAmount'),
  customerId:text('customerId') 
};

export const order = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});



export default order