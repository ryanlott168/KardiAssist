import redaxios from "redaxios";
import User from '../../interfaces/user';

interface SignUpParams {
    email: string;
    name: string;
    password: string;
}

export async function getCurrentUser(): Promise<User> {
  const response = await redaxios.get("/api/user");
  return response.data;
}

export async function signUp(params: SignUpParams): Promise<User> {
  const response = await redaxios.post("/api/user", { user: params });
  return response.data;
}