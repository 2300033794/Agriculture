"use client"

import { useState, useEffect } from "react"
import { Button } from "../common/Button"

const ProductForm = ({ productId = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
    images: [],
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Fetch categories
    setCategories(["Vegetables", "Fruits", "Dairy", "Grains", "Meat", "Herbs"])

    // If editing, fetch product data
    if (productId) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setFormData({
          name: "Organic Tomatoes",
          description: "Fresh organic tomatoes grown without pesticides.",
          price: "3.99",
          category: "Vegetables",
          stock: "100",
          featured: true,
          images: [{ id: 1, url: "/placeholder.svg?height=200&width=200", name: "tomato-1.jpg" }],
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [productId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate adding images after upload
    setTimeout(() => {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        name: file.name,
      }))

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))

      clearInterval(interval)
      setUploadProgress(0)
    }, 2000)
  }

  const handleRemoveImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.price) newErrors.price = "Price is required"
    else if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.stock) newErrors.stock = "Stock is required"
    else if (isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Prepare data for submission
    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    }

    // Simulate API call
    setTimeout(() => {
      onSubmit(productData)
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading && !formData.name) {
    return <div className="h-96 flex items-center justify-center">Loading product data...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.price ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium mb-1">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="text"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.stock ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.category ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm">
              Featured product
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs mt-1 truncate max-w-[6rem]">{image.name}</p>
                  </div>
                ))}
              </div>

              {uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}

              <div className="text-center">
                <label className="cursor-pointer">
                  <span className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium">
                    Upload Images
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploadProgress > 0}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Upload up to 5 images (JPG, PNG)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
