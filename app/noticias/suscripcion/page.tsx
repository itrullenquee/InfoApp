import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function SuscripcionPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Suscríbete a NoticiasDiarias</h1>
              <p className="text-lg text-muted-foreground">
                Accede a contenido exclusivo, reportajes en profundidad y análisis de expertos
              </p>
            </div>
          </div>
        </section>

        {/* Planes de suscripción */}
        <section className="container py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Básico */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Básico</CardTitle>
                <CardDescription>Para lectores ocasionales</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">Gratis</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Acceso a noticias básicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Boletín semanal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Comentarios en noticias</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Registrarse
                </Button>
              </CardFooter>
            </Card>

            {/* Plan Premium */}
            <Card className="border-primary">
              <CardHeader>
                <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full w-fit mb-2">
                  Más popular
                </div>
                <CardTitle>Plan Premium</CardTitle>
                <CardDescription>Para lectores habituales</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">4,99€</span>
                  <span className="text-muted-foreground"> /mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Todo lo del plan básico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Acceso completo a todos los artículos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Sin publicidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Boletín diario personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Acceso a reportajes especiales</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Suscribirse ahora</Button>
              </CardFooter>
            </Card>

            {/* Plan Corporativo */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Corporativo</CardTitle>
                <CardDescription>Para empresas y organizaciones</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">9,99€</span>
                  <span className="text-muted-foreground"> /mes por usuario</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Todo lo del plan premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Múltiples cuentas de usuario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Informes y análisis exclusivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Acceso a eventos y webinars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contactar ventas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Beneficios */}
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">¿Por qué suscribirse?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  titulo: "Contenido exclusivo",
                  descripcion:
                    "Accede a reportajes, análisis y entrevistas que solo están disponibles para suscriptores.",
                },
                {
                  titulo: "Sin publicidad",
                  descripcion: "Disfruta de una experiencia de lectura limpia y sin interrupciones publicitarias.",
                },
                {
                  titulo: "Apoya el periodismo de calidad",
                  descripcion: "Tu suscripción contribuye a mantener un periodismo independiente y de calidad.",
                },
                {
                  titulo: "Personalización",
                  descripcion: "Recibe noticias adaptadas a tus intereses y preferencias de lectura.",
                },
              ].map((beneficio, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{beneficio.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{beneficio.descripcion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Lo que dicen nuestros suscriptores</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nombre: "Ana García",
                profesion: "Profesora universitaria",
                testimonio:
                  "La calidad de los análisis y reportajes es excepcional. Me ayuda a estar informada sobre temas complejos de una manera clara y rigurosa.",
              },
              {
                nombre: "Carlos Martínez",
                profesion: "Empresario",
                testimonio:
                  "La sección de economía es imprescindible para mi trabajo. Los análisis de mercado me han ayudado a tomar mejores decisiones empresariales.",
              },
              {
                nombre: "Laura Sánchez",
                profesion: "Estudiante de periodismo",
                testimonio:
                  "Como estudiante, valoro enormemente el rigor periodístico y la diversidad de temas que tratan. Es una referencia para mi formación.",
              },
            ].map((testimonio, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=${testimonio.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}`}
                        alt={testimonio.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <blockquote className="text-muted-foreground italic mb-4">"{testimonio.testimonio}"</blockquote>
                    <div>
                      <p className="font-medium">{testimonio.nombre}</p>
                      <p className="text-sm text-muted-foreground">{testimonio.profesion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  pregunta: "¿Puedo cancelar mi suscripción en cualquier momento?",
                  respuesta:
                    "Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil de usuario. No hay permanencia mínima ni penalizaciones por cancelación.",
                },
                {
                  pregunta: "¿Cómo funciona el periodo de prueba?",
                  respuesta:
                    "Ofrecemos un periodo de prueba gratuito de 7 días para que puedas probar todas las funcionalidades premium. Puedes cancelar en cualquier momento durante este periodo sin cargo alguno.",
                },
                {
                  pregunta: "¿Puedo compartir mi suscripción?",
                  respuesta:
                    "Las suscripciones individuales son para uso personal y no pueden compartirse. Si necesitas múltiples accesos, te recomendamos nuestro plan corporativo.",
                },
                {
                  pregunta: "¿Qué métodos de pago aceptan?",
                  respuesta:
                    "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencia bancaria para suscripciones corporativas.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.pregunta}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.respuesta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">¿Listo para unirte?</h2>
            <p className="text-muted-foreground mb-6">
              Suscríbete hoy y disfruta de acceso ilimitado a todas nuestras noticias y contenidos exclusivos.
            </p>
            <Button size="lg" asChild>
              <Link href="#planes">Comenzar ahora</Link>
            </Button>
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
                  <Link href="/sobre-nosotros" className="text-muted-foreground hover:text-foreground">
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
