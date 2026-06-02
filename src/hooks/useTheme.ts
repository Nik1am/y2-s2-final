import { useState, useEffect } from 'react';
import { localStorageService } from '../utils/localStorage';

const THEME_STORAGE_KEY = 'app_theme';

export function useTheme(): [string, (theme: string) => void] {
  const [theme, setThemeState] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorageService.get<string>(THEME_STORAGE_KEY);
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setThemeState(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorageService.set(THEME_STORAGE_KEY, newTheme);
  };

  return [theme, setTheme];
}
