import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Repository } from "./repository";
import { Item } from "../models/item";
import { tables } from "../db/drizzle";
import { eq } from "drizzle-orm";

export class ItemRepository extends Repository {
  
  db: DrizzleD1Database<Record<string, never>>;
  setDb(db: D1Database) {
    this.db = drizzle(db);
    return this;
  }
 async DeleteItemById(id: number):Promise<Partial<Item>> {
    const deletedItem =await this.db.delete(tables.items).where(eq(tables.items.id,id)).returning();
    return deletedItem as Partial<Item>
  }
  async CreateItem(item:Partial<Item>):Promise<Item>{
    const[CreatedItem]=await this.db.insert(tables.items).values(item).returning().execute()
    return CreatedItem;
  }
  async UpdateItem(item:Partial<Item>):Promise<Item>{
    //let _item=item as Item
    const[CreatedItem]=await this.db.update(tables.items).set(item).where(eq(tables.items.id,item.id)).returning().execute()
    return CreatedItem;
  }
  async GetItems():Promise<Item[]>{
    return await this.db.select().from(tables.items)
  }
  async GetItemsById(id:number):Promise<Item[]>{
    return await this.db.select().from(tables.items).where(eq(tables.items.id,id))
  }
}
