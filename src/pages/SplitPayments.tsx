import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

interface SplitPayment {
  id: string;
  orderNumber: string;
  totalAmount: number;
  installments: number;
  customerName: string;
  status: 'active' | 'completed' | 'cancelled';
  nextPayment: string;
}

const splitPayments: SplitPayment[] = [
  {
    id: '1',
    orderNumber: 'SPL-2024-001',
    totalAmount: 1200,
    installments: 3,
    customerName: 'Ali Yılmaz',
    status: 'active',
    nextPayment: '2024-04-01',
  },
  {
    id: '2',
    orderNumber: 'SPL-2024-002',
    totalAmount: 2400,
    installments: 6,
    customerName: 'Ayşe Demir',
    status: 'active',
    nextPayment: '2024-03-15',
  },
  {
    id: '3',
    orderNumber: 'SPL-2024-003',
    totalAmount: 900,
    installments: 3,
    customerName: 'Mehmet Kaya',
    status: 'completed',
    nextPayment: '-',
  },
];

const SplitPayments: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [installmentFilter, setInstallmentFilter] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
    console.log('Search:', { dateRange, searchTerm, statusFilter, installmentFilter });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Parçalı Ödemeler</h1>
        <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
          <Plus className="w-5 h-5 mr-2" />
          Yeni Parçalı Ödeme
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bitiş Tarihi
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durum
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="completed">Tamamlandı</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Taksit Sayısı
            </label>
            <select
              value={installmentFilter}
              onChange={(e) => setInstallmentFilter(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="2">2 Taksit</option>
              <option value="3">3 Taksit</option>
              <option value="4">4 Taksit</option>
              <option value="5">5 Taksit</option>
              <option value="6">6 Taksit</option>
              <option value="7">7 Taksit</option>
              <option value="8">8 Taksit</option>
              <option value="9">9 Taksit</option>
              <option value="10">10 Taksit</option>
              <option value="11">11 Taksit</option>
              <option value="12">12 Taksit</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arama
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sipariş no veya müşteri adı"
                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Split Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sipariş No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Toplam Tutar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Taksit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sonraki Ödeme
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {splitPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {payment.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {payment.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    }).format(payment.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {payment.installments} Taksit
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {payment.nextPayment === '-'
                      ? '-'
                      : new Date(payment.nextPayment).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'completed'
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status === 'active'
                        ? 'Aktif'
                        : payment.status === 'completed'
                        ? 'Tamamlandı'
                        : 'İptal Edildi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SplitPayments;