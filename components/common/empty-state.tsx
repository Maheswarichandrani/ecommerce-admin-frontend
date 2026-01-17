'use client';

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="admin-empty-state">
      <Icon className="admin-empty-icon" />
      <h3 className="admin-empty-title">{title}</h3>
      {description && <p className="admin-empty-description">{description}</p>}
    </div>
  );
}