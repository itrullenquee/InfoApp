"use client"

import { useState, useEffect } from "react"
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
import { Edit, MoreHorizontal, Trash2, Eye, Users, MapPin, Phone, BookOpenCheck, Hotel } from "lucide-react"
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
import axios from "axios"
interface Oficina {
  id: string
  nombre: string
  integrantes: number
  funcionarios_count: number
  descripcion: string
}



export function OficinasList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [oficinas, setOficinas] = useState<Oficina[]>([])
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  const fetchOficinas = async () => {
    const response = await fetch(
      `${APIURL}/api/oficinas-con-funcionarios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    const data = await response.json()
    setOficinas(data.oficinas)
  }
  useEffect(() => {
    fetchOficinas()
  }, [])

  const handleDelete = (id: string) => {
    axios.delete(
      `${APIURL}/api/oficinas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => {
        setOficinas(oficinas.filter((oficina) => oficina.id !== id))
      })
      .catch((error) => console.error("Error al eliminar la oficina:", error))
  }



  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Oficina</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Integrantes</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {oficinas.map((oficina) => (
            <TableRow key={oficina.id}>
              <TableCell>
                <div className="flex items-center">
                  <Hotel className="h-4 w-4 mr-2 text-gray-400" />
                  <div className="font-medium">{oficina.nombre}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <BookOpenCheck className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{oficina.descripcion}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{oficina.funcionarios_count}</span>
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
                    <Link href={`/oficinas/${oficina.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Ver Detalles</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/oficinas/edit/${oficina.id}`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(oficina.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
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

