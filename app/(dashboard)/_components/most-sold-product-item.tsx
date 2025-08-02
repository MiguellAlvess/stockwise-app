import { MostSoldProductDto } from '@/app/_data_access/dashboard/get-dashboard'
import { formatCurrency } from '@/app/_helpers/currency'
import StockStatusBadge from '@/app/_components/stock-status-badge'

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

export default MostSoldProductItem
