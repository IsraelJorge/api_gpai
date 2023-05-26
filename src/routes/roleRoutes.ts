import { FastifyInstance } from 'fastify'

import { RoleController } from '../controllers/RoleController'

async function roleRoutes(app: FastifyInstance) {
  app.get('/roles', RoleController.index)
}

export { roleRoutes }
