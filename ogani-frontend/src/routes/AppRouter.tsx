import { Routes, Route } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import Dashboard from "../pages/Dashboard"

export default function AppRouter() {
  return (
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
  )
}
