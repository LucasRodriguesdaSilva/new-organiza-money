import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Configuração base do cliente axios
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor para adicionar token de autenticação
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor para tratamento de erros
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Tratamento de erros específicos
      if (error.response?.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

// Tipos para as respostas da API
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
} 