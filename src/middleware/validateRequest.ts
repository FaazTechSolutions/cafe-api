import { Context, Next } from "hono";
import { ZodError, ZodSchema, string } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const parsed = schema.parse(await c.req.json());
      c.set("parsedBody", parsed);
      await next();
    } catch (err) {
      if (err instanceof ZodError) {
        const validationErrors: ValidationError[] = err.errors.map((error) => ({
          // status: 'validation error',
          message: error.message,
          fields: error.path.join(","),
        }));
        return c.json({ status: "error", data: { validationErrors } }, 400);
      } else {
        throw new Error("Invalid request");
      }
    }
  };
};

export interface ValidationError {
  // status: string;
  message: string;
  fields?: string; // Include path to provide context about where the validation error occurred
}
