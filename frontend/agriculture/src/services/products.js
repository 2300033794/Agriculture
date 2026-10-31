import { get, post, put, del, uploadFile } from "./api"

// Get all products
export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams()

  // Add pagination params if provided
  if (params.page) queryParams.append("page", params.page)
  if (params.limit) queryParams.append("limit", params.limit)

  // Add sorting params if provided
  if (params.sort) queryParams.append("sort", params.sort)
  if (params.order) queryParams.append("order", params.order)

  // Add filtering params if provided
  if (params.category) queryParams.append("category", params.category)
  if (params.search) queryParams.append("search", params.search)
  if (params.minPrice) queryParams.append("minPrice", params.minPrice)
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice)

  const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
  return get(`/products${query}`)
}

// Get single product by ID
export const getProductById = async (id) => {
  return get(`/products/${id}`)
}

// Create new product
export const createProduct = async (productData) => {
  return post("/products", productData)
}

// Update product
export const updateProduct = async (id, productData) => {
  return put(`/products/${id}`, productData)
}

// Delete product
export const deleteProduct = async (id) => {
  return del(`/products/${id}`)
}

// Upload product image
export const uploadProductImage = async (id, file, onProgress) => {
  return uploadFile(`/products/${id}/image`, file, onProgress)
}

// Get product categories
export const getCategories = async () => {
  return get("/products/categories")
}

// Get featured products
export const getFeaturedProducts = async () => {
  return get("/products/featured")
}

// Get related products
export const getRelatedProducts = async (id) => {
  return get(`/products/${id}/related`)
}
