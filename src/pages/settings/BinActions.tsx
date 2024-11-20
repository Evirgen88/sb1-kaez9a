import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BinAction {
  id: string;
  name: string;
  binRange?: string;
  cardType?: string;
  cardLevel?: string;
  cardBrand?: string;
  cardNetwork?: string;
  cardBank?: string;
  action: 'noSave' | 'noTransaction' | 'convert3DToNonSecure' | 'noPreauth';
  status: 'active' | 'inactive';
}

const mockActions: BinAction[] = [
  {
    id: '1',
    name: 'Yabancı Kartları Engelle',
    cardType: 'Credit',
    action: 'noTransaction',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ticari Kartları 3D\'siz Yönlendir',
    cardLevel: 'Commercial',
    action: 'convert3DToNonSecure',
    status: 'active',
  },
];

function BinActions() {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (confirm('Bu aksiyonu silmek istediğinizden emin misiniz?')) {
      console.log('Deleting action:', id);
    }
  };

  const getActionLabel = (action: BinAction['action']) => {
    switch (action) {
      case 'noSave':
        return 'Kartın Kaydedilmesine İzin Verme';
      case 'noTransaction':
        return 'Kartın İşlem Yapmasına İzin Verme';
      case 'convert3DToNonSecure':
        return 'Kartla 3D Başlayan İşlemi Non-Secure\'e Yönlendir';
      case 'noPreauth':
        return 'Kartla Ön Provizyon Yapılmasına İzin Verme';
      default:
        return action;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BIN Bazlı Aksiyonlar</h1>
        <button
          onClick={() => navigate('/settings/bin-actions/new')}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni BIN Aksiyonu
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksiyon Adı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kapsam
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksiyon
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
              {mockActions.map((action) => (
                <tr key={action.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {action.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {action.binRange || action.cardType || action.cardLevel || action.cardBrand || action.cardNetwork || action.cardBank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {getActionLabel(action.action)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        action.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {action.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => navigate(`/settings/bin-actions/${action.id}`)}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(action.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
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
}

export default BinActions;