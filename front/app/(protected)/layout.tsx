"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

const rolePermissions: { [key: string]: string[] } = {
  "/dashboard": ["admin", "novedades", "proyectos"],
  "/categorias": ["admin"],
  "/novedades": ["admin", "novedades"],
  "/proyectos": ["admin", "proyectos"],
  "/usuarios": ["admin"],
  "/oficinas": ["admin"],
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const user = JSON.parse(userData)
      const allowedRoles = Object.entries(rolePermissions).find(([path]) =>
        pathname.startsWith(path),
      )?.[1]

      if (allowedRoles?.includes(user.role)) {
        setAuthorized(true)
      } else {
        router.push("/no-autorizado") // podés crear esta ruta
      }
    } catch (e) {
      console.error("Error al procesar usuario:", e)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [pathname, router])

  if (loading) return <div className="p-6 text-muted-foreground">Cargando...</div>

  return authorized ? <>{children}</> : null
}
