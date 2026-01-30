import {
    DashboardSkeleton,
    TableSkeleton,
    FormSkeleton,
    ProductGridSkeleton,
    DetailsViewSkeleton,
    StatsCardsSkeleton,
    CategoryTreeSkeleton
} from '@/components/shared/skeleton-loaders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SkeletonDemo() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Skeleton Loaders Demo</h1>
                <p className="text-muted-foreground mt-2">
                    Preview all skeleton loading states with shimmer effect
                </p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="tree">Tree</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                    <DashboardSkeleton />
                </TabsContent>

                <TabsContent value="table" className="mt-6">
                    <TableSkeleton rows={8} />
                </TabsContent>

                <TabsContent value="form" className="mt-6">
                    <FormSkeleton />
                </TabsContent>

                <TabsContent value="grid" className="mt-6">
                    <ProductGridSkeleton count={8} />
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                    <DetailsViewSkeleton />
                </TabsContent>

                <TabsContent value="stats" className="mt-6">
                    <StatsCardsSkeleton count={4} />
                </TabsContent>

                <TabsContent value="tree" className="mt-6">
                    <CategoryTreeSkeleton />
                </TabsContent>
            </Tabs>
        </div>
    );
}
