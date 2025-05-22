import { Card, CardContent } from "@/components/ui/card"

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

interface CalendarViewProps {
  proyectos: Proyecto[]
}

export function CalendarView({ proyectos }: CalendarViewProps) {
  // Obtener el mes actual
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Nombres de los meses
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Obtener el primer día del mes y el número de días
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Ajustar el primer día para que la semana comience en lunes (0 = lunes, 6 = domingo)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Crear un array con los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Rellenar con días vacíos al principio
  const emptyDaysAtStart = Array.from({ length: adjustedFirstDay }, (_, i) => null)

  // Combinar días vacíos y días del mes
  const allDays = [...emptyDaysAtStart, ...days]

  // Obtener proyectos para cada día
  const getProyectosForDay = (day: number | null) => {
    if (day === null) return []

    const date = new Date(currentYear, currentMonth, day)

    return proyectos.filter((proyecto) => {
      const startDate = new Date(proyecto.fecha_inicio)
      const endDate = new Date(proyecto.fecha_fin)

      return date >= startDate && date <= endDate
    })
  }

  // Obtener color según estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "en_proceso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completado":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, index) => (
            <div key={index} className="text-center font-medium text-sm py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {allDays.map((day, index) => {
            const proyectosForDay = getProyectosForDay(day)
            const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth()

            return (
              <div
                key={index}
                className={`min-h-24 border rounded-md p-1 ${day === null ? "bg-gray-50" : ""} ${isToday ? "border-teal-500 bg-teal-50" : ""}`}
              >
                {day !== null && (
                  <>
                    <div className={`text-right text-sm ${isToday ? "font-bold text-teal-700" : ""}`}>{day}</div>
                    <div className="mt-1 space-y-1">
                      {proyectosForDay.slice(0, 2).map((proyecto) => (
                        <div
                          key={proyecto.id}
                          className={`text-xs p-1 rounded truncate ${getStatusColor(proyecto.estado)}`}
                        >
                          {proyecto.titulo}
                        </div>
                      ))}
                      {proyectosForDay.length > 2 && (
                        <div className="text-xs text-center text-gray-500">+{proyectosForDay.length - 2} más</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

