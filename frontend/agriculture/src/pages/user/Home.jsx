"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Leaf, Truck, Award, Users } from "lucide-react"
import { Button } from "../../components/common/Button"
import ProductCard from "../../components/user/ProductCard"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching featured products
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: "Organic Tomatoes",
          category: "Vegetables",
          price: 3.99,
          image: "/placeholder.svg?height=300&width=300",
          isOrganic: true,
          isFeatured: true,
        },
        {
          id: 2,
          name: "Fresh Eggs",
          category: "Dairy & Eggs",
          price: 4.5,
          originalPrice: 5.99,
          image: "/placeholder.svg?height=300&width=300",
          isOrganic: true,
          isFeatured: true,
        },
        {
          id: 3,
          name: "Organic Apples",
          category: "Fruits",
          price: 3.49,
          image: "/placeholder.svg?height=300&width=300",
          isOrganic: true,
          isFeatured: true,
        },
        {
          id: 4,
          name: "Honey",
          category: "Specialty",
          price: 8.99,
          image: "/placeholder.svg?height=300&width=300",
          isOrganic: true,
          isFeatured: true,
        },
      ]

      setFeaturedProducts(products)
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Fresh Farm Products Delivered to Your Door
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Support local farmers and enjoy the freshest organic produce with our farm-to-table delivery service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link to="/farmers">
                  <Button variant="outline" size="lg">
                    Meet Our Farmers
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Fresh farm produce"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FarmConnect?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-600">
                All our products are certified organic, grown without harmful pesticides or chemicals.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We deliver your orders within 24 hours to ensure maximum freshness.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">We handpick the best quality produce from local farms for your family.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Farmers</h3>
              <p className="text-gray-600">We ensure fair prices for farmers and sustainable farming practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop" className="flex items-center text-green-600 hover:text-green-700 font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm h-80 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=48&width=48" alt="Customer" className="h-12 w-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of the produce is amazing! Everything is so fresh and tastes like it was just picked. I
                love supporting local farmers through FarmConnect."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=48&width=48" alt="Customer" className="h-12 w-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been a customer for 6 months now and I'm never going back to supermarket produce. The difference
                in taste and quality is remarkable!"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=48&width=48" alt="Customer" className="h-12 w-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The delivery is always on time and the packaging is eco-friendly. I appreciate their commitment to
                sustainability and supporting local agriculture."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to taste the difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers enjoying fresh, organic produce delivered straight from local farms.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
