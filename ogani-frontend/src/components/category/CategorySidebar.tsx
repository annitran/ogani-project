import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Menu, type MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { getCategories } from "../../services/category";
import { useCategoryStore } from "../../stores/useCategoryStore";

export default function CategorySidebar() {
  const categories = useCategoryStore((s) => s.categories);
  const setCategories = useCategoryStore((s) => s.setCategories);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
          ),
        })),
      },
    ]
  }, [categories])

  const handleClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "departments") return;

    navigate(`/categories/${e.key}`)
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
