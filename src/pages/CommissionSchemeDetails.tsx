import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'lucide-react';

interface CommissionScheme {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  gracePeriod: number;
  status: 'active' | 'inactive';
  currencies: string[];
  rules: {
    installment: number;
    commission: number;
    currency: string;
    cardTypes: string[];
  }[];
}

const CommissionSchemeDetails: React.FC = () => {
  const navigate = useNavigate();
  const { providerId, posId, schemeId } = useParams();

  // Mock data - In a real app, fetch from API
  const scheme: CommissionScheme = {
    id: '1',
    name: 'Standart Komisyon Şeması',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    gracePeriod: 0,
    status: 'active',
    currencies: ['TRY'],
    rules: [
      {
        installment: 1,
        commission: 1.60,
        currency: 'TRY',
        cardTypes: ['credit', 'debit'],
      },
      {
        installment: 2,
        commission: 2.10,
        currency: 'TRY',
        cardTypes: ['credit'],
      },
      {
        installment: 3,
        commission: 2.60,
        currency: 'TRY',
        cardTypes: ['credit'],
      },
    ],
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate(`/commission-management/${providerId}/${posId}`)}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{scheme.name}</h1>
          <button
            onClick={() => navigate(`/commission-management/${providerId}/${posId}/${schemeId}/edit`)}
            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Düzenle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Genel Bilgiler
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Başlangıç Tarihi
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {new Date(scheme.startDate).toLocaleDateString('tr-TR')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Bitiş Tarihi
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {new Date(scheme.endDate).toLocaleDateString('tr-TR')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Vade (Gün)
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {scheme.gracePeriod}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Durum
              </label>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${
                  scheme.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {scheme.status === 'active' ? 'Aktif' : 'Pasif'}
              </span>
            </div>
          </div>
        </div>

        {/* Commission Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Komisyon Kuralları
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Taksit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Komisyon (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Para Birimi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Kart Tipleri
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {scheme.rules.map((rule, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {rule.installment} Taksit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      %{rule.commission.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {rule.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {rule.cardTypes.map(type => 
                        type === 'credit' ? 'Kredi Kartı' : 'Banka Kartı'
                      ).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSchemeDetails;