import { Routes, Route } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"
import Login from "../pages/Login"
import CategoryDetail from "../pages/CategoryDetail"

import InternalLayout from "../layouts/InternalLayout"
import Home from "../pages/admin/Home"

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
        </Route>

        {/* Admin */}
        <Route element={<InternalLayout />}>
          <Route path="/admin" element={<Home />} />
        </Route>

      </Routes>
  )
}
