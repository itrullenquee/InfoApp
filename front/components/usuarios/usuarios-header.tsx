"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, X } from "lucide-react"
import Link from "next/link"

export function UsuariosHeader() {
  const [filters, setFilters] = useState({
    rol: "",
    estado: "",
    oficina: "",
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
      rol: "",
      estado: "",
      oficina: "",
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rol">Rol</Label>
          <Select value={filters.rol} onValueChange={(value) => handleChange("rol", value)}>
            <SelectTrigger id="rol">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="administrador">Administrador</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="operador">Operador</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={filters.estado} onValueChange={(value) => handleChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="oficina">Oficina</Label>
          <Select value={filters.oficina} onValueChange={(value) => handleChange("oficina", value)}>
            <SelectTrigger id="oficina">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="1">Obras Públicas</SelectItem>
              <SelectItem value="2">Hacienda</SelectItem>
              <SelectItem value="3">Catastro</SelectItem>
              <SelectItem value="4">Tránsito</SelectItem>
              <SelectItem value="5">Turismo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Nombre, email..."
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

        <Link href="/usuarios/nuevo">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>
    </div>
  )
}

