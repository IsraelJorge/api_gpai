import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../data/prismaClient'

export class Role {
  async index(request: FastifyRequest, response: FastifyReply) {
    try {
      const roles = await prisma.role.findMany()

      return roles
    } catch (error) {
      console.log(error)
      response.code(500).send(error)
    }
  }
}

export const RoleController = new Role()
