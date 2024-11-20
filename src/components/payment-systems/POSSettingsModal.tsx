import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pos: {
    id: string;
    name: string;
    type: string;
  };
}

interface InstallmentPlan {
  count: number;
  commission: number;
}

function POSSettingsModal({ isOpen, onClose, pos }: Props) {
  const [installments, setInstallments] = useState<InstallmentPlan[]>([
    { count: 1, commission: 1.60 },
    { count: 2, commission: 2.10 },
    { count: 3, commission: 2.60 },
  ]);

  if (!isOpen) return null;

  const handleAddInstallment = () => {
    const maxCount = Math.max(...installments.map(i => i.count), 0);
    setInstallments([...installments, { count: maxCount + 1, commission: 0 }]);
  };

  const handleRemoveInstallment = (index: number) => {
    setInstallments(installments.filter((_, i) => i !== index));
  };

  const handleInstallmentChange = (index: number, field: 'count' | 'commission', value: number) => {
    const newInstallments = [...installments];
    newInstallments[index][field] = value;
    setInstallments(newInstallments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Installment settings updated:', installments);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Komisyon ve Taksit Ayarları
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{pos.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {installments.map((installment, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Taksit Sayısı
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={installment.count}
                    onChange={(e) =>
                      handleInstallmentChange(index, 'count', parseInt(e.target.value))
                    }
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Komisyon Oranı (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={installment.commission}
                    onChange={(e) =>
                      handleInstallmentChange(index, 'commission', parseFloat(e.target.value))
                    }
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex items-end pb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveInstallment(index)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddInstallment}
            className="flex items-center px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-900/50 dark:text-primary-400 dark:hover:bg-primary-900/75"
          >
            <Plus className="w-4 h-4 mr-2" />
            Taksit Ekle
          </button>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
            >
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default POSSettingsModal;