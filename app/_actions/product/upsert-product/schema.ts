import { z } from 'zod'

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'O nome do produto é obrigatório',
  }),
  price: z.number().min(0.01, {
    message: 'O valor do produto deve ser maior que zero',
  }),
  stock: z.coerce.number().int().min(0, {
    message: 'A quantidade do estoque tem que ser maior que zero',
  }),
})

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>
