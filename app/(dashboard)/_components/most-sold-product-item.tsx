import { formatCurrency } from '@/app/_helpers/currency'
import StockStatusBadge from '@/app/_components/stock-status-badge'
import { MostSoldProductDto } from '@/app/_data_access/dashboard/get-most-sold-products'

interface MostSoldProductItemProps {
  product: MostSoldProductDto
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
  const statusVariant =
    product.status === 'IN_STOCK' ? 'in_stock' : 'out_of_stock'
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[6px]">
        <StockStatusBadge variant={statusVariant} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(Number(product.price))}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">{product.totalSold} vendido(s)</p>
      </div>
    </div>
  )
}
export const MostSoldProductItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <div className="space-y-2">
        <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[105px] rounded-md bg-gray-200" />
      </div>
      <div>
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
      </div>
    </div>
  )
}
export default MostSoldProductItem
