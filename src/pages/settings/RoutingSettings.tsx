import React, { useState } from 'react';

// Mock data for error codes
const errorCodes = [
  { code: 'E001', description: 'Yetersiz Bakiye' },
  { code: 'E002', description: 'Kart Limiti Yetersiz' },
  { code: 'E003', description: 'Güvenlik Doğrulaması Başarısız' },
  { code: 'E004', description: 'Geçersiz Kart' },
  { code: 'E005', description: 'İşlem Reddedildi' },
];

function RoutingSettings() {
  const [isAutoRouting, setIsAutoRouting] = useState(true);
  const [useOnusRouting, setUseOnusRouting] = useState(false);
  const [usePriorityRouting, setUsePriorityRouting] = useState(false);
  const [selectedErrorCodes, setSelectedErrorCodes] = useState<string[]>([]);
  const [useFailureRouting, setUseFailureRouting] = useState(true);
  const [useErrorCodes, setUseErrorCodes] = useState(true);
  const [usePOSDownRouting, setUsePOSDownRouting] = useState(true);

  const handleAutoRoutingToggle = () => {
    const newAutoRoutingState = !isAutoRouting;
    setIsAutoRouting(newAutoRoutingState);
    
    if (newAutoRoutingState) {
      setUseOnusRouting(false);
      setUsePriorityRouting(false);
    }
  };

  const handleOnusRoutingToggle = () => {
    const newOnusState = !useOnusRouting;
    setUseOnusRouting(newOnusState);
    if (newOnusState) {
      setIsAutoRouting(false);
      setUsePriorityRouting(false);
    }
  };

  const handlePriorityRoutingToggle = () => {
    const newPriorityState = !usePriorityRouting;
    setUsePriorityRouting(newPriorityState);
    if (newPriorityState) {
      setIsAutoRouting(false);
      setUseOnusRouting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Kesintisiz İşlem Yönlendirme
        </h1>
      </div>

      <div className="space-y-6">
        {/* Yönlendirme Koşulları */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Yönlendirme Koşulları
            </h3>

            {/* POS Down Routing Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Sanal POS down ise, up olan uygun POS'a git
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seçili sanal POS erişilemez durumdaysa, uygun başka bir POS'a yönlendir
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePOSDownRouting}
                    onChange={(e) => setUsePOSDownRouting(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
            
            {/* Zaman Aşımı ve Sistem Hatası Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Zaman Aşımı ve Sistem Hatası
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Zaman aşımı veya sistem hatası durumunda yönlendirme yap
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useFailureRouting}
                    onChange={(e) => setUseFailureRouting(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>

            {/* Hata Kodları Toggle ve Liste */}
            <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Hata Kodlarına Göre Yönlendirme
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Seçili hata kodları için yönlendirme yap
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useErrorCodes}
                      onChange={(e) => setUseErrorCodes(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>

              {useErrorCodes && (
                <div className="mt-4 space-y-3 pl-4">
                  {errorCodes.map((error) => (
                    <label key={error.code} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedErrorCodes.includes(error.code)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedErrorCodes([...selectedErrorCodes, error.code]);
                          } else {
                            setSelectedErrorCodes(selectedErrorCodes.filter(code => code !== error.code));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {error.code} - {error.description}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Yönlendirme Tercihleri */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Yönlendirme Tercihleri
            </h3>

            {/* Düşük Komisyona Göre Otomatik Yönlendirme */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Düşük Komisyona Göre Otomatik Yönlendirme
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  İşlemleri komisyon oranına göre otomatik yönlendir
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAutoRouting}
                    onChange={handleAutoRoutingToggle}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>

            {/* Onus Yönlendirme - Sadece otomatik yönlendirme kapalıyken göster */}
            {!isAutoRouting && (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      Her Kart Kendi Sanal POS'una Yönlensin (Onus)
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Kartlar kendi bankalarının sanal POS'larına yönlendirilir
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useOnusRouting}
                        onChange={handleOnusRoutingToggle}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      POS Sıra Numarası Öncelikli
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      İşlemler POS'ların tanımlanma sırasına göre yönlendirilir
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={usePriorityRouting}
                        onChange={handlePriorityRoutingToggle}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoutingSettings;