import { create } from "zustand"
import type { IProduct } from "../services/product"

interface CategoryProductState {
  products: IProduct[]
  page: number
  totalPages: number
  loading: boolean

  setProducts: (products: IProduct[]) => void
  setPage: (page: number) => void
  setPagination: (page: number, totalPages: number) => void
}

export const useCategoryProductStore = create<CategoryProductState>((set) => ({
  products: [],
  page: 1,
  totalPages: 1,
  loading: false,

  setProducts: (products) => set({ products }),

  setPage: (page) => set({ page }),

  setPagination: (page, totalPages) =>
    set({ page, totalPages }),
}))
