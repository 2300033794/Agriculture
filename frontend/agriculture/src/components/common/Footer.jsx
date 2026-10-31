import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FarmConnect</h3>
            <p className="text-gray-600 mb-4">Connecting farmers and consumers for a sustainable future.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-green-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=vegetables" className="text-gray-600 hover:text-green-600">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fruits" className="text-gray-600 hover:text-green-600">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dairy" className="text-gray-600 hover:text-green-600">
                  Dairy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-gray-600 hover:text-green-600">
                  Our Farmers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-green-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-green-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-green-600">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-600">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <img src="/placeholder.svg?height=30&width=200" alt="Payment Methods" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
