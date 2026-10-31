"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "../../hooks/useCart"
import { Button } from "../common/Button"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isWishlist, setIsWishlist] = useState(false)

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    isOrganic = true,
    isFeatured = false,
    stock = "in-stock",
  } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlist(!isWishlist)
  }

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-white transition-all duration-300 hover:shadow-md">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image || "/placeholder.svg?height=300&width=300"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOrganic && (
              <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Organic</span>
            )}
            {isFeatured && (
              <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Featured</span>
            )}
            {discount > 0 && (
              <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">{discount}% Off</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-sm transition-colors hover:bg-gray-100"
          >
            <Heart size={18} className={isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>

          {/* Stock Badge */}
          {stock === "out-of-stock" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800">Out of Stock</span>
            </div>
          )}

          {/* Quick Add Button */}
          {stock !== "out-of-stock" && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white bg-opacity-90 p-2 transition-transform duration-300 group-hover:translate-y-0">
              <Button onClick={handleAddToCart} className="w-full" size="sm">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          <div className="text-xs text-gray-500 mb-1">{category}</div>
          <h3 className="font-medium text-gray-900 line-clamp-1">{name}</h3>
          <div className="mt-1 flex items-center">
            <span className="font-medium text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
