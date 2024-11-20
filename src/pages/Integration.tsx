import React, { useState } from 'react';
import { Copy, Key, X } from 'lucide-react';

interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const webhookEvents: WebhookEvent[] = [
  {
    id: 'API_AUTH',
    name: 'API_AUTH',
    description: 'Ödeme işleminin sonucu, başarılı ya da başarısız olması farketmeksizin webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'API_VERIFY_AND_AUTH',
    name: 'API_VERIFY_AND_AUTH',
    description: '3D Pay model ödeme yöntemlerinde bu event gönderilir.',
    enabled: false,
  },
  {
    id: 'CHECKOUTFORM_AUTH',
    name: 'CHECKOUTFORM_AUTH',
    description: 'Ödeme formu kullanılarak yapılan başarılı ödeme işlemlerinin sonucu ve fraud kurallarına takılarak şüpheli işlem veya fraud olarak değerlendirilen ödemeler webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'THREEDS_VERIFY',
    name: 'THREEDS_VERIFY',
    description: '3D Secure doğrulama işleminin sonucu, başarılı ya da başarısız olması farketmeksizin webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'REFUND',
    name: 'REFUND',
    description: 'Ödeme iade işleminin sonucu başarılı ise webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'REFUND_TX',
    name: 'REFUND_TX',
    description: 'Ödeme kırılımının iade işleminin sonucu başarılı ise webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'PAYOUT_COMPLETED',
    name: 'PAYOUT_COMPLETED',
    description: 'Pazaryerlerindeki para transferi işleminin tamamlanması sonucunda iletilir.',
    enabled: false,
  },
  {
    id: 'AUTOPILOT',
    name: 'AUTOPILOT',
    description: 'Autopilot işlemleri sonucu webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'WALLET_CREATED',
    name: 'WALLET_CREATED',
    description: 'Cüzdan oluşması durumunda cüzdan bilgileri ile webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'WALLET_TX_CREATED',
    name: 'WALLET_TX_CREATED',
    description: 'Cüzdan hareketi gerçekleştirildiğinde işlem sonucu webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'BNPL_NOTIFICATION',
    name: 'BNPL_NOTIFICATION',
    description: 'BNPL(Alışveriş Kredisi) ödemelerinde yer alan bildirimler webhook adresine iletilir.',
    enabled: false,
  },
  {
    id: 'BANK_ACCOUNT_TRACKING_RECORD',
    name: 'BANK_ACCOUNT_TRACKING_RECORD',
    description: 'Banka hesap işleme hareketi gerçekleştiğinde webhook olarak gönderilir.',
    enabled: false,
  },
];

const Integration: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [webhookKey, setWebhookKey] = useState('');
  const [webhookInterval, setWebhookInterval] = useState('30');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const apiKey = 'pk_test_51NbXXXXXXXXXXXXXXXXXXXXX';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWebhookToggle = (checked: boolean) => {
    if (checked) {
      setShowWebhookModal(true);
    } else {
      setWebhookEnabled(false);
    }
  };

  const handleSaveWebhookSettings = () => {
    if (webhookKey.trim() === '') {
      alert('Üye İşyeri Webhook Key alanı zorunludur.');
      return;
    }

    setWebhookEnabled(true);
    setShowWebhookModal(false);
    // Here you would typically save the webhook configuration to your backend
    console.log('Saving webhook settings:', {
      webhookKey,
      webhookInterval,
      selectedEvents,
    });
  };

  const toggleEvent = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Entegrasyon & API</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="max-w-3xl space-y-6">
          {/* API Anahtarları */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              API Anahtarları
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Canlı API Anahtarı
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-sm text-gray-600 dark:text-gray-400">
                      {apiKey}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-500"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dokümantasyon */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              API Dokümantasyonu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              API entegrasyonu için detaylı dokümantasyona aşağıdaki linkten ulaşabilirsiniz.
            </p>
            <a
              href="https://docs.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Dokümantasyona Git
            </a>
          </div>

          {/* Webhook Ayarları */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Webhook Ayarları
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Webhook URL
                </label>
                <input
                  type="url"
                  placeholder="https://your-domain.com/webhook"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={webhookEnabled}
                    onChange={(e) => handleWebhookToggle(e.target.checked)}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Webhook bildirimlerini aktif et
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Configuration Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Webhook Yapılandırması
              </h2>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Üye İşyeri Webhook Key
                </label>
                <input
                  type="text"
                  value={webhookKey}
                  onChange={(e) => setWebhookKey(e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Webhook key giriniz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Webhook Interval (sn)
                </label>
                <input
                  type="number"
                  value={webhookInterval}
                  onChange={(e) => setWebhookInterval(e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Webhook Events
                </label>
                <div className="space-y-3">
                  {webhookEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={selectedEvents.includes(event.id)}
                          onChange={() => toggleEvent(event.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowWebhookModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveWebhookSettings}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integration;