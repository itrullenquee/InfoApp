'use client'

import { useState, useEffect } from "react"

export function RecentActivity() {
  const [activitiesLog, setActivitiesLog] = useState<Actividad[]>([])
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  interface Actividad {
    id: number
    usuario: string
    accion: string
    modelo: string
    detalles: Detalles
    fecha: string // Consider using Date object here and formatting it
  }
  interface Detalles {
    attributes: Atributos
    old?: Atributos // 'old' might not always be present (e.g., on creation)
  }

  interface Atributos {
    titulo?: string // Make titulo optional as it might not be in every log
    fecha_inicio?: string | null
    fecha_fin?: string | null // Can also be null
    estado?: string
    [key: string]: any; // Allow for other attributes
  }

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${APIURL}/api/novedadesLog/actividad`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setActivitiesLog(Array.isArray(data) ? data : []) // Ensure data is an array
        console.log(data)
      } catch (error) {
        console.error("Error fetching activities:", error)
        setActivitiesLog([]) // Set to empty array on error
      }
    }

    fetchActivities();
  }, [APIURL]); // Added APIURL to dependency array

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `hace ${diffInSeconds} seg.`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min.`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} hr.`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `hace ${diffInDays} día(s)`;
    
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'created': return 'creó';
      case 'updated': return 'actualizó';
      case 'deleted': return 'eliminó';
      default: return action;
    }
  }

  const getModelName = (model: string) => {
    // Example: 'App\Models\Novedad' -> 'Novedad'
    const parts = model.split('\\');
    return parts[parts.length - 1] || model;
  }


  return (
    <div className="space-y-2"> {/* Reduced overall vertical spacing if needed */}
      {/* Optional Title for the recent activity section */}
      {/* <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">Actividad Reciente</h3> */}
      
      <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4"> {/* Added scroll container */}
        {activitiesLog.length > 0 ? (
          activitiesLog.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
            >
              {/* Using shadcn Avatar if you want to switch */}
              {/* <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar_predeterminado.png" alt={activity.usuario} />
                <AvatarFallback>{activity.usuario?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
              </Avatar> */}
              <img
                src="/avatar_predeterminado.png" // Ensure this image is in your /public folder
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0" // Added flex-shrink-0
              />

              <div className="space-y-0.5 flex-grow min-w-0"> {/* Added flex-grow and min-w-0 for better text wrapping */}
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-tight">
                  <span className="font-semibold text-teal-600 dark:text-teal-400">{activity.usuario || "Usuario desconocido"}</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{getActionText(activity.accion)}</span> el {getModelName(activity.modelo).toLowerCase()}{" "}
                  {activity.detalles?.attributes?.titulo && (
                    <span className="font-medium text-gray-700 dark:text-gray-300 truncate block sm:inline">
                      "{activity.detalles.attributes.titulo}"
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(activity.fecha)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
            No hay actividad reciente para mostrar.
          </p>
        )}
      </div>
    </div>
  );
}