import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProyectosHeader } from "@/components/proyectos/proyectos-header"
import { ProyectosList } from "@/components/proyectos/proyectos-list"

export default function ProyectosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Proyectos</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <ProyectosHeader />
          </div>

          <div className="bg-white rounded-lg shadow">
            <ProyectosList />
          </div>
        </main>
      </div>
    </div>
  )
}

