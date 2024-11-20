import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CalendarDays, DollarSign } from 'lucide-react';

interface RecurringPaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  currency: string;
  frequency: string;
  startDate: string;
  endDate: string;
  description: string;
}

const NewRecurringPayment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RecurringPaymentForm>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    customerName: '',
    customerEmail: '',
    amount: '',
    currency: 'TRY',
    frequency: 'monthly',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/recurring-payments');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni Tekrarlı Ödeme</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Kart Bilgileri */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Kart Bilgileri
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Numarası
              </label>
              <input
                type="text"
                required
                maxLength={19}
                value={formData.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                  setFormData({ ...formData, cardNumber: value });
                }}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Son Kullanma Tarihi
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={formData.expiryDate}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{2})(\d{0,2})/, '$1/$2');
                    setFormData({ ...formData, expiryDate: value });
                  }}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="AA/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, cvv: value });
                  }}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="000"
                />
              </div>
            </div>
          </div>

          {/* Müşteri Bilgileri */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Müşteri Bilgileri</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Müşteri Adı
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Ödeme Bilgileri */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Ödeme Bilgileri
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tutar
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Para Birimi
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ödeme Sıklığı
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
                <option value="quarterly">3 Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
            </div>
          </div>

          {/* Tarih Bilgileri */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" />
              Tarih Bilgileri
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Başlangıç Tarihi
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Opsiyonel. Boş bırakılırsa süresiz devam eder.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tekrarlı ödeme açıklaması..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/recurring-payments')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Tekrarlı Ödeme Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecurringPayment;