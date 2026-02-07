import api from "./api"

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category_id: number;
}

export const getProducts = () => {
  return api.get("/products");
};

export const getProductsByCategory = (
  category_id: number,
  page = 1,
  limit = 6
) => {
  return api.get(`/categories/${category_id}/products`,
    { params: { page, limit } }
  )
};
