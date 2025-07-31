import { deleteSale } from '@/app/_actions/sale/delete-sale'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'
import { ComboboxOption } from '@/app/_components/ui/combobox'
import { ProductDto } from '@/app/_data_access/product/get-products'
import { SaleDto } from '@/app/_data_access/sale/get-sales'

interface ProductTableDropdownMenuProps {
  sale: Pick<SaleDto, 'id' | 'products'>
  productOptions: ComboboxOption[]
  products: ProductDto[]
}

const SaleTableDropdownMenu = ({
  sale,
  productOptions,
  products,
}: ProductTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false)
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success('Venda excluida com sucesso')
    },
    onError: () => {
      toast.error('Erro ao excluir venda')
    },
  })
  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id)
    toast.success('ID copiado com sucesso!')
  }
  const handleConfirmDeleteClick = () => {
    executeDeleteSale({ id: sale.id })
  }
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
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
              onClick={handleCopyToClipboardClick}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que quer excluir esta venda?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        setSheetIsOpen={setUpsertSheetIsOpen}
        defaultSelectedProducts={sale.products.map((product) => ({
          id: product.productId,
          quantity: product.quantity,
          name: product.productName,
          price: Number(product.unitPrice),
        }))}
      />
    </Sheet>
  )
}

export default SaleTableDropdownMenu
