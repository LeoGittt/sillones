"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ShoppingCart } from "@/components/shopping-cart";
import { ProductCard, type Product } from "@/components/product-card";
import { CategoryCard, type Category } from "@/components/category-card";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Sofa,
  Ruler,
  Palette,
  DollarSign,
  Check,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
];

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
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    role: "Cliente",
    content:
      "Excelente calidad y atención. El sillón quedó hermoso, justo como lo pedí. Muy recomendable!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=MG",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "Cliente",
    content:
      "Compré un sofá de 3 cuerpos y estoy muy conforme. La tela es de primera calidad y el precio fue muy bueno.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CR",
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "Cliente",
    content:
      "Me hicieron un sillón a medida para mi living. Quedó perfecto! Muy profesionales en todo momento.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=AM",
  },
  {
    id: "4",
    name: "Luis Fernández",
    role: "Cliente",
    content:
      "Excelente relación precio-calidad. El trabajo de tapizado es impecable. Ya les recomendé a varios amigos.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=LF",
  },
];

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Carrusel de imágenes de fondo
  const heroImages = ["/88.jpg", "/12.jpg", "/3.jpg", "99.jpg"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Efecto para el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleAddToCart = (product: Product) =>
    setCartItems((prev) => [...prev, product]);
  const handleUpdateCart = (items: Product[]) => setCartItems(items);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={
          <ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />
        }
      />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          {/* Carrusel con efectos mejorados */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                    index === currentImageIndex 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-105"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Sillón premium ${index + 1}`}
                    fill
                    className="object-cover object-center filter brightness-110 contrast-105"
                    priority={index === 0}
                    quality={95}
                  />
                  {/* Overlay mejorado con más opacidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Elementos decorativos flotantes */}
          <div className="absolute top-1/4 left-8 w-32 h-32 bg-[#1A3F2B]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-12 w-24 h-24 bg-emerald-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

          {/* Controles sin fondo */}
          <div className="absolute bottom-8 right-8 z-20">
            <div className="flex items-center gap-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentImageIndex
                      ? "bg-[#1A3F2B] dark:bg-emerald-400 scale-125 shadow-lg" 
                      : "bg-white/60 dark:bg-slate-400/60 hover:bg-[#1A3F2B]/70 dark:hover:bg-emerald-400/70 hover:scale-110"
                  }`}
                >
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-[#1A3F2B] dark:bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Contenido principal mejorado */}
              <div className="text-center space-y-16">
                
                {/* Badge superior */}
                <div className="inline-flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 dark:border-slate-700/60 shadow-lg">
                  <div className="w-2 h-2 bg-[#1A3F2B] dark:bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#1A3F2B] dark:text-emerald-400 tracking-wide">
                    Fabricación Artesanal 
                  </span>
                </div>

                <div className="space-y-10">
                  {/* Título mejorado con animación */}
                  <div className="space-y-8">
                    <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none">
                      <span className="block text-[#1A3F2B] dark:text-emerald-400 font-semibold drop-shadow-lg">
                        Confort
                      </span>
                      <span className="block text-white font-semibold dark:text-white mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
                        y Diseño
                      </span>
                      <span className="block text-xl sm:text-2xl md:text-4xl font-light text-white/90 dark:text-white/90 mt-4 tracking-wide drop-shadow-md">
                        para tu hogar
                      </span>
                    </h1>

                    {/* Línea divisoria animada */}
                    <div className="flex justify-center">
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>

                    <p className="text-xl md:text-2xl text-white dark:text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-md">
                      Creamos sillones únicos con{" "}
                      <span className="text-gray-600 font-semibold dark:text-white ">
                        más de 15 años de experiencia
                      </span>
                      <span className="block mt-3 text-lg md:text-xl text-white/90 dark:text-white/90 font-semibold">
                        Diseño personalizado • Calidad premium • Fabricación local
                      </span>
                    </p>
                  </div>
                </div>

                {/* Botones más pequeños */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                  {/* Botón Principal */}
                  <Link
                    href="/productos"
                    className="group relative w-full sm:w-44 px-6 py-3 bg-[#1A3F2B] dark:bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-[#153021] dark:hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A3F2B] to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      Ver Productos
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                  
                  {/* Botón Secundario */}
                  <Link
                    href="/contacto"
                    className="group w-full sm:w-44 px-6 py-3 text-[#1A3F2B] dark:text-emerald-400 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-[#1A3F2B]/40 dark:border-emerald-400/50 text-sm font-medium rounded-lg hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-400/5 hover:border-[#1A3F2B] dark:hover:border-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      Consultar
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us - Rediseñado */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
              
              {/* Columna de contenido - Primero en móvil */}
              <div className="space-y-8 order-2 lg:order-1">
                
                {/* Header mejorado */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A3F2B]/10 dark:bg-emerald-500/10 rounded-full">
                    <div className="w-2 h-2 bg-[#1A3F2B] dark:bg-emerald-400 rounded-full"></div>
                    <span className="text-sm font-medium text-[#1A3F2B] dark:text-emerald-400">
                      Tradición y Calidad
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#1A3F2B] dark:text-emerald-400">
                    Creamos el sillón
                    <span className="block font-normal text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 mt-2">
                      que siempre soñaste
                    </span>
                  </h2>
                </div>

                {/* Contenido principal - Más atractivo */}
                <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                  <p className="text-xl font-light text-gray-800 dark:text-gray-200">
                    Más de 15 años transformando hogares con muebles únicos y personalizados.
                  </p>
                  
                  <p>
                    Desde nuestro taller, cada pieza nace de la pasión por la carpintería artesanal. 
                    Combinamos técnicas tradicionales con diseños contemporáneos para crear sillones 
                    que no solo son cómodos, sino verdaderas obras de arte.
                  </p>
                </div>

                {/* Stats y features - Más visual */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <div className="text-3xl font-light text-[#1A3F2B] dark:text-emerald-400">
                      500+
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Sillones entregados con amor
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-3xl font-light text-[#1A3F2B] dark:text-emerald-400">
                      100%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Fabricación artesanal local
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-3xl font-light text-[#1A3F2B] dark:text-emerald-400">
                      15+
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Años de experiencia
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-3xl font-light text-[#1A3F2B] dark:text-emerald-400">
                      ∞
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Opciones de personalización
                    </p>
                  </div>
                </div>

                {/* CTA mejorado */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    href="/nosotros"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A3F2B] hover:bg-[#153021] text-white font-medium transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                  >
                    <span>Conocé nuestro taller</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#1A3F2B]/20 hover:border-[#1A3F2B] text-[#1A3F2B] dark:text-white hover:bg-[#1A3F2B]/5 font-medium transition-all duration-300 rounded-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Hablemos de tu proyecto</span>
                  </Link>
                </div>
              </div>

              {/* Columna de imagen - Mejorada */}
              <div className="relative order-1 lg:order-2">
                {/* Imagen principal con mejor composición */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/233.jpg"
                    alt="Taller artesanal SILLONES AVZ - Proceso de fabricación"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 filter brightness-110"
                    priority
                  />
                  
                  {/* Overlay sutil para mejor contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#1A3F2B]/10 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1A3F2B]/5 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
                
                {/* Badge flotante mejorado */}
                <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-[#1A3F2B] dark:text-emerald-400 px-6 py-4 rounded-xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#1A3F2B] dark:bg-emerald-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
  Inspiración y Diseño
</div>
<div className="font-medium">
  El rincón favorito de tu hogar
</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            {/* Header minimalista */}
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                Características
              </span>
              <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                ¿Por qué <span className="font-normal">elegirnos</span>?
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                Fabricantes directos con años de experiencia
              </p>
            </div>

            {/* Grid limpio y minimalista */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Sofa,
                  title: "Fabricación Propia",
                  description:
                    "Realizamos todo el proceso desde cero en nuestro taller",
                },
                {
                  icon: Ruler,
                  title: "A Medida",
                  description: "Personalizamos tu sillón según tus necesidades",
                },
                {
                  icon: Palette,
                  title: "Personalización",
                  description: "Elegí tela, color y diseño a tu gusto",
                },
                {
                  icon: DollarSign,
                  title: "Mejor Precio",
                  description: "Calidad premium al mejor precio directo",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-8 text-center border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:border-[#1A3F2B] dark:hover:border-emerald-500 transition-all duration-300"
                >
                  {/* Icono simple */}
                  <div className="w-16 h-16 bg-[#1A3F2B]/10 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1A3F2B]/20 dark:group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-[#1A3F2B] dark:text-emerald-400" />
                  </div>

                  {/* Contenido */}
                  <h3 className="font-normal text-lg text-[#1A3F2B] dark:text-emerald-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                Categorías
              </span>
              <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                Nuestros <span className="font-normal">productos</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                Explorá nuestras categorías
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                Catálogo
              </span>
              <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                Productos <span className="font-normal">destacados</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                Nuestra selección más popular
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1A3F2B]/30 dark:border-emerald-500/40 text-[#1A3F2B] dark:text-emerald-400 text-sm font-light tracking-wide hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 transition-all duration-300 rounded-lg"
              >
                <span>Ver Todos los Productos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                Testimonios
              </span>
              <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                Lo que dicen <span className="font-normal">nuestros clientes</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                La satisfacción de nuestros clientes es nuestra mayor recompensa
              </p>
            </div>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-6xl mx-auto px-4 sm:px-0"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
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
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-6 mb-20">
                <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                  Contacto
                </span>
                <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                  <span className="font-normal">Consultanos</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                  Dejanos tu consulta y te responderemos
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl border border-gray-200 dark:border-slate-700"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-light text-gray-700 dark:text-gray-300">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12 rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-light text-gray-700 dark:text-gray-300">
                      Teléfono *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Tu teléfono"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="h-12 rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-light text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12 rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-light text-gray-700 dark:text-gray-300">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Contanos qué sillón necesitás, medidas, tela, color..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="rounded-lg resize-none border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-lg text-sm font-light tracking-wide bg-[#1A3F2B] dark:bg-emerald-600 text-white hover:bg-[#153021] dark:hover:bg-emerald-500 transition-all duration-300"
                >
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
  );
}
