import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

function Footer() {
  return (
    <footer className="ml-64 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-8 sticky bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          2024 © Lidya PAY Tüm hakları saklıdır.
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <ShieldCheck className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">PCI-DSS Certified</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Lock className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">256-bit SSL Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;