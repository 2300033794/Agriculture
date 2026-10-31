"use client"

import { createContext, useState, useEffect } from "react"
import { login, register, logout, getCurrentUser } from "../services/auth"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Authentication check failed:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogin = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const userData = await login(email, password)
      setUser(userData)
      setIsAuthenticated(true)
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await register(userData)
      setUser(newUser)
      setIsAuthenticated(true)
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
