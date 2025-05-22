import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { OficinaForm } from "@/components/oficinas/oficina-form"

export default function NuevaOficinaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Nueva Oficina</h1>

          <div className="">
            <OficinaForm />
          </div>
        </main>
      </div>
    </div>
  )
}

