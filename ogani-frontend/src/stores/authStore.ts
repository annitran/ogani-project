import { create } from "zustand";

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  setLoading: (loading) => set({ loading }),
}));
