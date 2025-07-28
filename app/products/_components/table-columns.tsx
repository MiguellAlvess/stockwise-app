'use client'

import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import StockStatusBadge from './stock-status-badge'
import ProductTableDropdownMenu from './table-dropdown-menu'

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: (row) => {
      const product = row.row.original
      return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(Number(product.price))
    },
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
        // @ts-expect-error - status is string
        product.status === 'IN_STOCK' ? 'in_stock' : 'out_of_stock'

      return <StockStatusBadge variant={badgeVariant} />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
  },
]
