"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search } from "lucide-react"

export default function BuscarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra de navegación */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">NoticiasDiarias</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link
              href="/politica"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Política
            </Link>
            <Link
              href="/economia"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Economía
            </Link>
            <Link
              href="/deportes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Deportes
            </Link>
            <Link
              href="/tecnologia"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tecnología
            </Link>
            <Link
              href="/cultura"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Cultura
            </Link>
          </nav>
          <Button className="hidden md:flex">Suscribirse</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Cabecera de búsqueda */}
        <section className="bg-muted py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">Buscar Noticias</h1>
            <form onSubmit={handleSearch} className="flex w-full max-w-3xl gap-2">
              <Input
                type="search"
                placeholder="Buscar noticias, temas o palabras clave..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </form>
          </div>
        </section>

        {/* Resultados de búsqueda */}
        {hasSearched && (
          <section className="container py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Resultados para "{searchQuery}"</h2>
              <p className="text-muted-foreground mt-1">Se encontraron 24 resultados</p>
            </div>

            <Tabs defaultValue="todos" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="noticias">Noticias</TabsTrigger>
                <TabsTrigger value="articulos">Artículos</TabsTrigger>
                <TabsTrigger value="entrevistas">Entrevistas</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=Resultado ${index + 1}`}
                          alt={`Imagen de resultado ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="text-sm font-medium text-emerald-600 mb-1">
                          {index % 5 === 0
                            ? "POLÍTICA"
                            : index % 5 === 1
                              ? "ECONOMÍA"
                              : index % 5 === 2
                                ? "DEPORTES"
                                : index % 5 === 3
                                  ? "TECNOLOGÍA"
                                  : "CULTURA"}
                        </div>
                        <CardTitle className="line-clamp-2">
                          {`Noticia relacionada con ${searchQuery} y otros temas relevantes`}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {`Esta noticia contiene información sobre ${searchQuery} y su impacto en diferentes ámbitos.`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          {index < 3
                            ? `Hace ${index + 1} hora${index === 0 ? "" : "s"}`
                            : index < 6
                              ? `Hace ${index} horas`
                              : `Hace ${Math.ceil(index / 2)} días`}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/noticia/${index + 20}`}>Leer más</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Paginación */}
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TabsContent>

              <TabsContent value="noticias" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=Noticia ${index + 1}`}
                          alt={`Imagen de noticia ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="text-sm font-medium text-emerald-600 mb-1">
                          {index % 3 === 0 ? "POLÍTICA" : index % 3 === 1 ? "ECONOMÍA" : "DEPORTES"}
                        </div>
                        <CardTitle className="line-clamp-2">
                          {`Noticia sobre ${searchQuery} con información actualizada`}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {`Información reciente sobre ${searchQuery} y su desarrollo en las últimas semanas.`}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Hace {index + 1} días</div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/noticia/${index + 30}`}>Leer más</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="articulos" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=Artículo ${index + 1}`}
                          alt={`Imagen de artículo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="text-sm font-medium text-purple-600 mb-1">ARTÍCULO DE OPINIÓN</div>
                        <CardTitle className="line-clamp-2">
                          {`Análisis en profundidad: ${searchQuery} y sus implicaciones futuras`}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {`Un análisis detallado sobre ${searchQuery} y cómo podría afectar diferentes aspectos de la sociedad.`}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Por Juan Pérez</div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/noticia/${index + 40}`}>Leer más</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="entrevistas" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=Entrevista ${index + 1}`}
                          alt={`Imagen de entrevista ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="text-sm font-medium text-amber-600 mb-1">ENTREVISTA</div>
                        <CardTitle className="line-clamp-2">
                          {`"${searchQuery} es un tema fundamental para el futuro": Entrevista con experto`}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {`Conversamos con un especialista sobre ${searchQuery} y su visión sobre este importante tema.`}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Hace 1 semana</div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/noticia/${index + 50}`}>Leer más</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}

        {/* Contenido inicial si no se ha buscado */}
        {!hasSearched && (
          <section className="container py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Temas populares</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("economía")
                    setHasSearched(true)
                  }}
                >
                  Economía
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("elecciones")
                    setHasSearched(true)
                  }}
                >
                  Elecciones
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("cambio climático")
                    setHasSearched(true)
                  }}
                >
                  Cambio climático
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("tecnología")
                    setHasSearched(true)
                  }}
                >
                  Tecnología
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("deportes")
                    setHasSearched(true)
                  }}
                >
                  Deportes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("salud")
                    setHasSearched(true)
                  }}
                >
                  Salud
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Búsquedas recientes</h2>
              <div className="grid gap-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSearchQuery("inteligencia artificial")
                    setHasSearched(true)
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Inteligencia artificial
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSearchQuery("crisis energética")
                    setHasSearched(true)
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Crisis energética
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSearchQuery("mundial de fútbol")
                    setHasSearched(true)
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Mundial de fútbol
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Pie de página */}
      <footer className="border-t bg-muted">
        <div className="container py-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">NoticiasDiarias</h3>
              <p className="text-sm text-muted-foreground">
                Información confiable y actualizada para mantenerte al día con los acontecimientos más importantes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Secciones</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/politica" className="text-muted-foreground hover:text-foreground">
                    Política
                  </Link>
                </li>
                <li>
                  <Link href="/economia" className="text-muted-foreground hover:text-foreground">
                    Economía
                  </Link>
                </li>
                <li>
                  <Link href="/deportes" className="text-muted-foreground hover:text-foreground">
                    Deportes
                  </Link>
                </li>
                <li>
                  <Link href="/tecnologia" className="text-muted-foreground hover:text-foreground">
                    Tecnología
                  </Link>
                </li>
                <li>
                  <Link href="/cultura" className="text-muted-foreground hover:text-foreground">
                    Cultura
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Equipo editorial
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NoticiasDiarias. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
