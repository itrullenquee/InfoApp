"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface UbicacionSelectorProps {
  value: string
  onChange: (barrioId: string) => void
}

export function UbicacionSelector({ value, onChange }: UbicacionSelectorProps) {
  const [selected, setSelected] = useState({
    provincia_id: "",
    departamento_id: "",
    localidad_id: "",
    barrio_id: "",
  })

  // Datos de ejemplo - reemplazar con datos reales de la API
  const provincias = [
    { id: "1", nombre: "Buenos Aires" },
    { id: "2", nombre: "Córdoba" },
    { id: "3", nombre: "Santa Fe" },
  ]

  const departamentos = [
    { id: "1", provincia_id: "1", nombre: "La Plata" },
    { id: "2", provincia_id: "1", nombre: "Mar del Plata" },
    { id: "3", provincia_id: "2", nombre: "Capital" },
    { id: "4", provincia_id: "2", nombre: "Río Cuarto" },
    { id: "5", provincia_id: "3", nombre: "Rosario" },
    { id: "6", provincia_id: "3", nombre: "Santa Fe" },
  ]

  const localidades = [
    { id: "1", departamento_id: "1", nombre: "La Plata" },
    { id: "2", departamento_id: "1", nombre: "City Bell" },
    { id: "3", departamento_id: "2", nombre: "Mar del Plata" },
    { id: "4", departamento_id: "3", nombre: "Córdoba" },
    { id: "5", departamento_id: "4", nombre: "Río Cuarto" },
    { id: "6", departamento_id: "5", nombre: "Rosario" },
    { id: "7", departamento_id: "6", nombre: "Santa Fe" },
  ]

  const barrios = [
    { id: "1", localidad_id: "1", nombre: "Centro" },
    { id: "2", localidad_id: "1", nombre: "La Loma" },
    { id: "3", localidad_id: "2", nombre: "City Bell Centro" },
    { id: "4", localidad_id: "3", nombre: "Güemes" },
    { id: "5", localidad_id: "3", nombre: "La Perla" },
    { id: "6", localidad_id: "4", nombre: "Nueva Córdoba" },
    { id: "7", localidad_id: "4", nombre: "Alberdi" },
    { id: "8", localidad_id: "5", nombre: "Centro" },
    { id: "9", localidad_id: "6", nombre: "Centro" },
    { id: "10", localidad_id: "6", nombre: "Pichincha" },
    { id: "11", localidad_id: "7", nombre: "Centro" },
  ]

  // Filtrar departamentos según provincia seleccionada
  const filteredDepartamentos = departamentos.filter((depto) => depto.provincia_id === selected.provincia_id)

  // Filtrar localidades según departamento seleccionado
  const filteredLocalidades = localidades.filter((loc) => loc.departamento_id === selected.departamento_id)

  // Filtrar barrios según localidad seleccionada
  const filteredBarrios = barrios.filter((barrio) => barrio.localidad_id === selected.localidad_id)

  // Actualizar el valor cuando cambia el barrio seleccionado
  useEffect(() => {
    if (selected.barrio_id) {
      onChange(selected.barrio_id)
    }
  }, [selected.barrio_id, onChange])

  // Actualizar el estado local cuando cambia el valor externo
  useEffect(() => {
    if (value) {
      setSelected((prev) => ({ ...prev, barrio_id: value }))
    }
  }, [value])

  const handleProvinciaChange = (provinciaId: string) => {
    setSelected({
      provincia_id: provinciaId,
      departamento_id: "",
      localidad_id: "",
      barrio_id: "",
    })
    onChange("")
  }

  const handleDepartamentoChange = (departamentoId: string) => {
    setSelected({
      ...selected,
      departamento_id: departamentoId,
      localidad_id: "",
      barrio_id: "",
    })
    onChange("")
  }

  const handleLocalidadChange = (localidadId: string) => {
    setSelected({
      ...selected,
      localidad_id: localidadId,
      barrio_id: "",
    })
    onChange("")
  }

  const handleBarrioChange = (barrioId: string) => {
    setSelected({
      ...selected,
      barrio_id: barrioId,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="provincia">Provincia</Label>
        <Select value={selected.provincia_id} onValueChange={handleProvinciaChange}>
          <SelectTrigger id="provincia">
            <SelectValue placeholder="Seleccione una provincia" />
          </SelectTrigger>
          <SelectContent>
            {provincias.map((provincia) => (
              <SelectItem key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="departamento">Departamento</Label>
        <Select
          value={selected.departamento_id}
          onValueChange={handleDepartamentoChange}
          disabled={!selected.provincia_id}
        >
          <SelectTrigger id="departamento">
            <SelectValue placeholder="Seleccione un departamento" />
          </SelectTrigger>
          <SelectContent>
            {filteredDepartamentos.map((departamento) => (
              <SelectItem key={departamento.id} value={departamento.id}>
                {departamento.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="localidad">Localidad</Label>
        <Select
          value={selected.localidad_id}
          onValueChange={handleLocalidadChange}
          disabled={!selected.departamento_id}
        >
          <SelectTrigger id="localidad">
            <SelectValue placeholder="Seleccione una localidad" />
          </SelectTrigger>
          <SelectContent>
            {filteredLocalidades.map((localidad) => (
              <SelectItem key={localidad.id} value={localidad.id}>
                {localidad.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="barrio">Barrio</Label>
        <Select value={selected.barrio_id} onValueChange={handleBarrioChange} disabled={!selected.localidad_id}>
          <SelectTrigger id="barrio">
            <SelectValue placeholder="Seleccione un barrio" />
          </SelectTrigger>
          <SelectContent>
            {filteredBarrios.map((barrio) => (
              <SelectItem key={barrio.id} value={barrio.id}>
                {barrio.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

