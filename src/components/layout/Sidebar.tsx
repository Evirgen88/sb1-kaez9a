import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Link as LinkIcon,
  RefreshCw,
  Split,
  FileText,
  Settings,
  FileBarChart,
  History,
  Code,
  Terminal,
  Upload,
  FileCheck,
  FileX,
  Files,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Shield,
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/' },
  {
    icon: CreditCard,
    labelKey: 'nav.paymentSystems',
    path: '/payment-systems',
    subItems: [
      { icon: CreditCard, labelKey: 'nav.paymentSystems.virtualPOS', path: '/payment-systems/virtual-pos' },
      { icon: Shield, labelKey: 'nav.paymentSystems.virtualPOSPermissions', path: '/payment-systems/virtual-pos/permissions' },
    ],
  },
  { icon: Users, labelKey: 'nav.users', path: '/users' },
  { icon: Terminal, labelKey: 'nav.manualPOS', path: '/manual-pos' },
  { icon: LinkIcon, labelKey: 'nav.paymentLinks', path: '/payment-links' },
  { icon: RefreshCw, labelKey: 'nav.recurringPayments', path: '/recurring-payments' },
  { icon: Split, labelKey: 'nav.splitPayments', path: '/split-payments' },
  { icon: ArrowLeftRight, labelKey: 'nav.commissionRates', path: '/commission-management' },
  {
    icon: ArrowLeftRight,
    labelKey: 'nav.reconciliation',
    path: '/reconciliation',
    subItems: [
      {
        icon: Upload,
        labelKey: 'nav.reconciliation.fileUpload',
        path: '/reconciliation/upload',
        subItems: [
          { icon: Upload, labelKey: 'nav.reconciliation.manualUpload', path: '/reconciliation/upload/manual' },
          { icon: Settings, labelKey: 'nav.reconciliation.ftpSettings', path: '/reconciliation/upload/ftp' },
        ],
      },
      {
        icon: Files,
        labelKey: 'nav.reconciliation.transactionReports',
        path: '/reconciliation/transactions',
        subItems: [
          { icon: FileCheck, labelKey: 'nav.reconciliation.matchedTransactions', path: '/reconciliation/transactions/matched' },
          { icon: FileX, labelKey: 'nav.reconciliation.unmatchedTransactions', path: '/reconciliation/transactions/unmatched' },
          { icon: Files, labelKey: 'nav.reconciliation.allTransactions', path: '/reconciliation/transactions/all' },
        ],
      },
    ],
  },
  {
    icon: FileText,
    labelKey: 'nav.reports',
    path: '/reports',
    subItems: [
      { icon: FileBarChart, labelKey: 'nav.reports.transactions', path: '/reports/transactions' },
      { icon: History, labelKey: 'nav.reports.activities', path: '/reports/activities' },
    ],
  },
  {
    icon: Settings,
    labelKey: 'nav.settings',
    path: '/settings',
    subItems: [
      { icon: ArrowLeftRight, labelKey: 'nav.settings.routing', path: '/settings/routing' },
      { icon: CreditCard, labelKey: 'nav.settings.bin', path: '/settings/bin' },
      { icon: Shield, labelKey: 'nav.settings.binActions', path: '/settings/bin-actions' },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Add Integration & API at the bottom
  const bottomMenuItem: MenuItem = {
    icon: Code,
    labelKey: 'nav.integration',
    path: '/integration',
  };

  const toggleMenu = (path: string) => {
    setOpenMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isMenuOpen = (path: string) => openMenus.includes(path);
  const isActive = (path: string) => location.pathname === path;

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isCurrentMenuOpen = isMenuOpen(item.path);
    const isCurrentActive = isActive(item.path) || 
      (hasSubItems && item.subItems?.some(subItem => location.pathname.startsWith(subItem.path)));

    return (
      <div key={item.path} className="mb-1">
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? () => toggleMenu(item.path) : undefined}
          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isCurrentActive
              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
          }`}
          style={{ paddingLeft: `${depth * 1 + 1}rem` }}
        >
          <div className="flex items-center">
            <item.icon className="w-5 h-5 mr-3" />
            {t(item.labelKey)}
          </div>
          {hasSubItems && (
            isCurrentMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </Link>
        
        {hasSubItems && isCurrentMenuOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {item.subItems.map(subItem => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-500">Lidya PAY</h1>
      </div>
      <nav className="px-4 flex flex-col h-[calc(100vh-180px)] justify-between">
        <div className="overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
          {renderMenuItem(bottomMenuItem)}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;