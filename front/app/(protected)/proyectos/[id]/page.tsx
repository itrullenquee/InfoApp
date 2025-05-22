import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProyectoDetails } from "@/components/proyectos/proyecto-details"
import { ProyectoTareas } from "@/components/proyectos/proyecto-tareas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProyectoDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gray-50"> 
          <ProyectoDetails id={params.id} />

          <div className="mt-6">
            <Tabs defaultValue="tareas" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tareas">Tareas</TabsTrigger>
              </TabsList>
              <TabsContent value="tareas" className="bg-white rounded-lg shadow mt-4 p-4">
                <ProyectoTareas proyectoId={params.id} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

