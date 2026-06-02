import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms';
import { Header, Navigation } from '../components/organisms';

export const NotFound: React.FC = () => (
  <>
    <Header />
    <Navigation />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">Page Not Found</p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </main>
  </>
);
