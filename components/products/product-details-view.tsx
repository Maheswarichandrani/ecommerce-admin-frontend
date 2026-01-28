// components/products/product-details-view.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Package, DollarSign, Tag, Layers, Sparkles, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';

interface ProductDetailsViewProps {
    product: Product;
}

export function ProductDetailsView({ product }: ProductDetailsViewProps) {
    const router = useRouter();
    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push('/admin/products')}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-semibold text-foreground">
                                        {product.name}
                                    </h1>
                                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                    {product.isCustomizable && (
                                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Customizable
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    SKU: {product.sku}
                                </p>
                            </div>
                        </div>
                        <Button onClick={() => router.push(`/admin/products/${product.id}/edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Base Price</p>
                                            <p className="text-2xl font-semibold">{formatCurrency(product.basePrice)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                            <Package className="w-5 h-5 text-green-600 dark:text-green-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Stock</p>
                                            <p className="text-2xl font-semibold">{totalStock}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Variants</p>
                                            <p className="text-2xl font-semibold">{product.variants.length}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Details Tabs */}
                        <Card>
                            <Tabs defaultValue="details" className="w-full">
                                <CardHeader className="border-b">
                                    <TabsList className="w-full justify-start">
                                        <TabsTrigger value="details">Product Details</TabsTrigger>
                                        <TabsTrigger value="variants">Variants ({product.variants.length})</TabsTrigger>
                                        <TabsTrigger value="customization">Customization</TabsTrigger>
                                    </TabsList>
                                </CardHeader>

                                <CardContent className="pt-6">
                                    <TabsContent value="details" className="space-y-6 mt-0">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Product Name</p>
                                                <p className="text-base">{product.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">SKU</p>
                                                <p className="text-base font-mono">{product.sku}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
                                                <Badge variant="outline">{product.category?.name || 'Uncategorized'}</Badge>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Material</p>
                                                <p className="text-base">{product.material || 'Not specified'}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                                <p className="text-base text-muted-foreground leading-relaxed">
                                                    {product.description || 'No description available'}
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="variants" className="mt-0">
                                        <div className="space-y-3">
                                            {product.variants.map((variant, index) => (
                                                <Card key={index} className="border">
                                                    <CardContent className="pt-4">
                                                        <div className="grid grid-cols-5 gap-4 items-center">
                                                            <div>
                                                                <p className="text-xs text-muted-foreground mb-1">Size</p>
                                                                <Badge variant="outline" className="font-mono">
                                                                    {variant.size.toUpperCase()}
                                                                </Badge>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground mb-1">Color</p>
                                                                <div className="flex items-center gap-2">
                                                                    <div
                                                                        className="w-6 h-6 rounded border border-border"
                                                                        style={{ backgroundColor: variant.colorHex }}
                                                                    />
                                                                    <span className="text-sm">{variant.color}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground mb-1">Stock</p>
                                                                <p className="text-sm font-semibold">{variant.stock} units</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground mb-1">SKU</p>
                                                                <p className="text-sm font-mono">{variant.sku}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground mb-1">Images</p>
                                                                <p className="text-sm">{variant.images?.length || 0} images</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="customization" className="mt-0">
                                        {product.isCustomizable ? (
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                                                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                                                            Customization Enabled
                                                        </h4>
                                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                                            This product allows customers to add embroidery, upload custom designs, and personalize their order.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Card className="border-dashed">
                                                        <CardContent className="pt-6">
                                                            <h4 className="font-medium mb-2">Available Options</h4>
                                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                                <li>• Custom embroidery text</li>
                                                                <li>• Design upload</li>
                                                                <li>• Position selection</li>
                                                                <li>• Font & color choices</li>
                                                            </ul>
                                                        </CardContent>
                                                    </Card>
                                                    <Card className="border-dashed">
                                                        <CardContent className="pt-6">
                                                            <h4 className="font-medium mb-2">Additional Charges</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Customization fees will be calculated based on complexity and size selected by the customer.
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-muted-foreground">Customization is not enabled for this product</p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </CardContent>
                            </Tabs>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Product Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Visibility</span>
                                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                                        {product.isActive ? 'Published' : 'Draft'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Stock Status</span>
                                    <Badge variant={totalStock > 0 ? 'default' : 'destructive'}>
                                        {totalStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Meta Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Meta Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Created</p>
                                        <p className="text-sm font-medium">{formatDate(product.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(product.updatedAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Product ID</p>
                                        <p className="text-sm font-mono">{product.id}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-destructive hover:text-destructive"
                                >
                                    <Package className="w-4 h-4 mr-2" />
                                    Duplicate Product
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
