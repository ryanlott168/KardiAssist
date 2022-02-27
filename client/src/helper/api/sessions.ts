import redaxios from 'redaxios';
import User from '../../interfaces/user';

interface LoginParams {
  email: string;
  password: string;
}

export async function login(params: LoginParams): Promise<User> {
  const response = await redaxios.post('api/auth/login', params);
  return response.data;
}

export async function logout() {
  const response = await redaxios.delete('api/session');

  return response.data.data;
}