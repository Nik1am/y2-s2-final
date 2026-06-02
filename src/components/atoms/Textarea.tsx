import React from 'react';
import { cn } from '../../utils/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random()}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
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

Textarea.displayName = 'Textarea';
