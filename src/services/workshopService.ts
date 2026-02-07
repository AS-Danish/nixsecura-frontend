import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Workshop {
  id: string;
  title: string;
  description?: string;
  image?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  max_participants?: number;
  registrations: number;
  status: 'upcoming' | 'open' | 'completed' | 'cancelled';
}

export interface WorkshopInput {
  title: string;
  description?: string;
  image?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  max_participants?: number;
  registrations?: number;
  status: 'upcoming' | 'open' | 'completed' | 'cancelled';
}

const mapToWorkshop = (data: any): Workshop => {
  return {
    id: data.id.toString(),
    title: data.title,
    description: data.description || '',
    image: normalizeImageUrl(data.image),
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    start_time: data.start_time || '',
    end_time: data.end_time || '',
    location: data.location || '',
    max_participants: data.max_participants,
    registrations: data.registrations || 0,
    status: data.status || 'upcoming',
  };
};

export const workshopService = {
  getAll: async (): Promise<Workshop[]> => {
    const response = await api.get('/api/workshops');
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToWorkshop);
  },

  getById: async (id: string): Promise<Workshop> => {
    const response = await api.get(`/api/workshops/${id}`);
    const data = response.data.data || response.data;
    return mapToWorkshop(data);
  },

  create: async (data: WorkshopInput) => {
    const response = await api.post('/api/workshops', data);
    const responseData = response.data.data || response.data;
    return mapToWorkshop(responseData);
  },

  update: async (id: string, data: Partial<WorkshopInput>) => {
    const response = await api.put(`/api/workshops/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToWorkshop(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/workshops/${id}`);
    return response.data;
  }
};
