"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, X } from "lucide-react"
import Link from "next/link"

export function ProyectosHeader() {
  const [filters, setFilters] = useState({
    estado: "",
    prioridad: "",
    search: "",
  })

  const handleChange = (field: string, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
    })
  }

  const clearFilters = () => {
    setFilters({
      estado: "",
      prioridad: "",
      search: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-gray-500 hover:text-gray-900">
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={filters.estado} onValueChange={(value) => handleChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prioridad">Prioridad</Label>
          <Select value={filters.prioridad} onValueChange={(value) => handleChange("prioridad", value)}>
            <SelectTrigger id="prioridad">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Nombre, descripción..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Search className="mr-2 h-4 w-4" />
          Aplicar Filtros
        </Button>

        <Link href="/proyectos/nuevo">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </Link>
      </div>
    </div>
  )
}

