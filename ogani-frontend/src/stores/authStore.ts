import { create } from "zustand";
import { type IUser } from "../services/auth"

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;

  setAuth: (user: IUser, token: string) => void;
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
