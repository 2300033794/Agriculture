"use client"

import { useState, useEffect } from "react"
import { Button } from "../common/Button"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    // Simulate fetching order history
    setTimeout(() => {
      const mockOrders = [
        {
          id: "ORD-1234",
          date: "2025-05-01",
          status: "delivered",
          total: 78.5,
          items: [
            { id: 1, name: "Organic Tomatoes", quantity: 2, price: 3.99 },
            { id: 2, name: "Fresh Eggs", quantity: 1, price: 4.5 },
            { id: 3, name: "Organic Apples", quantity: 3, price: 2.99 },
          ],
        },
        {
          id: "ORD-1235",
          date: "2025-04-15",
          status: "delivered",
          total: 45.75,
          items: [
            { id: 4, name: "Honey", quantity: 1, price: 8.99 },
            { id: 5, name: "Organic Carrots", quantity: 2, price: 1.99 },
          ],
        },
        {
          id: "ORD-1236",
          date: "2025-04-02",
          status: "delivered",
          total: 62.25,
          items: [
            { id: 6, name: "Organic Potatoes", quantity: 5, price: 0.99 },
            { id: 7, name: "Fresh Milk", quantity: 2, price: 3.5 },
            { id: 8, name: "Organic Spinach", quantity: 1, price: 2.99 },
          ],
        },
      ]

      setOrders(mockOrders)
      setIsLoading(false)
    }, 1000)
  }, [])

  const toggleOrderDetails = (orderId) => {
    if (activeOrder === orderId) {
      setActiveOrder(null)
    } else {
      setActiveOrder(orderId)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Loading your order history...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">You haven't placed any orders yet.</p>
        <Button>Start Shopping</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden bg-white">
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleOrderDetails(order.id)}
          >
            <div>
              <div className="font-medium">{order.id}</div>
              <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
            </div>

            <div className="flex items-center mt-2 sm:mt-0">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <div className="ml-4 text-right">
                <div className="font-medium">${order.total.toFixed(2)}</div>
                <div className="text-sm text-gray-500">{order.items.length} items</div>
              </div>
            </div>
          </div>

          {activeOrder === order.id && (
            <div className="border-t p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default OrderHistory
