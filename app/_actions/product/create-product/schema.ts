import z from 'zod'

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome do produto é obrigatorio',
  }),
  price: z.number().min(0.01, {
    message: 'O valor do produto deve ser maior que zero',
  }),
  stock: z.coerce.number().int().min(0, {
    message: 'A quantidade do estoque tem que ser maior que zero',
  }),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
