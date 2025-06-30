import { apiClient } from '@/lib/api';
import type { RegisterData, User } from '@/types/auth';

export interface RegisterResponse {
  user: User;
  token: string;
  message: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<{ success: boolean; data?: RegisterResponse; message?: string }> {
    try {
      console.log(data);
      const response = await apiClient.post<RegisterResponse>('/auth/register', data);
      return { success: true, data: response.data };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data: { message: string } } };
        return {
          success: false,
          message: axiosError.response?.data?.message || 'Erro ao fazer registro'
        };
      }
      return { success: false, message: 'Erro de conexão' };
    }
  }
} 