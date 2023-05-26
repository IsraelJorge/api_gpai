import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  cpf: z.string().nonempty(),
  telephone: z.string().nonempty(),
  roleId: z.number().int(),
})
