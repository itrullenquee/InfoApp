import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { OficinaIntegrantes } from "@/components/oficinas/oficina-integrantes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageProps {
  params: {
    id: string;
  };
}

// ✅ Componente principal
export default function NovedadesDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar />
        <div className="mt-6">
          <Tabs defaultValue="integrantes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="integrantes">Integrantes</TabsTrigger>
              <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            </TabsList>
            <TabsContent value="integrantes" className="bg-white rounded-lg shadow mt-4 p-4">
              <OficinaIntegrantes oficinaId={params.id} />
            </TabsContent>
            <TabsContent value="proyectos" className="bg-white rounded-lg shadow mt-4 p-4">
              <div className="p-4 text-center text-gray-500">No hay proyectos asociados a esta oficina.</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
