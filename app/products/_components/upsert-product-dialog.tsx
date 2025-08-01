import { upsertProduct } from '@/app/_actions/product/upsert-product'
import {
  UpsertProductSchema,
  upsertProductSchema,
} from '@/app/_actions/product/upsert-product/schema'
import { Button } from '@/app/_components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpsertProductDialogContent = ({
  setDialogIsOpen,
  defaultValues,
}: UpsertProductDialogContentProps) => {
  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onSuccess: () => {
      toast.success('Produto salvo com sucesso')
      setDialogIsOpen(false)
    },
    onError: () => {
      toast.error('Erro ao criar produto')
    },
  })
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    // @ts-expect-error - resolver is defined
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: '',
      price: 0,
      stock: 1,
    },
  })

  const onSubmit = (data: UpsertProductSchema) => {
    executeUpsertProduct({ ...data, id: defaultValues?.id })
  }

  const isEditing = !!defaultValues

  return (
    <DialogContent>
      <Form {...form}>
        <form
          // @ts-expect-error - onSubmit is defined
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>
              {isEditing ? 'Editar produto' : 'Criar produto'}
            </DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <FormField
            // @ts-expect-error - control is defined
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // @ts-expect-error - control is defined
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // @ts-expect-error - control is defined
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o estoque do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={18} />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertProductDialogContent
