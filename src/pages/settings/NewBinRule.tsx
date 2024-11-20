import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BinRuleForm {
  name: string;
  cardBrand: string;
  cardType: string;
  cardLevel: string;
  cardNetwork: string;
  cardBank: string;
  cardCountry: string;
  minAmount: number;
  maxAmount: number;
  installmentType: string;
  targetPOS: string;
  status: 'active' | 'inactive';
}

const NewBinRule: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BinRuleForm>({
    name: '',
    cardBrand: 'all',
    cardType: 'all',
    cardLevel: 'all',
    cardNetwork: 'all',
    cardBank: 'all',
    cardCountry: 'all',
    minAmount: 0,
    maxAmount: 0,
    installmentType: 'all',
    targetPOS: '',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/settings/bin');
  };

  const handleCancel = () => {
    navigate('/settings/bin');
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni BIN Yönlendirme Kuralı</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Koşullar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Koşullar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kural Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Kural adını girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Markası
              </label>
              <select
                value={formData.cardBrand}
                onChange={(e) => setFormData({ ...formData, cardBrand: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="troy">Troy</option>
                <option value="amex">American Express</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Tipi
              </label>
              <select
                value={formData.cardType}
                onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="credit">Kredi Kartı</option>
                <option value="debit">Debit Kart</option>
                <option value="prepaid">Ön Ödemeli Kart</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Seviyesi
              </label>
              <select
                value={formData.cardLevel}
                onChange={(e) => setFormData({ ...formData, cardLevel: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="commercial">Ticari Kart</option>
                <option value="personal">Bireysel Kart</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Ağı
              </label>
              <select
                value={formData.cardNetwork}
                onChange={(e) => setFormData({ ...formData, cardNetwork: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="axess">Axess</option>
                <option value="bonus">Bonus</option>
                <option value="maximum">Maximum</option>
                <option value="world">World</option>
                <option value="paraf">Paraf</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Bankası
              </label>
              <select
                value={formData.cardBank}
                onChange={(e) => setFormData({ ...formData, cardBank: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="akbank">Akbank</option>
                <option value="burgan">Burgan Bank</option>
                <option value="denizbank">Denizbank</option>
                <option value="garanti">Garanti Bank</option>
                <option value="isbank">İş Bankası</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Ülkesi
              </label>
              <select
                value={formData.cardCountry}
                onChange={(e) => setFormData({ ...formData, cardCountry: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="TUR">🇹🇷 Türkiye</option>
                <option value="USA">🇺🇸 ABD</option>
                <option value="RUS">🇷🇺 Rusya</option>
                <option value="GBR">🇬🇧 İngiltere</option>
                <option value="DEU">🇩🇪 Almanya</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kurallar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Kurallar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Tutar
                </label>
                <input
                  type="number"
                  value={formData.minAmount}
                  onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum Tutar
                </label>
                <input
                  type="number"
                  value={formData.maxAmount}
                  onChange={(e) => setFormData({ ...formData, maxAmount: Number(e.target.value) })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taksit Tipi
              </label>
              <select
                value={formData.installmentType}
                onChange={(e) => setFormData({ ...formData, installmentType: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tümü</option>
                <option value="single">Tek Çekim</option>
                <option value="installment">Sadece Taksitli İşlemler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Yönlendirilecek Sanal POS
              </label>
              <select
                value={formData.targetPOS}
                onChange={(e) => setFormData({ ...formData, targetPOS: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
                <option value="akbank">Akbank</option>
                <option value="teb">TEB</option>
                <option value="halkbank">Halkbank</option>
                <option value="ykb">Yapı Kredi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kural Durumu
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
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
          >
            Kuralı Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBinRule;