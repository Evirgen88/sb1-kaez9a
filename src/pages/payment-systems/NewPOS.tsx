import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface POSFormData {
  name: string;
  status: 'active' | 'inactive';
  limit: number;
  commission: number;
}

function NewPOS() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<POSFormData>({
    name: '',
    status: 'active',
    limit: 0,
    commission: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API çağrısı yapılacak
    navigate('/payment-systems/virtual-pos');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni POS Ekle</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="space-y-6">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İşlem Limiti
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Komisyon Oranı (%)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/payment-systems/virtual-pos')}
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

export default NewPOS;