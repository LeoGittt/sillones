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
    name: "Sillón Clásico Velvet",
    price: 799.99,
    originalPrice: 999.99,
    image: "/1.jpg",
    category: "Sillones",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Sillón Individual Nórdico",
    price: 449.99,
    image: "/2.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "3",
    name: "Sofá Modular Lino",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/3.jpg",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "4",
    name: "Sillón Reclinable Piel",
    price: 589.99,
    image: "/4.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "5",
    name: "Sofá Chaise Longue Premium",
    price: 1699.99,
    originalPrice: 1999.99,
    image: "/5.jpg",
    category: "Sofás",
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Sillón de Lectura con Patas Madera",
    price: 389.99,
    image: "/6.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "7",
    name: "Sofá de Dos Cuerpos Minimalista",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/7.jpg",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "8",
    name: "Sillón Puff Gigante",
    price: 249.99,
    image: "/8.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "9",
    name: "Sofá Cama Funcional",
    price: 979.99,
    originalPrice: 1299.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Cama",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "10",
    name: "Sillón Acapulco",
    price: 199.99,
    image: "/22.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "11",
    name: "Sofá Tres Cuerpos Tela Antimanchas",
    price: 1099.99,
    image: "/12.jpg",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "12",
    name: "Sillón Giratorio de Oficina",
    price: 399.99,
    originalPrice: 499.99,
    image: "/11.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "13",
    name: "Sofá Seccional Esquinero",
    price: 1499.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Esquinero",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "14",
    name: "Sillón Butaca de Diseño",
    price: 449.99,
    originalPrice: 549.99,
    image: "/111.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "15",
    name: "Sofá de Terciopelo Vintage",
    price: 1159.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Terciopelo",
    category: "Sofás",
    inStock: false,
  },
  {
    id: "16",
    name: "Sillón Balancín para Exteriores",
    price: 299.99,
    image: "/222.jpg",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "17",
    name: "Sofá Chesterfield Clásico",
    price: 1899.99,
    originalPrice: 2199.99,
    image: "/placeholder.svg?height=300&width=300&text=Chesterfield",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "18",
    name: "Sillón Relax con Reposapiés",
    price: 519.99,
    image: "/placeholder.svg?height=300&width=300&text=Sillón+Relax",
    category: "Sillones",
    inStock: true,
  },
  {
    id: "19",
    name: "Sofá de Palets Rústico",
    price: 549.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Rústico",
    category: "Sofás",
    inStock: true,
  },
  {
    id: "20",
    name: "Sillón Colgante de Jardín",
    price: 349.99,
    originalPrice: 449.99,
    image: "/222.jpg",
    category: "Sillones",
    inStock: true,
  },
];

const categories = ["Todos", "Sillones", "Sofás"]
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
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center space-y-6 mt-5 mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
            Catálogo
          </span>
          <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
            Nuestros <span className="font-normal">Productos</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
            Descubre nuestra amplia selección de productos de calidad premium
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Search and Sort Card */}
              <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#1A3F2B] dark:text-emerald-400 font-light">
                    <Filter className="h-5 w-5" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1A3F2B] dark:text-emerald-400" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg"
                    />
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <label className="text-sm font-light flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <ArrowUpDown className="h-4 w-4" />
                      Ordenar por
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg">
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
              <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-[#1A3F2B] dark:text-emerald-400 font-light">Categorías</CardTitle>
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
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 ${
                            selectedCategory === category
                              ? "bg-[#1A3F2B] dark:bg-emerald-600 text-white"
                              : "hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <span className="font-light">{category}</span>
                          <Badge
                            className={
                              selectedCategory === category
                                ? "bg-[#153021] dark:bg-emerald-500 text-white"
                                : "border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-400 bg-transparent"
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
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Mostrando {startIndex + 1}-{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)}{" "}
                de {filteredAndSortedProducts.length} productos
              </p>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-light mb-6">No se encontraron productos</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Todos")
                    setCurrentPage(1)
                  }}
                  className="border border-[#1A3F2B]/30 dark:border-emerald-500/40 text-[#1A3F2B] dark:text-emerald-400 hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 rounded-lg font-light"
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
                  className="border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 rounded-lg font-light disabled:opacity-50"
                >
                  Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-light ${
                      currentPage === page
                        ? "bg-[#1A3F2B] dark:bg-emerald-600 text-white hover:bg-[#153021] dark:hover:bg-emerald-500"
                        : "border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 rounded-lg font-light disabled:opacity-50"
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
