import api from "../api"
import type { IProduct } from "../product";

export interface ICategory {
  id: number;
  name: string;
  image_url: string;
  Products?: IProduct[];
}

export const adminGetCategories = () => {
  return api.get<{ categories: ICategory[] }>("/auth/internal-user/categories")
}

export const adminCreateCategory = ( name: string ) => {
  return api.post("/auth/internal-user/categories", { name });
}

export const adminDeleteCategory = ( id: number ) => {
  return api.delete(`/auth/internal-user/categories/${id}`)
}
