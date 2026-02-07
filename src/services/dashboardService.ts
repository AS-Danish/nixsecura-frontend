import api from '@/lib/axios';

export interface DashboardStats {
    blogs: number;
    courses: number;
    workshops: {
        total: number;
        upcoming: number;
        registrations: number;
    };
    testimonials: {
        total: number;
        featured: number;
    };
    faculty: number;
    certificates: number;
    gallery: number;
}

export const dashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await api.get('/api/admin/stats');
        return response.data;
    }
};
