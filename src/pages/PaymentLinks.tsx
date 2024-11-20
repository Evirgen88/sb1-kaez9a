import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentLink {
  id: string;
  orderNumber: string;
  amount: number;
  currency: string;
  type: 'sale' | 'preauth';
  expiryDate: string;
  customerName: string;
  customerEmail: string;
  isMultiUse: boolean;
  status: 'active' | 'expired' | 'used';
  createdAt: string;
}

const paymentLinks: PaymentLink[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    amount: 1500,
    currency: 'TRY',
    type: 'sale',
    expiryDate: '2024-03-14T23:59:59',
    customerName: 'Ali Yılmaz',
    customerEmail: 'ali@example.com',
    isMultiUse: false,
    status: 'active',
    createdAt: '2024-03-07T10:30:00',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    amount: 2750,
    currency: 'TRY',
    type: 'preauth',
    expiryDate: '2024-03-15T23:59:59',
    customerName: 'Ayşe Demir',
    customerEmail: 'ayse@example.com',
    isMultiUse: true,
    status: 'active',
    createdAt: '2024-03-07T11:45:00',
  },
];

const PaymentLinks: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'used':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'expired':
        return 'Süresi Dolmuş';
      case 'used':
        return 'Kullanıldı';
      default:
        return status;
    }
  };

  const filteredLinks = paymentLinks
    .filter((link) => {
      const matchesSearch =
        searchTerm === '' ||
        link.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = status === 'all' || link.status === status;

      const matchesDate =
        (!dateRange.start || new Date(link.createdAt) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(link.createdAt) <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesDate;
    })
    .slice(0, 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arama kriterleri:', { dateRange, searchTerm, status });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ödeme Linkleri</h1>
        <Link
          to="/payment-links/new"
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Ödeme Linki
        </Link>
      </div>

      {/* Arama/Filtreleme Bölümü */}
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="expired">Süresi Dolmuş</option>
              <option value="used">Kullanıldı</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arama
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sipariş no veya müşteri bilgisi"
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

      {/* Ödeme Linkleri Tablosu */}
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
                  Tutar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlem Tipi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Son Tarih
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLinks.map((link) => (
                <tr key={link.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {link.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <div>
                      <div>{link.customerName}</div>
                      <div className="text-sm text-gray-500">{link.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: link.currency,
                    }).format(link.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {link.type === 'sale' ? 'Satış' : 'Ön Provizyon'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(link.expiryDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        link.status
                      )}`}
                    >
                      {getStatusText(link.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-3">
                      <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                      <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 className="w-5 h-5" />
                      </button>
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
};

export default PaymentLinks;