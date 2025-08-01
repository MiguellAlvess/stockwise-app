import {
  CircleDollarSignIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from 'lucide-react'
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './_components/summary-card'
import { getDashboard } from '../_data_access/dashboard/get-dashboard'
import { formatCurrency } from '../_helpers/currency'

const Home = async () => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
    await getDashboard()
  return (
    <div className="m-8 w-full space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Métricas comerciais</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita total</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita hoje</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>
    </div>
  )
}

export default Home
