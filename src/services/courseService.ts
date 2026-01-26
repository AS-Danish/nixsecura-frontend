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

export const courseService = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get('/api/courses');
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToCourse);
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
  }
};
