import { TableSkeleton } from '@/components/common/skeleton-loaders';

export default function Loading() {
    return <TableSkeleton rows={10} />;
}
