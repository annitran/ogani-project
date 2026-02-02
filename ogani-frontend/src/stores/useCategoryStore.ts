import { create } from "zustand"
import { type ICategory } from './../services/category';
import { type IProduct } from "../services/product";

interface CategoryStore {
  categories: ICategory[];
  selectedCategory?: ICategory;
  products: IProduct[];

  setCategories: (categories: ICategory[]) => void
  setCategoryDetail: (category: ICategory, products: IProduct[]) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  products: [],

  setCategories: (categories) =>
    set({ categories }),

  setCategoryDetail: (category, products) =>
    set({
      selectedCategory: category,
      products,
    })
}))
