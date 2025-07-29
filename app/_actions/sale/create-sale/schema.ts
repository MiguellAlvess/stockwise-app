import { z } from 'zod'

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive({
        message: 'A quantidade tem que ser maior que zero',
      }),
    }),
  ),
})

export type CreateSaleSchema = z.infer<typeof createSaleSchema>
