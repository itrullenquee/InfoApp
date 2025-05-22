"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

interface OficinaIntegrantesProps {
  oficinaId: string
}

interface User {
  id: string
  name: string
  email: string
}

interface Funcionario {
  id: number
  user_id: number
  jerarquia_id: number
  oficina_id: number
  legajo_personal: string
  estado: string
  user: User
}

export function OficinaIntegrantes({ oficinaId }: OficinaIntegrantesProps) {
  const [integrantes, setIntegrantes] = useState<Funcionario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchIntegrantes = async () => {
      try {
        const response = await fetch(
          `${APIURL}/api/oficinas-con-funcionarios/${oficinaId}/funcionarios`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await response.json()
        setIntegrantes(data.funcionarios)
      } catch (error) {
        console.error("Error al obtener los integrantes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIntegrantes()
  }, [oficinaId])

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>
      case "inactivo":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactivo</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const filteredIntegrantes = integrantes.filter((integrante) => {
    // Convertimos los posibles valores a texto seguro o cadena vacía
    const name = integrante?.user?.name?.toLowerCase() || "";
    const email = integrante?.user?.email?.toLowerCase() || "";
  
    const term = searchTerm.toLowerCase();
  
    // Retorna true si alguno de los campos contiene el término
    return (
      name.includes(term) ||
      email.includes(term)
    );
  });
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Input
            placeholder="Buscar integrante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredIntegrantes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>name</TableHead>
              <TableHead>Legajo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIntegrantes.map((integrante) => (
              <TableRow key={integrante.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{integrante.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{integrante.user.name}</div>
                </TableCell>
                <TableCell>{integrante.legajo_personal}</TableCell>
                <TableCell className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{integrante.user.email}</span>
                </TableCell>
                <TableCell>{getEstadoBadge(integrante.estado)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchTerm
            ? "No se encontraron integrantes que coincidan con la búsqueda."
            : "No hay integrantes asignados a esta oficina."}
        </div>
      )}
    </div>
  )
}
