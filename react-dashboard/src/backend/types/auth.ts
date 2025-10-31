export interface User {
  id?: string;
  name?: string;
  full_name?: string;
  email: string;
  avatar: string | null;
  role?: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
}
