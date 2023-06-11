import { FastifyInstance } from 'fastify'

import { UploadFileController } from '../controllers/UploadFileController'

async function uploadFileRoutes(app: FastifyInstance) {
  app.post('/upload', UploadFileController.upload)
}

export { uploadFileRoutes }
