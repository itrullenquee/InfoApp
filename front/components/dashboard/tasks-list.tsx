'use client'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

interface Novedad {
  id: number | string
  titulo: string
  fecha_inicio: string
  categoria: Categoria
  funcionario: Funcionario
}

interface Funcionario {
  id: number | string
  user: User
}

interface User {
  id: number
  name: string
  apellido: string
}

interface Categoria {
  id: number
  nombre: string
}

export function NovedadessList() {
  const [novedades, setNovedades] = useState<Novedad[]>([])
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const response = await fetch(`${APIURL}/api/dashboard/novedadesDashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await response.json()
        const novedadesConFechaString = data.map((novedad: Novedad) => ({
          ...novedad,
          fecha_inicio: formatearFecha(novedad.fecha_inicio)
        }))
        setNovedades(novedadesConFechaString)
      } catch (error) {
        console.error("Error fetching novedades:", error)
      }
    }

    fetchNovedades()
  }, [])

  const formatearFecha = (fechaIso: string): string => {
    const fecha = new Date(fechaIso)
    const hoy = new Date()
    const diff = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24))

    if (diff === 0) return "Hoy"
    if (diff === 1) return "Ayer"
    if (diff < 7) return `Hace ${diff} días`

    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(fecha)
  }

  const categoriaStyles: Record<string, string> = {
    social: "border-red-200 text-red-600 bg-red-50",
    policial: "border-amber-200 text-amber-600 bg-amber-50",
    politica: "border-green-200 text-green-600 bg-green-50",
    La_Banda: "border-purple-200 text-purple-600 bg-purple-50",
    informativa: "border-blue-200 text-blue-600 bg-blue-50",
    // podés agregar más categorías acá
  }

  return (
    <Link href="/novedades">
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm max-h-[500px] overflow-y-auto space-y-4 custom-scroll">
      {novedades.map((novedad) => (
        <div
        key={novedad.id}
          className="border bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {novedad.funcionario.user.name} {novedad.funcionario.user.apellido}
              </h2>
              <p className="text-base font-medium text-gray-900">{novedad.titulo}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <CalendarDays className="h-4 w-4" />
                <span>{novedad.fecha_inicio}</span>
              </div>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "text-xs px-2 py-1 rounded-full capitalize",
                categoriaStyles[novedad.categoria.nombre.toLowerCase()] ||
                  "border-gray-200 text-gray-600 bg-gray-50"
              )}
            >
              {novedad.categoria.nombre}
            </Badge>
          </div>
        </div>
      ))}
    </div>
      </Link>
  )
}
