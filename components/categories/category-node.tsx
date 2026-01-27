'use client';

import React, { useState } from 'react';
import { ChevronRight, Edit2, Eye, EyeOff, FolderTree, Plus, Trash2, Package, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Category } from '@/types/category';
import { getRootTypeColor } from '@/lib/utils';
import Image from 'next/image';

interface CategoryNodeProps {
  category: Category;
  onEdit: (category: Category) => void;
  onAddSub: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const CategoryNode: React.FC<CategoryNodeProps> = ({
  category,
  onEdit,
  onAddSub,
  onDelete,
  onToggleActive
}) => {
  const [isExpanded, setIsExpanded] = useState(category.level === 0);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="space-y-1">
      <div
        className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:bg-accent/50 border border-transparent group"
        style={{ marginLeft: `${category.level * 20}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        ) : (
          <div className="w-6" />
        )}

        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted border border-border">
          {category.imageUrl ? (
            <Image src={category.imageUrl} alt={category.name} width={56} height={56} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <FolderTree className="w-6 h-6 text-primary/50" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">{category.name}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">/{category.slug}</span>
            <Badge variant="outline" className={`text-xs ${getRootTypeColor(category.rootType)}`}>
              {category.rootType}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Package className="w-4 h-4" />
            <span className="font-medium">{category.productCount}</span>
          </div>

          <Badge variant={category.isActive ? 'default' : 'secondary'} className="font-medium">
            {category.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <div className="hover:bg-accent/50 transition-opacity cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuItem onClick={() => onEdit(category)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddSub(category)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Sub-Category
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleActive(category.id)}>
                {category.isActive ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {category.isActive ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(category.id)} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {category.children!.map(child => (
            <CategoryNode
              key={child.id}
              category={child}
              onEdit={onEdit}
              onAddSub={onAddSub}
              onDelete={onDelete}
              onToggleActive={onToggleActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};