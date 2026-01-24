import { Layout, Menu, Input } from "antd"
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout

export default function AppHeader() {
  return (
    <AntHeader style={{ background: "#fff", padding: "0 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Logo */}
        <h2 style={{ margin: 0 }}>OGANI</h2>

        {/* Menu */}
        <Menu
          mode="horizontal"
          items={[
            { key: "home", label: "Home" },
            { key: "shop", label: "Shop" },
            { key: "pages", label: "Pages" },
            { key: "blog", label: "Blog" },
            { key: "contact", label: "Contact" },
          ]}
          style={{ flex: 1 }}
        />

        {/* Search */}
        <Input.Search placeholder="What do you need?" style={{ width: 240 }} />

        {/* Login icon + text */}
        <Link
          to="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#000",
            fontWeight: 500,
          }}
        >
          <UserOutlined />
          <span>Login</span>
        </Link>
      </div>
    </AntHeader>
  )
}
