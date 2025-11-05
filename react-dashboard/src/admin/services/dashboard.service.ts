import axiosInstance from './http';
import { DashboardData } from '../types/dashboard';

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get<DashboardData>('/dashboard');
    return response.data;
  },
};
