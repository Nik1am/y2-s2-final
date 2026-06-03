// Application constants and configuration

export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const STORAGE_KEYS = {
  USER_PROFILE: 'school_user_profile',
  DIARY_ENTRIES: 'school_diary_entries',
  APP_THEME: 'app_theme',
  AUTH_TOKEN: 'auth_token',
};

export const APP_ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  SUBJECT_DETAIL: (id: string) => `/subject/${id}`,
  DIARY: '/diary',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};

export const GRADE_SCALE = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  BELOW_AVERAGE: 2,
  FAIL: 1,
};

export const TOAST_DURATION = 3000; // 3 seconds

export const DEBOUNCE_DELAY = 300; // 300ms for search

export const MIN_PASSWORD_LENGTH = 6;

export const PAGINATION_SIZE = 10;
