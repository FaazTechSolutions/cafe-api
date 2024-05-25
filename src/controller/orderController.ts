import { Hono } from 'hono';
import appHono from '../honoAppBinding';


const app =  appHono;


app.post('/createOrder', async (c) => {
  const user = await c.req.json();
  return c.json(user);
});
app.get('/orderWithLines', async (c) => {
    
    return c.json({"test":"test Value from ORDER get"});
  });
app.get('/orders/:id', async (c) => {
  const id  = c.req.param();
 
  return c.json({"test ORDER id":id});
});

export default app;