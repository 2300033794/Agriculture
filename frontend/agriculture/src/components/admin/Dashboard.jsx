"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card"

const Dashboard = () => {
  const [salesData, setSalesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const data = [
        { name: "Jan", sales: 4000, orders: 240 },
        { name: "Feb", sales: 3000, orders: 198 },
        { name: "Mar", sales: 5000, orders: 320 },
        { name: "Apr", sales: 2780, orders: 190 },
        { name: "May", sales: 1890, orders: 130 },
        { name: "Jun", sales: 2390, orders: 150 },
      ]
      setSalesData(data)
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$18,060</div>
            <p className="text-sm text-green-500">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,228</div>
            <p className="text-sm text-green-500">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
            <p className="text-sm text-gray-500">2 pending approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4ade80" name="Sales ($)" />
                <Bar dataKey="orders" fill="#60a5fa" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-sm text-gray-500">Customer Name</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Math.floor(Math.random() * 200) + 50}</p>
                    <p className="text-sm text-gray-500">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((product) => (
                <div key={product} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Math.floor(Math.random() * 100) + 10}</p>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 100)} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
