"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function OficinaForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  })
  const params = useParams()
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    if (params.id) {
      axios.get(
        `${APIURL}/api/oficinas/${params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((response) => {
          const { nombre = "", descripcion = "" } = response.data.oficina || {}
          setFormData({ nombre, descripcion })
        })
        .catch((error) => {
          console.error("Error al obtener la oficina:", error)
        })
    }
  }, [params.id])




  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  // ✅ Validación básica en frontend
  if (!formData.nombre.trim() || !formData.descripcion.trim()) {
    toast.error("Todos los campos son obligatorios.")
    setIsLoading(false)
    return
  }

  // ✅ Crear nueva oficina
  if (!params.id) {
    try {
      const response = await axios.post(
        `${APIURL}/api/oficinas`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )

      if (response.status === 200) {
        toast.success("Oficina creada con éxito")
        router.push("/oficinas")
      } else {
        toast.error("Error al crear la oficina.")
        console.error("Error al crear la oficina:", response.data)
      }

    } catch (error: any) {
      const errors = error.response?.data?.errors
      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          toast.error(messages[0]) // muestra el primer error por campo
        })
      } else {
        toast.error("Ocurrió un error al enviar el formulario.")
      }
      console.error("Error al enviar el formulario:", error.response?.data || error.message)

    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Editar oficina existente
  else {
    try {
      const response = await axios.put(
        `${APIURL}/api/oficinas/${params.id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )

      if (response.status === 200) {
        toast.success("Oficina actualizada con éxito")
        router.push("/oficinas")
      } else {
        toast.error("Error al actualizar la oficina.")
        console.error("Error al actualizar la oficina:", response.data)
      }

    } catch (error: any) {
      const errors = error.response?.data?.errors
      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          toast.error(messages[0])
        })
      } else {
        toast.error("Ocurrió un error al actualizar la oficina.")
      }
      console.error("Error al enviar el formulario:", error.response?.data || error.message)

    } finally {
      setIsLoading(false)
    }
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Crear Nueva Oficina</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre
          </Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Ej: Recursos Humanos"
            className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
            Descripción
          </Label>
          <textarea
            id="descripcion"
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            placeholder="Ej: Oficina encargada de gestionar el personal"
            className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/oficinas")}
          className="rounded-xl border-gray-300 hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar Oficina"}
        </Button>
      </div>
    </form>
  )
}
