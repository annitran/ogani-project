import { create } from "zustand"
import { type ICategory } from './../services/category';

interface CategoryStore {
  categories: ICategory[];
  selectedCategory?: ICategory;

  setCategories: (categories: ICategory[]) => void
  setSelectedCategory: (category: ICategory) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  setCategories: (categories) =>
    set({ categories }),

  setSelectedCategory: (category) =>
    set({
      selectedCategory: category,
    })
}))
