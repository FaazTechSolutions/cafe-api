
import { sql } from 'drizzle-orm';
import { integer, text } from 'drizzle-orm/sqlite-core';

export const auditSchema = {
  id:integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdOn: integer('createdOn', { mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  createdBy:text('createdBy'),
  updatedOn:integer('updatedOn', { mode: 'timestamp_ms' }),
  updatedBy:text('updatedby')
};