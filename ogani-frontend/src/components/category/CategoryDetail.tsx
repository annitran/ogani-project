import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCategoryStore } from "../../stores/useCategoryStore"
import { getCategoryDetail } from "../../services/category"
import CategorySidebar from "./CategorySidebar"

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>()
  const category = useCategoryStore((s) => s.selectedCategory)
  const products = useCategoryStore((s) => s.products)
  const setCategoryDetail = useCategoryStore((s) => s.setCategoryDetail)

  useEffect(() => {
    if (!id) return

    getCategoryDetail(Number(id)).then((res) => {
        const category = res.data.category
        setCategoryDetail(category, category.Products || [])
    })
    }, [id])

  if (!category) return <div>Loading...</div>

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
            <h1>{category?.name}</h1>

            <ul>
                {products.map((p) => (
                <li key={p.id}>
                    {p.name} – Price ${p.price} – Quantity {p.quantity}
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
