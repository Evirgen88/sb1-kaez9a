import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DashboardLayout, defaultLayouts } from '../components/dashboard/DashboardLayout';
import KPICard from '../components/dashboard/KPICard';
import TransactionChart from '../components/dashboard/TransactionChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BankTransactions from '../components/dashboard/BankTransactions';
import SecureTransactions from '../components/dashboard/SecureTransactions';
import ErrorDistribution from '../components/dashboard/ErrorDistribution';
import PaymentChannels from '../components/dashboard/PaymentChannels';
import HourlyDistribution from '../components/dashboard/HourlyDistribution';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import { DollarSign, CreditCard, RefreshCcw, TrendingUp } from 'lucide-react';
import { mockData } from '../data/mockData';

function Dashboard() {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('24h');
  const [startDate, setStartDate] = useState('2024-03-01');
  const [endDate, setEndDate] = useState('2024-03-07');
  const [layouts, setLayouts] = useState(() => {
    try {
      const savedLayouts = localStorage.getItem('dashboardLayouts');
      return savedLayouts ? JSON.parse(savedLayouts) : defaultLayouts;
    } catch (e) {
      console.error('Error loading saved layouts:', e);
      return defaultLayouts;
    }
  });

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    try {
      setLayouts(allLayouts);
      localStorage.setItem('dashboardLayouts', JSON.stringify(allLayouts));
    } catch (e) {
      console.error('Error saving layouts:', e);
    }
  };

  // KPI kartları için Türkçe başlıklar
  const kpiTitles = {
    totalRevenue: 'Toplam Ciro',
    successfulTransactions: 'Başarılı İşlem',
    refundRate: 'İade Oranı',
    averageTicket: 'Ortalama Sepet',
  };

  return (
    <div className="space-y-6">
      <DateRangeFilter
        range={dateRange}
        startDate={startDate}
        endDate={endDate}
        onRangeChange={setDateRange}
        onCustomDateChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />

      <DashboardLayout layouts={layouts} onLayoutChange={handleLayoutChange}>
        <div key="kpi-revenue" className="h-full">
          <KPICard
            title={kpiTitles.totalRevenue}
            value={new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            }).format(mockData.kpiData.totalRevenue)}
            change={12.5}
            icon={<DollarSign className="w-6 h-6 text-primary-500" />}
          />
        </div>
        <div key="kpi-transactions" className="h-full">
          <KPICard
            title={kpiTitles.successfulTransactions}
            value={mockData.kpiData.successfulTransactions}
            change={8.2}
            icon={<CreditCard className="w-6 h-6 text-primary-500" />}
          />
        </div>
        <div key="kpi-refund" className="h-full">
          <KPICard
            title={kpiTitles.refundRate}
            value={`${mockData.kpiData.refundRate}%`}
            change={-0.8}
            icon={<RefreshCcw className="w-6 h-6 text-primary-500" />}
          />
        </div>
        <div key="kpi-average" className="h-full">
          <KPICard
            title={kpiTitles.averageTicket}
            value={new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            }).format(mockData.kpiData.averageTicket)}
            change={5.3}
            icon={<TrendingUp className="w-6 h-6 text-primary-500" />}
          />
        </div>
        <div key="transaction-chart" className="h-full">
          <TransactionChart data={mockData.chartData} />
        </div>
        <div key="recent-transactions" className="h-full">
          <RecentTransactions transactions={mockData.recentTransactions} />
        </div>
        <div key="bank-transactions" className="h-full">
          <BankTransactions data={mockData.bankTransactionData} />
        </div>
        <div key="secure-transactions" className="h-full">
          <SecureTransactions data={mockData.bankTransactionData} />
        </div>
        <div key="error-distribution" className="h-full">
          <ErrorDistribution data={mockData.errorCodeData} />
        </div>
        <div key="payment-channels" className="h-full">
          <PaymentChannels data={mockData.paymentChannelData} />
        </div>
        <div key="hourly-distribution" className="h-full">
          <HourlyDistribution data={mockData.hourlyTransactionData} />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;