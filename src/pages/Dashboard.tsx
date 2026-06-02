import React, { useState } from 'react';
import { SubjectGrid, Header, Navigation } from '../components/organisms';
import { SearchBar, LoadingSpinner, ErrorMessage } from '../components/molecules';
import { useSubjects } from '../hooks/useSubjects';
import { getGreeting } from '../utils/helpers';

export const Dashboard: React.FC = () => {
  const { subjects, loading, error } = useSubjects();
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  React.useEffect(() => {
    setFilteredSubjects(subjects);
  }, [subjects]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredSubjects(subjects);
    } else {
      const filtered = subjects.filter(
        (subject) =>
          subject.name.toLowerCase().includes(query.toLowerCase()) ||
          subject.teacher.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSubjects(filtered);
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {getGreeting()}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Here are your subjects</p>
        </div>

        <SearchBar onSearch={handleSearch} placeholder="Search subjects or teachers..." />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {filteredSubjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No subjects found</p>
              </div>
            ) : (
              <SubjectGrid subjects={filteredSubjects} />
            )}
          </>
        )}
      </main>
    </>
  );
};
