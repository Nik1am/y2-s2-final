export interface Subject {
  id: string;
  name: string;
  teacher: string;
  grade?: number;
  description?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  homework?: string;
  notes?: string;
}

export interface DiaryEntry {
  id: string;
  subjectId: string;
  lessonId?: string;
  grade: number;
  comment?: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  className?: string;
}

export interface Review {
  id: string;
  subjectId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
