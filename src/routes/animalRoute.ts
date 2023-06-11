import { FastifyInstance } from 'fastify'

import { AnimalController } from '../controllers/AnimalController'

async function animalRoutes(app: FastifyInstance) {
  app.get('/animal', AnimalController.index)
  app.post('/animal', AnimalController.create)
  app.get('/animal/:id', AnimalController.show)
  app.put('/animal/:id', AnimalController.update)
  app.delete('/animal/:id', AnimalController.delete)
}

export { animalRoutes }
