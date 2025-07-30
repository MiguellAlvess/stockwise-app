'use client'

import { SaleDto } from '@/app/_data_access/sale/get-sales'
import { formatCurrency } from '@/app/_helpers/currency'
import { ColumnDef } from '@tanstack/react-table'

import SaleTableDropdownMenu from './table-dropdown-menu'

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: 'productNames',
    header: 'Produtos',
  },
  {
    accessorKey: 'totalProducts',
    header: 'Quantidade de produtos',
  },
  {
    header: 'Valor total',
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: 'Data',
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString('pt-BR'),
  },
  {
    header: 'Ações',
    cell: ({ row: { original: sale } }) => (
      <SaleTableDropdownMenu sale={sale} />
    ),
  },
]
