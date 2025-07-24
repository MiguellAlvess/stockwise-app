import { DataTable } from '../_components/ui/data-table'
import { productTableColumns } from './_components/table-columns'
import { getProducts } from '../_data_access/product/get-products'

import AddProductButton from './_components/add-product-button'

const ProductsPage = async () => {
  const products = await getProducts()
  return (
    <div className="w-full space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <AddProductButton />
      </div>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  )
}

export default ProductsPage
