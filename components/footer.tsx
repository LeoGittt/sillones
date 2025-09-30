import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/productos", label: "Productos" },
    { href: "/contacto", label: "Contacto" },
  ]

  const socialLinks = [
    { href: "https://www.facebook.com/AVZ", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/Sillones_a.v.z", icon: Instagram, label: "Instagram" },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AVZ</span>
              </div>
              <span className="font-bold text-xl">Sillones AVZ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fabricantes de sillones a medida. Calidad, confort y el mejor precio de mercado.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:elieleluney10@gmail.com" className="hover:text-foreground transition-colors">
                  elieleluney10@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+541123385402" className="hover:text-foreground transition-colors">
                  +54 11 2338-5402
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Av. Gral Rojo 2011, Ciudad Evita, La Matanza</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Lun - Vie: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Sillones AVZ. Todos los derechos reservados. Desarrollado por Nexium Solutions.</p>
        </div>
      </div>
    </footer>
  )
}
