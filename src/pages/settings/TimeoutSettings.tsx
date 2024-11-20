import React from 'react';

const TimeoutSettings: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Zaman Aşımı Kuralları
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İşlem Zaman Aşımı (dakika)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                defaultValue={30}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ödeme işleminin tamamlanması gereken maksimum süre
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Oturum Zaman Aşımı (dakika)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                defaultValue={60}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Kullanıcı hareketsizliği durumunda oturumun sonlandırılacağı süre
              </p>
            </div>

            <div className="pt-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600">
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeoutSettings;