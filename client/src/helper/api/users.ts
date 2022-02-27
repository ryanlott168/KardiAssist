import redaxios from 'redaxios';
import User from '../../interfaces/user';

interface AddUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export async function getCurrentUser(): Promise<User> {
  const response = await redaxios.get('/api/user');
  return response.data;
}

export async function addUser(params: AddUserParams): Promise<User> {
  const response = await redaxios.post('/api/user', { user: params });
  return response.data;
}