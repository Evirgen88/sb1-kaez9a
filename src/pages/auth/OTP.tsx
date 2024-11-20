import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

function OTP() {
  const navigate = useNavigate();
  const { isAuthorized, verifyOtp } = useAuth();
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = await verifyOtp(otp);
    if (isValid) {
      navigate('/');
    } else {
      setError(t('otp.error'));
    }
  };

  const handleResendOTP = async () => {
    // Reset timer and resend flag
    setTimeLeft(180);
    setCanResend(false);
    setOtp('');
    setError('');
    
    // Here you would typically call your API to resend the OTP
    // For now, we'll just show a success message
    alert(t('otp.resendButton'));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-500">{t('app.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('otp.title')}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('otp.subtitle')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {t('otp.description')}
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
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-2xl tracking-widest rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('otp.placeholder')}
              />
            </div>

            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('otp.timeRemaining')} <span className="font-medium">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t('otp.resendButton')}
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              {t('otp.verifyButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;