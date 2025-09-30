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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main>
        {/* Header */}
        <section className="container mx-auto px-4 py-12 text-center">
          <SectionTag className="bg-green-900/10 text-green-900 px-4 py-1 rounded-full w-fit mx-auto">
            Nosotros
          </SectionTag>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-green-900">
            Conoce Nuestra Historia
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre quiénes somos, qué nos motiva y por qué miles de clientes confían en nosotros
          </p>
        </section>

        {/* About */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionTag className="bg-green-900/10 text-green-900 px-3 py-1 rounded-full w-fit">
                Nuestra Misión
              </SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900">
                Calidad y Confianza desde 2020
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos una empresa comprometida con ofrecer productos de la más alta calidad a precios justos. 
                Nuestra misión es brindar una experiencia de compra excepcional que supere las expectativas 
                de nuestros clientes.
              </p>
              <Button size="lg" asChild className="rounded-full bg-green-900 text-white hover:bg-green-800">
                <Link href="/productos">Ver Productos</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[3/2] rounded-xl overflow-hidden shadow-md ring-1 ring-green-900/20">
                <Image
                  src="/placeholder.svg?height=350&width=500&text=Our+Team"
                  alt="Nuestro equipo"
                  width={500}
                  height={350}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <SectionTag className="bg-green-900/10 text-green-900 px-4 py-1 rounded-full w-fit mx-auto">
                Valores
              </SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900">
                Lo que nos Define
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nuestros valores fundamentales guían cada decisión que tomamos y cada producto que ofrecemos
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <Card key={i} className="shadow-sm border border-green-900/10 hover:shadow-md transition">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-green-900/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon className="h-6 w-6 text-green-900" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-900">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-green-900/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900">
                ¿Listo para Comenzar?
              </h2>
              <p className="text-lg text-muted-foreground">
                Únete a miles de clientes satisfechos y descubre por qué somos la mejor opción para tus compras online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="rounded-full bg-green-900 text-white hover:bg-green-800">
                  <Link href="/productos">Explorar Productos</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full border-green-900 text-green-900 hover:bg-green-900/10">
                  <Link href="/contacto">Contactanos</Link>
                </Button>
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
