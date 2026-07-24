import { create } from "zustand";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  subscription: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));