import fastify from 'fastify'

import cors from '@fastify/cors'

import { roleRoutes } from './routes/roleRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(roleRoutes)
app.register(userRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
