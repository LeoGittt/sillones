"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Globe, Heart, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/components/product-card"

const values = [
  { icon: CheckCircle, title: "Calidad Premium", description: "Seleccionamos cuidadosamente cada producto para garantizar la máxima calidad y durabilidad." },
  { icon: Users, title: "Atención Personalizada", description: "Nuestro equipo está siempre disponible para brindar el mejor servicio y asesoramiento." },
  { icon: Award, title: "Experiencia Comprobada", description: "Más de 4 años en el mercado nos respaldan como líderes en comercio electrónico." },
  { icon: Globe, title: "Envíos Globales", description: "Llegamos a cualquier parte del mundo con nuestro sistema de envíos internacionales." },
  { icon: Heart, title: "Compromiso Social", description: "Apoyamos causas sociales y trabajamos por un comercio más justo y sostenible." },
  { icon: Zap, title: "Innovación Constante", description: "Siempre buscamos nuevas formas de mejorar la experiencia de compra de nuestros clientes." },
]

export default function AboutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const { toast } = useToast()

  const handleUpdateCart = (items: Product[]) => setCartItems(items)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main>
        {/* Header */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6 max-w-2xl mt-5 mx-auto">
            <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
              Nosotros
            </span>
            <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
              Conoce nuestra <span className="font-normal">Historia</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
              Descubre quiénes somos, qué nos motiva y por qué miles de clientes confían en nosotros
            </p>
          </div>
        </section>

        {/* About */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                  Nuestra Misión
                </span>
                <h2 className="font-light text-3xl md:text-4xl lg:text-5xl text-[#1A3F2B] dark:text-emerald-400">
                  Calidad y Confianza <span className="font-normal">desde 2020</span>
                </h2>
                <div className="w-12 h-px bg-[#1A3F2B]/20 dark:bg-emerald-400/30"></div>
              </div>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                Somos una empresa comprometida con ofrecer productos de la más alta calidad a precios justos. 
                Nuestra misión es brindar una experiencia de compra excepcional que supere las expectativas 
                de nuestros clientes.
              </p>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1A3F2B] dark:bg-emerald-600 text-white text-sm font-light tracking-wide hover:bg-[#153021] dark:hover:bg-emerald-500 transition-all duration-300 rounded-lg"
              >
                Ver Productos
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[3/2] rounded-xl overflow-hidden">
                <Image
                  src="/2.jpg"
                  alt="Nuestro equipo"
                  width={500}
                  height={350}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="bg-white dark:bg-slate-950 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
                Valores
              </span>
              <h2 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
                Lo que nos <span className="font-normal">Define</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                Nuestros valores fundamentales guían cada decisión que tomamos y cada producto que ofrecemos
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <Card key={i} className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl hover:border-[#1A3F2B] dark:hover:border-emerald-500 transition-all duration-300">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-[#1A3F2B]/10 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto">
                        <Icon className="h-8 w-8 text-[#1A3F2B] dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-normal text-[#1A3F2B] dark:text-emerald-400">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="font-light text-3xl md:text-4xl lg:text-5xl text-[#1A3F2B] dark:text-emerald-400">
                ¿Listo para <span className="font-normal">Comenzar</span>?
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                Únete a miles de clientes satisfechos y descubre por qué somos la mejor opción para tus compras online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1A3F2B] dark:bg-emerald-600 text-white text-sm font-light tracking-wide hover:bg-[#153021] dark:hover:bg-emerald-500 transition-all duration-300 rounded-lg"
                >
                  Explorar Productos
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#1A3F2B]/30 dark:border-emerald-500/40 text-[#1A3F2B] dark:text-emerald-400 text-sm font-light tracking-wide hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:bg-[#1A3F2B]/5 dark:hover:bg-emerald-500/10 transition-all duration-300 rounded-lg"
                >
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
