import { StatsCardsSkeleton } from '@/components/common/skeleton-loaders';
import { TableSkeleton } from '@/components/common/skeleton-loaders';

export default function Loading() {
    return (
        <div className="space-y-6">
            <StatsCardsSkeleton count={3} />
            <TableSkeleton rows={8} />
        </div>
    );
}
