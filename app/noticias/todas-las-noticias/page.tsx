import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TodasLasNoticiasPage() {
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
        {/* Cabecera */}
        <section className="bg-muted py-8">
          <div className="container">
            <h1 className="text-3xl font-bold">Todas las Noticias</h1>
            <p className="text-muted-foreground mt-2">Explora todas nuestras noticias más recientes</p>
          </div>
        </section>

        {/* Filtros */}
        <section className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select defaultValue="recientes">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  <SelectItem value="antiguos">Más antiguos</SelectItem>
                  <SelectItem value="relevantes">Más relevantes</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="todas">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  <SelectItem value="politica">Política</SelectItem>
                  <SelectItem value="economia">Economía</SelectItem>
                  <SelectItem value="deportes">Deportes</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="cultura">Cultura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground w-full sm:w-auto">Mostrando 1-12 de 48 resultados</div>
          </div>

          {/* Listado de noticias */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
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
                    {`Titular de la noticia ${index + 1} con información relevante`}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {`Breve descripción de la noticia ${index + 1} que proporciona contexto adicional sobre el contenido.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
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
                    <Link href={`/noticia/${index + 1}`}>Leer más</Link>
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
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
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
