import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Common
    'app.title': 'Lidya PAY',
    'app.subtitle': 'Üye İşyeri Portalı',

    // Login Page
    'login.title': 'Giriş Yap',
    'login.subtitle': 'Üye İşyeri Portalına Hoşgeldiniz',
    'login.merchantId': 'Üye İşyeri ID',
    'login.username': 'Kullanıcı Adı',
    'login.password': 'Şifre',
    'login.loginButton': 'Giriş Yap',
    'login.forgotPassword': 'Şifremi Unuttum',
    'login.error': 'Geçersiz kullanıcı bilgileri',
    'login.resetPassword': 'Şifre Sıfırlama',
    'login.resetPasswordButton': 'Şifremi Sıfırla',
    'login.backToLogin': 'Giriş Ekranına Dön',

    // OTP Page
    'otp.title': 'SMS Doğrulama',
    'otp.subtitle': 'SMS Doğrulama Kodu',
    'otp.description': 'Telefonunuza gönderilen 6 haneli doğrulama kodunu girin',
    'otp.placeholder': '______',
    'otp.timeRemaining': 'Kalan süre:',
    'otp.resendButton': 'SMS\'i Tekrar Gönder',
    'otp.verifyButton': 'Doğrula',
    'otp.error': 'Geçersiz doğrulama kodu. Lütfen tekrar deneyiniz.',

    // Navigation
    'nav.dashboard': 'Üye İşyeri Özeti',
    'nav.paymentSystems': 'Ödeme Sistemleri',
    'nav.paymentSystems.virtualPOS': 'Sanal POS Yönetimi',
    'nav.paymentSystems.virtualPOSPermissions': 'Sanal POS Yetkileri',
    'nav.commissionRates': 'Komisyon Oranları',
    'nav.users': 'Kullanıcılar',
    'nav.paymentLinks': 'Ödeme Linki',
    'nav.recurringPayments': 'Tekrarlı Ödeme',
    'nav.splitPayments': 'Parçalı Ödeme',
    'nav.integration': 'Entegrasyon & API',
    'nav.manualPOS': 'Manuel POS',
    'nav.reconciliation': 'Mutabakat',
    'nav.reconciliation.fileUpload': 'Dosya Yükleme',
    'nav.reconciliation.manualUpload': 'Manuel Yükleme',
    'nav.reconciliation.ftpSettings': 'FTP Ayarları',
    'nav.reconciliation.transactionReports': 'İşlem Raporları',
    'nav.reconciliation.matchedTransactions': 'Eşleşen İşlemler',
    'nav.reconciliation.unmatchedTransactions': 'Eşleşmeyen İşlemler',
    'nav.reconciliation.allTransactions': 'Tüm İşlemler',
    'nav.reports': 'Raporlar',
    'nav.reports.transactions': 'İşlem Raporları',
    'nav.reports.activities': 'Aktivite Raporları',
    'nav.settings': 'Özellikler',
    'nav.settings.routing': 'Kesintisiz İşlem Yönlendirme',
    'nav.settings.bin': 'BIN Yönlendirme Kuralı',
    'nav.settings.binActions': 'BIN Bazlı Aksiyonlar',

    // Header
    'header.logout': 'Çıkış Yap',
    'header.notifications': 'Bildirimler',
  },
  en: {
    // Common
    'app.title': 'Lidya PAY',
    'app.subtitle': 'Merchant Portal',

    // Login Page
    'login.title': 'Login',
    'login.subtitle': 'Welcome to Merchant Portal',
    'login.merchantId': 'Merchant ID',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.loginButton': 'Login',
    'login.forgotPassword': 'Forgot Password',
    'login.error': 'Invalid credentials',
    'login.resetPassword': 'Reset Password',
    'login.resetPasswordButton': 'Reset My Password',
    'login.backToLogin': 'Back to Login',

    // OTP Page
    'otp.title': 'SMS Verification',
    'otp.subtitle': 'SMS Verification Code',
    'otp.description': 'Enter the 6-digit verification code sent to your phone',
    'otp.placeholder': '______',
    'otp.timeRemaining': 'Time remaining:',
    'otp.resendButton': 'Resend SMS',
    'otp.verifyButton': 'Verify',
    'otp.error': 'Invalid verification code. Please try again.',

    // Navigation
    'nav.dashboard': 'Merchant Summary',
    'nav.paymentSystems': 'Payment Systems',
    'nav.paymentSystems.virtualPOS': 'Virtual POS Management',
    'nav.paymentSystems.virtualPOSPermissions': 'Virtual POS Permissions',
    'nav.commissionRates': 'Commission Rates',
    'nav.users': 'Users',
    'nav.paymentLinks': 'Payment Link',
    'nav.recurringPayments': 'Recurring Payment',
    'nav.splitPayments': 'Split Payment',
    'nav.integration': 'Integration & API',
    'nav.manualPOS': 'Manual POS',
    'nav.reconciliation': 'Reconciliation',
    'nav.reconciliation.fileUpload': 'File Upload',
    'nav.reconciliation.manualUpload': 'Manual Upload',
    'nav.reconciliation.ftpSettings': 'FTP Settings',
    'nav.reconciliation.transactionReports': 'Transaction Reports',
    'nav.reconciliation.matchedTransactions': 'Matched Transactions',
    'nav.reconciliation.unmatchedTransactions': 'Unmatched Transactions',
    'nav.reconciliation.allTransactions': 'All Transactions',
    'nav.reports': 'Reports',
    'nav.reports.transactions': 'Transaction Reports',
    'nav.reports.activities': 'Activity Reports',
    'nav.settings': 'Features',
    'nav.settings.routing': 'Uninterrupted Transaction Routing',
    'nav.settings.bin': 'BIN Routing Rule',
    'nav.settings.binActions': 'BIN Based Actions',

    // Header
    'header.logout': 'Logout',
    'header.notifications': 'Notifications',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to 'tr'
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'tr') ? savedLanguage : 'tr';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export type { Language, LanguageContextType };