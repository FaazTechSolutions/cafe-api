import { Hono } from 'hono';
import { LocationRepository } from '../repository/locationRepository';
import { drizzle } from 'drizzle-orm/d1';
import appHono from '../honoAppBinding';
import { validateRequest } from '../middleware/validateRequest';
import { LocationValidation } from '../models/location';
import { successResponse } from '../utils/apiResponce';


const app = appHono;
const repo = new LocationRepository()

app.post('/location',validateRequest(LocationValidation), async (c) => {
  debugger;
  const location = await c.req.json();
    repo.setDb(c.env.DB).CreateLocation(location)
  return  c.json(successResponse(location));
});
app.get('/locations', async (c) => { 
 const locations= await repo.setDb(c.env.DB).GetLocations();
    return c.json(successResponse({locations}));
  });
app.get('/locations/:id', async (c) => {
  const id  = c.req.param();
  const location= await repo.setDb(c.env.DB).GetLocationById(parseInt(id.id));
  return c.json(successResponse({location}));
});

export default app;