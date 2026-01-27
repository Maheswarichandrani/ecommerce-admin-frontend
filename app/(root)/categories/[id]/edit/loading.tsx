import { FormSkeleton } from '@/components/common/skeleton-loaders';

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto">
            <FormSkeleton />
        </div>
    );
}
