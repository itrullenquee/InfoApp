"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, DollarSign, Users, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import axios from "axios"
import { es } from "date-fns/locale"
import { format } from "date-fns"
import Link from "next/link"
interface ProyectoDetailsProps {
  id: string
}
interface Proyecto {
  id: string
  titulo: string
  descripcion: string
  estado: string
  fecha_inicio: string
  fecha_fin: string
}
export function ProyectoDetails({ id }: ProyectoDetailsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [proyecto, setProyecto] = useState<Proyecto | null>(null)
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

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/proyectos/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        setProyecto(response.data)
      } catch (error) {
        console.error("Error al obtener el proyecto:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProyecto()
  }, [id])
    

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">{proyecto?.titulo}</h1>
            {getEstadoBadge(proyecto?.estado || "")}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-gray-500">Proyecto #{proyecto?.id}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href={`/proyectos/edit/${id}`} passHref>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el proyecto y todos los datos
                  asociados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Descripción</h3>
                  <p className="mt-2 text-gray-700">{proyecto?.descripcion}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Fecha de Inicio</h4>
                      <p className="text-gray-700">{proyecto?.fecha_inicio ? format(proyecto.fecha_inicio, "PPP", { locale: es }) : "Sin fecha"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">  
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Fecha de Finalización</h4>
                      <p className="text-gray-700">{proyecto?.fecha_fin ? format(proyecto.fecha_fin, "PPP", { locale: es }) : "Sin fecha"}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

