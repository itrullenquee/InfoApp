'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { useEffect, useState, use } from "react"
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Menu } from "lucide-react"

interface ApiCategoria {
  id: number;
  nombre: string;
}

interface Novedad {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  fecha_inicio: string;
  categoria: ApiCategoria;
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
    if (isNaN(date.getTime())) return dateString;
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  } catch (error) {
    return dateString;
  }
};

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const { categoria: categoriaSlugFromUrl } = params; // Renombrado para claridad

  const [noticias, setNoticias] = useState<Novedad[]>([]);
  const [categoriasApi, setCategoriasApi] = useState<ApiCategoria[]>([]);
  const [tituloPagina, setTituloPagina] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoriaNoEncontrada, setCategoriaNoEncontrada] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCategoriaNoEncontrada(false);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No autenticado. Por favor, inicie sesión.");
          setLoading(false);
          return;
        }
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const categoriasResponse = await fetch(`${APIURL}/api/categorias`, { headers });
        if (!categoriasResponse.ok) {
          throw new Error("Error al cargar las categorías de la API.");
        }
        const todasLasCategoriasApi: ApiCategoria[] = (await categoriasResponse.json()).data || (await categoriasResponse.json());
        setCategoriasApi(todasLasCategoriasApi);

        const categoriaActual = todasLasCategoriasApi.find(
          cat => cat.nombre.toLowerCase().replace(/\s+/g, '-') === categoriaSlugFromUrl.toLowerCase()
        );

        if (!categoriaActual) {
          setCategoriaNoEncontrada(true); // Usar estado para manejar notFound fuera del effect
          setLoading(false);
          return;
        }
        setTituloPagina(categoriaActual.nombre);

        // --- LÍNEA MODIFICADA AQUÍ ---
        const noticiasResponse = await fetch(`${APIURL}/api/novedades-categoria/${categoriaActual.id}`, { headers });
        // --- FIN DE LÍNEA MODIFICADA ---

        if (!noticiasResponse.ok) {
          // Si la API devuelve un 404 específico para categoría sin noticias, podrías manejarlo aquí.
          // Por ahora, asumimos que un array vacío es una respuesta válida si no hay noticias.
          if (noticiasResponse.status === 404 && (await noticiasResponse.clone().json()).message === "No se encontraron novedades para esta categoría.") {
             setNoticias([]); // Establecer como array vacío si el backend devuelve 404 específico
          } else {
            throw new Error(`Error al cargar noticias para ${categoriaActual.nombre}. Código: ${noticiasResponse.status}`);
          }
        } else {
            const dataNoticias: Novedad[] = await noticiasResponse.json();
            setNoticias(dataNoticias);
        }


      } catch (err: any) {
        console.error("Error en CategoriaPage:", err);
        setError(err.message || "Ocurrió un error desconocido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoriaSlugFromUrl]);

  if (categoriaNoEncontrada) {
    notFound(); // Llama a notFound si la categoría no fue encontrada
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando noticias de la categoría...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
        <Link href="/"><Button className="mt-4">Volver al inicio</Button></Link>
      </div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra de navegación */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">NoticiasDiarias</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Inicio
            </Link>
            {categoriasApi.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  cat.nombre.toLowerCase().replace(/\s+/g, '-') === categoriaSlugFromUrl.toLowerCase() ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {cat.nombre}
              </Link>
            ))}
          </nav>
          <Button className="hidden md:flex">Suscribirse</Button>
        </div>
         {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container flex flex-col gap-2 py-4">
                <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Inicio
                </Link>
                {categoriasApi.map(cat => (
                <Link
                    key={`mobile-cat-${cat.id}`}
                    href={`/categoria/${cat.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {cat.nombre}
                </Link>
                ))}
                <Button className="mt-2 w-full" onClick={() => {setIsMobileMenuOpen(false); /* Lógica de suscripción */ }}>Suscribirse</Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="bg-muted py-8">
          <div className="container">
            <h1 className="text-3xl font-bold">{tituloPagina || "Categoría"}</h1>
            {tituloPagina && (
                 <p className="text-muted-foreground mt-2">
                    Las noticias más importantes sobre {tituloPagina.toLowerCase()}
                </p>
            )}
          </div>
        </section>

        <section className="container py-8">
        {noticias.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia) => (
                <Card key={noticia.id} className="overflow-hidden flex flex-col">
                  {noticia.imagen && (
                    <div className="relative h-48">
                      <Image
                        src={getImageUrl(noticia.imagen)}
                        alt={`Imagen de ${noticia.titulo}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader className="flex-grow p-4">
                    <CardTitle className="line-clamp-2 text-lg">{noticia.titulo}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm mt-1">
                      {noticia.descripcion}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center mt-auto p-4 pt-2">
                    <div className="text-xs text-muted-foreground">
                      {timeAgo(noticia.fecha_inicio)}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/noticia/${noticia.id}`}>Leer más</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
           ) : (
            !loading && <p className="text-center text-muted-foreground">No hay noticias disponibles en esta categoría por el momento.</p>
           )}
        </section>
      </main>

      <footer className="border-t bg-muted">
        <div className="container py-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">NoticiasDiarias</h3>
              <p className="text-sm text-muted-foreground">
                Información confiable y actualizada.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Secciones</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground">
                    Inicio
                </Link></li>
                {categoriasApi.map((cat) => (
                  <li key={`footer-cat-${cat.id}`}>
                    <Link href={`/categoria/${cat.nombre.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-foreground">
                      {cat.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Sobre nosotros</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Términos y condiciones</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Política de privacidad</Link></li>
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