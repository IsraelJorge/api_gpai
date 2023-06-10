import { FastifyReply, FastifyRequest } from 'fastify'

import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export class UploadFileController {
  static async upload(request: FastifyRequest, reply: FastifyReply) {
    const upload = await request.file()

    if (!upload) {
      return reply.code(400).send()
    }

    const regexMimetype = /^image\/(jpeg|png|webp)$/

    const isValidFileFormat = regexMimetype.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply
        .code(400)
        .send({ message: 'Arquivo enviado não é uma imagem' })
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return reply.code(200).send({ fileUrl })
  }
}
