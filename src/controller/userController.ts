import { drizzle } from "drizzle-orm/d1";
import appHono from "../honoAppBinding";
import { tables } from "../db/drizzle";
import { eq } from "drizzle-orm";
import { successResponse } from "../utils/apiResponce";
import { User } from "../models/user";

const app = appHono;

app.post("/user", async (c) => {
  const user = (await c.req.json()) as User;
  const createdUser = await drizzle(c.env.DB)
    .insert(tables.users)
    .values(user)
    .returning({
      id: tables.users.id,
      userName: tables.users.userName,
      name: tables.users.name,
      email: tables.users.email,
      mobileNumber: tables.users.mobileNumber,
    });
  return c.json(successResponse(createdUser));
});
app.put("/user/:id", async (c) => {
  const p = c.req.param();
  const user = (await c.req.json()) as User;
  const updatedUser = await drizzle(c.env.DB)
    .update(tables.users)
    .set(user)
    .where(eq(tables.users.id, parseInt(p.id)))
    .returning({
      id: tables.users.id,
      userName: tables.users.userName,
      name: tables.users.name,
      email: tables.users.email,
      mobileNumber: tables.users.mobileNumber,
    });
  return c.json(successResponse(updatedUser));
});
app.delete("/user/:id", async (c) => {
  const p = c.req.param();
  const deletedUser = await drizzle(c.env.DB)
    .delete(tables.users)
    .where(eq(tables.users.id, parseInt(p.id)))
    .returning({
      id: tables.users.id,
      userName: tables.users.userName,
      name: tables.users.name,
      email: tables.users.email,
      mobileNumber: tables.users.mobileNumber,
    });
  return c.json(successResponse(deletedUser));
});
app.get("/users", async (c) => {
  const [users] = await drizzle(c.env.DB)
    .select({
      id: tables.users.id,
      userName: tables.users.userName,
      name: tables.users.name,
      email: tables.users.email,
      mobileNumber: tables.users.mobileNumber,
    })
    .from(tables.users);
});
app.get("/users/:id", async (c) => {
  const p = c.req.param();
  const [users] = await drizzle(c.env.DB)
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, parseInt(p.id)));
});

export default app