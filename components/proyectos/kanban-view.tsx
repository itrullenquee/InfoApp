import { Badge } from "@/components/ui/badge"
import { ProyectoCard } from "@/components/proyectos/proyecto-card"

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

interface KanbanViewProps {
  proyectos: Proyecto[]
}

export function KanbanView({ proyectos }: KanbanViewProps) {
  const columns = [
    { id: "pendiente", title: "Pendiente", color: "bg-amber-50 border-amber-200" },
    { id: "en_proceso", title: "En Proceso", color: "bg-blue-50 border-blue-200" },
    { id: "completado", title: "Completado", color: "bg-green-50 border-green-200" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.id} className={`${column.color} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">{column.title}</h3>
            <Badge variant="outline" className="bg-white">
              {proyectos.filter((p) => p.estado === column.id).length}
            </Badge>
          </div>

          <div className="space-y-3">
            {proyectos
              .filter((proyecto) => proyecto.estado === column.id)
              .map((proyecto) => (
                <ProyectoCard key={proyecto.id} proyecto={proyecto} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

