import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CommissionSchemeFormData {
  name: string;
  startDate: string;
  endDate: string;
  gracePeriod: number;
  status: 'active' | 'inactive';
}

const CommissionSchemeForm: React.FC = () => {
  const navigate = useNavigate();
  const { providerId, posId, schemeId } = useParams();
  const isEditing = !!schemeId;

  const [formData, setFormData] = useState<CommissionSchemeFormData>({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 31536000000).toISOString().split('T')[0], // 1 year from now
    gracePeriod: 0,
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Komisyon Şeması Düzenle' : 'Yeni Komisyon Şeması'}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Şema Adı
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Vade (Gün)
            </label>
            <input
              type="number"
              min="0"
              value={formData.gracePeriod}
              onChange={(e) => setFormData({ ...formData, gracePeriod: parseInt(e.target.value) || 0 })}
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

          <div className="flex justify-end space-x-3">
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
              {isEditing ? 'Değişiklikleri Kaydet' : 'Şema Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommissionSchemeForm;