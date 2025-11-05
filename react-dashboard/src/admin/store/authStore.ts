import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '../services/auth.service';
import { LoginCredentials } from '../lib/schemas/auth/auth.schema';
import { User } from '../types/auth';

interface LoginCredentialsWithAdmin extends LoginCredentials {
  isAdmin?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentialsWithAdmin) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const { user, token } = await authService.login(credentials.email, credentials.password, credentials.isAdmin);
          set({ user, token, isAuthenticated: true });
          localStorage.setItem('token', token);
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        const currentUser = _get().user;
        const isAdmin = currentUser?.role === 'admin';
        authService.logout(isAdmin).catch((err: Error) => console.error('API logout failed', err));
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // Only persist the user and token
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);

// Initialize auth state from storage on app load
useAuthStore.getState();
