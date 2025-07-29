import { Button } from '../_components/ui/button'
import { ComboboxOption } from '../_components/ui/combobox'
import { Sheet, SheetTrigger } from '../_components/ui/sheet'
import { getProducts } from '../_data_access/product/get-products'
import UpsertSheetContent from './_components/upsert-sheet-content'

const SalesPage = async () => {
  const products = await getProducts()
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))
  return (
    <div className="w-full space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova venda</Button>
          </SheetTrigger>
          <UpsertSheetContent
            productOptions={productOptions}
            products={products}
          />
        </Sheet>
      </div>
      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  )
}

export default SalesPage
