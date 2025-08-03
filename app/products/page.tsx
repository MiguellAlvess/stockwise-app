import { DataTable } from '../_components/ui/data-table'
import { productTableColumns } from './_components/table-columns'
import { getProducts } from '../_data_access/product/get-products'
import CreateProductButton from './_components/create-product-button'
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'

const ProductsPage = async () => {
  const products = await getProducts()
  return (
    <div className="w-full space-y-8 overflow-auto p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  )
}

export default ProductsPage
