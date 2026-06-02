import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Subject, Lesson, DiaryEntry, User, Review } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Using JSONPlaceholder as mock API

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  // Subjects endpoints
  async getSubjects(): Promise<Subject[]> {
    try {
      const response = await this.api.get('/posts?_limit=6');
      return response.data.map((item: any, index: number) => ({
        id: String(item.id),
        name: `Subject ${index + 1}`,
        teacher: `Teacher ${String.fromCharCode(65 + (index % 26))}`,
        description: item.title,
      }));
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  }

  async getSubjectById(id: string): Promise<Subject> {
    try {
      const response = await this.api.get(`/posts/${id}`);
      return {
        id: String(response.data.id),
        name: `Subject ${response.data.id}`,
        teacher: `Teacher A`,
        description: response.data.body,
      };
    } catch (error) {
      console.error('Error fetching subject:', error);
      throw error;
    }
  }

  // Lessons endpoints (mocked with posts)
  async getLessons(subjectId?: string): Promise<Lesson[]> {
    try {
      const response = await this.api.get('/posts?_limit=5');
      return response.data.map((item: any) => ({
        id: String(item.id),
        subjectId: subjectId || '1',
        title: item.title,
        date: new Date().toISOString().split('T')[0],
        homework: 'Study chapters 1-3',
        notes: item.body.substring(0, 100),
      }));
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  // Diary entries (mocked)
  async getDiaryEntries(): Promise<DiaryEntry[]> {
    try {
      const response = await this.api.get('/posts?_limit=5');
      return response.data.map((item: any) => ({
        id: String(item.id),
        subjectId: String((item.id % 3) + 1),
        grade: (item.id % 5) + 1,
        comment: 'Good work',
        date: new Date().toISOString().split('T')[0],
      }));
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      throw error;
    }
  }

  async addDiaryEntry(entry: Omit<DiaryEntry, 'id'>): Promise<DiaryEntry> {
    try {
      const response = await this.api.post('/posts', {
        title: `Grade for subject ${entry.subjectId}`,
        body: entry.comment,
        userId: 1,
      });
      return {
        id: String(response.data.id),
        ...entry,
      };
    } catch (error) {
      console.error('Error adding diary entry:', error);
      throw error;
    }
  }

  // Reviews endpoints
  async getReviews(subjectId?: string): Promise<Review[]> {
    try {
      const response = await this.api.get('/comments?_limit=5');
      return response.data.map((item: any) => ({
        id: String(item.id),
        subjectId: subjectId || '1',
        rating: (item.id % 5) + 1,
        comment: item.body,
        author: item.name.split(' ')[0],
        date: new Date().toISOString().split('T')[0],
      }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  // User endpoints
  async getUser(id: string = '1'): Promise<User> {
    try {
      const response = await this.api.get(`/users/${id}`);
      return {
        id: String(response.data.id),
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address?.street,
        className: `Class 9-A`,
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const response = await this.api.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
