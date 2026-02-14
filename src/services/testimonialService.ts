import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Testimonial {
  id: string;
  name: string;
  course?: string;
  testimonial?: string;
  image?: string;
  position?: string;
  company?: string;
  is_featured?: boolean;
}

export interface TestimonialInput {
  name: string;
  course?: string;
  testimonial?: string;
  image?: string;
  position?: string;
  company?: string;
  is_featured?: boolean;
}

const mapToTestimonial = (data: any): Testimonial => {
  return {
    id: data.id.toString(),
    name: data.name,
    course: data.course || '',
    testimonial: data.testimonial || '',
    image: normalizeImageUrl(data.image),
    position: data.position || '',
    company: data.company || '',
    is_featured: data.is_featured || false,
  };
};

export const testimonialService = {
  getAll: async (params?: { limit?: number; featured?: boolean }): Promise<Testimonial[]> => {
    const response = await api.get('/api/testimonials', { params });
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToTestimonial);
  },

  getById: async (id: string): Promise<Testimonial> => {
    const response = await api.get(`/api/testimonials/${id}`);
    const data = response.data.data || response.data;
    return mapToTestimonial(data);
  },

  create: async (data: TestimonialInput) => {
    const response = await api.post('/api/testimonials', data);
    const responseData = response.data.data || response.data;
    return mapToTestimonial(responseData);
  },

  update: async (id: string, data: Partial<TestimonialInput>) => {
    const response = await api.put(`/api/testimonials/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToTestimonial(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/testimonials/${id}`);
    return response.data;
  }
};
