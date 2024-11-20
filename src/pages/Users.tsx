import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Shield } from 'lucide-react';
import AddUserModal from '../components/users/AddUserModal';
import PermissionsModal from '../components/users/PermissionsModal';

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  {
    id: '1',
    name: 'Sedat Yazıcı',
    email: 'sy@example.com',
    userType: 'Portal',
    lastLogin: '2024-03-07T10:30:00',
    status: 'active',
  },
  {
    id: '2',
    name: 'Yılmaz Erdoğan',
    email: 'ye@example.com',
    userType: 'Portal',
    lastLogin: '2024-03-07T09:15:00',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mehmet Evirgen',
    email: 'me@example.com',
    userType: 'API',
    lastLogin: '2024-03-06T16:45:00',
    status: 'inactive',
  },
];

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (userData: any) => {
    // Burada API çağrısı yapılacak
    console.log('Yeni kullanıcı:', userData);
  };

  const handlePermissionsSave = (permissions: any) => {
    // Burada API çağrısı yapılacak
    console.log('Kullanıcı izinleri güncellendi:', { user: selectedUser?.id, permissions });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kullanıcılar</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kullanıcı Tipi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Son Giriş
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {user.userType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(user.lastLogin).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsPermissionsModalOpen(true);
                        }}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                        title="İzinleri Düzenle"
                      >
                        <Shield className="w-5 h-5" />
                      </button>
                      <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
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

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />

      {selectedUser && (
        <PermissionsModal
          isOpen={isPermissionsModalOpen}
          onClose={() => {
            setIsPermissionsModalOpen(false);
            setSelectedUser(null);
          }}
          onSave={handlePermissionsSave}
          userName={selectedUser.name}
          userType={selectedUser.userType}
        />
      )}
    </div>
  );
}

export default Users;