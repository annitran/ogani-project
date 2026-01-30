import api from "./api"

export interface ICategory {
  id: number;
  name: string;
}

export const getCategories = () => {
  return api.get("/categories");
};
