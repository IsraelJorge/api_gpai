import { FastifyRequest } from 'fastify'

import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { extname, resolve } from 'node:path'

export async function genereteUrlFile(file: any, request: FastifyRequest) {
  if (!file) {
    throw new Error('Arquivo não encontrado.')
  }

  const regexMimetype = /^image\/(jpeg|png|webp)$/

  const isValidFileFormat = regexMimetype.test(file.mimetype)

  if (!isValidFileFormat) {
    throw new Error('Arquivo enviado não é uma imagem')
  }

  const fileId = randomUUID()
  const extension = extname(file.filename)

  const fileName = fileId.concat(extension)

  try {
    await fs.promises.writeFile(
      resolve(__dirname, '../../uploads/', fileName),
      file.data as any,
    )

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return fileUrl
  } catch (error) {
    throw new Error('Erro ao salvar arquivo')
  }
}
