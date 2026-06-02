import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-lg shadow-md border border-gray-200 p-6',
        'dark:bg-gray-800 dark:border-gray-700',
        hoverable && 'hover:shadow-lg transition-shadow duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
