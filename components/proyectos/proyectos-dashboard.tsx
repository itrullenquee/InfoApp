"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { KanbanView } from "@/components/proyectos/kanban-view"
import { ListView } from "@/components/proyectos/list-view"
import { CalendarView } from "@/components/proyectos/calendar-view"
import { LayoutGrid, List, Calendar } from "lucide-react"

export function ProyectosDashboard() {
  const [view, setView] = useState<"kanban" | "list" | "calendar">("kanban")

  // Datos de ejemplo - reemplazar con datos reales de la API
  const proyectos = [
    {
      id: 1,
      titulo: "Renovación de Plaza Central",
      descripcion: "Proyecto de renovación completa de la Plaza Central",
      estado: "pendiente",
      fecha_inicio: "2025-04-15",
      fecha_fin: "2025-07-30",
      progreso: 0,
      responsable: "María López",
      tareas: [
        { id: 1, titulo: "Diseño de planos", estado: "completado" },
        { id: 2, titulo: "Licitación de materiales", estado: "pendiente" },
        { id: 3, titulo: "Contratación de personal", estado: "pendiente" },
      ],
    },
    {
      id: 2,
      titulo: "Repavimentación Av. Principal",
      descripcion: "Repavimentación completa de la Avenida Principal",
      estado: "en_proceso",
      fecha_inicio: "2025-03-10",
      fecha_fin: "2025-05-20",
      progreso: 40,
      responsable: "Juan Pérez",
      tareas: [
        { id: 4, titulo: "Relevamiento de daños", estado: "completado" },
        { id: 5, titulo: "Remoción de asfalto viejo", estado: "en_proceso" },
        { id: 6, titulo: "Colocación de nuevo asfalto", estado: "pendiente" },
      ],
    },
    {
      id: 3,
      titulo: "Instalación de Luminarias LED",
      descripcion: "Reemplazo de luminarias antiguas por tecnología LED",
      estado: "en_proceso",
      fecha_inicio: "2025-02-15",
      fecha_fin: "2025-04-30",
      progreso: 65,
      responsable: "Ana García",
      tareas: [
        { id: 7, titulo: "Inventario de luminarias", estado: "completado" },
        { id: 8, titulo: "Compra de luminarias LED", estado: "completado" },
        { id: 9, titulo: "Instalación en zonas prioritarias", estado: "en_proceso" },
      ],
    },
    {
      id: 4,
      titulo: "Construcción de Centro Comunitario",
      descripcion: "Construcción de un nuevo centro comunitario en el Barrio Norte",
      estado: "completado",
      fecha_inicio: "2024-09-01",
      fecha_fin: "2025-03-15",
      progreso: 100,
      responsable: "Carlos Rodríguez",
      tareas: [
        { id: 10, titulo: "Diseño arquitectónico", estado: "completado" },
        { id: 11, titulo: "Construcción de estructura", estado: "completado" },
        { id: 12, titulo: "Equipamiento interior", estado: "completado" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-end space-x-2">
          <div className="bg-gray-100 rounded-md p-1 flex">
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "kanban" ? "bg-white shadow" : ""}`}
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "list" ? "bg-white shadow" : ""}`}
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "calendar" ? "bg-white shadow" : ""}`}
              onClick={() => setView("calendar")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendario
            </Button>
          </div>
        </div>
      </div>

      {view === "kanban" && <KanbanView proyectos={proyectos} />}
      {view === "list" && <ListView proyectos={proyectos} />}
      {view === "calendar" && <CalendarView proyectos={proyectos} />}
    </div>
  )
}

