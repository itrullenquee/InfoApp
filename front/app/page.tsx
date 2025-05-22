import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sistema de Gestión de la Información</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <div className="container mx-auto">
          <p>Sistema de Gestión de la Información</p>
        </div>
      </footer>
    </div>
  )
}

