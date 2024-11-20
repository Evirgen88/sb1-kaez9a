import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus, Package, QrCode, Copy, X } from 'lucide-react';
import QRCode from 'react-qr-code';
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

interface PaymentLinkFormData {
  orderNumber: string;
  amount: number;
  currency: string;
  type: 'sale' | 'preauth';
  expiryDate: string;
  isMultiUse: boolean;
  customerInfo?: CustomerInfo;
  productInfo?: ProductInfo;
  maxInstallment: number;
}

function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${year}${month}${day}-${random}`;
}

function NewPaymentLink() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PaymentLinkFormData>({
    orderNumber: '',
    amount: 0,
    currency: 'TRY',
    type: 'sale',
    expiryDate: '',
    isMultiUse: false,
    maxInstallment: 1,
  });

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock payment link
    const link = `https://pay.example.com/${formData.orderNumber}`;
    setGeneratedLink(link);
    setShowSummaryModal(true);
  };

  const handleCustomerInfo = (customerInfo: CustomerInfo) => {
    setFormData({ ...formData, customerInfo });
    setIsCustomerModalOpen(false);
  };

  const handleProductInfo = (productInfo: ProductInfo) => {
    setFormData({ ...formData, productInfo });
    setIsProductModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link kopyalandı!');
  };

  const handleCreateNewLink = () => {
    setShowSummaryModal(false);
    setFormData({
      orderNumber: '',
      amount: 0,
      currency: 'TRY',
      type: 'sale',
      expiryDate: '',
      isMultiUse: false,
      maxInstallment: 1,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni Ödeme Linki Oluştur</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="space-y-6">
            {/* Sipariş Numarası */}
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
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tutar ve Para Birimi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tutar
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-24 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            {/* İşlem Tipi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İşlem Tipi
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="sale"
                    checked={formData.type === 'sale'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sale' | 'preauth' })}
                    className="mr-2"
                  />
                  Satış
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="preauth"
                    checked={formData.type === 'preauth'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sale' | 'preauth' })}
                    className="mr-2"
                  />
                  Ön Provizyon
                </label>
              </div>
            </div>

            {/* Maximum Taksit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maksimum Taksit Sayısı
              </label>
              <select
                value={formData.maxInstallment}
                onChange={(e) => setFormData({ ...formData, maxInstallment: Number(e.target.value) })}
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

            {/* Son Geçerlilik Tarihi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Son Geçerlilik Tarihi
              </label>
              <input
                type="datetime-local"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Çoklu Kullanım */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isMultiUse}
                  onChange={(e) => setFormData({ ...formData, isMultiUse: e.target.checked })}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Çoklu kullanıma izin ver
                </span>
              </label>
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
            </div>

            {/* Bilgi Özetleri */}
            {(formData.customerInfo || formData.productInfo) && (
              <div className="space-y-4">
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

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/payment-links')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
            >
              Ödeme Linki Oluştur
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

      {/* Summary Modal with QR Code */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Ödeme Linki Oluşturuldu
            </h2>

            <div className="space-y-6">
              {/* Link Display */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ödeme Linki
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-primary-500 hover:text-primary-600"
                    title="Linki Kopyala"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                  {generatedLink}
                </p>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center space-y-4">
                <QRCode value={generatedLink} size={200} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleCreateNewLink}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  Yeni Ödeme Linki Oluştur
                </button>
                <button
                  onClick={() => navigate('/payment-links')}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Ödeme Linkleri Listesine Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPaymentLink;