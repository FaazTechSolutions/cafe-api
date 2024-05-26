import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

import { relations } from "drizzle-orm"; // this import should be below to all refered tables imports



export const tableName = 'orderLines';

export const tableDefinition = {  
  orderId:text('orderId'),
  seatId:integer('seatId'),
  itemId:text('itemId'),
  Preference:text('Preference'),
  locationId:integer('locationId'), 
  quantity:integer('quantity'),
  amount:real('amount'),
  totalAmount:real('quantity')  ,
  status:text('status')  
};

export const orderLines = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default orderLines