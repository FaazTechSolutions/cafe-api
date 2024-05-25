import { Hono } from 'hono'
import { Env } from '../env'
import { errorHandler } from './middleware/errorHandler';
const appHono = new Hono<{Bindings:Env}>()

appHono.use('*', errorHandler); 

export default appHono