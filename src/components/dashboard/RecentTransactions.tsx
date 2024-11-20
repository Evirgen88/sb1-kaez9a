import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, XCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { Transaction } from '../../types/dashboard';
import { useNavigate } from 'react-router-dom';

interface Props {
  transactions: Transaction[];
}

const transactionTypeLabels = {
  sale: 'Satış',
  preauth: 'Ön Provizyon',
  refund: 'İade',
  cancel: 'İptal',
  capture: 'Ön Prov. Kapama'
};

function RecentTransactions({ transactions }: Props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
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

        {transaction.status === 'success' && transaction.transactionType === 'sale' && (
          <>
            <button 
              className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200"
              onClick={() => console.log('Refund transaction:', transaction.id)}
              title="İade Et"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              onClick={() => console.log('Cancel transaction:', transaction.id)}
              title="İptal Et"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </>
        )}

        {transaction.status === 'success' && transaction.transactionType === 'preauth' && (
          <button 
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
            onClick={() => console.log('Capture transaction:', transaction.id)}
            title="Provizyon Kapa"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 text-sm rounded-md ${
            currentPage === i
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Son İşlemler</h2>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Son 50 işlem gösterilmektedir. Sayfa başına 10 işlem listelenmektedir.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlem No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlem Tipi
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tutar
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {transaction.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {transactionTypeLabels[transaction.transactionType]}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: transaction.currency,
                  }).format(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      {
                        success: 'bg-green-100 text-green-800',
                        pending: 'bg-yellow-100 text-yellow-800',
                        failed: 'bg-red-100 text-red-800',
                      }[transaction.status]
                    }`}
                  >
                    {
                      {
                        success: 'Başarılı',
                        pending: 'Beklemede',
                        failed: 'Başarısız',
                      }[transaction.status]
                    }
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {renderActionIcons(transaction)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Toplam {transactions.length} işlem, Sayfa {currentPage}/{totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {renderPaginationButtons()}
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;