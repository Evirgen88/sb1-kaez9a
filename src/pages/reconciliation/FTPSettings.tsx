import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { FTPSettings as FTPSettingsType } from '../../types/reconciliation';
import AddFTPSettingModal from '../../components/reconciliation/AddFTPSettingModal';

const initialFTPSettings: FTPSettingsType[] = [
  {
    id: '1',
    bankName: 'Garanti BBVA',
    accountName: 'Garanti FTP',
    host: 'ftp.garanti.com.tr',
    port: 21,
    username: 'merchant1',
    password: '********',
    remotePath: '/settlement/files',
    filePattern: 'SETTLE_*.csv',
    isActive: true,
    lastSync: '2024-03-07T15:30:00',
  },
  {
    id: '2',
    bankName: 'Yapı Kredi',
    accountName: 'YKB SFTP',
    host: 'sftp.yapikredi.com.tr',
    port: 22,
    username: 'merchant2',
    password: '********',
    remotePath: '/files/settlement',
    filePattern: 'SETTLEMENT_*.txt',
    isActive: false,
    lastSync: '2024-03-07T12:15:00',
  },
];

function FTPSettings() {
  const [settings, setSettings] = useState<FTPSettingsType[]>(initialFTPSettings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleToggleActive = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, isActive: !setting.isActive } : setting
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu FTP ayarını silmek istediğinizden emin misiniz?')) {
      setSettings(prevSettings => prevSettings.filter(setting => setting.id !== id));
    }
  };

  const handleSubmit = (data: Omit<FTPSettingsType, 'id' | 'lastSync'>) => {
    if (editingId) {
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === editingId
            ? { ...setting, ...data }
            : setting
        )
      );
      setEditingId(null);
    } else {
      const newSetting: FTPSettingsType = {
        ...data,
        id: `ftp-${Date.now()}`,
      };
      setSettings(prevSettings => [...prevSettings, newSetting]);
    }
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FTP Ayarları</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni FTP Ayarı
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Banka
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hesap Adı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sunucu
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Son Senkronizasyon
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {settings.map((setting) => (
                <tr key={setting.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {setting.bankName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {setting.accountName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {setting.host}:{setting.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {setting.lastSync
                      ? new Date(setting.lastSync).toLocaleString('tr-TR')
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.isActive}
                        onChange={() => handleToggleActive(setting.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setEditingId(setting.id);
                          setShowAddModal(true);
                        }}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(setting.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddFTPSettingModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingId(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingId ? settings.find(s => s.id === editingId) : undefined}
      />
    </div>
  );
}

export default FTPSettings;