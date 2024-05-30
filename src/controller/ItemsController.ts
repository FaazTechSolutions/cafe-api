import { Hono } from "hono";
import appHono from "../honoAppBinding";
import { ItemRepository } from "../repository/itemRepository";
import { errorResponse, successResponse } from "../utils/apiResponce";
import { Item } from "../models/item";
import { appConstants } from "../consts";

const app = appHono;
const repo = new ItemRepository();
const publicbucketURL=appConstants.publicbucketURL;
app.post("/item", async (c) => {
  const body=await c.req.parseBody(); 
  console.log("Request Body:", body);  
  const file =  body['file'] as File
  if (!file) {
    return c.json(errorResponse('File not provided'), 400);
  } 
  const value =  body['value'] as string
  const itemToCreate= JSON.parse(value) as Item  
  const name = file.name;
  const key = `uploads/${Date.now()}_${name}`;
  try{    
    await   c.env.R2_BUCKET.put(key,file)       
    const url = `${publicbucketURL}/${key}`;    
    itemToCreate.image=url;
    const createdItem=await repo.setDb(c.env.DB).CreateItem(itemToCreate)
    return  c.json(successResponse(createdItem)); 
  }
  catch(er:any){
      //delete file and return errorResponse 
      await   c.env.R2_BUCKET.delete(key)    
      return c.json(errorResponse("Error",er));
  }
});
app.put("/item/:id", async (c) => {
  const id = c.req.param();
  const body=await c.req.parseBody(); 
  console.log("Request Body:", body);  
  const file =  body['file'] as File
  if (!file) {
    return c.json(errorResponse('File not provided'), 400);
  } 
  const value =  body['value'] as string
  const itemToUpdate= JSON.parse(value) as Item  
  itemToUpdate.id=parseInt(id.id)
  const name = file.name;
  const key = `uploads/${Date.now()}_${name}`;
  try{    
//    await   c.env.R2_BUCKET.delete(itemToUpdate.image)
    await   c.env.R2_BUCKET.put(key,file)       
    const url = `${publicbucketURL}/${key}`;    
    itemToUpdate.image=url;
    const updatedItem=await repo.setDb(c.env.DB).UpdateItem(itemToUpdate)
    return  c.json(successResponse(updatedItem)); 
  }
  catch(er:any){
      //delete file and return errorResponse 
      await   c.env.R2_BUCKET.delete(key)    
      return c.json(errorResponse("Error"));
  }
});
// app.post("/item", async (c) => {
//   const itemToCreate = await c.req.json();
//   const createdItem = await repo.setDb(c.env.DB).CreateItem(itemToCreate);
//   return c.json(successResponse(createdItem));
// });
// app.put("/item/:id", async (c) => {
//   const id = c.req.param();
//   const itemToUpdate = await c.req.json() as Item
//   itemToUpdate.id=parseInt(id.id)
//   const updatedItem = await repo.setDb(c.env.DB).UpdateItem(itemToUpdate);
//   return c.json(successResponse(updatedItem));
// });
app.delete('/item/:id',async (c)=>{
  const id = c.req.param();
  const item = await repo.setDb(c.env.DB).DeleteItemById(parseInt(id.id));
  return c.json(successResponse(item,"Item Deleted"));
})
app.get("/items", async (c) => {
  const items = await repo.setDb(c.env.DB).GetItems();
  return c.json(successResponse(items));
});
app.get("/items/:id", async (c) => {
  const id = c.req.param();
  const item = await repo.setDb(c.env.DB).GetItemsById(parseInt(id.id));
  return c.json(successResponse(item));
});


export default app;
