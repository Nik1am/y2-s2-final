import { useState, useEffect } from 'react';
import type { DiaryEntry } from '../types';
import { apiService } from '../services/api';
import { localStorageService } from '../utils/localStorage';

const DIARY_STORAGE_KEY = 'school_diary_entries';

export function useDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to load from cache first
        const cached = localStorageService.get<DiaryEntry[]>(DIARY_STORAGE_KEY);
        if (cached) {
          setEntries(cached);
        }

        // Fetch fresh data from API
        const data = await apiService.getDiaryEntries();
        setEntries(data);
        localStorageService.set(DIARY_STORAGE_KEY, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch diary entries');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const addEntry = async (entry: Omit<DiaryEntry, 'id'>) => {
    try {
      const newEntry = await apiService.addDiaryEntry(entry);
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorageService.set(DIARY_STORAGE_KEY, updatedEntries);
      return newEntry;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add diary entry');
      throw err;
    }
  };

  return { entries, loading, error, addEntry };
}
