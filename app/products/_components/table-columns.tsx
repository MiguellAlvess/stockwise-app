'use client'

import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import StockStatusBadge from './stock-status-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { Button } from '@/app/_components/ui/button'
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import DeleteProductDialogContent from './delete-dialog-content'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import UpsertProductDialogContent from './upsert-product-dialog'
import { useState } from 'react'

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
        // @ts-expect-error - status is string
        product.status === 'IN_STOCK' ? 'in_stock' : 'out_of_stock'

      return <StockStatusBadge variant={badgeVariant} />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: (row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
      const product = row.row.original
      return (
        <AlertDialog>
          <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-1.5"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
              }}
              onSuccess={() => setEditDialogIsOpen(false)}
            />
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      )
    },
  },
]
