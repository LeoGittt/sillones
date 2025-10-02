"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, ShoppingCart, Menu, X, Sofa, Sparkles } from "lucide-react"

interface NavbarProps {
  cartItemsCount?: number
  onCartOpen?: () => void
  cartComponent?: React.ReactNode
}

export function Navbar({ cartItemsCount = 0, onCartOpen, cartComponent }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Efecto para deshabilitar scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

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
    <>
      {/* Overlay con desenfoque cuando el menú está abierto */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "border-b border-primary/15 bg-background shadow-lg shadow-black/5 py-0" 
          : "border-b border-primary/10 bg-background py-0"
      }`}>
        {/* Efecto de gradiente sutil en la parte superior */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Mejorado con más personalidad */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                <Sofa className="h-7 w-7 text-primary relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-foreground leading-tight">
                  Sillones <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AVZ</span>
                </span>
                <span className="text-xs text-muted-foreground tracking-wider font-light">
                  Diseño & Confort
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Con mejor spacing y efectos */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                  
                  {/* Indicador activo mejorado */}
                  {pathname === link.href && (
                    <>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </>
                  )}
                  
                  {/* Efecto hover */}
                  <div className="absolute inset-0 bg-primary/5 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10" />
                </Link>
              ))}
            </div>

            {/* Actions - Con mejor diseño y micro-interacciones */}
            <div className="flex items-center space-x-1">
              {/* Theme Toggle - Mejorado */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative rounded-xl hover:bg-primary/10 transition-all duration-300 group hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground dark:text-foreground" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground dark:text-foreground" />
                  <Sparkles className="absolute h-2 w-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              {/* Cart - Con mejor diseño del badge */}
              {cartComponent || (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCartOpen}
                  className="relative rounded-xl hover:bg-primary/10 transition-all duration-300 group hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  {cartItemsCount > 0 && (
                    <Badge
                      variant="default"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold border-2 border-background shadow-lg animate-pulse"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button>
              )}

              {/* Mobile Menu Toggle - Mejorado */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl hover:bg-primary/10 transition-all duration-300 group hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isMenuOpen ? (
                  <X className="h-4 w-4 transform rotate-90 scale-110 transition-all duration-300" />
                ) : (
                  <Menu className="h-4 w-4 transform hover:scale-110 transition-all duration-300" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Nav - Con fondo más sólido para mejor contraste */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 border-t border-primary/15 bg-background py-6 animate-in slide-in-from-top duration-300 z-50 shadow-2xl">
              <div className="flex flex-col space-y-3 px-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 border border-transparent hover:border-primary/10 text-center ${
                      pathname === link.href
                        ? "bg-gradient-to-r from-primary/15 to-primary/10 text-primary font-semibold shadow-md border-primary/20"
                        : "text-foreground hover:bg-primary/8 hover:text-primary bg-muted/30"
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {pathname === link.href && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                    )}
                    
                    {/* Efecto hover sutil */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </Link>
                ))}
              </div>
              
              {/* Footer del menú móvil */}
              <div className="mt-6 pt-5 border-t border-primary/20 px-4 bg-primary/5 mx-4 rounded-lg py-4">
                <div className="flex flex-col items-center space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-6 text-foreground/80 w-full">
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Calidad Premium
                    </span>
                    <span className="text-primary/40">•</span>
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Envío Gratis
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Diseñamos con pasión, fabricamos con calidad
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}