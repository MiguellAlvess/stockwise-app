import { getTotalRevenue } from '@/app/_data_access/dashboard/get-total-revenue'
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { formatCurrency } from '@/app/_helpers/currency'
import { DollarSignIcon } from 'lucide-react'

const TotalRevenueCard = async () => {
  const totalRevenue = await getTotalRevenue()
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita total</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  )
}

export default TotalRevenueCard
