import { post, get } from "./api"

// Login user
export const login = async (email, password) => {
  try {
    const response = await post("/auth/login", { email, password })

    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("token", response.token)
    }

    return response.user
  } catch (error) {
    throw new Error(error.message || "Login failed")
  }
}

// Register new user
export const register = async (userData) => {
  try {
    const response = await post("/auth/register", userData)

    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("token", response.token)
    }

    return response.user
  } catch (error) {
    throw new Error(error.message || "Registration failed")
  }
}

// Logout user
export const logout = async () => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token")

    // Optional: Call logout endpoint to invalidate token on server
    await post("/auth/logout")

    return true
  } catch (error) {
    console.error("Logout error:", error)
    // Still remove token even if server logout fails
    localStorage.removeItem("token")
    return true
  }
}

// Get current user data
export const getCurrentUser = async () => {
  try {
    // Check if token exists
    const token = localStorage.getItem("token")
    if (!token) {
      return null
    }

    const user = await get("/auth/me")
    return user
  } catch (error) {
    console.error("Get current user error:", error)
    // If token is invalid, clear it
    localStorage.removeItem("token")
    return null
  }
}

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await post("/auth/profile", userData)
    return response
  } catch (error) {
    throw new Error(error.message || "Profile update failed")
  }
}

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await post("/auth/change-password", {
      currentPassword,
      newPassword,
    })
    return response
  } catch (error) {
    throw new Error(error.message || "Password change failed")
  }
}
