import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '../../types/dashboard';
import { CalendarDays } from 'lucide-react';

interface Props {
  data: ChartData[];
}

function TransactionChart({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">İşlem Trendi</h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarDays className="w-4 h-4 mr-1" />
          <span>Son 7 gün</span>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) => new Date(str).toLocaleDateString('tr-TR')}
              stroke="#9CA3AF"
            />
            <YAxis
              tickFormatter={(value) => 
                new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
              stroke="#9CA3AF"
            />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TransactionChart;