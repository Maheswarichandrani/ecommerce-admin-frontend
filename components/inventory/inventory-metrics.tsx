'use client';

import { Card } from '@/components/ui/card';

interface InventoryMetric {
  label: string;
  value: number;
  colorClass?: string;
}

interface InventoryMetricsProps {
  metrics: InventoryMetric[];
}

export function InventoryMetrics({ metrics }: InventoryMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="admin-metric-card">
          <div className="admin-metric-title">{metric.label}</div>
          <div className={`admin-metric-value text-2xl ${metric.colorClass || ''}`}>
            {metric.value}
          </div>
        </Card>
      ))}
    </div>
  );
}