import { z } from 'zod'

export const authSchema = z.object({
  password: z.string().min(6).nonempty(),
  email: z.string().email().nonempty(),
})
