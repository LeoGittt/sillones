import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sillones AVZ - Fabricantes de Sillones a Medida",
  description:
    "Somos fabricantes, tu mejor opción en calidad, confort, tenemos el mejor precio de mercado. Personalizamos tu sofá a medida, tela y color. Ciudad Evita, La Matanza.",
  keywords: "sillones, sofás, muebles, fabricantes, a medida, tapizado, ciudad evita, la matanza, sillones avz",
  authors: [{ name: "Sillones AVZ" }],
  creator: "Nexium Solutions",
  publisher: "Sillones AVZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sillones AVZ - Fabricantes de Sillones a Medida",
    description: "Somos fabricantes, tu mejor opción en calidad, confort, tenemos el mejor precio de mercado.",
    siteName: "Sillones AVZ",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sillones AVZ - Fabricantes de Sillones a Medida",
    description: "Somos fabricantes, tu mejor opción en calidad, confort, tenemos el mejor precio de mercado.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`font-sans ${montserrat.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
