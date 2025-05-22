"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, MoreHorizontal, Trash2, Eye, Building2, Mail, Phone, Calendar, User, CheckCircle, Search, Plus } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { formatDate } from "date-fns"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export interface FuncionarioResponse {
  message: string;
  funcionarios: Funcionario[];
}

export interface Funcionario {
  id: number;
  user_id: number;
  jerarquia_id: number;
  oficina_id: number;
  legajo_personal: string;
  estado: 'activo' | 'inactivo';
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  oficina: Oficina;
  jerarquia: Jerarquia;
}

export interface User {
  id: number;
  name: string;
  apellido: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Oficina {
  id: number;
  nombre: string;
  descripcion: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Jerarquia {
  id: number;
  nombre: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const getRolBadge = (rol: string) => {
  switch (rol.toLowerCase()) {
    case 'admin':
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>;
    case 'gerente':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Gerente</Badge>;
    case 'supervisor':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Supervisor</Badge>;
    case 'empleado':
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Empleado</Badge>;
    default:
      return <Badge>{rol}</Badge>;
  }
};


const getEstadoBadge = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'activo':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>;
    case 'inactivo':
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactivo</Badge>;
    default:
      return <Badge>{estado}</Badge>;
  }
};

export function UsuariosList() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estadoFilter, setEstadoFilter] = useState<string>("todos");
  const [oficinaFilter, setOficinaFilter] = useState<string>("todos");
  const [jerarquiaFilter, setJerarquiaFilter] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch( `${APIURL}/api/funcionarios`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data: FuncionarioResponse = await response.json();
        setFuncionarios(data.funcionarios);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los funcionarios');
        setLoading(false);
      }
    };
    fetchFuncionarios();
  }, []);



  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${APIURL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      alert('Usuario eliminado correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Error al eliminar el usuario');
    }
  };

  const filteredFuncionarios = funcionarios.filter((f) => {
    const matchesEstado = estadoFilter === "todos" || f.estado === estadoFilter;
    const matchesOficina = oficinaFilter === "todos" || f.oficina?.nombre === oficinaFilter;
    const matchesJerarquia = jerarquiaFilter === "todos" || f.jerarquia?.nombre === jerarquiaFilter;
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      f.user.name.toLowerCase().includes(search) ||
      f.user.apellido.toLowerCase().includes(search) ||
      f.user.email.toLowerCase().includes(search);
    return matchesEstado && matchesOficina && matchesJerarquia && matchesSearch;
  });
  const oficinas = Array.from(new Set(funcionarios.map(f => f.oficina?.nombre).filter(Boolean)));
  const jerarquias = Array.from(new Set(funcionarios.map(f => f.jerarquia?.nombre).filter(Boolean)));

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda</h2>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* Buscar */}
          <div className="flex flex-col w-full sm:w-[280px]">
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <Search className="w-4 h-4" /> Buscar
            </label>
            <Input
              type="text"
              placeholder="Nombre, apellido o email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Estado */}
          <div className="flex flex-col w-[220px]">
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Estado
            </label>
            <Select onValueChange={setEstadoFilter} defaultValue="todos">
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Oficina */}
          <div className="flex flex-col w-[220px]">
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <Building2 className="w-4 h-4" /> Oficina
            </label>
            <Select onValueChange={setOficinaFilter} defaultValue="todos">
              <SelectTrigger>
                <SelectValue placeholder="Oficina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {oficinas.map((oficina, idx) => (
                  <SelectItem key={idx} value={oficina}>{oficina}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jerarquía */}
          <div className="flex flex-col w-[220px]">
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <User className="w-4 h-4" /> Jerarquía
            </label>
            <Select onValueChange={setJerarquiaFilter} defaultValue="todos">
              <SelectTrigger>
                <SelectValue placeholder="Jerarquía" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {jerarquias.map((jerarquia, idx) => (
                  <SelectItem key={idx} value={jerarquia}>{jerarquia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Botón Nuevo Usuario */}
      <div className="flex justify-end max-w-6xl mx-auto mb-4">
        <Link href="/usuarios/nuevo">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Jerarquia</TableHead>
              <TableHead>Oficina</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFuncionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {funcionario.user.name.charAt(0)}
                        {funcionario.user.apellido.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {funcionario.user.name} {funcionario.user.apellido}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Creado:{" "}
                        {new Date(funcionario.user.created_at).toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{funcionario.user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {funcionario.jerarquia ? getRolBadge(funcionario.jerarquia.nombre) : <Badge>Sin jerarquía</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{funcionario.oficina ? funcionario.oficina.nombre : "Sin oficina"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{funcionario.user.role ? funcionario.user.role : "Sin rol"}</span>
                  </div>
                </TableCell>
                <TableCell>{getEstadoBadge(funcionario.estado)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`/usuarios/edit/${funcionario.id}`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(funcionario.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>

  )
}

