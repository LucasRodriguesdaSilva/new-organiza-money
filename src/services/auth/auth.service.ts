import { apiClient } from '@/lib/api';
import type { RegisterData, RegisterResponse, SignUpFormData, User } from '@/types/auth/auth';
import { AxiosError } from 'axios';

export class AuthService {
  /**
   * Serviço para registar usuário no back-end
   * @param {RegisterData} registerData 
   * @returns Caso sucesso dados do usuário cadastrado, mensagem de erro caso contrario
   */
  static async registrar(registerData: SignUpFormData): Promise<Partial<RegisterData>> {
    try {
      const { data } = await apiClient.post<RegisterResponse>('/v1/auth/registrar', registerData);      
      
      const obj = { success: true, user: data.data!, token: data.access_token!, token_type: data.token_type! };
      return obj

    } catch (error: unknown) {

      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.message || 'Erro ao fazer registro'
        };
      }

      return { success: false, message: 'Erro de conexão' };
    }
  }
} 