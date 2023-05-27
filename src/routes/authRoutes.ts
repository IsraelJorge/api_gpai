import { FastifyInstance } from 'fastify'

import { prisma } from '../database/prismaClient'
import { authSchema } from '../database/schemas/authSchema'
import { matchPassword } from '../utils/password-manager'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, response) => {
    const { email, password } = authSchema.parse(request.body)

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      })

      if (!user) {
        return response.code(401).send({ message: 'user not found' })
      }

      const isPasswordCorrect = matchPassword(password, user.password)

      if (!isPasswordCorrect) {
        return response
          .code(401)
          .send({ message: 'incorrect email or password' })
      }

      const token = app.jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        {
          sub: user.id.toString(),
          expiresIn: '30 days',
        },
      )

      return response.code(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      })
    } catch (error) {
      return response.code(400).send({ message: error })
    }
  })
}
