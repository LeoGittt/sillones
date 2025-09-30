"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { ProductCard, type Product } from "@/components/product-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { TestimonialCard, type Testimonial } from "@/components/testimonial-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Sofa, Ruler, Palette, DollarSign, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredCategories: Category[] = [
  {
    id: "sofas-3-cuerpos",
    name: "Sofás 3 Cuerpos",
    description: "Sillones amplios para toda la familia",
    image: "/three-seater-sofa.png",
    productCount: 12,
  },
  {
    id: "sofas-2-cuerpos",
    name: "Sofás 2 Cuerpos",
    description: "Perfectos para espacios medianos",
    image: "/two-seater-loveseat-sofa.jpg",
    productCount: 15,
  },
  {
    id: "sillones-esquineros",
    name: "Sillones Esquineros",
    description: "Aprovechá al máximo tu espacio",
    image: "/corner-sectional-sofa.png",
    productCount: 8,
  },
]

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Sofá 3 Cuerpos Clásico",
    price: 450000,
    originalPrice: 520000,
    image: "/classic-three-seater-sofa-beige.jpg",
    category: "Sofás 3 Cuerpos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Sofá 2 Cuerpos Moderno",
    price: 320000,
    image: "/modern-two-seater-sofa-gray.jpg",
    category: "Sofás 2 Cuerpos",
    inStock: true,
  },
  {
    id: "3",
    name: "Sillón Esquinero Premium",
    price: 680000,
    originalPrice: 750000,
    image: "/premium-corner-sectional-sofa.jpg",
    category: "Sillones Esquineros",
    inStock: true,
  },
  {
    id: "4",
    name: "Sofá Cama Funcional",
    price: 420000,
    image: "/sofa-bed-convertible.jpg",
    category: "Sofás 2 Cuerpos",
    inStock: true,
  },
]

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    role: "Cliente",
    content: "Excelente calidad y atención. El sillón quedó hermoso, justo como lo pedí. Muy recomendable!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=MG",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "Cliente",
    content: "Compré un sofá de 3 cuerpos y estoy muy conforme. La tela es de primera calidad y el precio fue muy bueno.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CR",
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "Cliente",
    content: "Me hicieron un sillón a medida para mi living. Quedó perfecto! Muy profesionales en todo momento.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=AM",
  },
  {
    id: "4",
    name: "Luis Fernández",
    role: "Cliente",
    content: "Excelente relación precio-calidad. El trabajo de tapizado es impecable. Ya les recomendé a varios amigos.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=LF",
  },
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })

  const handleAddToCart = (product: Product) => setCartItems((prev) => [...prev, product])
  const handleUpdateCart = (items: Product[]) => setCartItems(items)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/modern-comfortable-sofa-living-room.jpg"
              alt="Sillones AVZ"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                Confort y calidad
                <span className="block text-green-900">a tu medida</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Somos fabricantes, tu mejor opción en calidad, confort, tenemos el mejor precio de mercado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button size="lg" asChild className="text-base px-8 h-12 rounded-full bg-green-900 text-white hover:bg-green-800">
                  <Link href="/productos">Explorar Catálogo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 h-12 rounded-full border-green-900 text-green-900 hover:bg-green-900/10">
                  <Link href="/contacto">Consultar Ahora</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant ring-1 ring-green-900/10">
                  <Image
                    src="/furniture-workshop-craftsman-upholstery.jpg"
                    alt="Taller Sillones AVZ"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-900/5 rounded-3xl -z-10"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-900/10 rounded-3xl -z-10"></div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Sobre Nosotros</span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-green-900">
                  Especialistas en fabricación de sillones
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Somos <strong className="text-foreground">SILLONES AVZ</strong>, nos especializamos en ser los mejores en nuestro rubro.
                    Realizamos el sillón de 0: esqueletaría y tapizado con los más altos estándares de calidad.
                  </p>
                  <p>
                    Personalizamos tu sofá a medida, tela y color; vos elegís cómo querés tu sillón. Estamos ubicados en Ciudad Evita, La Matanza.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[ "Fabricación propia", "100% personalizable" ].map((title, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-900/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{title}</h4>
                        <p className="text-sm text-muted-foreground">{i === 0 ? "De 0: esqueletaría y tapizado" : "Elegí tela, color y medidas"}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-full bg-green-900 text-white hover:bg-green-800">
                    <Link href="/nosotros">Conocer Más</Link>
                  </Button>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-green-900 hover:text-green-800 transition-colors font-medium"
                  >
                    Enviar mensaje
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Características</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-900">¿Por qué elegirnos?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Somos fabricantes con años de experiencia</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[ Sofa, Ruler, Palette, DollarSign ].map((Icon, i) => (
                <div key={i} className="bg-card p-8 rounded-2xl shadow-subtle hover:shadow-subtle-lg transition text-center space-y-4 group border border-green-900/10">
                  <div className="w-20 h-20 bg-green-900/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-900/20">
                    <Icon className="h-10 w-10 text-green-900" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl">{["Fabricación Propia","A Medida","Personalización","Mejor Precio"][i]}</h3>
                  <p className="text-muted-foreground">{["Realizamos todo el proceso desde cero","Personalizamos tu sillón","Elegí tela, color y diseño","Calidad premium al mejor precio"][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Categorías</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-900">Nuestros productos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explorá nuestras categorías</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Catálogo</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-900">Productos destacados</h2>
              <p className="text-lg text-muted-foreground">Nuestra selección más popular</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild className="rounded-full border-green-900 text-green-900 hover:bg-green-900/10">
                <Link href="/productos">Ver Todos los Productos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Testimonios</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-900">Lo que dicen nuestros clientes</h2>
              <p className="text-lg text-muted-foreground">La satisfacción de nuestros clientes es nuestra mayor recompensa</p>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 bg-green-900/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <span className="text-sm font-medium text-green-900 uppercase tracking-wider">Contacto</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-900">Consultanos</h2>
                <p className="text-lg text-muted-foreground">Dejanos tu consulta y te responderemos</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 md:p-12 rounded-3xl shadow-elegant border border-green-900/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre *</label>
                    <Input id="name" placeholder="Tu nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Teléfono *</label>
                    <Input id="phone" type="tel" placeholder="Tu teléfono" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email *</label>
                  <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensaje *</label>
                  <Textarea id="message" placeholder="Contanos qué sillón necesitás, medidas, tela, color..." rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="rounded-xl resize-none" />
                </div>
                <Button type="submit" size="lg" className="w-full h-12 rounded-full text-base bg-green-900 text-white hover:bg-green-800">
                  Enviar Consulta
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
