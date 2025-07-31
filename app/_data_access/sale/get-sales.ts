import 'server-only'

import { db } from '@/app/_lib/prisma'

interface SaleProductDto {
  productId: string
  unitPrice: number
  quantity: number
  productName: string
}

export interface SaleDto {
  id: string
  productNames: string
  totalProducts: number
  totalAmount: number
  date: Date
  products: SaleProductDto[]
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
    products: sale.products.map(
      (p): SaleProductDto => ({
        productId: p.productId,
        unitPrice: Number(p.unitPrice),
        quantity: p.quantity,
        productName: p.product.name,
      }),
    ),
  }))
}
