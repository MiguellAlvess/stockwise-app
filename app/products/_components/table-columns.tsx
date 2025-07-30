'use client'

import { ColumnDef } from '@tanstack/react-table'
import StockStatusBadge from './stock-status-badge'
import ProductTableDropdownMenu from './table-dropdown-menu'
import { ProductDto } from '@/app/_data_access/product/get-products'

export const productTableColumns: ColumnDef<ProductDto>[] = [
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
