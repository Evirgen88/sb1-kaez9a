import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoginForm {
  merchantId: string;
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [loginForm, setLoginForm] = useState<LoginForm>({
    merchantId: '',
    username: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = await login(loginForm.merchantId, loginForm.username, loginForm.password);
    if (isValid) {
      navigate('/otp');
    } else {
      setError(t('login.error'));
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('login.resetPasswordButton'));
    setShowResetModal(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Globe className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'EN' : 'TR'}
            </span>
          </button>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-500">{t('app.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('app.subtitle')}</p>
        </div>

        {/* Login Form */}
        {!showResetModal && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('login.title')}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.merchantId')}
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.merchantId}
                  onChange={(e) => setLoginForm({ ...loginForm, merchantId: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('login.merchantId')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.username')}
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('login.username')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                    placeholder={t('login.password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                {t('login.loginButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t('login.forgotPassword')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Reset Modal */}
        {showResetModal && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('login.resetPassword')}
            </h2>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.merchantId')}
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.merchantId}
                  onChange={(e) => setLoginForm({ ...loginForm, merchantId: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('login.merchantId')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.username')}
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('login.username')}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  {t('login.resetPasswordButton')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {t('login.backToLogin')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;