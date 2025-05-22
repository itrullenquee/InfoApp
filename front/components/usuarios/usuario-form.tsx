"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"

interface UsuarioFormData {
  name: string
  apellido: string
  email: string
  password?: string
  jerarquia_id: string
  oficina_id: string
  legajo_personal: string
  estado: string
  role: string
}

interface Jerarquia {
  id: number
  nombre: string
}

interface Oficina {
  id: number
  nombre: string
}

export default function UsuarioForm() {
  const [formData, setFormData] = useState<UsuarioFormData>({
    name: "",
    apellido: "",
    email: "",
    password: "",
    jerarquia_id: "",
    oficina_id: "",
    legajo_personal: "",
    estado: "activo",
    role:""
  })

  const [jerarquias, setJerarquias] = useState<Jerarquia[]>([])
  const [oficinas, setOficinas] = useState<Oficina[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const router = useRouter()
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    if (params.id) {
      setIsEditing(true)

      axios.get(`${APIURL}/api/usuarios/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then((response) => {
          const userData = response.data.usuario || {};
          const funcionarioData = userData.funcionario || {};

          const newFormData: UsuarioFormData = {
            name: userData.name || "",
            apellido: userData.apellido || "",
            email: userData.email || "",
            password: "",
            jerarquia_id: funcionarioData.jerarquia_id ? String(funcionarioData.jerarquia_id) : "",
            oficina_id: funcionarioData.oficina_id ? String(funcionarioData.oficina_id) : "",
            legajo_personal: funcionarioData.legajo_personal || "",
            estado: funcionarioData.estado || "activo",
            role: funcionarioData.role || ""
          }

          console.log("Seteando formulario con:", newFormData)
          setFormData(newFormData)
        })
        .catch((error) => {
          toast.error("❌ Error al obtener los datos del usuario")
          console.error("Error al obtener el usuario:", error)
        })
    }
  }, [params.id])

  // Obtener jerarquías y oficinas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jerarquiaRes, oficinaRes] = await Promise.all([
          axios.get(
            `${APIURL}/api/jerarquias`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }),
          axios.get(`${APIURL}/api/oficinas`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }),
        ])
        setJerarquias(jerarquiaRes.data.jerarquias)
        setOficinas(oficinaRes.data.oficinas)
      } catch (error) {
        toast.error("❌ Error al cargar jerarquías u oficinas")
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof UsuarioFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    let response;
    const dataToSend = { ...formData };

    // Si estamos editando y no se ingresó una nueva contraseña, eliminarla
    if (isEditing && !formData.password) {
      delete dataToSend.password;
    }

    if (isEditing) {
      response = await axios.put(
        `${APIURL}/api/usuarios/${params.id}`, dataToSend, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      toast.success("✅ Usuario actualizado correctamente")
    } else {
      response = await axios.post(
        `${APIURL}/api/usuarios`, dataToSend, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      toast.success("✅ Usuario creado correctamente")

      // Resetear formulario
      setFormData({
        name: "",
        apellido: "",
        email: "",
        password: "",
        jerarquia_id: "",
        oficina_id: "",
        legajo_personal: "",
        estado: "activo",
        role: ""
      })
    }

  } catch (error: any) {
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors
      Object.values(validationErrors).forEach((msgs: any) => {
        if (Array.isArray(msgs)) {
          msgs.forEach((msg: string) => toast.error(`❌ ${msg}`))
        } else {
          toast.error(`❌ ${msgs}`)
        }
      })
    } else {
      toast.error(`❌ Error al ${isEditing ? 'actualizar' : 'crear'} el usuario`)
      console.error(error)
    }
  }
}


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nombre</Label>
          <Input name="name" value={formData.name} onChange={handleChange}  />
        </div>
        <div>
          <Label>Apellido</Label>
          <Input name="apellido" value={formData.apellido} onChange={handleChange}  />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange}  />
        </div>
        <div>
          <Label>Contraseña</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        
            placeholder={isEditing ? "Dejar en blanco para mantener" : ""}
          />
        </div>
        <div>
          <Label>Legajo</Label>
          <Input name="legajo_personal" value={formData.legajo_personal} onChange={handleChange}  />
        </div>
        <div>
          <Label>Jerarquía</Label>
          <Select
            value={formData.jerarquia_id}
            onValueChange={(value) => handleSelectChange("jerarquia_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar jerarquía" />
            </SelectTrigger>
            <SelectContent>
              {jerarquias.map((jerarquia) => (
                <SelectItem key={jerarquia.id} value={jerarquia.id.toString()}>
                  {jerarquia.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Oficina</Label>
          <Select
            value={formData.oficina_id}
            onValueChange={(value) => handleSelectChange("oficina_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar oficina" />
            </SelectTrigger>
            <SelectContent>
              {oficinas.map((oficina) => (
                <SelectItem key={oficina.id} value={oficina.id.toString()}>
                  {oficina.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Estado</Label>
          <Select
            value={formData.estado}
            onValueChange={(value) => handleSelectChange("estado", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">admin</SelectItem>
              <SelectItem value="novedades">novedades</SelectItem>
              <SelectItem value="proyectos">proyectos</SelectItem>
              <SelectItem value="viewer">viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => router.push('/usuarios')}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}