import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom"
import { Menu, type MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { getCategories, getCategoryDetail } from "../../services/category";
import { useCategoryStore } from "../../stores/useCategoryStore";

export default function CategorySidebar() {
  const categories = useCategoryStore((s) => s.categories);
  const setCategories = useCategoryStore((s) => s.setCategories);
  const setCategoryDetail = useCategoryStore((s) => s.setCategoryDetail)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(false)
      return
    }

    const fetchCategories = async () => {
      try {
        const res = await getCategories()
        setCategories(res.data.categories)
      } catch (err) {
        console.error("Load categories failed!", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [setCategories, categories.length]);

  const menuItems = useMemo(() => {
    return [
      {
        key: "departments",
        label: (
          <span style={{ color: "#7fad39", fontWeight: 800 }}>
            <MenuOutlined style={{ marginRight: 15 }} />
            All Departments
          </span>
        ),
        children: categories.map((c) => ({
          key: c.id.toString(),
          label: (
            <Link to={`/categories/${c.id}`}>
              {c.name}
            </Link>
          )
        })),
      },
    ]
  }, [categories])

  const handleClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "departments") return;

    const categoryId = Number(e.key);

    try {
      const res = await getCategoryDetail(categoryId);
      const category = res.data.category;

      setCategoryDetail(category, category.Products || [])
    } catch (err) {
      console.error("Load category detail failed", err)
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Menu
      mode="inline"
      items={menuItems}
      defaultOpenKeys={["departments"]}
      style={{ width: 256 }}
      onClick={handleClick}
    />
  );
}
