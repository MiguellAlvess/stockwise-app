'use client'

import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import StockStatusBadge from './stock-status-badge'

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const product = row.row.original
      const badgeVariant =
        product.status === 'IN_STOCK' ? 'in_stock' : 'out_of_stock'

      return <StockStatusBadge variant={badgeVariant} />
    },
  },
]
