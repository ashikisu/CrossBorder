import React from 'react';
import { TrustCategory } from '../types';
import { DataService } from '../services/dataService';
import clsx from 'clsx';

interface CategoryBadgeProps {
  category: TrustCategory;
  size?: 'sm' | 'md' | 'lg';
  showRange?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'md',
  showRange = false,
}) => {
  const categoryInfo = DataService.getCategoryInfo(category);

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        categoryInfo.bgColor,
        categoryInfo.textColor,
        sizeClasses[size]
      )}
    >
      {category} - {categoryInfo.label}
      {showRange && ` (${categoryInfo.trustRange})`}
    </span>
  );
};