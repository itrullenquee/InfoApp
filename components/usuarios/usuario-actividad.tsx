"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Bell, CheckCircle } from "lucide-react"

interface UsuarioActividadProps {
  usuarioId: string
}

interface Actividad {
  id: string
  tipo: "proyecto" | "novedad" | "tarea"
  accion: string
  entidad: {
    id: string
    nombre: string
    tipo: string
  }
  fecha: string
}

export function UsuarioActividad({ usuarioId }: UsuarioActividadProps) {
  const [actividades, setActividades] = useState<Actividad[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos - reemplazar con llamada real a la API
    const fetchActividades = async () => {
      setIsLoading(true)
      try {
        // Simulación de delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Datos de ejemplo
        setActividades([
          {
            id: "1",
            tipo: "proyecto",
            accion: "creó",
            entidad: {
              id: "1",
              nombre: "Renovación Plaza Central",
              tipo: "proyecto",
            },
            fecha: "2024-04-01T10:30:00",
          },
          {
            id: "2",
            tipo: "tarea",
            accion: "completó",
            entidad: {
              id: "3",
              nombre: "Diseño de planos",
              tipo: "tarea",
            },
            fecha: "2024-03-28T15:45:00",
          },
          {
            id: "3",
            tipo: "novedad",
            accion: "reportó",
            entidad: {
              id: "5",
              nombre: "Bacheo en calle San Martín",
              tipo: "novedad",
            },
            fecha: "2024-03-25T09:15:00",
          },
          {
            id: "4",
            tipo: "proyecto",
            accion: "actualizó",
            entidad: {
              id: "2",
              nombre: "Sistema de Gestión Documental",
              tipo: "proyecto",
            },
            fecha: "2024-03-20T14:20:00",
          },
          {
            id: "5",
            tipo: "tarea",
            accion: "asignó",
            entidad: {
              id: "7",
              nombre: "Relevamiento de requisitos",
              tipo: "tarea",
            },
            fecha: "2024-03-15T11:10:00",
          },
        ])
      } catch (error) {
        console.error("Error al cargar actividades:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActividades()
  }, [usuarioId])

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // Hoy
      return `Hoy a las ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    } else if (diffDays === 1) {
      // Ayer
      return `Ayer a las ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    } else if (diffDays < 7) {
      // Esta semana
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      }
      return date.toLocaleDateString("es-ES", options)
    } else {
      // Más de una semana
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
      return date.toLocaleString("es-ES", options)
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "proyecto":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "novedad":
        return <Bell className="h-5 w-5 text-amber-500" />
      case "tarea":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "proyecto":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Proyecto</Badge>
      case "novedad":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Novedad</Badge>
      case "tarea":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Tarea</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (actividades.length === 0) {
    return <div className="text-center py-8 text-gray-500">No hay actividad reciente para este usuario.</div>
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Actividad Reciente</h3>

      <div className="space-y-4">
        {actividades.map((actividad) => (
          <div key={actividad.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-gray-50">
            <div className="bg-gray-100 rounded-full p-2">{getTipoIcon(actividad.tipo)}</div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{getTipoBadge(actividad.tipo)}</div>
                <div className="text-sm text-gray-500">{formatDateTime(actividad.fecha)}</div>
              </div>

              <p className="text-gray-700">
                <span className="font-medium">{actividad.accion}</span>{" "}
                {actividad.entidad.tipo === "tarea"
                  ? "la tarea"
                  : actividad.entidad.tipo === "novedad"
                    ? "la novedad"
                    : "el proyecto"}{" "}
                <span className="font-medium">"{actividad.entidad.nombre}"</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

