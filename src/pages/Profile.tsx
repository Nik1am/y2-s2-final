import React, { useState } from 'react';
import { Header, Navigation, ProfileForm } from '../components/organisms';
import { LoadingSpinner, ErrorMessage } from '../components/molecules';
import { apiService } from '../services/api';
import { localStorageService } from '../utils/localStorage';
import type { User } from '../types';

const USER_STORAGE_KEY = 'school_user_profile';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to load from localStorage first
        const cachedUser = localStorageService.get<User>(USER_STORAGE_KEY);
        if (cachedUser) {
          setUser(cachedUser);
        }

        // Fetch fresh data from API
        const userData = await apiService.getUser();
        setUser(userData);
        localStorageService.set(USER_STORAGE_KEY, userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        // Try to use cached user if API fails
        const cachedUser = localStorageService.get<User>(USER_STORAGE_KEY);
        if (cachedUser) {
          setUser(cachedUser);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      setSuccess(false);
      if (!user?.id) throw new Error('User ID not found');

      const updatedUser = await apiService.updateUser(user.id, data);
      setUser(updatedUser);
      localStorageService.set(USER_STORAGE_KEY, updatedUser);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Profile</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
            <p className="text-green-800 dark:text-green-200">Profile updated successfully!</p>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {user && <ProfileForm initialData={user} onSubmit={handleSubmit} />}
      </main>
    </>
  );
};
