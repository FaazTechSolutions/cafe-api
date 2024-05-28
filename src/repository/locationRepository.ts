import { eq, lt, gte, ne, and } from "drizzle-orm";
import { tables } from "../db/drizzle";
import { Location, LocationWithSeats } from "../models/location";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { LocationSeat } from "../models/locationSeats";
import { Repository } from "./repository";

export class LocationRepository extends Repository {

  db: DrizzleD1Database<Record<string, never>>;

  setDb(db: D1Database): LocationRepository {
    this.db = drizzle(db);
    return this;
  }
 async DeleteLocationSeatById(id: number): Promise<Partial<LocationSeat>>  {
    const deletedLoation = await this.db
    .delete(tables.locationSeats)
    .where(eq(tables.locationSeats.id, id))
    .returning();
  return deletedLoation as Partial<LocationSeat>;
  }
  async DeleteLocationById(id: number): Promise<Partial<Location>> {
    const deletedLoation = await this.db
      .delete(tables.location)
      .where(eq(tables.location.id, id))
      .returning();
    return deletedLoation as Partial<Location>;
  }
  async CreateLocation(location: Partial<Location>): Promise<Location> {
    const [createdLocation] = await this.db
      .insert(tables.location)
      .values(location)
      .returning()
      .execute();
    return createdLocation;
  }
  async CreateLocationSeat(
    locationseat: Partial<LocationSeat>
  ): Promise<LocationSeat> {
    const [createdLocationSeat] = await this.db
      .insert(tables.locationSeats)
      .values(locationseat)
      .returning()
      .execute();
    return createdLocationSeat;
  }
  async GetLocations(): Promise<Location[]> {
    return this.db.select().from(tables.location);
  }
  async GetLocationById(id: number): Promise<Location> {
    const [location] = await this.db
      .select()
      .from(tables.location)
      .where(eq(tables.location.id, id));

    return location || null;
  }
  async GetLocationSeatsByLocationId(id: number): Promise<LocationSeat[]> {
    const locationSeats = await this.db
      .select()
      .from(tables.locationSeats)
      .where(eq(tables.locationSeats.locationId, id));
    return locationSeats;
  }
  async GetLocationSeats(locationId: number): Promise<any> {
    debugger;
    let _location: Location;
    let ls = {
      id: null,
      createdOn: null,
      createdBy: null,
      updatedOn: null,
      updatedBy: null,
      name: null,
      status: null,
      image: null,
      officeBoy: null,
      officeBoyMobile: null,
      locationSeats: [],
    };
    const [location] = await this.db
      .select()
      .from(tables.location)
      .where(eq(tables.location.id, locationId));

    const locationSeats = await this.db
      .select()
      .from(tables.locationSeats)
      .where(eq(tables.locationSeats.locationId, locationId));

    if (location && locationSeats) {
      debugger;
      ls.id = location.id;
      ls.name = location?.name;
      ls.status = location?.status;
      (ls.image = location?.image), (ls.officeBoy = location?.officeBoy);
      ls.officeBoyMobile = location?.officeBoyMobile;
      ls.locationSeats = await locationSeats!;
      return await ls;
    }

    return await ls;
  }
  async UpdateLocation(location: Partial<Location>): Promise<Location> {
    const [uplatedLocation] = await this.db
      .update(tables.location)
      .set(location)
      .where(eq(tables.location.id, location.id))
      .returning();

    return uplatedLocation;
  }
  async UpdateLocationSeat(locationSeat: Partial<LocationSeat>): Promise<LocationSeat> {
    const [uplatedLocation] = await this.db
      .update(tables.locationSeats)
      .set(locationSeat)
      .where(eq(tables.locationSeats.id, locationSeat.id))
      .returning();

    return uplatedLocation;
  }
}
