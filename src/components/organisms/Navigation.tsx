import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/diary', label: 'Diary' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-3 py-4 text-sm font-medium border-b-2 transition-colors',
                location.pathname === item.path
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
