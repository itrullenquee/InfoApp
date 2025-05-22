'use client' // Requerido para useState, useEffect, y React.use en este contexto

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, Share2, Menu } from "lucide-react"
import { useState, useEffect, use } from "react" // Importa 'use' de React
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// ... (tus interfaces User, Funcionario, Categoria, Novedad aquí) ...
interface User {
  id: number;
  name: string;
  apellido: string;
  email?: string;
}

interface Funcionario {
  id: number;
  user: User;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Novedad {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  imagen: string | null;
  pdf: string | null;
  categoria: Categoria;
  funcionario: Funcionario;
  categoria_id: number;
}


// ... (tus funciones helper: APIURL, getImageUrl, formatDateDetailed, timeAgo, calculateReadingTime, getInitials aquí) ...
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

const formatDateDetailed = (dateString: string): string => {
  try {
    const parsableDateString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T');
    const date = parseISO(parsableDateString);
    if (isNaN(date.getTime())) {
        console.warn("Parsed date is invalid for formatDateDetailed:", dateString);
        return "Fecha no disponible";
    }
    return format(date, "dd 'de' MMMM, yyyy", { locale: es });
  } catch (error) {
    console.error("Error parsing date for formatDateDetailed:", dateString, error);
    return "Fecha no disponible";
  }
};

const calculateReadingTime = (text: string): string => {
  if (!text) return "1 min de lectura";
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de lectura`;
};

const getInitials = (name: string, apellido: string): string => {
  const firstInitial = name ? name[0] : '';
  const lastInitial = apellido ? apellido[0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase() || 'ND';
};


// La firma del componente sigue siendo la misma
export default function NoticiaPage({ params }: { params: { id: string } }) {
  // Usa React.use() para desenvolver la promesa params
  const resolvedParams = use(params);
  const { id } = resolvedParams; // Ahora puedes acceder a 'id' de forma segura

  const [novedad, setNovedad] = useState<Novedad | null>(null);
  const [relatedNovedades, setRelatedNovedades] = useState<Novedad[]>([]);
  const [categoriasNav, setCategoriasNav] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (!id) { // 'id' ya está resuelto aquí
      setError("ID de noticia no proporcionado.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
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

        const categoriasNavPromise = fetch(`${APIURL}/api/categorias`, { headers })
          .then(res => {
            if (!res.ok) throw new Error(`Error al cargar categorías: ${res.status}`);
            return res.json();
          });

        const novedadPromise = fetch(`${APIURL}/api/novedades/${id}`, { headers }) // Usa 'id' resuelto
          .then(res => {
            if (!res.ok) {
              if(res.status === 404) throw new Error("Noticia no encontrada.");
              throw new Error(`Error al cargar la noticia: ${res.status}`);
            }
            return res.json();
          });
        
        const [categoriasData, novedadData] = await Promise.all([categoriasNavPromise, novedadPromise]);
        
        const currentNovedad = novedadData.data || novedadData;
        setNovedad(currentNovedad);
        setCategoriasNav(categoriasData.data || categoriasData);

        if (currentNovedad && currentNovedad.categoria_id) {
          const allNovedadesResponse = await fetch(`${APIURL}/api/novedades`, { headers });
          if (!allNovedadesResponse.ok) {
            console.warn(`No se pudieron cargar noticias relacionadas: ${allNovedadesResponse.status}`);
          } else {
            const allNovedadesData = (await allNovedadesResponse.json()).data || (await allNovedadesResponse.json());
            if (Array.isArray(allNovedadesData)) {
              const related = allNovedadesData
                .filter(n => n.categoria_id === currentNovedad.categoria_id && n.id !== currentNovedad.id)
                .slice(0, 3);
              setRelatedNovedades(related);
            }
          }
        }

      } catch (err: any) {
        console.error("Error fetching noticia:", err);
        setError(err.message || "Ocurrió un error al cargar la información.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // El 'id' en el array de dependencias sigue siendo correcto

  // ... el resto de tu componente (loading, error, JSX) permanece igual ...
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando noticia...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
        <Link href="/"><Button className="mt-4">Volver al inicio</Button></Link>
      </div>;
  }

  if (!novedad) {
    return <div className="flex justify-center items-center min-h-screen">No se encontró la noticia.</div>;
  }

  const descriptionParagraphs = novedad.descripcion?.split(/\r\n\r\n|\n\n/) || [];


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
            <Link href="/noticias" className="flex items-center space-x-2">
              <span className="text-xl font-bold">NoticiasDiarias</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <Link href="/noticias" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Inicio
            </Link>
          </nav>
        </div>
         {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container flex flex-col gap-2 py-4">
                <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Inicio
                </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <article className="container py-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-sm font-medium text-rose-600 mb-2">
              {novedad.categoria?.nombre?.toUpperCase() || "GENERAL"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {novedad.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDateDetailed(novedad.fecha_inicio)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(novedad.descripcion)}</span>
              </div>
            </div>
            {novedad.funcionario && novedad.funcionario.user && (
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage 
                    src={`/placeholder-avatar.jpg`} 
                    alt={`${novedad.funcionario.user.name} ${novedad.funcionario.user.apellido}`} />
                  <AvatarFallback>{getInitials(novedad.funcionario.user.name, novedad.funcionario.user.apellido)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`${novedad.funcionario.user.name} ${novedad.funcionario.user.apellido}`}</div>
                  <div className="text-sm text-muted-foreground">
                    Colaborador
                  </div>
                </div>
              </div>
            )}
          </div>

          {novedad.imagen && (
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] mb-8">
              <Image
                src={getImageUrl(novedad.imagen)}
                alt={`Imagen de ${novedad.titulo}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index} style={{ whiteSpace: 'pre-line' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {novedad.pdf && (
            <div className="mt-8">
                <Button asChild variant="outline">
                    <a href={`${APIURL}/storage/${novedad.pdf}`} target="_blank" rel="noopener noreferrer">
                        Descargar PDF adjunto
                    </a>
                </Button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Compartir este artículo:</div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => alert('Funcionalidad de compartir no implementada')}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Compartir</span>
                </Button>
              </div>
            </div>
          </div>

          {relatedNovedades.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNovedades.map((related) => (
                  <Card key={related.id} className="overflow-hidden flex flex-col">
                    {related.imagen && (
                      <div className="relative h-40">
                        <Image
                          src={getImageUrl(related.imagen)}
                          alt={`Imagen de ${related.titulo}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow p-4">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        {related.categoria?.nombre?.toUpperCase()}
                      </div>
                      <CardTitle className="text-base line-clamp-2">{related.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 mt-auto">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/noticia/${related.id}`}>Leer artículo</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Pie de página */}
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
                 <li><Link href="/noticias" className="text-muted-foreground hover:text-foreground">
                    Inicio
                </Link></li>
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