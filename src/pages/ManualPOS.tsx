import React, { useState } from 'react';
import { CreditCard, DollarSign, RefreshCw, UserPlus, Package } from 'lucide-react';
import CustomerInfoModal from '../components/payment-links/CustomerInfoModal';
import ProductInfoModal from '../components/payment-links/ProductInfoModal';

interface CustomerInfo {
  name: string;
  email: string;
}

interface ProductInfo {
  name: string;
  description: string;
  sku?: string;
}

interface POSFormData {
  orderNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
  currency: string;
  transactionType: 'sale' | 'preauth';
  installment: string;
  description: string;
  customerInfo?: CustomerInfo;
  productInfo?: ProductInfo;
}

function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${year}${month}${day}-${random}`;
}

function ManualPOS() {
  const [formData, setFormData] = useState<POSFormData>({
    orderNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    currency: 'TRY',
    transactionType: 'sale',
    installment: '1',
    description: '',
  });

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const formatAmount = (value: string) => {
    // Remove all non-numeric characters except dots and comma
    let number = value.replace(/[^\d.,]/g, '');

    // Convert to a standardized format first (remove thousand separators and convert comma to dot)
    number = number.replace(/\./g, '').replace(',', '.');

    // Parse the number
    const parsedNumber = parseFloat(number) || 0;

    // Format with Turkish locale (dots for thousands, comma for decimals)
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: number.includes('.') ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(parsedNumber);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedAmount = formatAmount(e.target.value);
    setFormData({ ...formData, amount: formattedAmount });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert the formatted amount back to a number for submission
    const numericAmount = parseFloat(
      formData.amount.replace(/\./g, '').replace(',', '.')
    );
    console.log('Form submitted:', {
      ...formData,
      amount: numericAmount,
    });
  };

  const handleCustomerInfo = (customerInfo: CustomerInfo) => {
    setFormData({ ...formData, customerInfo });
    setIsCustomerModalOpen(false);
  };

  const handleProductInfo = (productInfo: ProductInfo) => {
    setFormData({ ...formData, productInfo });
    setIsProductModalOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manuel POS</h1>
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

          {/* İşlem Bilgileri */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              İşlem Bilgileri
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sipariş Numarası
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Sipariş numarası girin veya otomatik oluşturun"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orderNumber: generateOrderNumber() })}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tutar
                </label>
                <input
                  type="text"
                  required
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0,00"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                İşlem Tipi
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="sale"
                    checked={formData.transactionType === 'sale'}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value as 'sale' | 'preauth' })}
                    className="form-radio text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Satış</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="preauth"
                    checked={formData.transactionType === 'preauth'}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value as 'sale' | 'preauth' })}
                    className="form-radio text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Ön Provizyon</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taksit
              </label>
              <select
                value={formData.installment}
                onChange={(e) => setFormData({ ...formData, installment: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="1">Tek Çekim</option>
                <option value="2">2 Taksit</option>
                <option value="3">3 Taksit</option>
                <option value="6">6 Taksit</option>
                <option value="9">9 Taksit</option>
                <option value="12">12 Taksit</option>
              </select>
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
                placeholder="İşlem açıklaması girin..."
              />
            </div>
          </div>

          {/* Opsiyonel Bilgiler */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Opsiyonel Bilgiler
            </h3>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(true)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {formData.customerInfo ? 'Müşteri Bilgisini Düzenle' : 'Müşteri Bilgisi Ekle'}
              </button>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(true)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <Package className="w-5 h-5 mr-2" />
                {formData.productInfo ? 'Ürün Bilgisini Düzenle' : 'Ürün Bilgisi Ekle'}
              </button>
            </div>

            {/* Bilgi Özetleri */}
            {(formData.customerInfo || formData.productInfo) && (
              <div className="space-y-4 mt-4">
                {formData.customerInfo && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Müşteri Bilgileri
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formData.customerInfo.name} ({formData.customerInfo.email})
                    </p>
                  </div>
                )}
                {formData.productInfo && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Ürün Bilgileri
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formData.productInfo.name}
                      {formData.productInfo.sku && ` (${formData.productInfo.sku})`}
                    </p>
                    {formData.productInfo.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formData.productInfo.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              İşlemi Tamamla
            </button>
          </div>
        </form>
      </div>

      <CustomerInfoModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSubmit={handleCustomerInfo}
        initialData={formData.customerInfo}
      />

      <ProductInfoModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductInfo}
        initialData={formData.productInfo}
      />
    </div>
  );
}

export default ManualPOS;