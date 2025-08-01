'use client'

import { SaleDto } from '@/app/_data_access/sale/get-sales'
import { formatCurrency } from '@/app/_helpers/currency'
import { ColumnDef } from '@tanstack/react-table'

import SaleTableDropdownMenu from './table-dropdown-menu'
import { ProductDto } from '@/app/_data_access/product/get-products'
import { ComboboxOption } from '@/app/_components/ui/combobox'

interface SaleTableColumn extends SaleDto {
  catalogProducts: ProductDto[]
  productOptions: ComboboxOption[]
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
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
      <SaleTableDropdownMenu
        sale={{ id: sale.id, products: sale.products }}
        products={sale.catalogProducts}
        productOptions={sale.productOptions}
      />
    ),
  },
]
