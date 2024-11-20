export const mockData = {
  kpiData: {
    totalRevenue: 1234567,
    successfulTransactions: 1543,
    refundRate: 2.3,
    averageTicket: 804,
  },
  
  chartData: [
    { date: '2024-03-01', amount: 45000 },
    { date: '2024-03-02', amount: 52000 },
    { date: '2024-03-03', amount: 49000 },
    { date: '2024-03-04', amount: 63000 },
    { date: '2024-03-05', amount: 58000 },
    { date: '2024-03-06', amount: 71000 },
    { date: '2024-03-07', amount: 68000 },
  ],

  recentTransactions: Array.from({ length: 50 }, (_, i) => ({
    id: `TRX-${String(i + 1).padStart(3, '0')}`,
    amount: Math.floor(Math.random() * 10000) / 100,
    currency: 'TRY',
    status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
    date: new Date(2024, 2, 7, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toISOString(),
    transactionType: ['sale', 'preauth', 'refund', 'cancel', 'capture'][Math.floor(Math.random() * 5)],
    paymentMethod: 'Kredi Kartı',
    customerName: ['Ahmet Yılmaz', 'Mehmet Demir', 'Ayşe Kaya', 'Fatma Şahin'][Math.floor(Math.random() * 4)],
    cardNumber: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000),
    description: 'Test transaction',
    authCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    referenceNo: 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  })),

  bankTransactionData: [
    {
      bankName: 'Garanti',
      successAmount: 250000,
      successCount: 450,
      secure3D: 380,
      nonSecure: 70,
      failAmount: 15000,
      failCount: 25,
    },
    {
      bankName: 'Yapı Kredi',
      successAmount: 180000,
      successCount: 320,
      secure3D: 290,
      nonSecure: 30,
      failAmount: 12000,
      failCount: 18,
    },
    {
      bankName: 'İş Bankası',
      successAmount: 210000,
      successCount: 380,
      secure3D: 340,
      nonSecure: 40,
      failAmount: 18000,
      failCount: 28,
    },
  ],

  errorCodeData: [
    { code: 'E001', description: 'Yetersiz Bakiye', count: 45 },
    { code: 'E002', description: 'Kart Limiti Yetersiz', count: 32 },
    { code: 'E003', description: 'Güvenlik Doğrulaması Başarısız', count: 28 },
    { code: 'E004', description: 'Geçersiz Kart', count: 15 },
    { code: 'E005', description: 'Diğer', count: 10 },
  ],

  paymentChannelData: [
    { channel: 'Kredi Kartı', successCount: 850, failCount: 50 },
    { channel: 'Ödeme Linki', successCount: 420, failCount: 30 },
    { channel: 'Parçalı Ödeme', successCount: 380, failCount: 25 },
  ],

  hourlyTransactionData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 100) + 20,
    amount: (Math.floor(Math.random() * 100) + 20) * 1000,
  })),
};