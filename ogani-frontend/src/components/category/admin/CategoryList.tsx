import { useState, useEffect } from "react";
import { adminGetCategories } from "../../../services/admin/category";
import type { ICategory } from "../../../services/admin/category";

export default function CategoryList() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminGetCategories()
        setCategories(res.data.categories)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  if (loading) return <p>Loading categories...</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 40,
      }}
    >
      {categories.map((p) => (
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
        </div>
      ))}
    </div>
  );
}
