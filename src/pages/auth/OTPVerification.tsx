import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function OTPVerification() {
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = await verifyOTP(otp);
    if (isValid) {
      navigate('/');
    } else {
      setError('Geçersiz doğrulama kodu. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-500">Lidya PAY</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">SMS Doğrulama</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            SMS Doğrulama Kodu
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Telefonunuza gönderilen 6 haneli doğrulama kodunu girin
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setOTP(value);
                }}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500 text-center text-2xl tracking-wider"
                placeholder="______"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Doğrula
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;