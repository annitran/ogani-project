import { create } from "zustand"
import { type ICategory } from './../services/category';

interface CategoryStore {
  categories: ICategory[]

  setCategories: (categories: ICategory[]) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  setCategories: (categories) =>
    set({ categories }),
}))
