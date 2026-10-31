"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

// Layouts
import AdminLayout from "./layouts/AdminLayout"
import UserLayout from "./layouts/UserLayout"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import AdminSettings from "./pages/admin/Settings"

// User Pages
import Home from "./pages/user/Home"
import Shop from "./pages/user/Shop"
import ProductDetail from "./pages/user/ProductDetail"
import Cart from "./pages/user/Cart"
import Profile from "./pages/user/Profile"

// Auth Components
import Login from "./components/common/Login"
import Register from "./components/common/Register"

import "./App.css"

function App() {
  const { user, isAuthenticated } = useContext(AuthContext)

  // Protected route component
  const ProtectedRoute = ({ children, requireAdmin }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }

    if (requireAdmin && user?.role !== "admin") {
      return <Navigate to="/" />
    }

    return children
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute requireAdmin={false}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute requireAdmin={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
