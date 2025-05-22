'use client'

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"

interface Categoria {
    id: string
    nombre: string
}

export const CategoriaForm = () => {
    const params = useParams()
    const [formData, setFormData] = useState<Categoria>({
        id: '',
        nombre: "",
    })

    const [errors, setErrors] = useState<Partial<Categoria>>({})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (field: keyof Categoria, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        })
        setErrors({
            ...errors,
            [field]: "", // limpia el error al modificar
        })
    }

    useEffect(() => {
        if (params.id) {
            axios.get(`${APIURL}/api/categorias/${params.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then((response) => {

                    setFormData({
                        id: response.data.id,
                        nombre: response.data.nombre,
                    })
                })
                .catch((error) => {
                    console.error("Error al obtener el proyecto:", error)
                })
        }
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        if (!params.id) {
            try {
                const response = await fetch(`${APIURL}/api/categorias`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(formData),
                })

                if (response.ok) {
                    const data = await response.json()
                    toast.success(params.id ? "Categoría actualizada con éxito" : "Categoría creada con éxito")
                    router.push("/categorias")
                } else if (response.status === 422) {
                    const data = await response.json()
                    setErrors(data.errors)
                    toast.error("Por favor corrige los campos marcados.")
                } else {
                    toast.error("Ocurrió un error inesperado.")
                    console.error("Error inesperado:", await response.text())
                }
            } catch (error) {
                toast.error("Error de conexión con el servidor.")
                console.error("Error al enviar el formulario:", error)
            } finally {
                setIsLoading(false)
            }
        } else {
            try {
                const response = await fetch(`${APIURL}/api/categorias/${params.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            autorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(formData),
                    })
                if (response.ok) {
                    const data = await response.json()
                    console.log("Categoría actualizada:", data)
                    router.push("/categorias")
                }
                else if (response.status === 422) {
                    const data = await response.json()
                    setErrors(data.errors)
                }
                else {
                    console.error("Error inesperado:", await response.text())
                }
            } catch (error) {
                console.error("Error al enviar el formulario:", error)
            }
            finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-semibold text-gray-800">Crear Nueva Categoría</h2>

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
                    {errors.nombre && (
                        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/categorias")}
                        className="rounded-xl border-gray-300 hover:bg-gray-100"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : "Guardar Categoría"}
                    </Button>
                </div>
            </div>
        </form>
    )
}
