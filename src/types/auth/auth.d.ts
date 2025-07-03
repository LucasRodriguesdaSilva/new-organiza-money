export interface User {
  id: number;
  name: string;
  email: string;
  registered_at?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
};

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
  data?: User;
  access_token?: string;
  token_type?: string;
  errors?: Record<string, string[]>;
}

export interface RegisterData {
  success: boolean;
  user: User;
  token: string;
  token_type: string;
  message?: string;
}
