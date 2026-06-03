import { useState, useEffect } from 'react';
import { localStorageService } from '../utils/localStorage';

const THEME_STORAGE_KEY = 'app_theme';

export function useTheme(): [string, (theme: string) => void] {
  const [theme, setThemeState] = useState<string>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get saved theme or system preference
    const savedTheme = localStorageService.get<string>(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: string) => {
    const html = document.documentElement;
    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorageService.set(THEME_STORAGE_KEY, newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return ['light', setTheme];
  }

  return [theme, setTheme];
}
