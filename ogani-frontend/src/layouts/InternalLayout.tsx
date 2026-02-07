import { Layout } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react";

import AppHeader from "../components/AppHeader"
import Footer from "../components/Footer"
import { useAuthStore } from "../stores/authStore";

const { Content } = Layout

export default function InternalLayout() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    if (user.role !== "admin") {
        navigate("/")
    }
    console.log("layout user:", user)
  }, [user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Layout>
        {/* Main content */}
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>

      <Footer />
    </Layout>
  )
}
