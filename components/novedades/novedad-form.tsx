"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "../ui/file-upload"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"




interface Provincia { id: number; nombre: string }
interface Departamento { id: number; nombre: string; provincia_id: number }
interface Barrio { id: number; nombre: string; localidad_id: number }
interface Dependencia { id: number; nombre: string }
interface Categoria { id: number; nombre: string }

interface User {
  id: number
  name: string
  email: string
  funcionario?: { id: number }
}

interface FormDataType {
  titulo: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string
  estado: string
  imagen: File | null
  pdf: File | null
  funcionario_id: number
  categoria_id: number
  dependencia_id: number
  barrio_id: number
  calle: string
  numero: string
  manzana: string
  lote: string
  piso: string
  dpto: string
}

export function NovedadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [dependencias, setDependencias] = useState<Dependencia[]>([])
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [selectedProvincia, setSelectedProvincia] = useState<number | null>(null)
  const [selectedDepartamento, setSelectedDepartamento] = useState<number | null>(null)
  const [selectedBarrio, setSelectedBarrio] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState<FormDataType>({
    titulo: '',
    descripcion: '',
    funcionario_id: 0,
    categoria_id: 0,
    dependencia_id: 0,
    barrio_id: 0,
    calle: '',
    numero: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: '',
    imagen: null,
    pdf: null,
    manzana: '',
    lote: '',
    piso: '',
    dpto: '',
  })




  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const { data } = await axios.get(`${APIURL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(data)
        if (data.funcionario) {
          setFormData(prev => ({ ...prev, funcionario_id: data.funcionario.id }))
        }
      } catch (e) {
        console.error("Error fetching user", e)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    axios.get(`${APIURL}/api/categorias`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setCategorias(res.data))
    axios.get(
      `${APIURL}/api/dependencias`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setDependencias(res.data))
    axios.get(
      `${APIURL}/api/provincias`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setProvincias(res.data))
  }, [])

  useEffect(() => {
    if (selectedProvincia !== null) {
      axios.get(
        `${APIURL}/api/departamentos/${selectedProvincia}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => {
        setDepartamentos(res.data)
        // Solo resetear si selectedDepartamento es null o no coincide con algún departamento
        if (!res.data.some((d: Departamento) => d.id === selectedDepartamento)) {
          setSelectedDepartamento(null)
          setSelectedBarrio(null)
        }
      })
    }
  }, [selectedProvincia])

  useEffect(() => {
    if (selectedDepartamento !== null) {
      axios.get(
        `${APIURL}/api/barrios/${selectedDepartamento}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => {
        setBarrios(res.data)
        // Solo resetear si selectedBarrio es null o no coincide con algún barrio
        if (!res.data.some((b: Barrio) => b.id === selectedBarrio)) {
          setSelectedBarrio(null)
        }
        setError(null)
      }).catch(err => {
        const msg = err.response?.data?.error || "Error cargando barrios"
        setError(msg)
        setBarrios([])
      })
    }
  }, [selectedDepartamento])

  const handleChange = (name: keyof FormDataType, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return toast.error("No se encontró el token de autenticación.");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value as any);
      }
    });

    if (selectedBarrio) {
      form.append('barrio_id', selectedBarrio.toString());
    }

    if (params.id) {
      form.append('_method', 'PUT');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = params.id
        ? `${APIURL}/api/novedades/${params.id}`
        : `${APIURL}/api/novedades`;

      const response = await axios.post(url, form, config);

      toast.success(`Novedad ${params.id ? 'actualizada' : 'creada'} correctamente.`);
      setTimeout(() => router.push("/novedades"), 1000);

    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errores = error.response.data.errors;
        Object.values(errores).forEach((mensajeArray: any) => {
          toast.error(mensajeArray[0]);
        });
      } else {
        toast.error("Ocurrió un error inesperado al guardar la novedad.");
      }
    }
  }



  useEffect(() => {
    if (!params.id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${APIURL}/api/novedades/${params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = res.data;

        // Seteo de lugar
        setSelectedProvincia(data.lugar?.barrio?.localidad?.departamento?.provincia?.id || null);
        setSelectedDepartamento(data.lugar?.barrio?.localidad?.departamento?.id || null);
        setSelectedBarrio(data.lugar?.barrio?.id || null);
        setImagePreview(data.imagen ?
          `${APIURL}/storage/${data.imagen}` : null)
        setPdfPreview(data.pdf ? `${APIURL}/storage/${data.pdf}` : null)



        // Seteo del formulario con datos existentes
        setFormData(prev => ({
          ...prev,
          titulo: data.titulo || '',
          descripcion: data.descripcion || '',
          fecha_inicio: data.fecha_inicio || '',
          fecha_fin: data.fecha_fin || '',
          estado: data.estado || 'pendiente',
          categoria_id: data.categoria_id || 0,
          dependencia_id: data.dependencia_id || 0,
          calle: data.lugar?.calle || '',
          numero: data.lugar?.numero || '',
          manzana: data.lugar?.manzana || '',
          lote: data.lugar?.lote || '',
          piso: data.lugar?.piso || '',
          dpto: data.lugar?.dpto || '',
        }));

        setError(null);
      } catch (err) {
        console.error("Error fetching novedad:", err);
        setError("Error cargando la novedad");
      }
    };

    fetchData();
  }, [params.id]);



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Categoría</Label>
          <Select value={formData.categoria_id.toString()} onValueChange={(val) => handleChange("categoria_id", parseInt(val))}>
            <SelectTrigger><SelectValue placeholder="Seleccionar categoría" /></SelectTrigger>
            <SelectContent>
              {categorias.map(cat => (
                <SelectItem key={cat.id} value={cat.id.toString()}>{cat.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Dependencia</Label>
          <Select value={formData.dependencia_id.toString()} onValueChange={(val) => handleChange("dependencia_id", parseInt(val))}>
            <SelectTrigger><SelectValue placeholder="Seleccionar dependencia" /></SelectTrigger>
            <SelectContent>
              {dependencias.map(dep => (
                <SelectItem key={dep.id} value={dep.id.toString()}>{dep.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={formData.estado} onValueChange={(value) => handleChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informe">Informe</SelectItem>
              <SelectItem value="novedad">Novedad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select onChange={e => setSelectedProvincia(Number(e.target.value))} value={selectedProvincia ?? ''} className="p-2 border rounded">
          <option value="">Provincia</option>
          {provincias.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <select onChange={e => setSelectedDepartamento(Number(e.target.value))} value={selectedDepartamento ?? ''} className="p-2 border rounded" disabled={!departamentos.length}>
          <option value="">Departamento</option>
          {departamentos.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
        </select>
        <select onChange={e => setSelectedBarrio(Number(e.target.value))} value={selectedBarrio ?? ''} className="p-2 border rounded" disabled={!barrios.length}>
          <option value="">Barrio</option>
          {barrios.map(b => <option key={b.id} value={b.id}>{b.nombre}</option>)}
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input placeholder="Calle" value={formData.calle} onChange={e => handleChange("calle", e.target.value)} />
        <Input placeholder="Número" value={formData.numero} onChange={e => handleChange("numero", e.target.value)} />
        <Input placeholder="Manzana" value={formData.manzana} onChange={e => handleChange("manzana", e.target.value)} />
        <Input placeholder="Lote" value={formData.lote} onChange={e => handleChange("lote", e.target.value)} />
        <Input placeholder="Piso" value={formData.piso} onChange={e => handleChange("piso", e.target.value)} />
        <Input placeholder="Dpto" value={formData.dpto} onChange={e => handleChange("dpto", e.target.value)} />
      </div>

      <div>
        <Label>Título</Label>
        <Input value={formData.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />
      </div>

      <div>
        <Label>Descripción</Label>
        <Textarea value={formData.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Fecha inicio</Label>
          <Input type="datetime-local" value={formData.fecha_inicio} onChange={(e) => handleChange("fecha_inicio", e.target.value)} />
        </div>
        <div>
          <Label>Fecha fin</Label>
          <Input type="datetime-local" value={formData.fecha_fin} onChange={(e) => handleChange("fecha_fin", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Imagen</Label>
          {imagePreview && (
            <div className="mb-2 flex justify-center">
              <img
                src={imagePreview}
                alt="Imagen cargada"
                className="max-h-48 max-w-full rounded shadow-md object-contain"
              />
            </div>
          )}
          <FileUpload
            accept="image/*"
            onChange={(file) => {
              handleChange("imagen", file);
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              } else {
                setImagePreview(null);
              }
            }}
          />
        </div>

        <div>
          <Label>PDF</Label>
          {pdfPreview && (
            <div className="mb-2">
              <a
                href={pdfPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
              >
                Ver PDF cargado
              </a>
            </div>
          )}
          <FileUpload
            accept=".pdf"
            onChange={(file) => {
              handleChange("pdf", file);
              if (file) {
                setPdfPreview(URL.createObjectURL(file));
              } else {
                setPdfPreview(null);
              }
            }}
          />
        </div>
      </div>
      <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
        {isLoading ? "Guardando..." : (params.id ? "Editar Proyecto" : "Crear Proyecto")}
      </Button>
    </form>
  )
}
