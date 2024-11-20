import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pos: {
    id: string;
    name: string;
  };
}

interface CommissionRate {
  type: string;
  rate: number;
}

function CommissionRatesModal({ isOpen, onClose, pos }: Props) {
  const [rates, setRates] = useState<CommissionRate[]>([
    { type: 'Tek Çekim Kredi Kartı', rate: 1.60 },
    { type: 'Tek Çekim Debit Kartı', rate: 1.20 },
    { type: '2 Taksit', rate: 2.10 },
    { type: '3 Taksit', rate: 2.60 },
    { type: '4 Taksit', rate: 3.10 },
    { type: '5 Taksit', rate: 3.60 },
    { type: '6 Taksit', rate: 4.10 },
    { type: '7 Taksit', rate: 4.60 },
    { type: '8 Taksit', rate: 5.10 },
    { type: '9 Taksit', rate: 5.60 },
    { type: '10 Taksit', rate: 6.10 },
    { type: '11 Taksit', rate: 6.60 },
    { type: '12 Taksit', rate: 7.10 },
    { type: '13 Taksit', rate: 7.60 },
    { type: 'Diğer Banka Kredi Kartı', rate: 2.00 },
    { type: 'Diğer Banka Debit Kartı', rate: 1.50 },
    { type: 'Yabancı Kart', rate: 2.50 },
  ]);

  if (!isOpen) return null;

  const handleRateChange = (index: number, value: number) => {
    const newRates = [...rates];
    newRates[index].rate = value;
    setRates(newRates);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving rates:', rates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Komisyon Oranları
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {rates.map((rate, index) => (
              <div
                key={rate.type}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rate.type}
                </label>
                <div className="flex items-center w-32">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={rate.rate}
                    onChange={(e) => handleRateChange(index, parseFloat(e.target.value))}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
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

export default CommissionRatesModal;