"use client"

import { useState } from "react"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "../../hooks/useCart"
import { Button } from "../common/Button"
import { Link } from "react-router-dom"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
  }

  const handleApplyCoupon = () => {
    // Simulate coupon application
    if (couponCode.toLowerCase() === "farm10") {
      setDiscount(totalPrice * 0.1)
      setCouponApplied(true)
    } else {
      alert("Invalid coupon code")
    }
  }

  const calculateTotal = () => {
    return totalPrice - discount
  }

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.variant && <div className="text-sm text-gray-500">{item.variant}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center border rounded-md w-24">
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value)
                            if (!isNaN(val)) {
                              handleQuantityChange(item.id, val)
                            }
                          }}
                          className="w-8 text-center border-0 focus:ring-0"
                        />
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleRemove(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between">
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    disabled={couponApplied}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} disabled={couponApplied || !couponCode}>
                    Apply
                  </Button>
                </div>
                {couponApplied && <p className="text-sm text-green-600 mt-2">Coupon applied successfully!</p>}
              </div>

              <Button className="w-full">Proceed to Checkout</Button>

              <div className="text-xs text-gray-500 mt-4">
                <p>Secure checkout powered by Stripe</p>
                <div className="flex items-center mt-2 space-x-2">
                  <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                  <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5" />
                  <img src="/placeholder.svg?height=20&width=30" alt="Amex" className="h-5" />
                  <img src="/placeholder.svg?height=20&width=30" alt="PayPal" className="h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
