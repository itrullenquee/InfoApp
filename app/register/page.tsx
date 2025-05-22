import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sistema de Gestión Municipal</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline" className="text-white border-white hover:bg-teal-600">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <div className="container mx-auto">
          <p>© 2025 Sistema de Gestión Municipal. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

