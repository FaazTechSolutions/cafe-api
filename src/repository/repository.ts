import { DrizzleD1Database } from "drizzle-orm/d1";

export abstract class Repository {
  abstract  db: DrizzleD1Database<Record<string, never>>;
  abstract setDb(db: D1Database);
}
