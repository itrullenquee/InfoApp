import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import CrearUsuarioForm from "@/components/usuarios/usuario-form"


export default function NuevoUsuarioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Nuevo Usuario</h1>

          <div className="bg-white rounded-lg shadow p-4">
            <CrearUsuarioForm />
          </div>
        </main>
      </div>
    </div>
  )
}

