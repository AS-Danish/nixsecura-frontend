import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Workshop {
  id: string;
  title: string;
  description?: string;
  images: { id: number; image_path: string }[];
  image?: string; // For backward compatibility in UI
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
  images: string[];
  date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  max_participants?: number;
  registrations?: number;
  status: 'upcoming' | 'open' | 'completed' | 'cancelled';
}

const mapToWorkshop = (data: any): Workshop => {
  const images = Array.isArray(data.images) ? data.images : [];
  // Use first image as main image or fall back to old 'image' field if exists (though migration removed it, API response might still have it through accessor)
  const mainImage = images.length > 0 ? images[0].image_path : (data.image || '');

  return {
    id: data.id.toString(),
    title: data.title,
    description: data.description || '',
    images: images,
    image: normalizeImageUrl(mainImage),
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
