import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ChevronRight } from 'lucide-react';

interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  type: 'bank' | 'payment-facilitator';
  virtualPOS: VirtualPOS[];
}

interface VirtualPOS {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

const paymentProviders: PaymentProvider[] = [
  {
    id: 'akbank',
    name: 'Akbank',
    logo: 'https://www.akbank.com/SiteAssets/img/akbanklogo.png',
    type: 'bank',
    virtualPOS: [
      {
        id: 'akbank-pos-1',
        name: 'Akbank Sanal POS Tek Çekim',
        type: 'single',
        status: 'active',
      },
      {
        id: 'akbank-pos-2',
        name: 'Akbank Sanal POS Taksitli',
        type: 'installment',
        status: 'active',
      },
    ],
  },
  {
    id: 'garanti',
    name: 'Garanti BBVA',
    logo: 'https://www.garantibbva.com.tr/assets/img/logo.png',
    type: 'bank',
    virtualPOS: [
      {
        id: 'garanti-pos-1',
        name: 'Garanti BBVA Sanal POS',
        type: 'installment',
        status: 'active',
      },
    ],
  },
  {
    id: 'isbank',
    name: 'İş Bankası',
    logo: 'https://www.isbank.com.tr/StaticFiles/isbank/images/logo.png',
    type: 'bank',
    virtualPOS: [
      {
        id: 'isbank-pos-1',
        name: 'İş Bankası Sanal POS',
        type: 'installment',
        status: 'active',
      },
    ],
  },
];

const CommissionManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Komisyon Oranları</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Provider Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {provider.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {provider.type === 'bank' ? 'Banka' : 'Ödeme Kuruluşu'}
                  </span>
                </div>
              </div>
            </div>

            {/* Virtual POS List */}
            <div className="p-6">
              {provider.virtualPOS.length > 0 ? (
                <div className="space-y-4">
                  {provider.virtualPOS.map((pos) => (
                    <div
                      key={pos.id}
                      onClick={() => navigate(`/commission-management/${provider.id}/${pos.id}`)}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{pos.name}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {pos.type === 'single' ? 'Tek Çekim' : 'Taksitli'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-primary-500 dark:text-primary-400">
                        <span className="mr-2 text-sm font-medium">Şemalar</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Henüz sanal POS eklenmemiş
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionManagement;