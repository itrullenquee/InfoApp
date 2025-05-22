'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Bell, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"


export function DashboardStats() {

  const [novedadesHoy, setNovedadesHoy] = useState(0)
  const [novedadesMes, setNovedadesMes] = useState(0)
  const [tareasCompletadas, setTareasCompletadas] = useState(0)
  const [tareasCompletadasMes, setTareasCompletadasMes] = useState(0)
  const [tareas_pendientes, setTareasPendientes] = useState(0)
  const [oficinas, setOficinas] = useState(0)
const APIURL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchNovedadesCount = async () => {
      try {
        const response = await fetch(`${APIURL}/api/dashboard/resumen`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })

        const data = await response.json()

        setNovedadesHoy(data.novedades_hoy)
        setNovedadesMes(data.novedades_mes)
        setTareasCompletadas(data.tareas_completadas)
        setTareasCompletadasMes(data.tareas_mes)
        setTareasPendientes(data.tareas_pendientes)
        setOficinas(data.oficinas_total)


      } catch (error) {
        console.error("Error fetching novedades count:", error)
      }
    }

    fetchNovedadesCount()
  }, [])

  const stats = [
    {
      title: "Tareas Pendientes",
      value: `${tareas_pendientes}`,
      icon: <FileText className="h-5 w-5 text-teal-600" />,
      trend: "up",
    },
    {
      title: "Novedades de Hoy",
      value: `${novedadesHoy}`,
      change: `${novedadesMes}` + " este mes",
      icon: <Bell className="h-5 w-5 text-amber-600" />,
      trend: "up",
    },
    {
      title: "Tareas Completadas",
      value: `${tareasCompletadas}`,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      change: `${tareasCompletadasMes}` + " este mes",
      trend: "up",
    },
    {
      title: "Oficinas",
      value: `${oficinas}`,
      icon: <Users className="h-5 w-5 text-purple-600" />,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

