"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldOff } from "lucide-react"

export default function NoAutorizadoPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user")
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData)
            const role = parsedUser.role

            // Redirige según el rol del usuario
            switch (role) {
              case "admin":
                router.push("/dashboard")
                break
              case "novedades":
                router.push("/novedades")
                break
              case "proyectos":
                router.push("/proyectos")
                break
              default:
                router.push("/") // Redirige al home si no hay rol definido
            }
          } catch (error) {
            router.push("/")
          }
        } else {
          router.push("/")
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center border border-red-400 bg-red-50 dark:bg-red-950 dark:border-red-800 rounded-2xl p-8 shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-600 dark:text-red-400">
          <ShieldOff className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-red-700 dark:text-red-300">
          Acceso Denegado
        </h1>
        <p className="text-muted-foreground mb-2">
          No tienes permiso para acceder a esta sección del sistema.
        </p>
        <p className="text-sm text-muted-foreground">
          Serás redirigido automáticamente...
        </p>
      </div>
    </div>
  )
}
