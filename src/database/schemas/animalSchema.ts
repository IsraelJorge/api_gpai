import { any, z } from 'zod'

export const animalSchema = z.object({
  name: z.string().min(3).nonempty(),
  specie: z.string().min(3).nonempty(),
  race: z.string().nonempty(),
  stature: z.string().min(6).nonempty(),
  sex: z.string().nonempty(),
  dateBirth: z.string().nonempty(),
  description: z.string().nonempty(),
  disability: z
    .string()
    .transform((value) => value === '1' || value === 'true'),
  vaccinated: z
    .string()
    .transform((value) => value === '1' || value === 'true'),
  disease: z.string().transform((value) => value === '1' || value === 'true'),
  disabilityDescription: z.string().nullable().default(null),
  diseaseDescription: z.string().nullable().default(null),
  userId: z.string().transform(Number),
  photoFiles: any().array(),
})

export type Animal = z.infer<typeof animalSchema>
