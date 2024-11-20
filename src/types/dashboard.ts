export interface KPIData {
  totalRevenue: number;
  successfulTransactions: number;
  refundRate: number;
  averageTicket: number;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  transactionType: 'sale' | 'preauth' | 'refund' | 'cancel' | 'capture';
  paymentMethod: string;
}

export interface ChartData {
  date: string;
  amount: number;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export interface BankTransactionData {
  bankName: string;
  successAmount: number;
  successCount: number;
  secure3D: number;
  nonSecure: number;
  failAmount: number;
  failCount: number;
}

export interface ErrorCodeData {
  code: string;
  description: string;
  count: number;
}

export interface PaymentChannelData {
  channel: string;
  successCount: number;
  failCount: number;
}

export interface HourlyTransactionData {
  hour: number;
  count: number;
  amount: number;
}