import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LogOut, User, Bell, Globe, Sun, Moon } from 'lucide-react';
import UserProfileModal from '../users/UserProfileModal';

function Header() {
  const { logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'Sistem bakımı nedeniyle yarın 03:00-05:00 arası kesinti olacaktır.',
      date: '2024-03-08 15:30'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Son 24 saatte başarısız işlem oranında artış tespit edildi.',
      date: '2024-03-08 14:15'
    },
    {
      id: 3,
      type: 'success',
      message: 'Yeni API versiyonu yayınlandı. Dokümantasyonu kontrol edin.',
      date: '2024-03-08 12:00'
    },
    {
      id: 4,
      type: 'info',
      message: 'Haftalık işlem raporu hazır.',
      date: '2024-03-08 09:30'
    }
  ];

  return (
    <>
      <header className="fixed top-0 right-0 left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="h-full px-6 flex items-center justify-end">
          <div className="flex items-center space-x-6">
            {/* Bildirimler */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bildirimler</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                            notification.type === 'info' ? 'bg-blue-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'success' ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {new Date(notification.date).toLocaleString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Tüm bildirimleri gör
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kullanıcı Adı */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
            >
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mehmet Evirgen
              </span>
            </button>

            {/* Dil Seçimi */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              {language.toUpperCase()}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {/* Çıkış Butonu */}
            <button
              onClick={logout}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('header.logout')}
            </button>
          </div>
        </div>
      </header>

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}

export default Header;