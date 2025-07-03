import type { User, RegisterData } from '@/types/auth/auth';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}