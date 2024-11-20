import React from 'react';
import { KPICardProps } from '../../types/dashboard';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function KPICard({ title, value, change, icon }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        <span
          className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          %{Math.abs(change)}
        </span>
      </div>
    </div>
  );
}

export default KPICard;