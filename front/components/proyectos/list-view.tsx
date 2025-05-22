import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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

interface ListViewProps {
  proyectos: Proyecto[]
}

export function ListView({ proyectos }: ListViewProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pendiente
          </Badge>
        )
      case "en_proceso":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            En Proceso
          </Badge>
        )
      case "completado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Fechas</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proyectos.map((proyecto) => (
            <TableRow key={proyecto.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{proyecto.titulo}</div>
                  <div className="text-sm text-gray-500 mt-1">{proyecto.descripcion}</div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(proyecto.estado)}</TableCell>
              <TableCell>{proyecto.responsable}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>Inicio: {formatDate(proyecto.fecha_inicio)}</div>
                  <div>Fin: {formatDate(proyecto.fecha_fin)}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Progress value={proyecto.progreso} className="h-2" />
                  <div className="text-xs text-right">{proyecto.progreso}%</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

