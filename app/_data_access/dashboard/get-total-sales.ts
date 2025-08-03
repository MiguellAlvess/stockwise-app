import 'server-only'

import { db } from '@/app/_lib/prisma'

export const getTotalSales = async (): Promise<number> => {
  return db.sale.count()
}
