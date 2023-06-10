import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../database/prismaClient'
import { idSchema } from '../database/schemas/idSchema'
import { userSchema } from '../database/schemas/userSchema'
import { hashPassword } from '../utils/password-manager'

export class UserController {
  static async index(request: FastifyRequest, response: FastifyReply) {
    try {
      const users = await prisma.user.findMany()

      return users
    } catch (error) {
      response.code(400).send({ message: error })
    }
  }

  static async create(request: FastifyRequest, response: FastifyReply) {
    const { name, address, cpf, telephone, roleId, email, password } =
      userSchema.parse(request.body)

    const hashedPassword = hashPassword(password)

    try {
      const user = await prisma.user.create({
        data: {
          name,
          address,
          cpf,
          telephone,
          password: hashedPassword,
          email,
          roleId,
        },
      })

      return response.code(200).send(user)
    } catch (error) {
      console.log(error)

      response.code(400).send({ message: error })
    }
  }

  static async show(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      await request.jwtVerify()

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      })

      return user
    } catch (error) {
      response.code(400).send({ message: error })
    }
  }

  static async update(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    const { name, address, cpf, telephone, roleId } = userSchema.parse(
      request.body,
    )

    try {
      await request.jwtVerify()

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

  static async delete(request: FastifyRequest, response: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      await request.jwtVerify()

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
