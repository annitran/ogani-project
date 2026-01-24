import api from "./api";

export const register = (data: { username: string, password: string }) => {
  return api.post("/register", data);
};

export const login = (data: { username: string, password: string }) => {
  return api.post("/login", data);
};
