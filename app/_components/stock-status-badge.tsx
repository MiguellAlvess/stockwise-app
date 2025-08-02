import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const variants = cva(
  'flex w-fit items-center gap-1.5 rounded-full px-2 py-[2px] text-xs font-bold',
  {
    variants: {
      variant: {
        in_stock: 'bg-green-100 text-green-800 fill-green-800',
        out_of_stock: 'bg-red-100 text-red-800 fill-red-800',
      },
    },
  },
)

type StockSatusBadgeProps = {
  variant: 'in_stock' | 'out_of_stock'
}

const getStatusLabel = (variant: 'in_stock' | 'out_of_stock') => {
  return variant === 'in_stock' ? 'Em estoque' : 'Sem estoque'
}

const StockStatusBadge = ({ variant }: StockSatusBadgeProps) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getStatusLabel(variant)}
    </div>
  )
}

export default StockStatusBadge
