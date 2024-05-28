import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import appHono from "../honoAppBinding";
import { validateRequest } from "../middleware/validateRequest";
import { Employee, EmployeeValidation } from "../models/employee";
import { errorResponse, successResponse } from "../utils/apiResponce";
import { tables } from "../db/drizzle";

const app = appHono;

app.post("/employee", validateRequest(EmployeeValidation), async (c) => {
  const employee = (await c.req.json()) as Employee;
  const createdemployee = await drizzle(c.env.DB)
    .insert(tables.employee)
    .values(employee)
    .returning()
    .execute();
  return c.json(successResponse(createdemployee));
});
app.put("/employee/:id", validateRequest(EmployeeValidation), async (c) => {
  const id = c.req.param();
  const employee = (await c.req.json()) as Employee;
  const updatedEmployee = await drizzle(c.env.DB)
    .update(tables.employee)
    .set(employee)
    .where(eq(tables.employee.id, parseInt(id.id)))
    .returning()
    .execute();
  return c.json(successResponse(updatedEmployee));
});
app.get("/employees", async (c) => {
  const employees = await drizzle(c.env.DB).select().from(tables.employee);
  return c.json(successResponse(employees));
});
app.get("/employees/:id", async (c) => {
  const id = c.req.param();
  const [employees] = await drizzle(c.env.DB)
    .select()
    .from(tables.employee)
    .where(eq(tables.employee.id, parseInt(id.id)));
  return c.json(successResponse(employees));
});

export default app;