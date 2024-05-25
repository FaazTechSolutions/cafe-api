import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono'
import locationController from './controller/locationController';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../env';
import { LocationRepository } from './repository/LocationRepository';
import appHono from './honoAppBinding';
import ItemsController from './controller/ItemsController';
import orderController from './controller/orderController';




// const app = new OpenAPIHono<{Bindings:Env}>()
// app.doc("/doc", {
//   openapi: "3.0.0",
//   info: {
//       version: "1.0.0",
//       title: "My API",
//   },
// });
// app.get('/ui',swaggerUI({url:'/doc'}))
//const app = new Hono<{Bindings:Env}>()
appHono.get('/', (c) => {  
  return c.text('Hello Hono! with me')
})

appHono.route('/api',locationController)
appHono.route('/api',ItemsController)
appHono.route('/api',orderController)


export default appHono
