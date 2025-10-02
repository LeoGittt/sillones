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
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-[#1A3F2B] dark:bg-emerald-600 p-6 flex items-center justify-center">
                <span className="text-white font-light text-lg">AVZ</span>
              </div>
              <span className="font-light text-xl text-[#1A3F2B] dark:text-emerald-400">Sillones </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Fabricantes de sillones a medida. Calidad, confort y el mejor precio de mercado.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1A3F2B] dark:hover:text-emerald-400 transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-light">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#1A3F2B] dark:text-emerald-400" />
                <a href="mailto:elieleluney10@gmail.com" className="hover:text-[#1A3F2B] dark:hover:text-emerald-400 transition-colors">
                  elieleluney10@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#1A3F2B] dark:text-emerald-400" />
                <a href="tel:+541123385402" className="hover:text-[#1A3F2B] dark:hover:text-emerald-400 transition-colors">
                  +54 11 2338-5402
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[#1A3F2B] dark:text-emerald-400 flex-shrink-0" />
                <span>Av. Gral Rojo 2011, Ciudad Evita, La Matanza</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#1A3F2B] dark:text-emerald-400" />
                <span>Lun - Vie: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-6">
            <h3 className="text-xs font-medium text-[#1A3F2B]/60 dark:text-emerald-400/70 uppercase tracking-widest">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-[#1A3F2B] dark:hover:border-emerald-400 hover:text-[#1A3F2B] dark:hover:text-emerald-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-light">
            &copy; {currentYear} Sillones AVZ. Todos los derechos reservados. Desarrollado por Nexium Solutions y Dietiero.
          </p>
        </div>
      </div>
    </footer>
  )
}
