import { Hono } from 'hono';
import { LocationRepository } from '../repository/locationRepository';
import { drizzle } from 'drizzle-orm/d1';
import appHono from '../honoAppBinding';


const app = appHono;
const repo = new LocationRepository()

app.post('/location', async (c) => {
  const location = await c.req.json();
    repo.setDb(c.env.DB).CreateLocation(location)
  return  c.json(location);
});
app.get('/locations', async (c) => { 
 const locations= await repo.setDb(c.env.DB).GetLocations();
    return c.json({locations});
  });
app.get('/locations/:id', async (c) => {
  const id  = c.req.param();
  const location= await repo.setDb(c.env.DB).GetLocationById(parseInt(id.id));
  return c.json({location});
});

export default app;