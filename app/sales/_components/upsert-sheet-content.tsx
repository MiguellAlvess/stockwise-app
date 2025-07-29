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
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { formatCurrency } from '@/app/_helpers/currency'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  productId: z.string().uuid({
    message: 'O produto é obrigatório',
  }),
  quantity: z.coerce.number().int().positive({
    message: 'A quantidade tem que ser maior que zero',
  }),
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSheetContentProps {
  products: Product[]
  productOptions: ComboboxOption[]
}

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

const UpsertSheetContent = ({
  productOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([])
  const form = useForm<FormSchema>({
    // @ts-expect-error - resolver is defined
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })
  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find((product) => {
      return product.id === data.productId
    })
    if (!selectedProduct) return
    setSelectedProduct((currentProduct) => {
      const existingProuct = currentProduct.find(
        (product) => product.id === selectedProduct.id,
      )
      if (existingProuct) {
        return currentProduct.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            }
          }
          return product
        })
      }
      return [
        ...currentProduct,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]
    })
    form.reset()
  }
  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
  }, [selectedProduct])
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
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SheetContent>
  )
}

export default UpsertSheetContent
