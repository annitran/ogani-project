import { Routes, Route } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
  )
}
