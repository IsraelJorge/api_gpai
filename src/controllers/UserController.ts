import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../data/prismaClient'
import { idSchema } from '../data/schemas/idSchema'
import { userSchema } from '../data/schemas/userSchema'

export class User {
  async index(request: FastifyRequest, response: FastifyReply) {
    try {
      const users = await prisma.user.findMany()

      return users
    } catch (error) {
      return response.code(500).send(error)
    }
  }

  async create(request: FastifyRequest, response: FastifyReply) {
    const { name, address, cpf, telephone, roleId } = userSchema.parse(
      request.body,
    )

    try {
      const user = await prisma.user.create({
        data: {
          name,
          address,
          cpf,
          telephone,
          roleId,
        },
      })

      return response.code(200).send(user)
    } catch (error) {
      console.log(error)

      response.code(500).send(error)
    }
  }

  async show(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      })

      return user
    } catch (error) {
      response.code(500).send(error)
    }
  }

  async update(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    const { name, address, cpf, telephone, roleId } = userSchema.parse(
      request.body,
    )

    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: { name, address, cpf, roleId, telephone },
      })

      return user
    } catch (error) {
      response.code(500).send(error)
    }
  }

  async delete(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      })

      return user
    } catch (error) {
      response.code(500).send(error)
    }
  }
}

export const UserController = new User()
