import CategorySidebar from "../components/category/CategorySidebar";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function Dashboard() {
  const products = useCategoryStore((s) => s.products);
  const category = useCategoryStore((s) => s.selectedCategory);

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
        <h2>{category?.name || "Dashboard"}</h2>

        {products.length === 0 && <p>No products</p>}

        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} – Price ${p.price} - Quantity {p.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
