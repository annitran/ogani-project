import { Menu } from "antd"

export default function CategorySidebar() {
  return (
    <Menu
      mode="inline"
      style={{ height: "110%" }}
      items={[
        { key: "1", label: "Fresh Meat" },
        { key: "2", label: "Vegetables" },
        { key: "3", label: "Fresh Fruits" },
        { key: "4", label: "Dried Fruits" },
        { key: "5", label: "Drink Fruits" },
      ]}
    />
  )
}
