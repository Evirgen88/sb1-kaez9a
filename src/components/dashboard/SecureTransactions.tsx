import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BankTransactionData } from '../../types/dashboard';

interface Props {
  data: BankTransactionData[];
}

function SecureTransactions({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        3D Secure Analizi
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bankName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="secure3D"
              name="3D Secure"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="nonSecure"
              name="Non-Secure"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SecureTransactions;