import api from "@/components/web/lib/api";

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};