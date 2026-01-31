import api from "./api"

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category_id: number;
}

export const getProducts = () => {
  return api.get("/products");
};
