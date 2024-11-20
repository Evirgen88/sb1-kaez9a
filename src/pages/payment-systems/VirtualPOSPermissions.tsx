import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface POSPermissions {
  id: string;
  name: string;
  permissions: {
    installmentAllowed: boolean;
    cvvlessAllowed: boolean;
    foreignCardAllowed: boolean;
    supportedCurrencies: string[];
    integrationType: ('3D' | 'Non3D')[];
    supportedCardTypes: string[];
    supportedCardFeatures: string[];
    supportedCardBrands: string[];
    supportedCardFamilies?: string[]; // Optional for Param POS
  };
}

const mockPOSData: POSPermissions[] = [
  {
    id: 'akbank-pos-1',
    name: 'Akbank Sanal POS',
    permissions: {
      installmentAllowed: true,
      cvvlessAllowed: false,
      foreignCardAllowed: true,
      supportedCurrencies: ['TRY', 'USD', 'EUR'],
      integrationType: ['3D', 'Non3D'],
      supportedCardTypes: ['Credit', 'Debit'],
      supportedCardFeatures: ['Commercial', 'Personal'],
      supportedCardBrands: ['Visa', 'Mastercard', 'Troy'],
    },
  },
  {
    id: 'param-pos-1',
    name: 'Param Sanal POS',
    permissions: {
      installmentAllowed: true,
      cvvlessAllowed: false,
      foreignCardAllowed: true,
      supportedCurrencies: ['TRY', 'USD', 'EUR', 'GBP'],
      integrationType: ['3D'],
      supportedCardTypes: ['Credit', 'Debit', 'Prepaid'],
      supportedCardFeatures: ['Commercial', 'Personal'],
      supportedCardBrands: ['Visa', 'Mastercard', 'Troy', 'AMEX'],
      supportedCardFamilies: ['Bonus', 'Axess', 'World', 'Maximum', 'Paraf', 'Bankkart Combo'],
    },
  },
];

const currencies = ['TRY', 'USD', 'EUR', 'GBP'];
const cardTypes = ['Credit', 'Debit', 'Prepaid'];
const cardFeatures = ['Commercial', 'Personal'];
const cardBrands = ['VISA/MC/TROY', 'AMEX'];
const cardFamilies = ['Bonus', 'Axess', 'World', 'Maximum', 'Paraf', 'Bankkart Combo'];

function VirtualPOSPermissions() {
  const navigate = useNavigate();
  const [posData, setPOSData] = useState<POSPermissions[]>(mockPOSData);

  const handlePermissionChange = (posId: string, field: string, value: any) => {
    setPOSData(prevData =>
      prevData.map(pos =>
        pos.id === posId
          ? {
              ...pos,
              permissions: {
                ...pos.permissions,
                [field]: value,
              },
            }
          : pos
      )
    );
  };

  const handleArrayPermissionToggle = (posId: string, field: string, item: string) => {
    setPOSData(prevData =>
      prevData.map(pos => {
        if (pos.id === posId) {
          if (field === 'supportedCardBrands' && item === 'VISA/MC/TROY') {
            const hasAll = ['Visa', 'Mastercard', 'Troy'].every(b => 
              pos.permissions.supportedCardBrands.includes(b)
            );
            
            const newBrands = hasAll
              ? pos.permissions.supportedCardBrands.filter(b => !['Visa', 'Mastercard', 'Troy'].includes(b))
              : [...new Set([...pos.permissions.supportedCardBrands, 'Visa', 'Mastercard', 'Troy'])];
            
            return {
              ...pos,
              permissions: {
                ...pos.permissions,
                supportedCardBrands: newBrands,
              },
            };
          }

          const currentArray = pos.permissions[field] as string[];
          const newArray = currentArray.includes(item)
            ? currentArray.filter(i => i !== item)
            : [...currentArray, item];
          
          return {
            ...pos,
            permissions: {
              ...pos.permissions,
              [field]: newArray,
            },
          };
        }
        return pos;
      })
    );
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/payment-systems/virtual-pos')}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sanal POS Yetkileri</h1>
      </div>

      <div className="space-y-6">
        {posData.map(pos => (
          <div
            key={pos.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {pos.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Boolean Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Temel İzinler
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Taksitli İşlem Yetkisi
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={pos.permissions.installmentAllowed}
                      onChange={(e) =>
                        handlePermissionChange(pos.id, 'installmentAllowed', e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVC'siz İşlem Yetkisi
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={pos.permissions.cvvlessAllowed}
                      onChange={(e) =>
                        handlePermissionChange(pos.id, 'cvvlessAllowed', e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Yurt Dışı Kart ile İşlem
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={pos.permissions.foreignCardAllowed}
                      onChange={(e) =>
                        handlePermissionChange(pos.id, 'foreignCardAllowed', e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                {/* Card Families Section - Only for Param POS */}
                {pos.id === 'param-pos-1' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Desteklenen Kart Aileleri
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {cardFamilies.map(family => (
                        <label
                          key={family}
                          className="relative flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {family}
                          </span>
                          <input
                            type="checkbox"
                            checked={pos.permissions.supportedCardFamilies?.includes(family)}
                            onChange={() =>
                              handleArrayPermissionToggle(pos.id, 'supportedCardFamilies', family)
                            }
                            className="form-checkbox h-5 w-5 text-primary-500 focus:ring-primary-500 rounded-md border-gray-300 dark:border-gray-600"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-select Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Desteklenen Özellikler
                </h3>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Para Birimleri
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currencies.map(currency => (
                      <label key={currency} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={pos.permissions.supportedCurrencies.includes(currency)}
                          onChange={() =>
                            handleArrayPermissionToggle(pos.id, 'supportedCurrencies', currency)
                          }
                          className="form-checkbox text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{currency}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Entegrasyon Tipi
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['3D', 'Non3D'].map(type => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={pos.permissions.integrationType.includes(type as '3D' | 'Non3D')}
                          onChange={() =>
                            handleArrayPermissionToggle(pos.id, 'integrationType', type)
                          }
                          className="form-checkbox text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Desteklenen Kart Tipleri
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cardTypes.map(type => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={pos.permissions.supportedCardTypes.includes(type)}
                          onChange={() =>
                            handleArrayPermissionToggle(pos.id, 'supportedCardTypes', type)
                          }
                          className="form-checkbox text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Desteklenen Kart Özellikleri
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cardFeatures.map(feature => (
                      <label key={feature} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={pos.permissions.supportedCardFeatures.includes(feature)}
                          onChange={() =>
                            handleArrayPermissionToggle(pos.id, 'supportedCardFeatures', feature)
                          }
                          className="form-checkbox text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Desteklenen Kart Markaları
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cardBrands.map(brand => (
                      <label key={brand} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={brand === 'VISA/MC/TROY' 
                            ? pos.permissions.supportedCardBrands.includes('Visa') &&
                              pos.permissions.supportedCardBrands.includes('Mastercard') &&
                              pos.permissions.supportedCardBrands.includes('Troy')
                            : pos.permissions.supportedCardBrands.includes(brand)}
                          onChange={() => handleArrayPermissionToggle(pos.id, 'supportedCardBrands', brand)}
                          className="form-checkbox text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualPOSPermissions;