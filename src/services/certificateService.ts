import api from '@/lib/axios';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image?: string;
  description?: string;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string;
  order?: number;
  is_featured?: boolean;
}

export interface CertificateInput {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  description?: string;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string;
  order?: number;
  is_featured?: boolean;
}

const mapToCertificate = (data: any): Certificate => {
  return {
    id: data.id.toString(),
    title: data.title,
    issuer: data.issuer,
    year: data.year,
    image: normalizeImageUrl(data.image),
    description: data.description || '',
    certificate_number: data.certificate_number || '',
    issue_date: data.issue_date || '',
    expiry_date: data.expiry_date || '',
    order: data.order || 0,
    is_featured: data.is_featured || false,
  };
};

export const certificateService = {
  getAll: async (): Promise<Certificate[]> => {
    const response = await api.get('/api/certificates');
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToCertificate);
  },

  getById: async (id: string): Promise<Certificate> => {
    const response = await api.get(`/api/certificates/${id}`);
    const data = response.data.data || response.data;
    return mapToCertificate(data);
  },

  create: async (data: CertificateInput) => {
    const response = await api.post('/api/certificates', data);
    const responseData = response.data.data || response.data;
    return mapToCertificate(responseData);
  },

  update: async (id: string, data: Partial<CertificateInput>) => {
    const response = await api.put(`/api/certificates/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToCertificate(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/certificates/${id}`);
    return response.data;
  }
};
