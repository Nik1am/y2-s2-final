import { useState, useEffect } from 'react';
import type { Subject } from '../types';
import { apiService } from '../services/api';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getSubjects();
        setSubjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return { subjects, loading, error };
}
