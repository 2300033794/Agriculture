import { forwardRef } from "react"
import { Button } from "./Button";


const Button = forwardRef(({ children, variant = "primary", size = "md", className = "", ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
    link: "bg-transparent underline-offset-4 hover:underline text-gray-900 focus-visible:ring-gray-500 p-0 h-auto",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  }

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  }

  const variantStyles = variants[variant] || variants.primary
  const sizeStyles = sizes[size] || sizes.md

  return (
    <button ref={ref} className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export { Button }
