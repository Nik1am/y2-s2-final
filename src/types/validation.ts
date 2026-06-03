// Validation schemas for the application

import { z } from 'zod';

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  className: z.string().optional().or(z.literal('')),
});

export const diaryEntrySchema = z.object({
  subjectId: z.string().min(1, 'Subject is required'),
  grade: z.number().min(1, 'Grade must be between 1 and 5').max(5),
  comment: z.string().optional().or(z.literal('')),
  date: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type DiaryEntryInput = z.infer<typeof diaryEntrySchema>;
export type LoginInput = z.infer<typeof loginSchema>;
