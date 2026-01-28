import { Layout, Menu, type MenuProps, Input, Dropdown, Modal } from "antd"
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"
import { useAuthStore } from "../stores/authStore";
import { logout } from "../services/auth"

const { Header: AntHeader } = Layout

export default function AppHeader() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();
    }
  }

  const userMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: <span>Profile</span>, // làm sau
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <span style={{ color: "red" }}>
          <LogoutOutlined /> Logout
        </span>
      ),
      danger: true,
      onClick: () => {
        Modal.confirm({
          content: "Are you sure you want to log out?",
          okText: "Logout",
          cancelText: "Cancel",
          okButtonProps: { danger: true },
          onOk: () => {
            return handleLogout();
          },
        });
      },
    },
  ];

  return (
    <AntHeader style={{ background: "#fff", padding: "0 50px 0 80px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 70,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <img
            src={ logo }
            alt="OGANI logo"
            style={{ height: 50 }}
          />
        </Link>

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

        {/* Auth UI */}
        {user ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              <UserOutlined />
              <span>Hi, {user.username}</span>
            </div>
          </Dropdown>
        ) : (
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
        )}
      </div>
    </AntHeader>
  )
}
