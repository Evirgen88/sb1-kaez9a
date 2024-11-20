import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Settings } from 'lucide-react';

function PaymentSystems() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Sanal POS Yönetimi',
      description: 'Sanal POS tanımlarını ve ayarlarını yönetin',
      icon: CreditCard,
      path: '/payment-systems/virtual-pos',
    },
    {
      title: 'Komisyon Yönetimi',
      description: 'Komisyon oranlarını ve şemalarını yönetin',
      icon: Settings,
      path: '/commission-management',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ödeme Sistemleri</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <item.icon className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentSystems;