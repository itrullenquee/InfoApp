import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SobreNosotrosPage() {
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
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nosotros</h1>
              <p className="text-lg text-muted-foreground">
                Comprometidos con la verdad y la información de calidad desde 2010
              </p>
            </div>
          </div>
        </section>

        {/* Nuestra historia */}
        <section className="container py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-muted-foreground mb-4">
                NoticiasDiarias nació en 2010 con la misión de proporcionar información veraz, objetiva y de calidad a
                todos los ciudadanos. Lo que comenzó como un pequeño blog informativo se ha convertido en uno de los
                medios digitales más consultados del país.
              </p>
              <p className="text-muted-foreground mb-4">
                A lo largo de estos años, hemos crecido y evolucionado, adaptándonos a los cambios tecnológicos y a las
                nuevas formas de consumir información, pero manteniendo siempre nuestro compromiso con la verdad y la
                rigurosidad periodística.
              </p>
              <p className="text-muted-foreground">
                Hoy, con un equipo de más de 50 profesionales distribuidos en diferentes ciudades, seguimos trabajando
                día a día para mantener a nuestros lectores informados sobre los acontecimientos más relevantes a nivel
                local, nacional e internacional.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Nuestra Historia"
                alt="Imagen de la historia de NoticiasDiarias"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Nuestros valores */}
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Nuestros Valores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Veracidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos comprometemos a verificar rigurosamente cada información antes de publicarla, contrastando
                    fuentes y datos para garantizar su veracidad.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Independencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mantenemos nuestra independencia editorial frente a presiones políticas, económicas o de cualquier
                    otra índole, para ofrecer información libre de sesgos.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Responsabilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Somos conscientes del impacto que tiene la información en la sociedad y asumimos la responsabilidad
                    de informar con ética y respeto.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Buscamos constantemente nuevas formas de contar historias y llegar a nuestra audiencia, aprovechando
                    las posibilidades que ofrecen las nuevas tecnologías.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Equipo editorial */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Nuestro Equipo Editorial</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nombre: "Carlos Rodríguez", cargo: "Director General", imagen: "CR" },
              { nombre: "María González", cargo: "Editora de Tecnología", imagen: "MG" },
              { nombre: "Javier López", cargo: "Editor de Política", imagen: "JL" },
              { nombre: "Ana Martínez", cargo: "Editora de Economía", imagen: "AM" },
              { nombre: "Roberto Sánchez", cargo: "Editor de Deportes", imagen: "RS" },
              { nombre: "Laura Fernández", cargo: "Editora de Cultura", imagen: "LF" },
            ].map((miembro, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?height=400&width=300&text=${miembro.imagen}`}
                    alt={`Foto de ${miembro.nombre}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{miembro.nombre}</CardTitle>
                  <CardDescription>{miembro.cargo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Premios y reconocimientos */}
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Premios y Reconocimientos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { año: "2023", premio: "Premio Nacional de Periodismo Digital", categoria: "Mejor Cobertura Política" },
                {
                  año: "2022",
                  premio: "Premio Internacional de Periodismo",
                  categoria: "Innovación en Medios Digitales",
                },
                { año: "2021", premio: "Premio a la Excelencia Periodística", categoria: "Investigación" },
                {
                  año: "2020",
                  premio: "Premio de Periodismo Ambiental",
                  categoria: "Mejor Reportaje sobre Cambio Climático",
                },
                { año: "2019", premio: "Premio de Periodismo Económico", categoria: "Análisis Financiero" },
                { año: "2018", premio: "Premio a la Calidad Informativa", categoria: "Rigor Periodístico" },
              ].map((premio, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="text-sm font-medium text-emerald-600 mb-1">{premio.año}</div>
                    <CardTitle className="text-lg">{premio.premio}</CardTitle>
                    <CardDescription>{premio.categoria}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Contacta con Nosotros</h2>
            <p className="text-muted-foreground mb-6">
              Si tienes alguna pregunta, sugerencia o quieres formar parte de nuestro equipo, no dudes en ponerte en
              contacto con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link href="/contacto">Formulario de contacto</Link>
              </Button>
              <Button variant="outline">
                <Link href="mailto:info@noticiadiarias.com">info@noticiadiarias.com</Link>
              </Button>
            </div>
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
                  <Link href="/sobre-nosotros" className="text-foreground hover:text-foreground">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Equipo editorial
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-muted-foreground hover:text-foreground">
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
