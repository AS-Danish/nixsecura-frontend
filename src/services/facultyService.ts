import api from '@/lib/axios';

export interface Faculty {
  id: string;
  name: string;
  specialization: string;
  bio?: string;
  experience?: string;
  image?: string;
  email?: string;
  phone?: string;
  qualifications?: string[];
  expertise_areas?: string[];
  order?: number;
  is_active?: boolean;
}

export interface FacultyInput {
  name: string;
  specialization: string;
  bio?: string;
  experience?: string;
  image?: string;
  email?: string;
  phone?: string;
  qualifications?: string[];
  expertise_areas?: string[];
  order?: number;
  is_active?: boolean;
}

const mapToFaculty = (data: any): Faculty => {
  return {
    id: data.id.toString(),
    name: data.name,
    specialization: data.specialization,
    bio: data.bio || '',
    experience: data.experience || '',
    image: data.image || '',
    email: data.email || '',
    phone: data.phone || '',
    qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
    expertise_areas: Array.isArray(data.expertise_areas) ? data.expertise_areas : [],
    order: data.order || 0,
    is_active: data.is_active !== undefined ? data.is_active : true,
  };
};

export const facultyService = {
  getAll: async (): Promise<Faculty[]> => {
    const response = await api.get('/api/faculty');
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToFaculty);
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
