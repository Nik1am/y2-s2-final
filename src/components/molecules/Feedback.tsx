import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  </div>
);

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
    <p className="text-red-800 dark:text-red-200">Error: {message}</p>
  </div>
);
