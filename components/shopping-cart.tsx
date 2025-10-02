"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/components/product-card"

interface CartItem extends Product {
  quantity: number
}

interface ShoppingCartProps {
  items: Product[]
  onUpdateCart: (items: Product[]) => void
  trigger?: React.ReactNode
}

export function ShoppingCart({ items, onUpdateCart, trigger }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  // Group items by id and count quantities
  const cartItems: CartItem[] = items.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      acc.push({ ...item, quantity: 1 })
    }
    return acc
  }, [] as CartItem[])

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }

    const updatedItems: Product[] = []
    cartItems.forEach((item) => {
      if (item.id === productId) {
        for (let i = 0; i < newQuantity; i++) {
          updatedItems.push(item)
        }
      } else {
        for (let i = 0; i < item.quantity; i++) {
          updatedItems.push(item)
        }
      }
    })
    onUpdateCart(updatedItems)
  }

  const removeItem = (productId: string) => {
    const updatedItems = items.filter((item) => item.id !== productId)
    onUpdateCart(updatedItems)
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó del carrito",
    })
  }

  const clearCart = () => {
    onUpdateCart([])
    toast({
      title: "Carrito vaciado",
      description: "Se eliminaron todos los productos del carrito",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const generateWhatsAppMessage = () => {
    let message = "¡Hola! Me interesa realizar el siguiente pedido:\n\n"

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: $${item.price.toFixed(2)}\n`
      message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `Subtotal: $${subtotal.toFixed(2)}\n`
    message += `Envío: ${shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}\n`
    message += `Total: $${total.toFixed(2)}\n\n`
    message += "¿Podrían confirmar la disponibilidad y el proceso de pago?"

    return encodeURIComponent(message)
  }

  const handleCheckout = () => {
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
    toast({
      title: "Redirigiendo a WhatsApp",
      description: "Te conectaremos con nuestro equipo de ventas",
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingBag className="h-4 w-4" />
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="text-center pb-6 border-b border-border/30">
          <SheetTitle className="text-xl font-light text-[#1A3F2B] flex items-center justify-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Mi Carrito
            {items.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length} {items.length === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/60" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Carrito vacío</h3>
              <p className="text-sm text-muted-foreground">Agrega productos para comenzar</p>
            </div>
            <Button onClick={() => setIsOpen(false)} className="rounded-full bg-[#1A3F2B] hover:bg-[#153021] text-white px-6">
              Explorar Productos
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full min-h-0">
            {/* Cart Items */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-4 py-4 px-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-border/50 pb-4 last:border-b-0">
                      <div className="flex gap-3 items-start">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-muted-foreground/20"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 sm:w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-muted-foreground/20"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Cart Summary - Fixed at bottom */}
            <div className="flex-shrink-0 border-t bg-background p-4 -mx-6 mt-4 pb-8">
              <div className="space-y-4">
                {/* Summary Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={shipping === 0 ? "text-[#1A3F2B] font-medium" : ""}>
                      {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 50 && shipping > 0 && (
                    <p className="text-xs text-muted-foreground text-center opacity-75">
                      Envío gratis en compras mayores a $50
                    </p>
                  )}
                  <div className="flex justify-between font-semibold text-base sm:text-lg pt-2 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-[#1A3F2B]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pb-4">
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full rounded-full bg-[#1A3F2B] hover:bg-[#153021] text-white h-11 sm:h-12 text-sm sm:text-base font-medium"
                  >
                    <FaWhatsapp className="h-4 w-4 mr-2" />
                    Finalizar Pedido
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={clearCart} 
                    className="w-full text-muted-foreground hover:text-red-600 h-10 text-sm mt-8 px-6 py-3 mb-2"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
