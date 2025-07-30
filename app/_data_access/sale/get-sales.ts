import 'server-only'

import { db } from '@/app/_lib/prisma'

export interface SaleDto {
  id: string
  productNames: string
  totalProducts: number
  totalAmount: number
  date: Date
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products.map((p) => p.product.name).join(' + '),
    totalProducts: sale.products.reduce((acc, p) => acc + p.quantity, 0),
    totalAmount: sale.products.reduce((acc, p) => {
      return acc + Number(p.unitPrice) * p.quantity
    }, 0),
  }))
}
