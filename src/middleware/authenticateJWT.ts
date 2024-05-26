// src/middleware/authenticateJWT.ts
import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';

export const authenticateJWT = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    return c.json({ status: 'error', message: 'Authorization header missing' }, 401);
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return c.json({ status: 'error', message: 'Token missing' }, 401);
  }

  try {
    const user = verifyToken(token);
    c.set('user', user);
    await next();
  } catch (err) {
    return c.json({ status: 'error', message: 'Invalid or expired token' }, 401);
  }
};
