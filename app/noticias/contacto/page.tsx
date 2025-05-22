"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
    departamento: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, departamento: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío de formulario
    setTimeout(() => {
      toast({
        title: "Formulario enviado",
        description: "Gracias por contactarnos. Te responderemos lo antes posible.",
      })
      setIsSubmitting(false)
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
        departamento: "",
      })
    }, 1500)
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
        {/* Cabecera */}
        <section className="bg-muted py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Contacto</h1>
              <p className="text-muted-foreground">
                Estamos aquí para escucharte. Ponte en contacto con nosotros para cualquier consulta, sugerencia o
                colaboración.
              </p>
            </div>
          </div>
        </section>

        {/* Información de contacto y formulario */}
        <section className="container py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Información de contacto */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>Diferentes formas de contactarnos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@noticiadiarias.com</p>
                      <p className="text-sm text-muted-foreground">redaccion@noticiadiarias.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-sm text-muted-foreground">+34 91 123 45 67</p>
                      <p className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-sm text-muted-foreground">
                        Calle Gran Vía, 123
                        <br />
                        28013 Madrid, España
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Departamentos</CardTitle>
                  <CardDescription>Contacta directamente con el departamento que necesites</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Redacción</h3>
                    <p className="text-sm text-muted-foreground">redaccion@noticiadiarias.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Publicidad</h3>
                    <p className="text-sm text-muted-foreground">publicidad@noticiadiarias.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Recursos Humanos</h3>
                    <p className="text-sm text-muted-foreground">rrhh@noticiadiarias.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de contacto */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formulario de Contacto</CardTitle>
                  <CardDescription>Completa el formulario y te responderemos lo antes posible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          placeholder="Tu nombre"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="asunto">Asunto</Label>
                        <Input
                          id="asunto"
                          name="asunto"
                          placeholder="Asunto de tu mensaje"
                          required
                          value={formData.asunto}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select value={formData.departamento} onValueChange={handleSelectChange}>
                          <SelectTrigger id="departamento">
                            <SelectValue placeholder="Selecciona un departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="redaccion">Redacción</SelectItem>
                            <SelectItem value="publicidad">Publicidad</SelectItem>
                            <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                            <SelectItem value="soporte">Soporte Técnico</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        required
                        value={formData.mensaje}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle>Nuestra ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[400px] w-full bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  [Aquí se mostraría un mapa interactivo con la ubicación de las oficinas]
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Preguntas frecuentes */}
        <section className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pregunta: "¿Cómo puedo suscribirme al boletín de noticias?",
                respuesta:
                  "Puedes suscribirte a nuestro boletín de noticias desde la página principal, introduciendo tu correo electrónico en el formulario de suscripción.",
              },
              {
                pregunta: "¿Cómo puedo enviar una noticia o información?",
                respuesta:
                  "Si tienes información que consideras relevante, puedes enviarla a redaccion@noticiadiarias.com o utilizar el formulario de contacto seleccionando el departamento de Redacción.",
              },
              {
                pregunta: "¿Ofrecen prácticas para estudiantes de periodismo?",
                respuesta:
                  "Sí, ofrecemos programas de prácticas para estudiantes de periodismo y comunicación. Puedes enviar tu CV y carta de motivación a rrhh@noticiadiarias.com.",
              },
              {
                pregunta: "¿Cómo puedo anunciarme en NoticiasDiarias?",
                respuesta:
                  "Para información sobre tarifas publicitarias y opciones de colaboración, contacta con nuestro departamento de Publicidad a través del formulario o en publicidad@noticiadiarias.com.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.pregunta}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.respuesta}</p>
                </CardContent>
              </Card>
            ))}
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
