export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export type SignInFormData = {
  email: string;
  password: string;
};



export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
} 