"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"

interface UsuarioProyectosProps {
  usuarioId: string
}

interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  estado: "pendiente" | "en_progreso" | "completado" | "cancelado"
  progreso: number
  fechaInicio: string
  fechaFin: string
  rol: "responsable" | "colaborador"
}

export function UsuarioProyectos({ usuarioId }: UsuarioProyectosProps) {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos - reemplazar con llamada real a la API
    const fetchProyectos = async () => {
      setIsLoading(true)
      try {
        // Simulación de delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Datos de ejemplo
        setProyectos([
          {
            id: "1",
            nombre: "Renovación Plaza Central",
            descripcion: "Proyecto de renovación completa de la plaza central del municipio",
            estado: "en_progreso",
            progreso: 65,
            fechaInicio: "2025-01-15",
            fechaFin: "2025-06-30",
            rol: "responsable",
          },
          {
            id: "2",
            nombre: "Sistema de Gestión Documental",
            descripcion: "Implementación de un sistema digital para la gestión de documentos municipales",
            estado: "pendiente",
            progreso: 10,
            fechaInicio: "2025-04-01",
            fechaFin: "2025-07-31",
            rol: "colaborador",
          },
          {
            id: "4",
            nombre: "Mantenimiento de Calles",
            descripcion: "Proyecto de reparación y mantenimiento de calles en el distrito norte",
            estado: "en_progreso",
            progreso: 45,
            fechaInicio: "2025-03-10",
            fechaFin: "2025-05-20",
            rol: "colaborador",
          },
        ])
      } catch (error) {
        console.error("Error al cargar proyectos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProyectos()
  }, [usuarioId])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>
      case "en_progreso":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Progreso</Badge>
      case "completado":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completado</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getRolBadge = (rol: string) => {
    switch (rol) {
      case "responsable":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Responsable
          </Badge>
        )
      case "colaborador":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Colaborador
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (proyectos.length === 0) {
    return <div className="text-center py-8 text-gray-500">Este usuario no tiene proyectos asignados.</div>
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Proyectos Asignados</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Fechas</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proyectos.map((proyecto) => (
            <TableRow key={proyecto.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{proyecto.nombre}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{proyecto.descripcion}</div>
                </div>
              </TableCell>
              <TableCell>{getEstadoBadge(proyecto.estado)}</TableCell>
              <TableCell>
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progreso</span>
                    <span>{proyecto.progreso}%</span>
                  </div>
                  <Progress value={proyecto.progreso} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                    <span>
                      {formatDate(proyecto.fechaInicio)} - {formatDate(proyecto.fechaFin)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRolBadge(proyecto.rol)}</TableCell>
              <TableCell className="text-right">
                <Link href={`/proyectos/${proyecto.id}`}>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

