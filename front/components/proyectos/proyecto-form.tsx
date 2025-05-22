"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

import axios from "axios"

export function ProyectoForm() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [tiposProyectos, setTiposProyectos] = useState<{ id: number; nombre: string }[]>([])
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fecha_inicio: "",
    fecha_fin: "",
    tipo_id: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  // Fetch tipos proyectos on component mount
  useEffect(() => {
    const fetchTiposProyectos = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/tipos-proyectos`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setTiposProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de proyectos:", error);
      }
    };

    fetchTiposProyectos();
  }, []);

  // Fetch project data when editing an existing project
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!params.id) return;

      setIsEditing(true);
      try {
        const response = await axios.get(
          `${APIURL}/api/proyectos/${params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        console.log("Project data received:", response.data);

        // Format dates for datetime-local input if they exist
        const formatDate = (dateString: string) => {
          if (!dateString) return "";
          // Make sure the date is in the format YYYY-MM-DDThh:mm
          try {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16);
          } catch (e) {
            console.error("Error formatting date:", e);
            return dateString;
          }
        };

        setFormData({
          titulo: response.data.titulo || "",
          descripcion: response.data.descripcion || "",
          estado: response.data.estado || "pendiente",
          fecha_inicio: formatDate(response.data.fecha_inicio),
          fecha_fin: formatDate(response.data.fecha_fin),
          tipo_id: response.data.tipo_id?.toString() || "",
        });
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        alert("No se pudo cargar la información del proyecto.");
      }
    };

    fetchProjectData();
  }, [params.id]); // Add params.id as dependency

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData,
        fecha_inicio: formData.fecha_inicio || null,
        fecha_fin: formData.fecha_fin || null,
        tipo_id: formData.tipo_id ? parseInt(formData.tipo_id) : null
      };

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };

      if (!isEditing) {
        await axios.post(
          `${APIURL}/api/proyectos`, dataToSend, config);
          toast.success("Proyecto creado exitosamente");
      } else {
        await axios.put(
          `${APIURL}/api/proyectos/${params.id}`, dataToSend, config);
          toast.success("Proyecto editado exitosamente");
      }
      router.push("/proyectos");
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          toast.error(messages[0]); 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título del Proyecto</Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            rows={4}
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo_proyecto">Tipo de Proyecto</Label>
          <Select
            value={formData.tipo_id}
            onValueChange={(value) => handleChange("tipo_id", value)}
          >
            <SelectTrigger id="tipo_proyecto">
              <SelectValue placeholder="Seleccionar tipo de proyecto" />
            </SelectTrigger>
            <SelectContent>
              {tiposProyectos.map((tipo) => (
                <SelectItem key={tipo.id} value={String(tipo.id)}>
                  {tipo.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha_inicio">Fecha Inicio</Label>
            <Input
              type="datetime-local"
              id="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={(e) => handleChange("fecha_inicio", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha_fin">Fecha Fin</Label>
            <Input
              type="datetime-local"
              id="fecha_fin"
              value={formData.fecha_fin}
              onChange={(e) => handleChange("fecha_fin", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={formData.estado} onValueChange={(value) => handleChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/proyectos")}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
          {isLoading ? "Guardando..." : (isEditing ? "Editar Proyecto" : "Crear Proyecto")}
        </Button>
      </div>
    </form>
  );
}