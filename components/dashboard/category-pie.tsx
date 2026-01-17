'use client';

import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryData } from '@/lib/types/dashboard';

interface CategoryPieProps {
  data: CategoryData[];
}

export function CategoryPie({ data }: CategoryPieProps) {
  return (
    <Card className="admin-chart-container">
      <div className="admin-chart-header">
        <h3 className="admin-chart-title">Revenue by Category</h3>
        <p className="admin-chart-subtitle">Sales distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent } : any) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
