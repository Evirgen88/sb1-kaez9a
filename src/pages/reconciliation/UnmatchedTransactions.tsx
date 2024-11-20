import React, { useState } from 'react';
import { Search, Download, AlertCircle } from 'lucide-react';
import { ReconciliationTransaction } from '../../types/reconciliation';

const mockTransactions: ReconciliationTransaction[] = [
  {
    id: '1',
    orderNumber: 'ORD-003',
    amount: 1750,
    currency: 'TRY',
    customerNumber: 'CUST003',
    transactionDate: '2024-03-07T12:30:00',
    status: 'unmatched',
    mismatchReason: 'Amount mismatch',
    bankReference: 'BNK003',
    bankAmount: 1700,
    bankDate: '2024-03-07T12:31:00',
  },
  {
    id: '2',
    orderNumber: 'ORD-004',
    amount: 3000,
    currency: 'TRY',
    customerNumber: 'CUST004',
    transactionDate: '2024-03-07T13:15:00',
    status: 'unmatched',
    mismatchReason: 'Transaction not found in bank file',
  },
];

function UnmatchedTransactions() {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
    console.log('Search:', { dateRange, searchTerm });
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting unmatched transactions');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Eşleşmeyen İşlemler</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Download className="w-5 h-5 mr-2" />
          Dışa Aktar
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              Arama
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sipariş no veya müşteri no"
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Search className="w-5 h-5 mr-2" />
              Ara
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sipariş No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Müşteri No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlem Tarihi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Banka Tutarı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Uyuşmazlık Nedeni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="bg-red-50 dark:bg-red-900/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {transaction.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {transaction.customerNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(transaction.transactionDate).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: transaction.currency,
                    }).format(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {transaction.bankAmount
                      ? new Intl.NumberFormat('tr-TR', {
                          style: 'currency',
                          currency: transaction.currency,
                        }).format(transaction.bankAmount)
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {transaction.mismatchReason}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UnmatchedTransactions;