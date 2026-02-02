import { Routes, Route } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"
import Login from "../pages/Login"
import CategoryDetail from "../components/category/CategoryDetail"

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
        </Route>
      </Routes>
  )
}
