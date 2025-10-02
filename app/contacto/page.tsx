"use client"

import type React from "react"
import type { Product } from "@/components/product-card"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Av. Principal 123", "Ciudad, País 12345"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@ecomtemplate.com", "soporte@ecomtemplate.com"],
  },
  {
    icon: Clock,
    title: "Horarios",
    details: ["Lun - Vie: 9:00 - 18:00", "Sáb: 10:00 - 14:00"],
  },
]

export default function ContactPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main>
        {/* Page Header */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 mt-5 mb-2 max-w-2xl mx-auto">
            <span className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
              Contacto
            </span>
            <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-[#1A3F2B] dark:text-emerald-400">
              Ponte en <span className="font-normal">Contacto</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="container mx-auto px-4 ">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1A3F2B] dark:text-emerald-400 font-light">
                    Envíanos un Mensaje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-light text-gray-700 dark:text-gray-300">
                          Nombre completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          required
                          className="h-12 rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-light text-gray-700 dark:text-gray-300">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                          className="h-12 rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-light text-gray-700 dark:text-gray-300">
                        Asunto *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="¿En qué podemos ayudarte?"
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
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={10}
                        required
                        className="min-h-[200px] rounded-lg border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 rounded-lg text-sm font-light tracking-wide bg-[#1A3F2B] dark:bg-emerald-600 text-white hover:bg-[#153021] dark:hover:bg-emerald-500 transition-all duration-300"
                    >
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index} className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl hover:border-[#1A3F2B] dark:hover:border-emerald-500 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#1A3F2B]/10 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-[#1A3F2B] dark:text-emerald-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-normal text-[#1A3F2B] dark:text-emerald-400">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 font-light">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="container mx-auto py-8 px-4 mb-16">
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nuestra ubicación"
              className="grayscale dark:grayscale-0"
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
