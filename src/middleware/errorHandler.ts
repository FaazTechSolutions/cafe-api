import { Context, Next } from 'hono';
import { ZodError } from 'zod';
import { ValidationError } from './validateRequest';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error(err); 


    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    c.status(status);
    return c.json({
      status: 'error',
      message,
    });
  }
};