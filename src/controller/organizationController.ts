import { drizzle } from "drizzle-orm/d1";
import appHono from "../honoAppBinding";
import { tables } from "../db/drizzle";
import { successResponse } from "../utils/apiResponce";
import { eq } from "drizzle-orm";

const app = appHono;

app.post("/organization", async (c) => {
  const org = await c.req.json();
  const CreatedOrganization = await drizzle(c.env.DB)
    .insert(tables.organizations)
    .values(org)
    .returning();
  return c.json(successResponse(CreatedOrganization));
});
app.put("/organization/:id", async (c) => {
  const p = c.req.param();
  const org = await c.req.json();
  const CreatedOrganization = await drizzle(c.env.DB)
    .update(tables.organizations)
    .set(org)
    .where(eq(tables.organizations.id, parseInt(p.id)))
    .returning();
  return c.json(successResponse(CreatedOrganization));
});
app.delete("/organization/:id", async (c) => {
  const p = c.req.param();
  const org = await c.req.json();
  const deletedOrganization = await drizzle(c.env.DB)
    .delete(tables.organizations)
    .where(eq(tables.organizations.id, parseInt(p.id)))
    .returning();
  return c.json(successResponse(deletedOrganization));
});

app.get("/organizations", async (c) => {
  const orgs = await drizzle(c.env.DB).select().from(tables.organizations);
  return c.json(successResponse(orgs));
});

app.get("/organizations/:id", async (c) => {
  const p = c.req.param();
  const orgs = await drizzle(c.env.DB)
    .select()
    .from(tables.organizations)
    .where(eq(tables.organizations.id, parseInt(p.id)));
  return c.json(successResponse(orgs));
});
