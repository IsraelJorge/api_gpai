import fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/authRoutes'
import { roleRoutes } from './routes/roleRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: '3523ffkrvngknwgiuigjwpf,bw.dçf.wv45&65$gfdvmdk',
})

app.register(authRoutes)
app.register(roleRoutes)
app.register(userRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
