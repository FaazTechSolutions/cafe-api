import { eq, lt, gte, ne } from "drizzle-orm";
import { tables } from "../db/drizzle";
import { Location, LocationWithSeats } from "../models/location";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { LocationSeats } from "../models/locationSeats";

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
      
    return location || null;
  }
  async GetLocationSeatsByLocationId(id: number): Promise<LocationSeats[]> {
    const locationSeats = await this.db
    .select()
    .from(tables.locationsseats)
    .where(eq(tables.locationsseats.locationId, id))
    return locationSeats
  }
  async GetLocationSeats(locationId: number): Promise<any> {
    debugger;    
    let _location:Location;
    let ls ={
      id: null,
      createdOn:null,
      createdBy:null,
      updatedOn:null,
      updatedBy:null,
      name: null,
      status:null,
      image: null,
      officeBoy: null,
      officeBoyMobile: null,
      locationSeats:[]
    };
    const [location] = await this.db
      .select()
      .from(tables.location)
      .where(eq(tables.location.id, locationId))    

      const locationSeats = await this.db
      .select()
      .from(tables.locationsseats)
      .where(eq(tables.locationsseats.locationId, locationId))   

      if(location && locationSeats){
        debugger;
        ls.id=  location.id
        ls.name= location?.name
        ls.status= location?.status
        ls.image= location?.image,
        ls.officeBoy= location?.officeBoy
        ls.officeBoyMobile= location?.officeBoyMobile
        ls.locationSeats=await locationSeats!;
        return await ls ;
      }
  
      return await ls ;
    
  }
  async UpdateLocation(location: Partial<Location>): Promise<Location> {
    let _location=location as Location;

    const [uplatedLocation] = await this.db
      .update(tables.location)
      .set(location)
      .where(eq(tables.location.id,location.id))
      .returning()

      
    return uplatedLocation;
  }

}
