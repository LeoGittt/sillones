"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, ShoppingCart, Menu, X, Sofa } from "lucide-react"

interface NavbarProps {
  cartItemsCount?: number
  onCartOpen?: () => void
  cartComponent?: React.ReactNode
}

export function Navbar({ cartItemsCount = 0, onCartOpen, cartComponent }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/productos", label: "Productos" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
            <Sofa className="h-7 w-7 text-primary" />
            <span className="font-serif text-xl font-bold tracking-wide text-foreground">
              Sillones <span className="text-primary">AVZ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground dark:text-foreground" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground dark:text-foreground" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* Cart */}
            {cartComponent || (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartOpen}
                className="relative rounded-full hover:bg-primary/10 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground font-bold border-2 border-background"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-primary/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/20 py-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base px-3 py-2 rounded-md transition-colors ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
