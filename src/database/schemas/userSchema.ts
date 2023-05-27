import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(3).nonempty(),
  address: z.string().min(3).nonempty(),
  cpf: z.string().nonempty(),
  password: z.string().min(6).nonempty(),
  email: z.string().email().nonempty(),
  telephone: z.string().nonempty(),
  roleId: z.number().int(),
})
