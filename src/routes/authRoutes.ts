import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    // const bodySchema = z.object({
    //   code: z.string(),
    // })
  })
}
