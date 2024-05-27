import { Hono } from "hono";
import appHono from "../honoAppBinding";
import { ItemRepository } from "../repository/itemRepository";
import { successResponse } from "../utils/apiResponce";
import { Item } from "../models/item";

const app = appHono;
const repo = new ItemRepository();

app.post("/item", async (c) => {
  const itemToCreate = await c.req.json();
  const createdItem = await repo.setDb(c.env.DB).CreateItem(itemToCreate);
  return c.json(successResponse(createdItem));
});
app.put("/item/:id", async (c) => {
  const id = c.req.param();
  const itemToUpdate = await c.req.json() as Item
  itemToUpdate.id=parseInt(id.id)
  const updatedItem = await repo.setDb(c.env.DB).UpdateItem(itemToUpdate);
  return c.json(successResponse(updatedItem));
});
app.get("/items", async (c) => {
  const [items] = await repo.setDb(c.env.DB).GetItems();
  return c.json(successResponse(items));
});
app.get("/items/:id", async (c) => {
  const id = c.req.param();
  const item = await repo.setDb(c.env.DB).GetItemsById(parseInt(id.id));
  return c.json(successResponse(item));
});

export default app;
