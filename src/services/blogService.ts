import api from '@/lib/axios';
import { BlogPost } from '@/data/blogs';
import { normalizeImageUrl } from '@/utils/imageUtils';

export interface BlogInput {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  published_at?: string;
  tags?: string[];
}

const mapToBlogPost = (data: any): BlogPost => {
  return {
    id: data.id.toString(),
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    image: normalizeImageUrl(data.image),
    category: data.category,
    date: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? JSON.parse(data.tags) : [])
  };
};

export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const response = await api.get('/api/blogs?_=' + new Date().getTime());
    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
    return data.map(mapToBlogPost);
  },

  getById: async (id: string): Promise<BlogPost> => {
    const response = await api.get(`/api/blogs/${id}`);
    const data = response.data.data || response.data;
    // Handle potential double nesting or different structure
    const blogData = data.data ? data.data : data;
    return mapToBlogPost(blogData);
  },

  create: async (data: BlogInput) => {
    const response = await api.post('/api/blogs', data);
    const responseData = response.data.data || response.data;
    return mapToBlogPost(responseData);
  },

  update: async (id: string, data: Partial<BlogInput>) => {
    const response = await api.put(`/api/blogs/${id}`, data);
    const responseData = response.data.data || response.data;
    return mapToBlogPost(responseData);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/blogs/${id}`);
    return response.data;
  }
};
