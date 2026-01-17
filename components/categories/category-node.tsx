'use client';

import React, { useState } from 'react';
import { ChevronRight, Edit2, Eye, EyeOff, FolderTree, Plus, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Category } from '@/lib/types/category';
import { getRootTypeColor } from '@/lib/utils';

interface CategoryNodeProps {
  category: Category;
  onEdit: (category: Category) => void;
  onAddSub: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  selectedId?: string;
}

export const CategoryNode: React.FC<CategoryNodeProps> = ({ 
  category, 
  onEdit, 
  onAddSub, 
  onDelete, 
  onToggleActive, 
  selectedId 
}) => {
  const [isExpanded, setIsExpanded] = useState(category.level === 0);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="space-y-1">
      <div 
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer
          ${selectedId === category.id 
            ? 'bg-zinc-800 border border-zinc-700' 
            : 'hover:bg-zinc-800 border border-transparent'
          }
        `}
        onClick={() => onEdit(category)}
        style={{ marginLeft: `${category.level * 20}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        ) : (
          <div className="w-5" />
        )}

        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border">
          {category.imageUrl ? (
            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FolderTree className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{category.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">/{category.slug}</span>
            <Badge variant="outline" className={`text-xs ${getRootTypeColor(category.rootType)}`}>
              {category.rootType}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package className="w-3.5 h-3.5" />
          <span>{category.productCount}</span>
        </div>

        <Badge variant={category.isActive ? 'default' : 'secondary'}>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>

        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor"/>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};