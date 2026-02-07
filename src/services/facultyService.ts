import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Faculty {
  id: string;
  name: string;
  specialization: string;
  experience?: string;
  image?: string;
  qualifications?: string[];
  order?: number;
  is_active?: boolean;
}

export interface FacultyInput {
  name: string;
  specialization: string;
  experience?: string;
  image?: string;
  qualifications?: string[];
  order?: number;
  is_active?: boolean;
}

const mapToFaculty = (data: any): Faculty => {
  return {
    id: data.id.toString(),
    name: data.name,
    specialization: data.specialization,
    experience: data.experience || '',
    image: normalizeImageUrl(data.image),
    qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
    order: data.order || 0,
    is_active: data.is_active !== undefined ? data.is_active : true,
  };
};

export const facultyService = {
  getAll: async (): Promise<Faculty[]> => {
    try {
      const response = await api.get('/api/faculty');
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      // Ensure we always return an array
      if (!Array.isArray(data)) {
        return [];
      }
      return data.map(mapToFaculty);
    } catch (error: any) {
      // If it's a 404 or network error, return empty array instead of throwing
      if (error?.response?.status === 404 || error?.code === 'ERR_NETWORK' || !error?.response) {
        return [];
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Faculty> => {
    const response = await api.get(`/api/faculty/${id}`);
    const data = response.data.data || response.data;
    return mapToFaculty(data);
  },

  create: async (data: FacultyInput) => {
    const response = await api.post('/api/faculty', data);
    const responseData = response.data.data || response.data;
    return mapToFaculty(responseData);
  },

  update: async (id: string, data: Partial<FacultyInput>) => {
    const response = await api.put(`/api/faculty/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToFaculty(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/faculty/${id}`);
    return response.data;
  }
};
