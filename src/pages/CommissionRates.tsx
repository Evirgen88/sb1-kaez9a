import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CommissionRate {
  type: string;
  rate: number;
}

const defaultRates: CommissionRate[] = [
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
  { type: 'Aynı Network Kartı', rate: 7.60 },
  { type: 'Diğer Banka Kredi Kartı', rate: 2.00 },
  { type: 'Diğer Banka Debit Kartı', rate: 1.50 },
  { type: 'Yabancı Kart', rate: 2.50 },
];

const currencies = [
  { code: 'TRY', name: 'Türk Lirası' },
  { code: 'USD', name: 'Amerikan Doları' },
  { code: 'EUR', name: 'Euro' },
];

function CommissionRates() {
  const { providerId, posId } = useParams();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');
  const [ratesByCurrency, setRatesByCurrency] = useState<Record<string, CommissionRate[]>>({
    TRY: [...defaultRates],
    USD: [...defaultRates],
    EUR: [...defaultRates],
  });

  const handleRateChange = (currencyCode: string, index: number, value: number) => {
    setRatesByCurrency(prev => ({
      ...prev,
      [currencyCode]: prev[currencyCode].map((rate, i) =>
        i === index ? { ...rate, rate: value } : rate
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with rates for all currencies
    console.log('Saving rates:', ratesByCurrency);
    navigate(`/commission-management/${providerId}/${posId}`);
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
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Komisyon Oranları</h1>
      </div>

      <div className="space-y-6">
        {/* Currency Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Para Birimi</h2>
          <div className="flex space-x-4">
            {currencies.map(currency => (
              <button
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCurrency === currency.code
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {currency.name}
              </button>
            ))}
          </div>
        </div>

        {/* Commission Rates Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {currencies.find(c => c.code === selectedCurrency)?.name} Komisyon Oranları
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ratesByCurrency[selectedCurrency].map((rate, index) => (
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
                      onChange={(e) => handleRateChange(selectedCurrency, index, parseFloat(e.target.value))}
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
                onClick={() => navigate(`/commission-management/${providerId}/${posId}`)}
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
    </div>
  );
}

export default CommissionRates;