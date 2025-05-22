"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, X } from "lucide-react"

const CATEGORIAS = [
  { nombre: "Política", ruta: "/politica" },
  { nombre: "Economía", ruta: "/economia" },
  { nombre: "Deportes", ruta: "/deportes" },
  { nombre: "Tecnología", ruta: "/tecnologia" },
  { nombre: "Cultura", ruta: "/cultura" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>NoticiasDiarias</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={`text-base font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Inicio
                </Link>
                {CATEGORIAS.map((categoria) => (
                  <Link
                    key={categoria.ruta}
                    href={categoria.ruta}
                    className={`text-base font-medium ${
                      pathname === categoria.ruta ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {categoria.nombre}
                  </Link>
                ))}
                <Link
                  href="/todas-las-noticias"
                  className={`text-base font-medium ${
                    pathname === "/todas-las-noticias" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Todas las noticias
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className={`text-base font-medium ${
                    pathname === "/sobre-nosotros" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Sobre nosotros
                </Link>
                <Link
                  href="/contacto"
                  className={`text-base font-medium ${
                    pathname === "/contacto" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NoticiasDiarias</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Inicio
          </Link>
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria.ruta}
              href={categoria.ruta}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === categoria.ruta ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {categoria.nombre}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Buscar..." className="w-[200px]" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
              <Button className="hidden md:flex" asChild>
                <Link href="/suscripcion">Suscribirse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
