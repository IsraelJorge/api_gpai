import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../database/prismaClient'

export class RoleController {
  static async index(request: FastifyRequest, response: FastifyReply) {
    try {
      const roles = await prisma.role.findMany()

      return roles
    } catch (error) {
      console.log(error)
      response.code(400).send({ message: error })
    }
  }
}
