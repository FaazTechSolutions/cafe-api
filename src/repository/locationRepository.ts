import { eq, lt, gte, ne } from "drizzle-orm";
import { tables } from "../db/drizzle";
import { Location } from "../models/location";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

export class LocationRepository {
  db: DrizzleD1Database<Record<string, never>>;

  setDb(db: D1Database): LocationRepository {
    this.db = drizzle(db);
    return this;
  }
  async CreateLocation(location: Partial<Location>): Promise<Location> {
    const [createdLocation] = await this.db
      .insert(tables.location)
      .values(location)
      .returning()
      .execute();
    return createdLocation;
  }
  async GetLocations(): Promise<Location[]> {
    return this.db.select().from(tables.location);
  }
  async GetLocationById(id: number): Promise<Location> {
    const [location] = await this.db
      .select()
      .from(tables.location)
      .where(eq(tables.location.id, id))
      .execute();
    return location || null;
  }
}
