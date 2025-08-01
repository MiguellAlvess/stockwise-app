import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'
import { ComboboxOption } from '../_components/ui/combobox'
import { DataTable } from '../_components/ui/data-table'
import { getProducts } from '../_data_access/product/get-products'
import { getSales } from '../_data_access/sale/get-sales'
import UpsertSaleButton from './_components/create-sale-button'
import { saleTableColumns } from './_components/table-columns'

const SalesPage = async () => {
  const sales = await getSales()
  const products = await getProducts()
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))
  const tableData = sales.map((sale) => ({
    ...sale,
    catalogProducts: products,
    productOptions,
  }))
  return (
    <div className="w-full space-y-8 p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <UpsertSaleButton
            productOptions={productOptions}
            products={products}
          />
        </HeaderRight>
      </Header>
      <DataTable
        columns={saleTableColumns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
    </div>
  )
}

export default SalesPage
