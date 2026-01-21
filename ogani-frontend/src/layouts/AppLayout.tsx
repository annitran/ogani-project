import { Layout } from "antd"
import { Outlet } from "react-router-dom"

import AppHeader from "../components/AppHeader"
import CategorySidebar from "../components/CategorySidebar"
import Footer from "../components/Footer"

const { Content, Sider } = Layout

export default function AppLayout() {
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
