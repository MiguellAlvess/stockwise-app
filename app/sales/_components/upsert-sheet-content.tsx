'use client'

import { Button } from '@/app/_components/ui/button'
import { Combobox, ComboboxOption } from '@/app/_components/ui/combobox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { formatCurrency } from '@/app/_helpers/currency'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UpsertSaleTableDropdownMenu from './upsert-table-dropdown-menu'
import { upsertSale } from '@/app/_actions/sale/upsert-sale'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { flattenValidationErrors } from 'next-safe-action'
import { Product } from '@prisma/client'

const formSchema = z.object({
  productId: z.string().uuid({
    message: 'O produto é obrigatório',
  }),
  quantity: z.coerce.number().int().positive({
    message: 'A quantidade tem que ser maior que zero',
  }),
})

type FormSchema = z.infer<typeof formSchema>

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

interface UpsertSheetContentProps {
  saleId?: string
  products: Product[]
  productOptions: ComboboxOption[]
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>
  defaultSelectedProducts?: SelectedProduct[]
}

const UpsertSheetContent = ({
  saleId,
  productOptions,
  products,
  setSheetIsOpen,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>(
    defaultSelectedProducts ?? [],
  )
  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    },
    onSuccess: () => {
      toast.success('Venda criada com sucesso')
      setSheetIsOpen(false)
    },
  })
  const form = useForm<FormSchema>({
    // @ts-expect-error - resolver is defined
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })
  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    )
    if (!selectedProduct) return
    setSelectedProduct((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      )
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock
        if (productIsOutOfStock) {
          form.setError('quantity', {
            message: 'Quantidade indisponível em estoque.',
          })
          return currentProducts
        }
        form.reset()
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            }
          }
          return product
        })
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock
      if (productIsOutOfStock) {
        form.setError('quantity', {
          message: 'Quantidade indisponível em estoque',
        })
        return currentProducts
      }
      form.reset()
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]
    })
  }

  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
  }, [selectedProduct])

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProduct) => {
      return currentProduct.filter((product) => product.id !== productId)
    })
  }
  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    })
  }
  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        {/* @ts-expect-error - onSubmit is defined */}
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            // @ts-expect-error - control is defined
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione um produto"
                    options={productOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // @ts-expect-error - control is defined
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista dos produtos adicionados a venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSaleTableDropdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter className="pt-6">
        <Button
          className="w-full gap-2"
          disabled={selectedProduct.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

export default UpsertSheetContent
