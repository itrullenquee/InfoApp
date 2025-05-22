'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input" // Added for search
import { Search, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Interfaces (Categoria, User, Novedad) remain the same
interface Categoria {
  id: number;
  nombre: string;
}

interface User {
  id: number;
  name: string;
  apellido: string;
  email: string;
}

interface Novedad {
  id: number;
  categoria_id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  imagen: string | null;
  pdf: string | null;
  categoria: Categoria;
}

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) {
    return "/placeholder.svg?text=Sin+Imagen";
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${APIURL}/storage/${imagePath}`;
};

const timeAgo = (dateString: string): string => {
  try {
    const parsableDateString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T');
    const date = parseISO(parsableDateString);
     if (isNaN(date.getTime())) {
        console.warn("Parsed date is invalid:", dateString);
        return dateString;
    }
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return dateString;
  }
};


export default function Home() {
  const [allNovedades, setAllNovedades] = useState<Novedad[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No se encontró token de autenticación. Por favor, inicie sesión.");
          setLoading(false);
          return;
        }
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`};
        const [novedadesResponse, categoriasResponse] = await Promise.all([
          fetch(`${APIURL}/api/noticias`, { method: 'GET', headers }),
          fetch(`${APIURL}/api/categorias`, { method: 'GET', headers })
        ]);
        if (!novedadesResponse.ok) throw new Error(`Error al cargar novedades: ${novedadesResponse.statusText}`);
        if (!categoriasResponse.ok) throw new Error(`Error al cargar categorías: ${categoriasResponse.statusText}`);
        const novedadesData: Novedad[] = await novedadesResponse.json();
        const categoriasData: Categoria[] = await categoriasResponse.json();
        setAllNovedades(novedadesData || []);
        setCategorias(categoriasData || []);
      } catch (err: any) {
        setError(err.message || "Ocurrió un error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedAllNovedades = [...allNovedades].sort((a, b) => {
    try {
        const dateA = parseISO(a.fecha_inicio.replace(' ', 'T')).getTime();
        const dateB = parseISO(b.fecha_inicio.replace(' ', 'T')).getTime();
        return dateB - dateA;
    } catch(e) { return 0; }
  });

  const filteredNovedades = sortedAllNovedades
    .filter(novedad => {
      if (selectedCategoriaId === null) return true;
      return novedad.categoria_id === selectedCategoriaId;
    })
    .filter(novedad => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        novedad.titulo.toLowerCase().includes(term) ||
        novedad.descripcion.toLowerCase().includes(term)
      );
    });

  const featuredNovedad = filteredNovedades.length > 0 ? filteredNovedades[0] : null;
  const recientesNovedades = filteredNovedades.slice(featuredNovedad ? 1 : 0, (featuredNovedad ? 1 : 0) + 6);
  const popularesNovedades = [...filteredNovedades].sort(() => 0.5 - Math.random()).slice(0, 3);

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategoriaId(categoryId);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando noticias...</div>;
  if (error) return <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Reintentar</Button>
      </div>;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" /> <span className="sr-only">Menú</span>
            </Button>
            <Link href="/noticias" className="flex items-center space-x-2" onClick={() => { handleCategoryFilter(null); setSearchTerm("");}}>
              <span className="text-xl font-bold">NoticiasDiarias</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-1 sm:gap-2"> {/* Adjusted gap */}
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm font-medium transition-colors hover:text-primary px-2 sm:px-3 ${
                selectedCategoriaId === null ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => handleCategoryFilter(null)}
            >
              Todas
            </Button>
            {categorias.map((categoria) => (
              <Button
                key={categoria.id}
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors hover:text-primary px-2 sm:px-3 ${
                  selectedCategoriaId === categoria.id ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => handleCategoryFilter(categoria.id)}
              >
                {categoria.nombre}
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="h-9 pl-8 pr-2 w-[150px] md:w-[200px] lg:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {filteredNovedades.length === 0 && !loading && (
          <section className="container py-6 text-center">
            <p className="text-lg text-muted-foreground">
              No se encontraron noticias {searchTerm ? `para "${searchTerm}"` : ""}
              {selectedCategoriaId !== null ? ` en la categoría '${categorias.find(c=>c.id===selectedCategoriaId)?.nombre}'` : ""}.
            </p>
            {(searchTerm || selectedCategoriaId !== null) && (
                <Button onClick={() => { setSearchTerm(""); handleCategoryFilter(null); }} className="mt-4">
                    Limpiar todos los filtros
                </Button>
            )}
          </section>
        )}

        {featuredNovedad && (
          <section className="container py-6 md:py-8">
            <div className="grid gap-6">
              <Card className="overflow-hidden">
                <div className="md:grid md:grid-cols-2">
                  <div className="relative h-60 md:h-full min-h-[300px] md:min-h-[400px]">
                    <Image
                      src={getImageUrl(featuredNovedad.imagen)}
                      alt={`Imagen de ${featuredNovedad.titulo}`}
                      fill className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 pb-4">
                        <div className="text-sm font-medium text-rose-600 mb-2">
                          {featuredNovedad.categoria?.nombre?.toUpperCase() || "DESTACADO"}
                        </div>
                        <CardTitle className="text-2xl md:text-3xl">{featuredNovedad.titulo}</CardTitle>
                        <CardDescription className="text-base mt-2 line-clamp-4">{featuredNovedad.descripcion}</CardDescription>
                      </CardHeader>
                    </div>
                    <CardFooter className="p-0 flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">{timeAgo(featuredNovedad.fecha_inicio)}</div>
                      <Button variant="outline" asChild><Link href={`noticias/noticia/${featuredNovedad.id}`}>Leer más</Link></Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {filteredNovedades.length > (featuredNovedad ? 1 : 0) && (
        <section className="container py-6">
          <Tabs defaultValue="recientes" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {selectedCategoriaId ? `Noticias de ${categorias.find(c=>c.id === selectedCategoriaId)?.nombre}` : searchTerm ? `Resultados de búsqueda` : 'Más Noticias'}
              </h2>
              <TabsList>
                <TabsTrigger value="recientes">Recientes</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="recientes" className="space-y-6">
              {recientesNovedades.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recientesNovedades.map((novedad) => (
                    <Card key={`reciente-${novedad.id}`} className="overflow-hidden flex flex-col">
                      <div className="relative h-48">
                        <Image src={getImageUrl(novedad.imagen)} alt={`Imagen de ${novedad.titulo}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                      </div>
                      <CardHeader className="flex-grow p-4">
                        <div className="text-xs font-medium text-emerald-600 mb-1">{novedad.categoria?.nombre?.toUpperCase() || "GENERAL"}</div>
                        <CardTitle className="line-clamp-2 text-lg">{novedad.titulo}</CardTitle>
                        <CardDescription className="line-clamp-3 text-sm mt-1">{novedad.descripcion}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center mt-auto p-4 pt-0">
                        <div className="text-xs text-muted-foreground">{timeAgo(novedad.fecha_inicio)}</div>
                        <Button variant="ghost" size="sm" asChild><Link href={`noticias/noticia/${novedad.id}`}>Leer más</Link></Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (<p>No hay más noticias recientes disponibles {selectedCategoriaId ? `en esta categoría` : searchTerm ? 'para esta búsqueda' : ''}.</p>)}
            </TabsContent>
            <TabsContent value="populares" className="space-y-6">
             {popularesNovedades.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {popularesNovedades.map((novedad) => (
                    <Card key={`popular-${novedad.id}`} className="overflow-hidden flex flex-col">
                      <div className="relative h-48">
                         <Image src={getImageUrl(novedad.imagen)} alt={`Imagen de ${novedad.titulo}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                      </div>
                      <CardHeader className="flex-grow p-4">
                        <div className="text-xs font-medium text-purple-600 mb-1">{novedad.categoria?.nombre?.toUpperCase() || "POPULAR"}</div>
                        <CardTitle className="line-clamp-2 text-lg">{novedad.titulo}</CardTitle>
                        <CardDescription className="line-clamp-3 text-sm mt-1">{novedad.descripcion}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center mt-auto p-4 pt-0">
                        <div className="text-xs text-muted-foreground">{timeAgo(novedad.fecha_inicio)}</div>
                        <Button variant="ghost" size="sm" asChild><Link href={`noticias/noticia/${novedad.id}`}>Leer más</Link></Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (<p>No hay noticias populares disponibles {selectedCategoriaId ? `en esta categoría` : searchTerm ? 'para esta búsqueda' : ''}.</p>)}
            </TabsContent>
          </Tabs>
        </section>
        )}

        {/* Secciones de categorías dinámicas: Show only if no category filter AND no search term is active */}
        {selectedCategoriaId === null && !searchTerm.trim() && allNovedades.length > 0 && (
          <section className="container py-6">
            {categorias.map((categoria) => {
              const novedadesPorCategoria = sortedAllNovedades.filter(n => n.categoria_id === categoria.id && n.id !== (featuredNovedad && selectedCategoriaId === null && !searchTerm.trim() ? featuredNovedad.id : -1) );
              if (novedadesPorCategoria.length === 0) return null;
              return (
                <div key={categoria.id} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{categoria.nombre}</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {novedadesPorCategoria.slice(0, 4).map((novedad) => (
                      <Card key={`cat-${categoria.id}-${novedad.id}`} className="overflow-hidden flex flex-col">
                        <div className="relative h-40">
                          <Image src={getImageUrl(novedad.imagen)} alt={`Imagen de ${novedad.titulo}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"/>
                        </div>
                        <CardHeader className="p-4 flex-grow"><CardTitle className="text-base line-clamp-2">{novedad.titulo}</CardTitle></CardHeader>
                        <CardFooter className="p-4 pt-0 mt-auto">
                          <div className="flex justify-between items-center w-full">
                            <div className="text-xs text-muted-foreground">{timeAgo(novedad.fecha_inicio)}</div>
                            <Button variant="ghost" size="sm" asChild className="p-0 h-auto"><Link href={`noticias/noticia/${novedad.id}`}>Leer más</Link></Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  {novedadesPorCategoria.length > 4 && (
                    <div className="mt-4 text-center">
                      <Button variant="link" asChild>
                        <Link href={`/categoria/${categoria.nombre.toLowerCase().replace(/\s+/g, '-')}`}>Ver más de {categoria.nombre}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}
      </main>

      <footer className="border-t bg-muted">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div><h3 className="text-lg font-semibold mb-4">NoticiasDiarias</h3><p className="text-sm text-muted-foreground">Información confiable...</p></div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Secciones</h3>
              <ul className="space-y-2 text-sm">
                {categorias.map(cat => (<li key={`footer-cat-${cat.id}`}><Link href={`/categoria/${cat.nombre.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-foreground">{cat.nombre}</Link></li>))}
                {categorias.length === 0 && <li><span className="text-muted-foreground">Cargando...</span></li>}
              </ul>
            </div>
            <div><h3 className="text-lg font-semibold mb-4">Empresa</h3><ul className="space-y-2 text-sm"><li><Link href="#" className="text-muted-foreground hover:text-foreground">Sobre nosotros</Link></li><li><Link href="#" className="text-muted-foreground hover:text-foreground">Contacto</Link></li></ul></div>
            <div><h3 className="text-lg font-semibold mb-4">Legal</h3><ul className="space-y-2 text-sm"><li><Link href="#" className="text-muted-foreground hover:text-foreground">Términos y condiciones</Link></li><li><Link href="#" className="text-muted-foreground hover:text-foreground">Política de privacidad</Link></li></ul></div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground"><p>© {new Date().getFullYear()} NoticiasDiarias. Todos los derechos reservados.</p></div>
        </div>
      </footer>
    </div>
  )
}