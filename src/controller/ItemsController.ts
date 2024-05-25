import { Hono } from 'hono';
import appHono from '../honoAppBinding';


const app =  appHono;;


app.post('/CreateItem', async (c) => {
  const user = await c.req.json();
  return c.json(user);
});
app.get('/Items', async (c) => {
    
    return c.json({"test":"test Value from Items get"});
  });
app.get('/Items/:id', async (c) => {
  const id  = c.req.param();
 
  return c.json({"test Items id":id});
});

export default app;