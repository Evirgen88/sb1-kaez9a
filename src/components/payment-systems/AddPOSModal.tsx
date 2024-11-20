import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    id: string;
    name: string;
  };
}

interface POSFormData {
  name: string;
  type: 'single' | 'installment';
  merchantId: string;
  terminalId: string;
  apiKey: string;
  settlementTime: string;
  status: 'active' | 'inactive';
  installmentOptions: number[]; // Seçili taksit seçeneklerini tutmak için
}

function AddPOSModal({ isOpen, onClose, provider }: Props) {
  const [formData, setFormData] = useState<POSFormData>({
    name: '',
    type: 'single',
    merchantId: '',
    terminalId: '',
    apiKey: '',
    settlementTime: '',
    status: 'active',
    installmentOptions: [], // Başlangıçta boş bir dizi
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Yeni Sanal POS Ekle
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{provider.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              POS Adı
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Örn: Tek Çekim POS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              POS Tipi
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'single' | 'installment' })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="single">Tek Çekim</option>
              <option value="installment">Taksitli</option>
            </select>
          </div>

          {/* Taksit seçeneklerini gösteren alan */}
          {formData.type === 'installment' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taksit Seçenekleri
              </label>
              <div className="flex flex-wrap">
                {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => (
                  <div
                    key={number}
                    className="flex items-center mb-2 w-1/6" // Her bir kutuyu 1/6 genişlikte yaparak iki satıra yayıyoruz
                  >
                    <input
                      type="checkbox"
                      value={number}
                      checked={formData.installmentOptions.includes(number)}
                      onChange={(e) => {
                        const selected = Number(e.target.value);
                        setFormData((prev) => {
                          const options = prev.installmentOptions.includes(selected)
                            ? prev.installmentOptions.filter((n) => n !== selected)
                            : [...prev.installmentOptions, selected];
                          return { ...prev, installmentOptions: options };
                        });
                      }}
                      className="form-checkbox h-4 w-4 text-primary-500"
                    />
                    <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">{number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Üye İşyeri No (Merchant ID)
            </label>
            <input
              type="text"
              required
              value={formData.merchantId}
              onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Terminal No
            </label>
            <input
              type="text"
              required
              value={formData.terminalId}
              onChange={(e) => setFormData({ ...formData, terminalId: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Anahtarı
            </label>
            <input
              type="password"
              required
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gün Sonu Saait
            </label>
            <input
              type="time"
              required
              value={formData.settlementTime}
              onChange={(e) => setFormData({ ...formData, settlementTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durum
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
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
              POS Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPOSModal;
