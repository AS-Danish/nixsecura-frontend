import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Gallery {
  id: string;
  title: string;
  category: string;
  image: string;
  order?: number;
  is_featured?: boolean;
}

export interface GalleryInput {
  title: string;
  category: string;
  image: string;
  order?: number;
  is_featured?: boolean;
}

const mapToGallery = (data: any): Gallery => {
  return {
    id: data.id.toString(),
    title: data.title,
    category: data.category,
    image: normalizeImageUrl(data.image),
    order: data.order || 0,
    is_featured: data.is_featured || false,
  };
};

export const galleryService = {
  getAll: async (): Promise<Gallery[]> => {
    const response = await api.get('/api/gallery');
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToGallery);
  },

  getById: async (id: string): Promise<Gallery> => {
    const response = await api.get(`/api/gallery/${id}`);
    const data = response.data.data || response.data;
    return mapToGallery(data);
  },

  create: async (data: GalleryInput) => {
    const response = await api.post('/api/gallery', data);
    const responseData = response.data.data || response.data;
    return mapToGallery(responseData);
  },

  update: async (id: string, data: Partial<GalleryInput>) => {
    const response = await api.put(`/api/gallery/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToGallery(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/gallery/${id}`);
    return response.data;
  }
};
