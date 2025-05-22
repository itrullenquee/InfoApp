"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {
  MapPin, Phone, Mail, User, Users, Edit, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface User {
  id: number
  name: string
  email: string
}

interface Funcionario {
  id: number
  user_id: number
  legajo_personal: string
  estado: string
  user: User
}

interface Oficina {
  id: number
  nombre: string
  descripcion: string
  funcionarios_count: number
  funcionarios: Funcionario[]
  created_at: string
  integrantes?: number
}

export function OficinaDetails({ id }: Oficina) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [oficina, setOficina] = useState<Oficina | null>(null)
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const fetchOficina = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/oficinas-con-funcionarios/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        setOficina(response.data.oficina)
      } catch (error) {
        console.error("Error al cargar oficina:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOficina()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${APIURL}/api/oficinas/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
      router.push("/oficinas")
    } catch (error) {
      console.error("Error al eliminar oficina:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activa":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Activa</Badge>
      case "inactiva":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactiva</Badge>
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

  if (!oficina) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-800">Oficina no encontrada</h2>
        <p className="text-gray-500 mt-2">La oficina solicitada no existe o ha sido eliminada.</p>
        <Button className="mt-4 bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/oficinas")}>
          Volver a Oficinas
        </Button>
      </div>
    )
  }

  const responsable = oficina.funcionarios[0]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{oficina.nombre}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/oficinas/edit/${oficina.id}`)}>
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará la oficina de forma permanente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <p className="text-gray-700">{oficina.descripcion}</p>
            <div className="text-sm text-gray-500">
              Creada el: {formatDate(oficina.created_at)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Integrantes: {oficina.funcionarios_count}
            </h2>
            {responsable && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  {responsable.user.name}
                </div>
                <div className="text-sm text-gray-500">
                  Legajo: {responsable.legajo_personal}
                </div>
                {getEstadoBadge(responsable.estado)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
