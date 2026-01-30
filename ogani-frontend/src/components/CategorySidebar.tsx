import { Menu, type MenuProps } from "antd"
import { MenuOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: 'departments',
    label: (
      <span style={{ color: "#7fad39", fontWeight: 800 }}>
        <MenuOutlined style={{ marginRight: 15 }} />
        All Departments
      </span>
    ),
    children: [
      { key: 'meat', label: 'Fresh Meat' },
      { key: 'vegetables', label: 'Vegetables' },
      { key: 'fruits', label: 'Fresh Fruits' },
      { key: 'dried', label: 'Dried Fruits' },
      { key: 'drink', label: 'Drink Fruits' },
    ],
  },
];

export default function CategorySidebar() {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['departments']}
      style={{ width: 256 }}
      items={items}
    />
  )
}
