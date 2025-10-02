"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ShoppingCartIcon, Minus, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const productData: Record<
  string,
  Product & { gallery: string[]; description: string; specifications: Record<string, string>; colors?: string[] }
> = {
  "1": {
    id: "1",
    name: "Sillón Clásico Velvet",
    price: 799.99,
    originalPrice: 999.99,
    image: "/1.jpg",
    category: "Sillones",
    inStock: true,
    featured: true,
    gallery: [
      "/1.jpg",
      "/1.jpg",
      "/1.jpg",
      "/1.jpg",
    ],
    description:
      "Sillón clásico tapizado en terciopelo premium con estructura de madera maciza. Su diseño elegante y atemporal aporta sofisticación a cualquier espacio. Ideal para salas de estar, estudios o dormitorios principales.",
    specifications: {
      Material: "Terciopelo premium",
      Estructura: "Madera maciza de roble",
      Dimensiones: "85x90x95 cm",
      Peso: "35kg",
      Capacidad: "120kg",
      Garantía: "3 años",
    },
    colors: ["Azul marino", "Verde esmeralda", "Gris plomo", "Burdeos"],
  },
  "2": {
    id: "2",
    name: "Sillón Individual Nórdico",
    price: 449.99,
    image: "/2.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/2.jpg",
      "/2.jpg",
      "/2.jpg",
      "/2.jpg",
    ],
    description:
      "Sillón individual con diseño nórdico minimalista. Tapizado en tela texturizada con patas de madera natural. Perfecto para espacios modernos y funcionales.",
    specifications: {
      Material: "Tela texturizada",
      Patas: "Madera de haya natural",
      Dimensiones: "75x80x85 cm",
      Peso: "22kg",
      Capacidad: "110kg",
      Estilo: "Nórdico minimalista",
    },
    colors: ["Gris claro", "Beige natural", "Azul pastel"],
  },
  "3": {
    id: "3",
    name: "Sofá Modular Lino",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/3.jpg",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/3.jpg",
      "/3.jpg",
      "/3.jpg",
      "/3.jpg",
    ],
    description:
      "Sofá modular de tres cuerpos tapizado en lino natural. Diseño versátil que permite múltiples configuraciones. Cojines extraíbles y lavables para fácil mantenimiento.",
    specifications: {
      Plazas: "3 personas",
      Material: "Lino 100% natural",
      Estructura: "Madera y metal reforzado",
      Dimensiones: "220x95x85 cm",
      Peso: "65kg",
      Cojines: "Extraíbles y lavables",
    },
    colors: ["Natural", "Gris piedra", "Azul claro"],
  },
  "4": {
    id: "4",
    name: "Sillón Reclinable Piel",
    price: 589.99,
    image: "/4.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/4.jpg",
      "/4.jpg",
      "/4.jpg",
      "/4.jpg",
    ],
    description:
      "Sillón reclinable en cuero genuino con mecanismo manual. Diseño ergonómico con soporte lumbar ajustable. Ideal para relajación y descanso prolongado.",
    specifications: {
      Material: "Cuero genuino",
      Mecanismo: "Reclinación manual",
      Dimensiones: "90x95x105 cm",
      Peso: "45kg",
      Capacidad: "130kg",
      "Ángulo reclinación": "160°",
    },
    colors: ["Marrón cognac", "Negro", "Gris oscuro"],
  },
  "5": {
    id: "5",
    name: "Sofá Chaise Longue Premium",
    price: 1699.99,
    originalPrice: 1999.99,
    image: "/5.jpg",
    category: "Sofás",
    inStock: true,
    featured: true,
    gallery: [
      "/5.jpg",
      "/5.jpg",
      "/5.jpg",
      "/5.jpg",
    ],
    description:
      "Sofá esquinero con chaise longue tapizado en tela premium antimanchas. Estructura reforzada con garantía extendida. Diseño contemporáneo para espacios amplios.",
    specifications: {
      Configuración: "Esquinero con chaise longue",
      Material: "Tela antimanchas premium",
      Estructura: "Madera maciza reforzada",
      Dimensiones: "280x180x90 cm",
      Peso: "85kg",
      Garantía: "5 años",
    },
    colors: ["Gris carbón", "Beige arena", "Azul petróleo"],
  },
  "6": {
    id: "6",
    name: "Sillón de Lectura con Patas Madera",
    price: 389.99,
    image: "/6.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/6.jpg",
      "/6.jpg",
      "/6.jpg",
      "/6.jpg",
    ],
    description:
      "Sillón ergonómico diseñado especialmente para lectura prolongada. Respaldo alto y reposabrazos anchos. Patas de madera natural con acabado mate.",
    specifications: {
      Uso: "Lectura y descanso",
      Material: "Tela bouclé",
      Patas: "Madera de nogal",
      Dimensiones: "80x85x110 cm",
      Peso: "28kg",
      Respaldo: "Alto ergonómico",
    },
    colors: ["Crema", "Terracota", "Verde oliva"],
  },
  "7": {
    id: "7",
    name: "Sofá de Dos Cuerpos Minimalista",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/7.jpg",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/7.jpg",
      "/7.jpg",
      "/7.jpg",
      "/7.jpg",
    ],
    description:
      "Sofá de dos plazas con diseño minimalista y líneas limpias. Tapizado en tela de alta durabilidad con tratamiento anti-ácaros. Perfecto para espacios reducidos.",
    specifications: {
      Plazas: "2 personas",
      Material: "Tela anti-ácaros",
      Estructura: "Pino laminado",
      Dimensiones: "160x85x80 cm",
      Peso: "40kg",
      Tratamiento: "Anti-ácaros y antimanchas",
    },
    colors: ["Gris medio", "Azul marino", "Verde salvia"],
  },
  "8": {
    id: "8",
    name: "Sillón Puff Gigante",
    price: 249.99,
    image: "/8.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/8.jpg",
      "/8.jpg",
      "/8.jpg",
      "/8.jpg",
    ],
    description:
      "Sillón puff de gran tamaño relleno de perlas de poliestireno expandido. Funda extraíble y lavable. Ideal para espacios juveniles y áreas de juego.",
    specifications: {
      Tipo: "Puff gigante",
      Relleno: "Perlas de poliestireno",
      Funda: "Extraíble y lavable",
      Dimensiones: "100x100x80 cm",
      Peso: "8kg",
      Capacidad: "100kg",
    },
    colors: ["Rojo", "Azul eléctrico", "Verde lima", "Fucsia"],
  },
  "9": {
    id: "9",
    name: "Sofá Cama Funcional",
    price: 979.99,
    originalPrice: 1299.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Cama",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sofá+Cama+Main",
      "/placeholder.svg?height=600&width=600&text=Sofá+Cama+Bed",
      "/placeholder.svg?height=600&width=600&text=Sofá+Cama+Storage",
      "/placeholder.svg?height=600&width=600&text=Sofá+Cama+Details",
    ],
    description:
      "Sofá cama con mecanismo de apertura fácil y colchón de espuma viscoelástica. Incluye compartimento de almacenamiento interno. Solución 2 en 1 para espacios versátiles.",
    specifications: {
      Función: "Sofá y cama",
      Colchón: "Espuma viscoelástica",
      Mecanismo: "Apertura libro",
      Dimensiones: "200x90x85 cm",
      "Medida cama": "140x190 cm",
      Almacenamiento: "Compartimento interno",
    },
    colors: ["Gris antracita", "Azul oscuro", "Marrón chocolate"],
  },
  "10": {
    id: "10",
    name: "Sillón Acapulco",
    price: 199.99,
    image: "/22.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/22.jpg",
      "/22.jpg",
      "/22.jpg",
      "/22.jpg",
    ],
    description:
      "Sillón Acapulco con estructura de acero pintado y asiento tejido en PVC. Diseño icónico mexicano perfecto para interiores y exteriores. Resistente a la intemperie.",
    specifications: {
      Estructura: "Acero pintado",
      Asiento: "PVC tejido",
      Uso: "Interior y exterior",
      Dimensiones: "80x75x85 cm",
      Peso: "8kg",
      Resistencia: "Intemperie",
    },
    colors: ["Negro", "Blanco", "Turquesa", "Coral"],
  },
  "11": {
    id: "11",
    name: "Sofá Tres Cuerpos Tela Antimanchas",
    price: 1099.99,
    image: "/12.jpg",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/12.jpg",
      "/12.jpg",
      "/12.jpg",
      "/12.jpg",
    ],
    description:
      "Sofá de tres plazas con tecnología antimanchas y repelente al agua. Espuma de alta densidad y respaldos reclinables. Ideal para familias con niños y mascotas.",
    specifications: {
      Plazas: "3 personas",
      Tecnología: "Antimanchas y repelente",
      Espuma: "Alta densidad",
      Dimensiones: "210x90x85 cm",
      Peso: "55kg",
      "Respaldos": "Reclinables",
    },
    colors: ["Gris perla", "Beige arena", "Azul cielo"],
  },
  "12": {
    id: "12",
    name: "Sillón Giratorio de Oficina",
    price: 399.99,
    originalPrice: 499.99,
    image: "/11.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/11.jpg",
      "/11.jpg",
      "/11.jpg",
      "/11.jpg",
    ],
    description:
      "Sillón giratorio ejecutivo con base de 5 ruedas y altura regulable. Respaldo ergonómico con soporte lumbar ajustable. Tapizado en cuero sintético de alta calidad.",
    specifications: {
      Tipo: "Ejecutivo giratorio",
      Base: "5 ruedas con freno",
      Regulación: "Altura neumática",
      Material: "Cuero sintético premium",
      Dimensiones: "65x70x110-120 cm",
      "Soporte lumbar": "Ajustable",
    },
    colors: ["Negro ejecutivo", "Marrón gerencial", "Gris corporativo"],
  },
  "13": {
    id: "13",
    name: "Sofá Seccional Esquinero",
    price: 1499.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Esquinero",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sofá+Esquinero+Main",
      "/placeholder.svg?height=600&width=600&text=Sofá+Esquinero+Corner",
      "/placeholder.svg?height=600&width=600&text=Sofá+Esquinero+Details",
      "/placeholder.svg?height=600&width=600&text=Sofá+Esquinero+Room",
    ],
    description:
      "Sofá seccional esquinero modular con configuración en L. Cojines de pluma y fibra sintética para máximo confort. Perfecto para salas de estar amplias.",
    specifications: {
      Configuración: "Seccional en L",
      Plazas: "5-6 personas",
      Relleno: "Pluma y fibra sintética",
      Material: "Tela microfibra",
      Dimensiones: "300x200x85 cm",
      Modular: "Piezas intercambiables",
    },
    colors: ["Gris topo", "Crema", "Azul índigo"],
  },
  "14": {
    id: "14",
    name: "Sillón Butaca de Diseño",
    price: 449.99,
    originalPrice: 549.99,
    image: "/111.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/111.jpg",
      "/111.jpg",
      "/111.jpg",
      "/111.jpg",
    ],
    description:
      "Butaca de diseño contemporáneo con líneas curvas y tapizado premium. Estructura de metal cromado y base giratoria. Pieza de autor para espacios sofisticados.",
    specifications: {
      Estilo: "Diseño contemporáneo",
      Estructura: "Metal cromado",
      Base: "Giratoria",
      Material: "Tapizado premium",
      Dimensiones: "75x80x85 cm",
      Peso: "25kg",
    },
    colors: ["Blanco polar", "Negro elegante", "Gris platino"],
  },
  "15": {
    id: "15",
    name: "Sofá de Terciopelo Vintage",
    price: 1159.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Terciopelo",
    category: "Sofás",
    inStock: false,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sofá+Terciopelo+Main",
      "/placeholder.svg?height=600&width=600&text=Sofá+Terciopelo+Details",
      "/placeholder.svg?height=600&width=600&text=Sofá+Terciopelo+Vintage",
      "/placeholder.svg?height=600&width=600&text=Sofá+Terciopelo+Colors",
    ],
    description:
      "Sofá vintage tapizado en terciopelo italiano con detalles de tachuelas doradas. Inspirado en el estilo Chesterfield clásico. Elegancia atemporal para interiores distinguidos.",
    specifications: {
      Estilo: "Vintage Chesterfield",
      Material: "Terciopelo italiano",
      Detalles: "Tachuelas doradas",
      Plazas: "3 personas",
      Dimensiones: "190x85x85 cm",
      Época: "Inspiración victoriana",
    },
    colors: ["Verde bosque", "Azul real", "Burdeos imperial"],
  },
  "16": {
    id: "16",
    name: "Sillón Balancín para Exteriores",
    price: 299.99,
    image: "/222.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/222.jpg",
      "/222.jpg",
      "/222.jpg",
      "/222.jpg",
    ],
    description:
      "Sillón balancín de exterior con estructura de aluminio resistente a la corrosión. Textilene transpirable y sistema de balanceo suave. Ideal para jardines y terrazas.",
    specifications: {
      Uso: "Exterior",
      Estructura: "Aluminio anticorrosión",
      Material: "Textilene transpirable",
      Función: "Balanceo suave",
      Dimensiones: "70x100x95 cm",
      Resistencia: "UV y agua",
    },
    colors: ["Gris antracita", "Azul marino", "Verde militar"],
  },
  "17": {
    id: "17",
    name: "Sofá Chesterfield Clásico",
    price: 1899.99,
    originalPrice: 2199.99,
    image: "/placeholder.svg?height=300&width=300&text=Chesterfield",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Chesterfield+Main",
      "/placeholder.svg?height=600&width=600&text=Chesterfield+Details",
      "/placeholder.svg?height=600&width=600&text=Chesterfield+Leather",
      "/placeholder.svg?height=600&width=600&text=Chesterfield+Classic",
    ],
    description:
      "Sofá Chesterfield clásico en cuero genuino con botones capitoné tradicionales. Estructura de madera de haya y herrajes de latón. Símbolo de elegancia británica.",
    specifications: {
      Estilo: "Chesterfield clásico",
      Material: "Cuero genuino italiano",
      Detalles: "Botones capitoné",
      Estructura: "Madera de haya",
      Dimensiones: "200x90x75 cm",
      Herrajes: "Latón envejecido",
    },
    colors: ["Cuero marrón", "Negro clásico", "Cognac vintage"],
  },
  "18": {
    id: "18",
    name: "Sillón Relax con Reposapiés",
    price: 519.99,
    image: "/placeholder.svg?height=300&width=300&text=Sillón+Relax",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sillón+Relax+Main",
      "/placeholder.svg?height=600&width=600&text=Sillón+Relax+Footrest",
      "/placeholder.svg?height=600&width=600&text=Sillón+Relax+Recline",
      "/placeholder.svg?height=600&width=600&text=Sillón+Relax+Details",
    ],
    description:
      "Sillón relax con reposapiés extensible y respaldo reclinable en múltiples posiciones. Tapizado en tela suave con tratamiento antiestrés. Perfecto para la relajación total.",
    specifications: {
      Función: "Relax con reposapiés",
      Reclinación: "Múltiples posiciones",
      Material: "Tela antiestrés",
      Mecanismo: "Manual suave",
      Dimensiones: "85x90x100 cm",
      Terapéutico: "Diseño ergonómico",
    },
    colors: ["Gris relajante", "Beige calm", "Azul serenidad"],
  },
  "19": {
    id: "19",
    name: "Sofá de Palets Rústico",
    price: 549.99,
    image: "/placeholder.svg?height=300&width=300&text=Sofá+Rústico",
    category: "Sofás",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sofá+Rústico+Main",
      "/placeholder.svg?height=600&width=600&text=Sofá+Rústico+Wood",
      "/placeholder.svg?height=600&width=600&text=Sofá+Rústico+Cushions",
      "/placeholder.svg?height=600&width=600&text=Sofá+Rústico+Rustic",
    ],
    description:
      "Sofá rústico construido con palets de madera reciclada y tratada. Incluye cojines impermeables extraíbles. Estilo industrial-rústico para espacios informales.",
    specifications: {
      Material: "Palets de madera reciclada",
      Tratamiento: "Barniz protector",
      Cojines: "Impermeables extraíbles",
      Estilo: "Industrial rústico",
      Dimensiones: "180x80x75 cm",
      Ecológico: "Materiales reciclados",
    },
    colors: ["Natural barnizado", "Blanco decapé", "Gris envejecido"],
  },
  "20": {
    id: "20",
    name: "Sillón Colgante de Jardín",
    price: 349.99,
    originalPrice: 449.99,
    image: "/222.jpg",
    category: "Sillones",
    inStock: true,
    gallery: [
      "/222.jpg",
      "/222.jpg",
      "/222.jpg",
      "/222.jpg",
    ],
    description:
      "Sillón colgante de jardín con estructura de ratán sintético y cojines resistentes al agua. Sistema de suspensión seguro incluido. Experiencia única de relajación.",
    specifications: {
      Tipo: "Colgante",
      Material: "Ratán sintético",
      Cojines: "Resistentes al agua",
      Suspensión: "Sistema seguro incluido",
      Dimensiones: "80x60x120 cm",
      "Peso máximo": "120kg",
    },
    colors: ["Ratán natural", "Marrón chocolate", "Gris piedra"],
  },
}

