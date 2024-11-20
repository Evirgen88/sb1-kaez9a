import React, { useState } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pos: {
    id: string;
    name: string;
  };
}

interface CommissionSchema {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  currencies: string[];
  rules: CommissionRule[];
}

interface CommissionRule {
  id: string;
  installment: number;
  commission: number;
  currency: string;
  cardTypes: string[];
}

function CommissionSchemaModal({ isOpen, onClose, pos }: Props) {
  const [schemas, setSchemas] = useState<CommissionSchema[]>([
    {
      id: '1',
      name: 'Standart Şema',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      currencies: ['TRY'],
      rules: [
        {
          id: '1',
          installment: 1,
          commission: 1.60,
          currency: 'TRY',
          cardTypes: ['credit', 'debit'],
        },
      ],
    },
  ]);
  const [expandedSchema, setExpandedSchema] = useState<string | null>('1');
  const [showNewSchema, setShowNewSchema] = useState(false);

  if (!isOpen) return null;

  const handleAddSchema = () => {
    const newSchema: CommissionSchema = {
      id: Date.now().toString(),
      name: 'Yeni Şema',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
      currencies: ['TRY'],
      rules: [],
    };
    setSchemas([...schemas, newSchema]);
    setExpandedSchema(newSchema.id);
  };

  const handleAddRule = (schemaId: string) => {
    const schema = schemas.find(s => s.id === schemaId);
    if (!schema) return;

    const newRule: CommissionRule = {
      id: Date.now().toString(),
      installment: 1,
      commission: 0,
      currency: schema.currencies[0],
      cardTypes: ['credit'],
    };

    setSchemas(schemas.map(s => 
      s.id === schemaId 
        ? { ...s, rules: [...s.rules, newRule] }
        : s
    ));
  };

  const handleRemoveRule = (schemaId: string, ruleId: string) => {
    setSchemas(schemas.map(s => 
      s.id === schemaId 
        ? { ...s, rules: s.rules.filter(r => r.id !== ruleId) }
        : s
    ));
  };

  const handleUpdateRule = (schemaId: string, ruleId: string, field: keyof CommissionRule, value: any) => {
    setSchemas(schemas.map(s => 
      s.id === schemaId 
        ? {
            ...s,
            rules: s.rules.map(r =>
              r.id === ruleId
                ? { ...r, [field]: value }
                : r
            ),
          }
        : s
    ));
  };

  const handleUpdateSchema = (schemaId: string, field: keyof CommissionSchema, value: any) => {
    setSchemas(schemas.map(s =>
      s.id === schemaId
        ? { ...s, [field]: value }
        : s
    ));
  };

  const toggleSchema = (schemaId: string) => {
    setExpandedSchema(expandedSchema === schemaId ? null : schemaId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving schemas:', schemas);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Komisyon Şemaları
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{pos.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {schemas.map((schema) => (
            <div
              key={schema.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
                onClick={() => toggleSchema(schema.id)}
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{schema.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(schema.startDate).toLocaleDateString()} - {new Date(schema.endDate).toLocaleDateString()}
                  </p>
                </div>
                {expandedSchema === schema.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>

              {expandedSchema === schema.id && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Para Birimleri
                      </label>
                      <select
                        multiple
                        value={schema.currencies}
                        onChange={(e) => {
                          const values = Array.from(e.target.selectedOptions, option => option.value);
                          handleUpdateSchema(schema.id, 'currencies', values);
                        }}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="TRY">TRY</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {schema.rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Taksit
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="12"
                            value={rule.installment}
                            onChange={(e) => handleUpdateRule(schema.id, rule.id, 'installment', parseInt(e.target.value))}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Komisyon (%)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={rule.commission}
                            onChange={(e) => handleUpdateRule(schema.id, rule.id, 'commission', parseFloat(e.target.value))}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Kart Tipleri
                          </label>
                          <select
                            multiple
                            value={rule.cardTypes}
                            onChange={(e) => {
                              const values = Array.from(e.target.selectedOptions, option => option.value);
                              handleUpdateRule(schema.id, rule.id, 'cardTypes', values);
                            }}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="credit">Kredi Kartı</option>
                            <option value="debit">Banka Kartı</option>
                          </select>
                        </div>

                        <div className="flex items-end pb-1">
                          <button
                            type="button"
                            onClick={() => handleRemoveRule(schema.id, rule.id)}
                            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddRule(schema.id)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-900/50 dark:text-primary-400 dark:hover:bg-primary-900/75"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Kural Ekle
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleAddSchema}
              className="flex items-center px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-900/50 dark:text-primary-400 dark:hover:bg-primary-900/75"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Şema Ekle
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommissionSchemaModal;