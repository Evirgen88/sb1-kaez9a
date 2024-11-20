import React, { useState } from 'react';
import { Plus, Edit2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddPOSModal from '../../components/payment-systems/AddPOSModal';
import EditPOSModal from '../../components/payment-systems/EditPOSModal';

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
    virtualPOS: [],
  },
  {
    id: 'isbank',
    name: 'İş Bankası',
    logo: 'https://www.isbank.com.tr/StaticFiles/isbank/images/logo.png',
    type: 'bank',
    virtualPOS: [],
  },
  {
    id: 'yapikredi',
    name: 'Yapı Kredi',
    logo: 'https://www.yapikredi.com.tr/assets/img/logo.png',
    type: 'bank',
    virtualPOS: [],
  },
  {
    id: 'vakifbank',
    name: 'VakıfBank',
    logo: 'https://www.vakifbank.com.tr/assets/img/logo.png',
    type: 'bank',
    virtualPOS: [],
  },
  {
    id: 'paratika',
    name: 'Paratika',
    logo: 'https://www.paratika.com.tr/assets/img/logo.png',
    type: 'payment-facilitator',
    virtualPOS: [],
  },
  {
    id: 'param',
    name: 'Param',
    logo: 'https://param.com.tr/assets/img/logo.png',
    type: 'payment-facilitator',
    virtualPOS: [],
  },
];

function VirtualPOSManagement() {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [selectedPOS, setSelectedPOS] = useState<VirtualPOS | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleStatus = (pos: VirtualPOS) => {
    // Handle POS status toggle
    console.log('Toggle status for POS:', pos.id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sanal POS Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Provider Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
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
                <button
                  onClick={() => {
                    setSelectedProvider(provider);
                    setShowAddModal(true);
                  }}
                  className="flex items-center px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  POS Ekle
                </button>
              </div>
            </div>

            {/* Virtual POS List */}
            <div className="p-6">
              {provider.virtualPOS.length > 0 ? (
                <div className="space-y-4">
                  {provider.virtualPOS.map((pos) => (
                    <div
                      key={pos.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{pos.name}</h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${
                            pos.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {pos.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPOS(pos);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(pos)}
                          className={`p-1 ${
                            pos.status === 'active'
                              ? 'text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                          }`}
                          title={pos.status === 'active' ? 'Devre Dışı Bırak' : 'Aktifleştir'}
                        >
                          {pos.status === 'active' ? (
                            <ToggleRight className="w-5 h-5" />
                          ) : (
                            <ToggleLeft className="w-5 h-5" />
                          )}
                        </button>
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

      {selectedProvider && (
        <AddPOSModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedProvider(null);
          }}
          provider={selectedProvider}
        />
      )}

      {selectedPOS && (
        <EditPOSModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPOS(null);
          }}
          pos={selectedPOS}
        />
      )}
    </div>
  );
}

export default VirtualPOSManagement;