// Mock recommended products
const recommendedProducts: Product[] = [
  {
    id: "2",
    name: "Sillón Individual Nórdico",
    price: 449.99,
    image: "/2.jpg",
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
    id: "10",
    name: "Sillón Acapulco",
    price: 199.99,
    image: "/22.jpg",
    category: "Sillones",
    inStock: true,
  },
]

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const product = productData[id]

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.push("/productos")}>Volver a productos</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      setCartItems((prev) => [...prev, product])
    }
    toast({
      title: "Producto agregado",
      description: `${quantity}x ${product.name} agregado al carrito`,
    })
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  const handleAddToCartFromRecommended = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-muted rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-subtle-lg">
              <Image
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <SectionTag>{product.category}</SectionTag>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-green-600 text-white">-{discount}%</Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "En stock" : "Agotado"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Color:</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Cantidad:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 rounded-full bg-[#1A3F2B] hover:bg-[#153021] text-white px-8 py-4">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
            </div>

            {/* Specifications */}
            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Especificaciones</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <section>
          <div className="text-center space-y-4 mb-12">
            <SectionTag>Recomendados</SectionTag>
            <h2 className="text-3xl font-bold">Productos Relacionados</h2>
            <p className="text-muted-foreground">Otros productos que podrían interesarte</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCartFromRecommended} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
