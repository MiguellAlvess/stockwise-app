import { db } from '@/app/_lib/prisma'

interface DashboardDto {
  totalRevenue: number
  todayRevenue: number
  totalSales: number
  totalStock: number
  totalProducts: number
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const totalRevenuePromise = db.saleProduct.aggregate({
    _sum: {
      unitPrice: true,
    },
  })
  const todayRevenuePromise = await db.saleProduct.aggregate({
    _sum: {
      unitPrice: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  })
  const totalSalesPromise = db.sale.count()
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  })
  const totalProductsPromise = db.product.count()

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalProductsPromise,
    ])
  return {
    totalRevenue: Number(totalRevenue._sum.unitPrice),
    todayRevenue: Number(todayRevenue._sum.unitPrice),
    totalSales,
    totalStock: totalStock._sum.stock ?? 0,
    totalProducts,
  }
}
