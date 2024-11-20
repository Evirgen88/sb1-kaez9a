import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BinActionForm {
  name: string;
  binRangeStart?: string;
  binRangeEnd?: string;
  cardType?: string;
  cardLevel?: string;
  cardBrand?: string;
  cardNetwork?: string;
  cardBank?: string;
  action: 'noSave' | 'noTransaction' | 'convert3DToNonSecure' | 'noPreauth';
  status: 'active' | 'inactive';
}

function NewBinAction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BinActionForm>({
    name: '',
    action: 'noTransaction',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/settings/bin-actions');
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/settings/bin-actions')}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni BIN Aksiyonu</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aksiyon Adı
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                BIN Aralığı
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Başlangıç"
                  value={formData.binRangeStart}
                  onChange={(e) => setFormData({ ...formData, binRangeStart: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  maxLength={6}
                />
                <input
                  type="text"
                  placeholder="Bitiş"
                  value={formData.binRangeEnd}
                  onChange={(e) => setFormData({ ...formData, binRangeEnd: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  maxLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Tipi
              </label>
              <select
                value={formData.cardType || ''}
                onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
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
                value={formData.cardLevel || ''}
                onChange={(e) => setFormData({ ...formData, cardLevel: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
                <option value="commercial">Ticari Kart</option>
                <option value="personal">Bireysel Kart</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Markası
              </label>
              <select
                value={formData.cardBrand || ''}
                onChange={(e) => setFormData({ ...formData, cardBrand: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="troy">Troy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Ağı
              </label>
              <select
                value={formData.cardNetwork || ''}
                onChange={(e) => setFormData({ ...formData, cardNetwork: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
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
                value={formData.cardBank || ''}
                onChange={(e) => setFormData({ ...formData, cardBank: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seçiniz</option>
                <option value="akbank">Akbank</option>
                <option value="garanti">Garanti BBVA</option>
                <option value="isbank">İş Bankası</option>
                <option value="ykb">Yapı Kredi</option>
                <option value="ziraat">Ziraat Bankası</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aksiyon
              </label>
              <select
                required
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value as BinActionForm['action'] })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="noSave">Kartın Kaydedilmesine İzin Verme</option>
                <option value="noTransaction">Kartın İşlem Yapmasına İzin Verme</option>
                <option value="convert3DToNonSecure">Kartla 3D Başlayan İşlemi Non-Secure'e Yönlendir</option>
                <option value="noPreauth">Kartla Ön Provizyon Yapılmasına İzin Verme</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durum
              </label>
              <select
                required
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/settings/bin-actions')}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewBinAction;