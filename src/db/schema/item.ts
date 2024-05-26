import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

import { name, relations } from "drizzle-orm"; // this import should be below to all refered tables imports


export const tableName = 'items';

export const tableDefinition = {  
 name:text('name'),
 description:text('description'),
 image:text('image'),
 status:text('status'),
 preference:text('preference'),
 amount:real('amount'),
 type:text('type')
};

export const items = sqliteTable(tableName,{
    ...tableDefinition ,
    ...auditSchema
});

export default items