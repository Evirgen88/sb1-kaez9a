import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HourlyTransactionData } from '../../types/dashboard';
import { CalendarDays } from 'lucide-react';

interface Props {
  data: HourlyTransactionData[];
}

function HourlyDistribution({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Saatlik İşlem Dağılımı
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarDays className="w-4 h-4 mr-1" />
          <span>Son 24 saat</span>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickFormatter={(hour) => `${hour}:00`}
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [value, name === 'count' ? 'İşlem Sayısı' : 'Tutar']}
              labelFormatter={(hour) => `Saat: ${hour}:00`}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyDistribution;