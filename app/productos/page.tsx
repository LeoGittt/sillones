"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock products data
const allProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Premium",
    price: 699.99,
    originalPrice: 899.99,
    image: "/placeholder.svg?height=300&width=300&text=Smartphone",
    category: "Electrónicos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Auriculares Inalámbricos",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "3",
    name: "Chaqueta de Cuero",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Jacket",
    category: "Moda",
    inStock: true,
  },
  {
    id: "4",
    name: "Lámpara Moderna",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Lamp",
    category: "Hogar",
    inStock: false,
  },
  {
    id: "5",
    name: "Laptop Gaming",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Laptop",
    category: "Electrónicos",
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Zapatillas Deportivas",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Sport+Sneakers",
    category: "Moda",
    inStock: true,
  },
  {
    id: "7",
    name: "Sofá Moderno",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Sofa",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "8",
    name: "Smartwatch",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300&text=Smartwatch",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "9",
    name: "Vestido Elegante",
    price: 179.99,
    originalPrice: 229.99,
    image: "/placeholder.svg?height=300&width=300&text=Elegant+Dress",
    category: "Moda",
    inStock: true,
  },
  {
    id: "10",
    name: "Mesa de Centro",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Coffee+Table",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "11",
    name: "Tablet Pro",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300&text=Tablet+Pro",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "12",
    name: "Abrigo de Invierno",
    price: 199.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=300&width=300&text=Winter+Coat",
    category: "Moda",
    inStock: true,
  },
  {
    id: "13",
    name: "Espejo Decorativo",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&text=Decorative+Mirror",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "14",
    name: "Cámara Digital",
    price: 449.99,
    originalPrice: 549.99,
    image: "/placeholder.svg?height=300&width=300&text=Digital+Camera",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "15",
    name: "Botas de Cuero",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Boots",
    category: "Moda",
    inStock: false,
  },
  {
    id: "16",
    name: "Planta Decorativa",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300&text=Scented+Candle",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "17",
    name: "Altavoz Bluetooth",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300&text=Bluetooth+Speaker",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "18",
    name: "Bolso de Mano",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Handbag",
    category: "Moda",
    inStock: true,
  },
  {
    id: "19",
    name: "Cojines Decorativos",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300&text=Decorative+Pillows",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "20",
    name: "Monitor 4K",
    price: 349.99,
    originalPrice: 449.99,
    image: "/placeholder.svg?height=300&width=300&text=4K+Monitor",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "21",
    name: "Gafas de Sol",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&text=Stylish+Sunglasses",
    category: "Moda",
    inStock: true,
  },
  {
    id: "22",
    name: "Vela Aromática",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300&text=Scented+Candle",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "23",
    name: "Teclado Mecánico",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Mechanical+Keyboard",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "24",
    name: "Bufanda de Lana",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=300&width=300&text=Wool+Scarf",
    category: "Moda",
    inStock: true,
  },
  {
    id: "25",
    name: "Marco de Fotos",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300&text=Photo+Frame",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "26",
    name: "Mouse Gaming",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Mouse",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "27",
    name: "Cinturón de Cuero",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Belt",
    category: "Moda",
    inStock: true,
  },
  {
    id: "28",
    name: "Florero Moderno",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Vase",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "29",
    name: "Cargador Inalámbrico",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Wireless+Charger",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "30",
    name: "Reloj de Pulsera",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Wrist+Watch",
    category: "Moda",
    inStock: true,
  },
]

const categories = ["Todos", "Electrónicos", "Moda", "Hogar"]
const PRODUCTS_PER_PAGE = 9

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <SectionTag className="bg-green-900/90 text-white">Catálogo</SectionTag>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">Nuestros Productos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos de calidad premium
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Search and Sort Card */}
              <Card className="border border-green-100 shadow-sm hover:shadow-md rounded-xl transition">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Filter className="h-5 w-5 text-green-800" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-700" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-green-200 focus:ring-green-700 focus:border-green-700"
                    />
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-green-800">
                      <ArrowUpDown className="h-4 w-4" />
                      Ordenar por
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-green-200 focus:ring-green-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Nombre A-Z</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Categories Card */}
              <Card className="border border-green-100 shadow-sm hover:shadow-md rounded-xl transition">
                <CardHeader>
                  <CardTitle className="text-green-900">Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const count =
                        category === "Todos"
                          ? allProducts.length
                          : allProducts.filter((p) => p.category === category).length
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setCurrentPage(1)
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                            selectedCategory === category
                              ? "bg-green-900 text-white"
                              : "hover:bg-green-50 text-green-800"
                          }`}
                        >
                          <span className="font-medium">{category}</span>
                          <Badge
                            className={
                              selectedCategory === category
                                ? "bg-green-700 text-white"
                                : "border-green-300 text-green-900"
                            }
                          >
                            {count}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-green-800">
                Mostrando {startIndex + 1}-{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)}{" "}
                de {filteredAndSortedProducts.length} productos
              </p>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-green-800 text-lg">No se encontraron productos</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Todos")
                    setCurrentPage(1)
                  }}
                  className="mt-4 border-green-700 text-green-800 hover:bg-green-50"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-green-700 text-green-800 hover:bg-green-50"
                >
                  Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === page
                        ? "bg-green-900 text-white"
                        : "border-green-700 text-green-800 hover:bg-green-50"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-green-700 text-green-800 hover:bg-green-50"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
