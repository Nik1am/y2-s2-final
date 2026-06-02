import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random()}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2 border rounded-lg text-gray-900',
            'dark:bg-gray-700 dark:text-white dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {helpText && !error && <p className="text-gray-500 text-sm mt-1">{helpText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
