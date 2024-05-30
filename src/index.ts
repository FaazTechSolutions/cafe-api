import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import locationController from './controller/locationController';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../env';
import appHono from './honoAppBinding';
import ItemsController from './controller/ItemsController';
import orderController from './controller/orderController';
import authController from './controller/authController';
import employeeController from './controller/employeeCotroller';
import organizationController from './controller/organizationController'
import userController from './controller/userController'
import { authenticateJWT } from './middleware/authenticateJWT';


appHono.use('/api/*',cors())
appHono.use('/auth/*',authenticateJWT);
//
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

appHono.route('/api',authController)
appHono.route('/api/auth',locationController)
appHono.route('/api',ItemsController)
appHono.route('/api',orderController)
appHono.route('/api',employeeController)
appHono.route('/api',organizationController)
appHono.route('/api',userController)

export default appHono
