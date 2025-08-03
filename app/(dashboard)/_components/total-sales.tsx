import { CircleDollarSignIcon } from 'lucide-react'
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { getTotalSales } from '@/app/_data_access/dashboard/get-total-sales'

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales()
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Vendas totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  )
}

export default TotalSalesCard
