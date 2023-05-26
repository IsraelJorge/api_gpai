import { FastifyInstance } from 'fastify'

import { UserController } from '../controllers/UserController'

async function userRoutes(app: FastifyInstance) {
  app.get('/user', UserController.index)
  app.post('/user', UserController.create)
  app.get('/user/:id', UserController.show)
  app.put('/user/:id', UserController.update)
  app.delete('/user/:id', UserController.delete)
}

export { userRoutes }
