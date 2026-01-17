'use client';

import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Users, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MetricData } from '@/lib/types/dashboard';

const iconMap = {
  ShoppingCart,
  DollarSign,
  Users,
  AlertCircle
};

interface  MetricsCardsProps {
  metrics: MetricData[];
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="admin-dashboard-grid">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap];
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        const trendClass = metric.trend === 'up'
          ? 'admin-metric-change-positive'
          : 'admin-metric-change-negative';

        return (
          <Card key={metric.label} className="admin-metric-card">
            <div className="admin-metric-header">
              <span className="admin-metric-title">{metric.label}</span>
              <Icon className="admin-metric-icon" />
            </div>
            <div className="admin-metric-value">{metric.value}</div>
            <div className={`admin-metric-change ${trendClass}`}>
              <TrendIcon className="w-3 h-3 inline mr-1" />
              {metric.change}
            </div>
          </Card>
        );
      })}
    </div>
  );
}