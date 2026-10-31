"use client"

import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/Sidebar"
import { useAuth } from "../hooks/useAuth"

const AdminLayout = () => {
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Welcome, {user?.name || "Admin"}</span>
              <img
                src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
