import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../database/prismaClient'
import { Animal, animalSchema } from '../database/schemas/animalSchema'
import { idSchema } from '../database/schemas/idSchema'
import { genereteUrlFile } from '../utils/genereteUrlFile'

export class AnimalController {
  static async index(request: FastifyRequest, reply: FastifyReply) {
    try {
      const animals = await prisma.animal.findMany({
        orderBy: {
          craetedAt: 'desc',
        },
        include: {
          images: true,
        },
      })

      return animals
    } catch (error) {
      reply.code(400).send({ message: error })
    }
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const dataAnimal = animalSchema.parse(request.body)

    const { photoFiles } = dataAnimal

    const urlPhotos = []

    for await (const photo of photoFiles) {
      const url = await genereteUrlFile(photo, request)

      urlPhotos.push(url)
    }

    const data = { ...dataAnimal } as Partial<Pick<Animal, 'photoFiles'>> &
      Omit<Animal, 'photoFiles'>

    delete data.photoFiles

    try {
      const animal = await prisma.animal.create({
        data: {
          ...data,
          images: {
            create: {
              urls: urlPhotos.toString(),
            },
          },
        },
      })

      return reply.code(200).send(animal)
    } catch (error) {
      console.log(error)

      reply.code(400).send({ message: error })
    }
  }

  static async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      const animal = await prisma.animal.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          images: true,
          user: {
            select: {
              id: true,
              name: true,
              address: true,
              telephone: true,
            },
          },
        },
      })

      return animal
    } catch (error) {
      reply.code(400).send({ message: error })
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    const dataAnimal = animalSchema.parse(request.body)

    const data = { ...dataAnimal } as Partial<Pick<Animal, 'photoFiles'>> &
      Omit<Animal, 'photoFiles'>

    delete data.photoFiles

    try {
      await request.jwtVerify()

      const animal = await prisma.animal.update({
        where: {
          id,
        },
        data,
      })

      return animal
    } catch (error) {
      reply.code(500).send(error)
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params)

    try {
      await request.jwtVerify()

      const animal = await prisma.animal.delete({
        where: {
          id,
        },
      })

      return animal
    } catch (error) {
      reply.code(500).send(error)
    }
  }
}
