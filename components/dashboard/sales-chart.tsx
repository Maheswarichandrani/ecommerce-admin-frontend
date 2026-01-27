'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/types/dashboard'

interface SalesChartProps {
  data: ChartDataPoint[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="admin-chart-container">
      <div className="admin-chart-header">
        <h3 className="admin-chart-title">Sales Overview</h3>
        <p className="admin-chart-subtitle">Monthly sales and orders</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#ec4899" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}