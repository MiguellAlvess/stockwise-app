import { PackageIcon } from 'lucide-react'
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { getTotalInStock } from '@/app/_data_access/dashboard/get-total-in-stock'

const TotalInStockCard = async () => {
  const totalStock = await getTotalInStock()
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  )
}

export default TotalInStockCard
