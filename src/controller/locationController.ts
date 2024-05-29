import { Hono } from 'hono';
import { LocationRepository } from '../repository/locationRepository';
import { drizzle } from 'drizzle-orm/d1';
import appHono from '../honoAppBinding';
import { validateRequest } from '../middleware/validateRequest';
import { Location, LocationValidation } from '../models/location';
import { successResponse } from '../utils/apiResponce';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { LocationSeat } from '../models/locationSeats';



const app = appHono;
const repo = new LocationRepository()

app.post('/locationWithFile', async (c) => { 
  
  const body=await c.req.parseBody();  
  const file =  body['file']
  const value =  body['value'] as string
  const location= JSON.parse(value) as Location  
  try{
    //upload file and insert the ocation 
    //{}
    const createdlocation=await repo.setDb(c.env.DB).CreateLocation(location)
    return  c.json(successResponse(createdlocation)); 
  }
  catch(er:any){
      //delete file and return errorResponse 
  }
  
});

app.post('/location',validateRequest(LocationValidation), async (c) => {  
  const location = await c.req.json();
   const createdlocation=await repo.setDb(c.env.DB).CreateLocation(location)
  return  c.json(successResponse(createdlocation));
});
app.put('/locations/:id',validateRequest(LocationValidation), async (c) => {
  const id  = c.req.param();
  const locationToupdate = await c.req.json() as Partial<Location>;
  locationToupdate.id= parseInt(id.id)
  const location= await repo.setDb(c.env.DB).UpdateLocation(locationToupdate);
  return c.json(successResponse({location}));
});
app.delete('/location/:id',async (c)=>{
  const id  = c.req.param();
  const location= await repo.setDb(c.env.DB).DeleteLocationById(parseInt(id.id));
  return c.json(successResponse({location}));
})
app.post('/location/seat', async(c)=>{
  const locationseat = await c.req.json();
  const createdlocationseat=await repo.setDb(c.env.DB).CreateLocationSeat(locationseat)
  return  c.json(successResponse(createdlocationseat));
})
app.put('/location/seat/:id',validateRequest(LocationValidation), async (c) => {  
  const id  = c.req.param();
  const locationSeatToupdate = await c.req.json() as Partial<LocationSeat>; 
  locationSeatToupdate.id= parseInt(id.id) 
  const locationseat= await repo.setDb(c.env.DB).UpdateLocationSeat(locationSeatToupdate);
  return c.json(successResponse({locationseat}));
});
app.delete('/location/seat/:id',async (c)=>{
  const id  = c.req.param();
  const location= await repo.setDb(c.env.DB).DeleteLocationSeatById(parseInt(id.id));
  return c.json(successResponse({location}));
})
//Get actions 
app.get('/locations', async (c) => { 
 const locations= await repo.setDb(c.env.DB).GetLocations();
    return c.json(successResponse({locations}));
  });
app.get('/locations/:id', async (c) => {
  const id  = c.req.param();
  const location= await repo.setDb(c.env.DB).GetLocationById(parseInt(id.id));
  return c.json(successResponse({location}));
});
app.get('/locations/:id/seats', async (c) => {  
  const locationId  = c.req.param();
  const location= await repo.setDb(c.env.DB).GetLocationSeatsByLocationId(parseInt(locationId.id)); 
  return c.json(successResponse({location}));
});
app.get('/locationsWithSeats/:id', async (c) => {  
  const locationId  = c.req.param(); 
  const locationswithSeats= await repo.setDb(c.env.DB).GetLocationSeats(parseInt(locationId.id));  
  return c.json(successResponse({locationswithSeats}));
});

export default app;