import api from '@/lib/axios';

export interface ImageUploadResponse {
  success: boolean;
  url: string;
  path: string;
  message?: string;
  errors?: any;
}

export const imageUploadService = {
  upload: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<ImageUploadResponse>('/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success && response.data.url) {
      return response.data.url;
    }

    throw new Error(response.data.message || 'Failed to upload image');
  },

  delete: async (path: string): Promise<void> => {
    await api.delete('/api/delete-image', {
      data: { path },
    });
  },
};
