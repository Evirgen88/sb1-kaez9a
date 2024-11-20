import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, XCircle, RefreshCw, CheckCircle, FileDown, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  type: 'sale' | 'preauth' | 'refund' | 'cancel' | 'capture';
  customerName: string;
  cardNumber: string;
  description: string;
}

function TransactionReports() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [searchCriteria, setSearchCriteria] = useState({
    transactionType: '',
    transactionStatus: '',
    orderNumber: '',
    transactionNumber: '',
    paymentChannel: '',
    referenceNumber: '',
    authCode: '',
    customerNumber: '',
    customerEmail: '',
    customerPhone: '',
    cardNumberFirst8: '',
    cardNumberLast4: '',
    is3D: '',
    isSavedCard: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailedSearch, setShowDetailedSearch] = useState(false);

  // Mock transactions data
  const transactions = Array.from({ length: 25 }, (_, i) => ({
    id: `TRX-${String(i + 1).padStart(3, '0')}`,
    date: new Date(2024, 2, Math.floor(Math.random() * 7) + 1).toISOString(),
    amount: Math.floor(Math.random() * 10000) / 100,
    currency: 'TRY',
    status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)] as 'success' | 'pending' | 'failed',
    type: ['sale', 'preauth', 'refund', 'cancel', 'capture'][Math.floor(Math.random() * 5)] as 'sale' | 'preauth' | 'refund' | 'cancel' | 'capture',
    customerName: ['Ahmet Yılmaz', 'Ayşe Demir', 'Mehmet Kaya'][Math.floor(Math.random() * 3)],
    cardNumber: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000).toString(),
    description: 'Test transaction'
  }));

  // Pagination calculations
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
    console.log('Search:', { dateRange, searchCriteria });
  };

  const handleExport = (type: 'page' | 'all') => {
    console.log(`Exporting ${type} transactions`);
    setShowExportModal(false);
  };

  const renderActionIcons = (transaction: Transaction) => {
    return (
      <div className="flex justify-end space-x-2">
        <button 
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => navigate(`/reports/transactions/${transaction.id}`)}
          title="Görüntüle"
        >
          <Eye className="w-5 h-5" />
        </button>

        {transaction.status === 'success' && (
          <>
            <button 
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              onClick={() => console.log('Cancel transaction:', transaction.id)}
              title="İptal Et"
            >
              <XCircle className="w-5 h-5" />
            </button>

            {(transaction.type === 'sale' || transaction.type === 'capture') && (
              <button 
                className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200"
                onClick={() => console.log('Refund transaction:', transaction.id)}
                title="İade Et"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}

            {transaction.type === 'preauth' && (
              <button 
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                onClick={() => console.log('Capture transaction:', transaction.id)}
                title="Provizyon Kapa"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İşlem Raporları</h1>
      </div>

      {/* Arama formu */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Temel Arama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setShowDetailedSearch(!showDetailedSearch)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {showDetailedSearch ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Detaylı Aramayı Gizle
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Detaylı Arama
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Detaylı Arama */}
          {showDetailedSearch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  İşlem Tipi
                </label>
                <select
                  value={searchCriteria.transactionType}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, transactionType: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="sale">Satış</option>
                  <option value="preauth">Ön Provizyon</option>
                  <option value="refund">İade</option>
                  <option value="cancel">İptal</option>
                  <option value="capture">Provizyon Kapama</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  İşlem Durumu
                </label>
                <select
                  value={searchCriteria.transactionStatus}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, transactionStatus: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="success">Başarılı</option>
                  <option value="pending">Beklemede</option>
                  <option value="failed">Başarısız</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ödeme Kanalı
                </label>
                <select
                  value={searchCriteria.paymentChannel}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, paymentChannel: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="api">API</option>
                  <option value="payment-page">Ödeme Sayfası</option>
                  <option value="payment-link">Linkle Ödeme</option>
                  <option value="manual-pos">Manuel POS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sipariş Numarası
                </label>
                <input
                  type="text"
                  value={searchCriteria.orderNumber}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, orderNumber: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  İşlem Numarası
                </label>
                <input
                  type="text"
                  value={searchCriteria.transactionNumber}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, transactionNumber: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Referans Numarası
                </label>
                <input
                  type="text"
                  value={searchCriteria.referenceNumber}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, referenceNumber: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provizyon Numarası
                </label>
                <input
                  type="text"
                  value={searchCriteria.authCode}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, authCode: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Müşteri Numarası
                </label>
                <input
                  type="text"
                  value={searchCriteria.customerNumber}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, customerNumber: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Müşteri E-posta
                </label>
                <input
                  type="email"
                  value={searchCriteria.customerEmail}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, customerEmail: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Müşteri Telefon
                </label>
                <input
                  type="tel"
                  value={searchCriteria.customerPhone}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, customerPhone: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kart Numarası
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    maxLength={8}
                    value={searchCriteria.cardNumberFirst8}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                      setSearchCriteria({ ...searchCriteria, cardNumberFirst8: value });
                    }}
                    className="w-32 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="İlk 8"
                  />
                  <span className="text-gray-500 dark:text-gray-400 font-mono">****</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={searchCriteria.cardNumberLast4}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setSearchCriteria({ ...searchCriteria, cardNumberLast4: value });
                    }}
                    className="w-24 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Son 4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  3D Secure
                </label>
                <select
                  value={searchCriteria.is3D}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, is3D: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kayıtlı Kart
                </label>
                <select
                  value={searchCriteria.isSavedCard}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, isSavedCard: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Search className="w-5 h-5 mr-2" />
              Rapor Oluştur
            </button>
          </div>
        </form>
      </div>

      {/* İşlem Listesi */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 flex justify-end">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <FileDown className="w-5 h-5 mr-2" />
            İşlemleri Dışa Aktar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlem No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlem Tipi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tutar
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
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(transaction.date).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {transaction.type === 'sale' ? 'Satış' :
                     transaction.type === 'preauth' ? 'Ön Provizyon' :
                     transaction.type === 'refund' ? 'İade' :
                     transaction.type === 'cancel' ? 'İptal' : 'Provizyon Kapama'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: transaction.currency
                    }).format(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status === 'success' ? 'Başarılı' :
                       transaction.status === 'pending' ? 'Beklemede' : 'Başarısız'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {renderActionIcons(transaction)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Toplam {transactions.length} işlem, Sayfa {currentPage}/{totalPages}
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === page
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                İşlemleri Dışa Aktar
              </h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleExport('page')}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FileDown className="w-5 h-5 mr-3 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Mevcut Sayfadaki İşlemleri İndir
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Sadece bu sayfada görünen işlemleri indir
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleExport('all')}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FileDown className="w-5 h-5 mr-3 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Tüm İşlemleri İndir
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Filtrelenen tüm işlemleri indir
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowExportModal(false)}
                className="w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionReports;