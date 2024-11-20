import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';

interface CommissionScheme {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  gracePeriod: number;
  status: 'active' | 'inactive';
}

const CommissionSchemes: React.FC = () => {
  const { providerId, posId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - In a real app, fetch from API based on providerId and posId
  const schemes: CommissionScheme[] = [
    {
      id: '1',
      name: 'Standart Komisyon Şeması',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      gracePeriod: 0,
      status: 'active',
    },
    {
      id: '2',
      name: 'Yaz Kampanyası',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      gracePeriod: 7,
      status: 'inactive',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/commission-management')}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Komisyon Şemaları</h1>
          <button
            onClick={() => navigate(`/commission-management/${providerId}/${posId}/new`)}
            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Şema Ekle
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Şema Adı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Başlangıç Tarihi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bitiş Tarihi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vade (Gün)
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
              {schemes.map((scheme) => (
                <tr
                  key={scheme.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  onClick={() => navigate(`/commission-management/${providerId}/${posId}/${scheme.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {scheme.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(scheme.startDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(scheme.endDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {scheme.gracePeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        scheme.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {scheme.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/commission-management/${providerId}/${posId}/${scheme.id}/edit`);
                        }}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/commission-management/${providerId}/${posId}/rates`);
                        }}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Oranlar
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

export default CommissionSchemes;