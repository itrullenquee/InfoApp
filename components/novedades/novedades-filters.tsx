"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function NovedadesFilters() {
  const [filters, setFilters] = useState({
    estado: "",
    categoria: "",
    fecha_desde: "",
    fecha_hasta: "",
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
      categoria: "",
      fecha_desde: "",
      fecha_hasta: "",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={filters.estado} onValueChange={(value) => handleChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_proceso">En Proceso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría</Label>
          <Select value={filters.categoria} onValueChange={(value) => handleChange("categoria", value)}>
            <SelectTrigger id="categoria">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="1">Alumbrado</SelectItem>
              <SelectItem value="2">Bacheo</SelectItem>
              <SelectItem value="3">Limpieza</SelectItem>
              <SelectItem value="4">Espacios Verdes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fecha_desde">Desde</Label>
          <Input
            id="fecha_desde"
            type="date"
            value={filters.fecha_desde}
            onChange={(e) => handleChange("fecha_desde", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fecha_hasta">Hasta</Label>
          <Input
            id="fecha_hasta"
            type="date"
            value={filters.fecha_hasta}
            onChange={(e) => handleChange("fecha_hasta", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Título, descripción..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Search className="mr-2 h-4 w-4" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}

