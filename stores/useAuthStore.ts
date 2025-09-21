import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,
      login: (email: string, password: string) => {
        // Mock authentication
        if (email && password) {
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email,
            avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          };
          set({ isAuthenticated: true, user: mockUser });
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: undefined });
      },
    }),
    {
      name: 'superguest-auth',
    }
  )
);