"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Plus, Edit2, Trash2, MoreVertical, CheckCircle } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

interface ProyectoTareasProps {
  proyectoId: string
}

interface Funcionario {
  id: number
  user_id: number
  user: {
    id: number
    name: string
    apellido: string
  }
}

interface Tarea {
  id?: string
  titulo: string
  descripcion: string
  estado: string
  fecha_fin: string
  proyecto_id?: string
  funcionario_id?: number[]
  funcionarios?: Funcionario[]
}

export function ProyectoTareas({ proyectoId }: ProyectoTareasProps) {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [funcionariosSeleccionados, setFuncionariosSeleccionados] = useState<number[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tareaActual, setTareaActual] = useState<string | null>(null)
  const [nuevaTarea, setNuevaTarea] = useState<Tarea>({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fecha_fin: "",
    proyecto_id: proyectoId,
    funcionario_id: []
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  // Función para convertir fecha al formato YYYY-MM-DDThh:mm
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";

    try {
      // Intenta parsear la fecha
      const date = new Date(dateString);

      // Verifica si la fecha es válida
      if (isNaN(date.getTime())) {
        return "";
      }

      // Convierte al formato esperado por datetime-local
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "";
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>
      case "en_progreso":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Progreso</Badge>
      case "completada":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const fetchTareas = async () => {
    try {
      const response = await axios.get(
          `${APIURL}/api/proyectos/${proyectoId}/tareas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      setTareas(response.data)
    } catch (error) {
      console.error("Error al obtener tareas:", error)
    }
  }

  useEffect(() => {
    fetchTareas()
  }, [proyectoId])

  const handleChange = (field: string, value: any) => {
    setNuevaTarea((prev) => ({ ...prev, [field]: value }))

    // Limpiar el error cuando se modifica un campo
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/funcionarios`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        setFuncionarios(response.data.funcionarios)
      } catch (error) {
        console.error("Error al obtener funcionarios:", error)
      }
    }
    fetchFuncionarios()
  }, [])

  useEffect(() => {
    setNuevaTarea((prev) => ({
      ...prev,
      funcionario_id: funcionariosSeleccionados
    }))

    // Limpiar el error de funcionarios si se selecciona al menos uno
    if (funcionariosSeleccionados.length > 0 && errors['funcionario_id']) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors['funcionario_id']
        return newErrors
      })
    }
  }, [funcionariosSeleccionados])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!nuevaTarea.titulo) {
      newErrors.titulo = "El título es obligatorio"
    }

    if (!nuevaTarea.descripcion) {
      newErrors.descripcion = "La descripción es obligatoria"
    }

    if (!nuevaTarea.fecha_fin) {
      newErrors.fecha_fin = "La fecha de fin es obligatoria"
    }

    if (!funcionariosSeleccionados.length) {
      newErrors.funcionario_id = "Debe seleccionar al menos un funcionario"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      // Asegúrate de que los IDs de funcionarios sean números
      const funcionariosIds = funcionariosSeleccionados.map(id => Number(id));
      
      const tareaData = {
        ...nuevaTarea,
        proyecto_id: proyectoId,
        funcionario_id: funcionariosIds
      };
  
      // Asegúrate de que todos los campos necesarios estén presentes
      const dataToSend = {
        titulo: tareaData.titulo,
        descripcion: tareaData.descripcion,
        estado: tareaData.estado,
        fecha_fin: tareaData.fecha_fin,
        proyecto_id: tareaData.proyecto_id,
        funcionario_id: tareaData.funcionario_id
      };

  
      if (isEditing && nuevaTarea.id) {
        // Actualizar tarea existente
        const response = await axios.put(
          `${APIURL}/api/proyectos/${proyectoId}/tareas/${nuevaTarea.id}`,
          dataToSend,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
       
        
        // Actualizar la lista de tareas
        await fetchTareas();
        toast.success("Tarea actualizada correctamente");
      } else {
        // Crear nueva tarea
        const response = await axios.post(
          `${APIURL}/api/proyectos/tareas`, dataToSend,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        console.log("Respuesta de creación:", response.data);
        
        await fetchTareas();
        toast.success("Tarea creada correctamente");
      }
  
      resetForm();
    } catch (error) {
      
      toast.error("Error al guardar la tarea");
      
      if ((error as any).response) {
        if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        } else {
          toast.error("Error de red");
        }
      }
  
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        // Mostrar errores de validación del backend
        const backendErrors: Record<string, any> = error.response.data.errors;
        const formattedErrors: Record<string, string> = {};
  
        // Convertir errores del backend al formato esperado por el frontend
        Object.keys(backendErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(backendErrors[key])
            ? backendErrors[key][0]
            : backendErrors[key];
        });
  
        setErrors(formattedErrors);
      } else {
        if (axios.isAxiosError(error)) {
         toast.error(error.message);
        } else {
         toast.error("Error desconocido");
        }
      }
    }
  }
  const resetForm = () => {
    setNuevaTarea({
      proyecto_id: proyectoId,
      titulo: "",
      descripcion: "",
      estado: "pendiente",
      fecha_fin: "",
      funcionario_id: []
    })
    setFuncionariosSeleccionados([])
    setIsEditing(false)
    setIsDialogOpen(false)
    setErrors({})
  }

  const handleChekboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setFuncionariosSeleccionados((prev) => [...prev, id])
    } else {
      setFuncionariosSeleccionados((prev) => prev.filter((fid) => fid !== id))
    }
  }

  const handleEditClick = (tarea: Tarea) => {
    // Preparar los IDs de funcionarios para edición
    const funcionarioIds = tarea.funcionarios?.map(f => f.id) || []

    setNuevaTarea({
      ...tarea,
      fecha_fin: formatDateForInput(tarea.fecha_fin),
      funcionario_id: funcionarioIds
    })
    setFuncionariosSeleccionados(funcionarioIds)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    resetForm()
    setIsDialogOpen(false)
  }

  const handleDeleteClick = (tareaId: string) => {
    setTareaActual(tareaId)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!tareaActual) return;

    try {
      await axios.delete(
        `${APIURL}/api/proyectos/${proyectoId}/tareas/${tareaActual}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      await fetchTareas();
      alert("Tarea eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar la tarea");
    } finally {
      setIsDeleteDialogOpen(false);
      setTareaActual(null);
    }
  }

// In the ProyectoTareas component, replace the handleUpdateEstado function with this:

const handleUpdateEstado = async (tareaId: string, nuevoEstado: string) => {
  try {
    // Find the current task to get all its properties
    const tareaActual = tareas.find(tarea => tarea.id === tareaId);
    
    if (!tareaActual) {
      console.error("No se encontró la tarea con ID:", tareaId);
      return;
    }
    
    // Create an updated task object with the new state
    // Only send necessary fields to avoid validation errors
    const tareaActualizada = {
      titulo: tareaActual.titulo,
      descripcion: tareaActual.descripcion,
      estado: nuevoEstado,
      fecha_fin: tareaActual.fecha_fin,
      proyecto_id: proyectoId,
      funcionario_id: tareaActual.funcionarios?.map(f => f.id) || []
    };
    
    // Send the complete object to the API
    await axios.put(
      `${APIURL}/api/proyectos/${proyectoId}/tareas/${tareaId}/estado`,
      tareaActualizada,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    );

    await fetchTareas();
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    alert("Error al actualizar el estado de la tarea");
  }
};
  
  const formatDisplayDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP", { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Tareas del Proyecto</h3>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => {
              setIsEditing(false)
              resetForm()
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Modifica los detalles de la tarea.' : 'Añade una nueva tarea al proyecto. Completa todos los campos necesarios.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={nuevaTarea.titulo}
                  onChange={(e) => handleChange("titulo", e.target.value)}
                  className={errors.titulo ? "border-red-500" : ""}
                />
                {errors.titulo && <p className="text-xs text-red-500">{errors.titulo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  rows={3}
                  value={nuevaTarea.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  className={errors.descripcion ? "border-red-500" : ""}
                />
                {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha_fin">Fecha de Fin</Label>
                <Input
                  id="fecha_fin"
                  type="datetime-local"
                  value={nuevaTarea.fecha_fin}
                  onChange={(e) => handleChange("fecha_fin", e.target.value)}
                  className={errors.fecha_fin ? "border-red-500" : ""}
                />
                {errors.fecha_fin && <p className="text-xs text-red-500">{errors.fecha_fin}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={nuevaTarea.estado} onValueChange={(value) => handleChange("estado", value)}>
                  <SelectTrigger id="estado" className={errors.estado ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_progreso">En Progreso</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estado && <p className="text-xs text-red-500">{errors.estado}</p>}
              </div>

              <div className="space-y-2">
                <Label>Asignar Funcionarios</Label>
                <div className={`border rounded p-2 space-y-1 max-h-48 overflow-y-auto ${errors.funcionario_id ? "border-red-500" : ""}`}>
                  {funcionarios.map((f) => (
                    <label key={f.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={f.id}
                        checked={funcionariosSeleccionados.includes(f.id)}
                        onChange={(e) => handleChekboxChange(f.id, e.target.checked)}
                      />
                      {f.user.name} {f.user.apellido}
                    </label>
                  ))}
                </div>
                {errors.funcionario_id && <p className="text-xs text-red-500">{errors.funcionario_id}</p>}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSubmit}>
                {isEditing ? 'Actualizar' : 'Guardar'} Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Diálogo de confirmación para eliminar tarea */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esta tarea será eliminada permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {tareas.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarea</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Fin</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tareas.map((tarea) => (
              <TableRow key={tarea.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{tarea.titulo}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{tarea.descripcion}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full text-left">
                      {getEstadoBadge(tarea.estado)}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleUpdateEstado(tarea.id!, "pendiente")}
                        className={tarea.estado === "pendiente" ? "bg-yellow-50" : ""}
                      >
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateEstado(tarea.id!, "en_progreso")}
                        className={tarea.estado === "en_progreso" ? "bg-blue-50" : ""}
                      >
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Progreso</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateEstado(tarea.id!, "completada")}
                        className={tarea.estado === "completada" ? "bg-green-50" : ""}
                      >
                        <Badge className="bg-green-100 text-green-800 border-green-200">Completada</Badge>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDisplayDate(tarea.fecha_fin)}
                  </div>
                </TableCell>
                <TableCell>
                  {tarea.funcionarios?.map((funcionario, index) => (
                    <div key={`${tarea.id}-${funcionario.id}-${index}`} className="text-sm">
                      {funcionario.user.name} {funcionario.user.apellido}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(tarea)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(tarea.id!)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No hay tareas aún.</p>
      )}
    </div>
  )
}