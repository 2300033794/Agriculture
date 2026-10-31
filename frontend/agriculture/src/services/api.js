// Base API configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Helper for handling response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "Something went wrong")
  }
  return response.json()
}

// Generic request function
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Add auth token if available
  const token = localStorage.getItem("token")
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    return await handleResponse(response)
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// HTTP method wrappers
export const get = (endpoint) => request(endpoint)

export const post = (endpoint, data) =>
  request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })

export const put = (endpoint, data) =>
  request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const patch = (endpoint, data) =>
  request(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  })

export const del = (endpoint) =>
  request(endpoint, {
    method: "DELETE",
  })

// File upload helper
export const uploadFile = async (endpoint, file, onProgress) => {
  const url = `${API_URL}${endpoint}`
  const formData = new FormData()
  formData.append("file", file)

  const token = localStorage.getItem("token")
  const headers = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", url)

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100
        onProgress(percentComplete)
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error("Upload failed"))
      }
    }

    xhr.onerror = () => reject(new Error("Network error"))
    xhr.send(formData)
  })
}
