import api from "./api"
import type { IProduct } from "./product";

export interface ICategory {
  id: number;
  name: string;
  image_url: string;
  Products?: IProduct[];
}

export const getCategories = () => {
  return api.get("/categories");
};

export const getCategoryDetail = ( id: number ) => {
  return api.get<{ category: ICategory }>(`/categories/${id}`);
};
