"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, MoreHorizontal, Trash2, Eye, Users } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

interface Proyecto {
  id: string
  titulo: string
  descripcion: string
  estado: "pendiente" | "en_progreso" | "completado" | "cancelado"
  fecha_inicio: string
  fecha_fin: string
}

export function ProyectosList() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const APIURL = process.env.NEXT_PUBLIC_API_URL
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
        return <Badge>{estado}</Badge>
    }
  }

  const handleDelete = (id: string) => {
    axios.delete(
      `${APIURL}/api/proyectos/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => {
        setProyectos(proyectos.filter((proyecto) => proyecto.id !== id))
      })
      .catch((error) => console.error("Error al eliminar el proyecto:", error))
  }

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/proyectos`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })

        // Si la respuesta es un array, se trata de proyectos
        if (Array.isArray(response.data.data)) {
          setProyectos(response.data.data)
        } else {
          // Si la respuesta es un objeto con mensaje
          setProyectos([]) // aseguramos estado vacío
          console.warn(response.data.message)
        }
      } catch (error) {
        console.error("Error al obtener proyectos:", error)
      }
    }

    fetchProyectos()
  }, [])


  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fechas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <TableRow key={proyecto.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{proyecto.titulo}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {proyecto.descripcion}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getEstadoBadge(proyecto.estado)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Inicio: {proyecto.fecha_inicio}</div>
                    <div>Fin: {proyecto.fecha_fin}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`/proyectos/${proyecto.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver Detalles</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/proyectos/edit/${proyecto.id}`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(proyecto.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No hay proyectos</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>


      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

