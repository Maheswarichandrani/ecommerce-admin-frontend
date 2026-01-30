import { StatsCardsSkeleton } from '@/components/shared/skeleton-loaders';
import { TableSkeleton } from '@/components/shared/skeleton-loaders';

export default function Loading() {
    return (
        <div className="space-y-6">
            <StatsCardsSkeleton count={3} />
            <TableSkeleton rows={8} />
        </div>
    );
}
