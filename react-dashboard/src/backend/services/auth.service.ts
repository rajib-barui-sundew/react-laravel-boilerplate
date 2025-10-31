import axiosInstance from './http';
import { AuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:8000/api/v1';

export const authService = {
  login: async (email: string, password: string, isAdmin: boolean = false): Promise<AuthResponse> => {
    try {
      const endpoint = isAdmin ? `${API_BASE_URL}/admin/login` : `${API_BASE_URL}/login`;
      const response = await axiosInstance.post(endpoint, { email, password });
      
      // Check if the response has the expected structure
      if (!response.data || !response.data.success || !response.data.data) {
        throw new Error('Invalid response from login API');
      }
      
      const { user, access_token } = response.data.data;
      
      return {
        user: { 
          id: user.id || '1', 
          full_name: user.full_name,
          name: user.full_name, // For backward compatibility
          email: user.email,
          avatar: user.avatar,
          role: user.role || (isAdmin ? 'admin' : 'user')
        },
        token: access_token,
      };
    } catch (error: any) {
      // Handle specific error cases
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data?.message || 'Invalid credentials');
      }
      throw error;
    }
  },

  logout: async (isAdmin: boolean = false): Promise<void> => {
    const endpoint = isAdmin ? `${API_BASE_URL}/admin/logout` : `${API_BASE_URL}/logout`;
    await axiosInstance.post(endpoint);
  },
};
