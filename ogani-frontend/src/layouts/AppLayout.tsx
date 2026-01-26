import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import { useEffect } from "react";

import AppHeader from "../components/AppHeader"
import CategorySidebar from "../components/CategorySidebar"
import Footer from "../components/Footer"
import { useAuthStore } from "../stores/authStore";
import { getProfile } from "../services/auth";

const { Content, Sider } = Layout

export default function AppLayout() {
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (!token) return;

    const initAuth = async () => {
      try {
        const res = await getProfile();
        setAuth(res.data.user, token);
      } catch {
        clearAuth(); // token hết hạn
      }
    };

    initAuth();
  }, [token, setAuth, clearAuth]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Layout>
        {/* Sidebar */}
        <Sider width={240} style={{ background: "#fff" }}>
          <CategorySidebar />
        </Sider>

        {/* Main content */}
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>

      <Footer />
    </Layout>
  )
}
