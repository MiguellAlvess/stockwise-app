'use server'

import { db } from '@/app/_lib/prisma'
import { upsertSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { actionClient } from '@/app/_lib/safe-action'

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id)

    await db.$transaction(async (trx) => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { products: true },
        })

        if (!existingSale) {
          throw new Error('Sale not found for update.')
        }

        await trx.sale.delete({
          where: { id },
        })

        for (const product of existingSale.products) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          })
        }
      }
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      })
      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: { id: product.id },
        })
        if (!productFromDb) {
          throw new Error(`Product with ID ${product.id} not found.`)
        }
        if (product.quantity > productFromDb.stock) {
          throw new Error(
            `Insufficient stock for product "${productFromDb.name}".`,
          )
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        })
        await trx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        })
      }
    })
    revalidatePath('/products')
    revalidatePath('/sales')
    revalidatePath('/')
  })
