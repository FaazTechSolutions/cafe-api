import { Hono } from 'hono';
import appHono from '../honoAppBinding';
import { CreateOrderModel, OrderStatusModel } from '../models/createOrderModel';
import { OrderRepository } from '../repository/orderRepository';
import { Order } from '../models/order';
import { successResponse } from '../utils/apiResponce';


const app =  appHono;
const repo =new OrderRepository()
app.post('/CreateOrder', async (c) => {
  debugger;
  const order = await c.req.json() as CreateOrderModel;
  const createdorder=await repo.setDb(c.env.DB).CreateOrder(order)
  return c.json(successResponse(createdorder));
});
app.put('updateOrderStatus', async (c) => {
  const orderStatus = await c.req.json() as OrderStatusModel;
  await repo.setDb(c.env.DB).OrderStatusUpdate(orderStatus)
  return c.json(successResponse(orderStatus));
});
app.get('/orderWithLines/:id', async (c) => {    
  const id  = c.req.param();
  
 const orderWithLines=await repo.setDb(c.env.DB).GetOrderWithLines(id.id)
  return c.json(successResponse(orderWithLines));
  });
app.get('/orders/:id', async (c) => {
  const id  = c.req.param();
 
  return c.json({"test ORDER id":id});
});

export default app;

function Succesresponce(createdorder: Order): any {
  throw new Error('Function not implemented.');
}
