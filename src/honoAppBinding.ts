import { Hono } from 'hono'
import { Env } from '../env'
const appHono = new Hono<{Bindings:Env}>()

export default appHono