import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, User, CheckSquare } from "lucide-react"

interface Tarea {
  id: number
  titulo: string
  estado: string
}

interface Proyecto {
  id: number
  titulo: string
  descripcion: string
  estado: string
  fecha_inicio: string
  fecha_fin: string
  progreso: number
  responsable: string
  tareas: Tarea[]
}

interface ProyectoCardProps {
  proyecto: Proyecto
}

export function ProyectoCard({ proyecto }: ProyectoCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const tareasCompletadas = proyecto.tareas.filter((tarea) => tarea.estado === "completado").length

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{proyecto.titulo}</h3>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{proyecto.descripcion}</p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            <span>{proyecto.responsable}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <div>
              <div>{formatDate(proyecto.fecha_inicio)}</div>
              <div>{formatDate(proyecto.fecha_fin)}</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <CheckSquare className="h-4 w-4 mr-2" />
            <span>
              {tareasCompletadas} de {proyecto.tareas.length} tareas
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progreso</span>
              <span>{proyecto.progreso}%</span>
            </div>
            <Progress value={proyecto.progreso} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  )
}

