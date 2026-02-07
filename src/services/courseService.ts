import api from '@/lib/axios';
import { Course } from '@/data/courses';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface CourseInput {
  title: string;
  description: string;
  image?: string;
  category: string;
  duration?: string;
  curriculum?: any[];
}

interface CourseApi {
  id?: number;
  slug?: string;
  title: string;
  description: string;
  image?: string | null;
  category: string;
  duration?: string | null;
  curriculum?: any[] | null;
}

const mapToCourse = (data: CourseApi): Course => {
  return {
    id: data.id !== undefined ? String(data.id) : String(data.slug || ''),
    title: data.title,
    description: data.description,
    image: normalizeImageUrl(data.image),
    category: data.category,
    duration: data.duration ?? '',
    mode: '',
    level: '',
    instructor: {
      name: '',
      title: '',
      image: '',
      bio: '',
      experience: '',
      certifications: [],
    },
    curriculum: Array.isArray(data.curriculum) ? data.curriculum : [],
    batches: [],
    highlights: [],
  };
};

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const courseService = {
  getAll: async (params?: { search?: string; category?: string; page?: number }): Promise<PaginatedResponse<Course>> => {
    const response = await api.get('/api/courses', { params });
    const data = response.data;

    // Check if it's already a paginated response (has data property which is an array)
    if (data.data && Array.isArray(data.data) && 'current_page' in data) {
      return {
        ...data,
        data: data.data.map(mapToCourse)
      };
    }

    // Fallback for non-paginated response (if any legacy endpoints remain or during transition)
    const items = Array.isArray(data) ? data : (data.data || []);
    return {
      data: items.map(mapToCourse),
      current_page: 1,
      last_page: 1,
      per_page: items.length,
      total: items.length
    };
  },

  getById: async (id: string): Promise<Course> => {
    const response = await api.get(`/api/courses/${id}`);
    const data = response.data.data || response.data;
    return mapToCourse(data);
  },

  create: async (data: CourseInput) => {
    const response = await api.post('/api/courses', data);
    const responseData = response.data.data || response.data;
    return mapToCourse(responseData);
  },

  update: async (id: string, data: Partial<CourseInput>) => {
    const response = await api.put(`/api/courses/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToCourse(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/courses/${id}`);
    return response.data;
  },

  getList: async (): Promise<{ id: number; title: string; duration: string }[]> => {
    const response = await api.get('/api/courses/list');
    return response.data;
  }
};
