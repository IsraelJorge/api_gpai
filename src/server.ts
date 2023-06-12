import fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'

import { animalRoutes } from './routes/animalRoute'
import { authRoutes } from './routes/authRoutes'
import { roleRoutes } from './routes/roleRoutes'
import { uploadFileRoutes } from './routes/uploadFileRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(multipart, {
  addToBody: true,
  attachFieldsToBody: true,
  limits: {
    fileSize: 10_485_760, // 10MB
  },
})
app.register(require('@fastify/formbody'))
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(jwt, {
  secret: '3523ffkrvngknwgiuigjwpf,bw.dçf.wv45&65$gfdvmdk',
})

app.register(authRoutes)
app.register(roleRoutes)
app.register(userRoutes)
app.register(animalRoutes)
app.register(uploadFileRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
