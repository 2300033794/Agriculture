"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Search, Menu, X, ChevronDown, Package } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useCart } from "../../hooks/useCart"
import { Button } from "./Button";






const Navbar = () => {
  const { isAuthenticated, user } = useAuth()
  const { totalItems } = useCart()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Farmers", path: "/farmers" },
    { name: "Contact", path: "/contact" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white md:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-green-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  <span>{user?.name || "Account"}</span>
                  <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        /* logout function */
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-green-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium ${
                  location.pathname === link.path ? "text-green-600" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-4 py-2 text-sm font-medium text-gray-700">
                  Profile
                </Link>
                <Link to="/orders" className="px-4 py-2 text-sm font-medium text-gray-700">
                  Orders
                </Link>
                {user?.role === "admin" && (
                  <Link to="/admin" className="px-4 py-2 text-sm font-medium text-gray-700">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 text-left"
                  onClick={() => {
                    /* logout function */
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-4 py-2">
                <Link to="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50 p-4">
          <div className="container mx-auto flex items-center">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 p-2 border-b-2 border-gray-300 focus:border-green-600 outline-none"
              autoFocus
            />
            <button onClick={toggleSearch} className="ml-4 p-2 text-gray-700 hover:text-green-600">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
