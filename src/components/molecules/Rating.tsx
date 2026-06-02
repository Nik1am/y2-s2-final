import React, { useState } from 'react';
import { cn } from '../../utils/helpers';

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({ value = 0, onChange, readOnly = false, size = 'md' }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const displayValue = hoverValue || value;

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className={cn(
            sizeClasses[size],
            'transition-colors duration-200',
            !readOnly && 'cursor-pointer hover:scale-110',
            readOnly && 'cursor-default',
            displayValue >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          )}
        >
          ★
        </button>
      ))}
    </div>
  );
};
