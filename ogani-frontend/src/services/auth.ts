import api from "./api";

export interface IUser {
  id: number;
  username: string;
}

export interface IUserParam {
  username: string;
  password: string;
}

export interface IUserResponse {
  token: string
  user: IUser
}

export const register = (user: IUserParam) => {
  return api.post("/register", user);
};

export const login = (user: IUserParam) => {
  return api.post<IUserResponse>("/login", user);
};

export const getProfile = () => {
  return api.get<{ user: IUser }>("/auth/profile");
};
