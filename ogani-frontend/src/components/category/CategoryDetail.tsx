import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Pagination } from "antd"
import { useCategoryStore } from "../../stores/useCategoryStore"
import { useCategoryProductStore } from "../../stores/useCategoryProductStore"
import { getCategoryDetail } from "../../services/category"
import { getProductsByCategory } from "../../services/product"
import CategorySidebar from "./CategorySidebar"

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const category = useCategoryStore((s) => s.selectedCategory)
  const setSelectedCategory = useCategoryStore((s) => s.setSelectedCategory)
  const {
    products,
    totalPages,
    setProducts,
    setPagination,
  } = useCategoryProductStore()

  const page = Number(searchParams.get("page")) || 1
  const limit = 3

  // fetch category info
  useEffect(() => {
    if (!id) return

    getCategoryDetail(Number(id)).then((res) => {
        setSelectedCategory(res.data.category)
    })
  }, [id])

  // fetch products & pagination
  useEffect(() => {
    if (!id) return

    getProductsByCategory(Number(id), page).then((res) => {
      setProducts(res.data.data)
      setPagination(
        res.data.pagination.page,
        res.data.pagination.totalPages
      )
    })
  }, [id, page])

  if (!category || category.id !== Number(id)) {
    return <div>Loading...</div>
  }

  return (
    <div
        style={{
        display: "grid",
        gridTemplateColumns: "270px 1fr",
        gap: 50,
        padding: "0 60px 0 60px",
        }}
    >
        {/* LEFT: All Departments */}
        <CategorySidebar />

        {/* RIGHT: Main content */}
        <div>
        <h1 style={{ marginBottom: 24 }}>{category.name}</h1>

        {products.length === 0 ? (
            <p>No products in this category</p>
        ) : (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 40,
                }}
            >
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                    >
                    {/* IMAGE */}
                    <div
                        style={{
                        width: "100%",
                        height: 270,
                        background: "#f5f7fa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        }}
                    >
                        {p.image_url ? (
                            <img
                                src={p.image_url}
                                alt={p.name}
                                style={{
                                maxWidth: "80%",
                                maxHeight: "80%",
                                objectFit: "contain",
                                }}
                            />
                        ) : (
                            <span style={{ color: "#999" }}>No image</span>
                        )}
                    </div>

                    {/* NAME */}
                    <p
                        style={{
                        fontSize: 16,
                        marginBottom: 8,
                        color: "#333",
                        }}
                    >
                        {p.name}
                    </p>

                    {/* PRICE */}
                    <p
                        style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#7fad39",
                        }}
                    >
                        ${p.price}
                    </p>
                    </div>
                ))}
            </div>
        )}

        {/* PAGINATION */}
        <div
          style={{
            marginTop: 100,
          }}
        >
          <Pagination align="center"
            defaultCurrent={1}
            total={totalPages * limit}
            pageSize={limit}
            onChange={(newPage) => {
              setSearchParams({ page: String(newPage) })
            }}
          />
        </div>

        </div>
    </div>
  )
}
