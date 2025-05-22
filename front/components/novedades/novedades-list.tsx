"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NovedadCard } from "@/components/novedades/novedad-card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import axios from "axios"
import { NovedadModal } from "./novedad-modal"
import { Eye, Edit3, Trash2, List, LayoutGrid, Newspaper } from "lucide-react"

// Helper functions (assumed to be correct)
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A"
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

const getStatusText = (status: string) => {
  switch (status) {
    case "pendiente": return "Pendiente";
    case "en_proceso": return "En Proceso";
    case "en_progreso": return "En Progreso";
    case "completado": return "Completado";
    default: return status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A";
  }
}

export function NovedadesList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [novedades, setNovedades] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [categoriaId, setCategoriaId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [filtro, setFiltro] = useState<'todas' | 'en_vivo' | 'proximas' | 'pasadas'>('todas')
  const [modalOpen, setModalOpen] = useState(false)
  const [novedadSeleccionada, setNovedadSeleccionada] = useState<any>(null)
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    from: 0,
    to: 0
  })
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(
        `${APIURL}/api/categorias`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
      setCategorias(response.data)
    } catch (error) {
      console.error("Error al obtener categorías", error)
    }
  }

  const fetchNovedades = async (pageToFetch: number) => {
    const paramsForAPI = {
      page: pageToFetch,
      filtro: filtro !== 'todas' ? filtro : undefined,
      categoria_id: categoriaId || undefined,
      search: search || undefined, 
    };
    console.log(`[DEBUG] fetchNovedades called for page: ${pageToFetch} with params:`, paramsForAPI);

    try {
      const response = await axios.get(
        `${APIURL}/api/novedades`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: paramsForAPI
        })

      console.log("[DEBUG] API response data:", response.data);
      setNovedades(response.data.data || [])
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total,
        from: response.data.from,
        to: response.data.to
      })
    } catch (error) {
      console.error("Error fetching novedades:", error)
      setNovedades([]) // Reset novedades on error
      setPagination(prev => ({ ...prev, total: 0, lastPage: 1, currentPage: 1 })); // Reset pagination on error
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [APIURL])

  // Effect for handling changes in filters, category, or search term
  useEffect(() => {
    console.log(`[DEBUG] Filters/search changed. Search: "${search}", Categoria: ${categoriaId}, Filtro: ${filtro}.`);
    if (currentPage !== 1) {
      console.log("[DEBUG] Resetting to page 1 due to filter/search change.");
      setCurrentPage(1); // Reset to page 1. This will trigger the `currentPage` useEffect.
    } else {
      // If already on page 1, the `currentPage` useEffect won't be triggered by a state change (since value is the same),
      // so we need to fetch directly here to reflect the new search/filter.
      console.log("[DEBUG] Already on page 1. Fetching directly due to filter/search change.");
      fetchNovedades(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro, categoriaId, search, APIURL]); // `currentPage` is intentionally NOT in this dependency array
                                              // to avoid re-triggering this when only page changes.

  // Effect for handling page changes (e.g., from pagination clicks or when set by the above effect)
  useEffect(() => {
    console.log(`[DEBUG] Current page state changed to: ${currentPage}. Fetching novedades for this page.`);
    fetchNovedades(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, APIURL]); // This effect runs whenever `currentPage` state actually changes.
                              // APIURL is a dependency because fetchNovedades uses it.

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleOpenModal = (novedad: any) => {
    setNovedadSeleccionada(novedad)
    setModalOpen(true)
  }

  const handleDeleteNovedad = async (novedadId: number) => {
    // ... (delete logic - seems okay)
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar esta novedad?")
    if (!confirmDelete) return

    try {
      await axios.delete(
        `${APIURL}/api/novedades/${novedadId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
      alert("Novedad eliminada correctamente")
      if (novedades.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchNovedades(currentPage); // Re-fetch current page
      }
    } catch (error) {
      console.error("Error al eliminar la novedad:", error)
      alert("Error al eliminar la novedad")
    }
  }

  const getPageNumbers = () => {
    // ... (getPageNumbers logic - seems okay)
    const pageNumbers = []
    const maxPagesToShow = 5

    if (pagination.lastPage <= maxPagesToShow + 2) {
      for (let i = 1; i <= pagination.lastPage; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      let startPage = Math.max(2, pagination.currentPage - 1)
      let endPage = Math.min(pagination.lastPage - 1, pagination.currentPage + 1)
      if (pagination.currentPage < maxPagesToShow -1) {
        startPage = 2;
        endPage = Math.min(maxPagesToShow-1, pagination.lastPage - 1);
      } else if (pagination.currentPage > pagination.lastPage - (maxPagesToShow - 2) ) {
        startPage = Math.max(2, pagination.lastPage - (maxPagesToShow - 2));
        endPage = pagination.lastPage - 1;
      }
      if (startPage > 2) pageNumbers.push('ellipsis-start')
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      if (endPage < pagination.lastPage - 1) pageNumbers.push('ellipsis-end')
      pageNumbers.push(pagination.lastPage)
    }
    return pageNumbers.filter((item, index, self) => self.indexOf(item) === index);
  }


  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Filtros y Controles de Vista */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          {/* Filtro por categoría */}
          <select
            value={categoriaId ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              console.log("[DEBUG] Categoría seleccionada:", val);
              setCategoriaId(val ? parseInt(val) : null);
            }}
            className="border px-3 py-2 rounded-md text-sm h-9 bg-background text-foreground"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => {
              console.log("[DEBUG] Search input changed:", e.target.value);
              setSearch(e.target.value);
            }}
            className="border px-3 py-2 rounded-md text-sm w-full sm:w-auto md:w-64 h-9 bg-background text-foreground"
          />
        </div>

        {/* Controles de Vista y Acciones */}
        {/* ... (view controls and actions - seem okay) ... */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'card' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('card')}
            title="Vista Tarjetas"
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="sr-only">Vista Tarjetas</span>
          </Button>
          <Button
            variant={viewMode === 'table' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
            title="Vista Tabla"
          >
            <List className="h-5 w-5" />
            <span className="sr-only">Vista Tabla</span>
          </Button>
          <Link href="/noticias" passHref>
            <Button variant="outline" size="icon" title="Vista Diario">
              <Newspaper className="h-5 w-5" />
              <span className="sr-only">Vista Diario</span>
            </Button>
          </Link>
          <Link href="/novedades/nueva" passHref>
            <Button size="sm" className="ml-2 bg-teal-600 hover:bg-teal-700">
                Crear Novedad
            </Button>
          </Link>
        </div>
      </div>

      {/* Novedades Content */}
      {/* ... (viewMode conditional rendering - seems okay) ... */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {novedades.length > 0 ? (
            novedades.map((novedad: any) => (
              <NovedadCard
                key={novedad.id}
                novedad={novedad}
                onViewDetails={() => handleOpenModal(novedad)}
                onEdit={() => { /* Navigation handled by Link in NovedadCard */ }}
                onDelete={handleDeleteNovedad}
              />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-10 text-muted-foreground">
              No se encontraron novedades que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-lg">Listado de Novedades</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha Inicio</TableHead>
                    <TableHead className="hidden lg:table-cell">Funcionario</TableHead>
                    <TableHead className="hidden lg:table-cell">Lugar</TableHead>
                    <TableHead className="hidden md:table-cell">Categoría</TableHead>
                    <TableHead className="hidden xl:table-cell">Dependencia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {novedades.length > 0 ? (
                    novedades.map((novedad: any) => (
                      <TableRow key={novedad.id}>
                        <TableCell className="font-medium max-w-xs truncate" title={novedad.titulo}>
                            {novedad.titulo || "Sin título"}
                        </TableCell>
                        <TableCell>{getStatusText(novedad.estado)}</TableCell>
                        <TableCell className="hidden md:table-cell">{formatDate(novedad.fecha_inicio)}</TableCell>
                        <TableCell className="hidden lg:table-cell max-w-xs truncate" title={novedad.funcionario?.user?.name}>
                            {novedad.funcionario?.user?.name || "N/A"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell max-w-xs truncate" title={novedad.lugar?.calle && novedad.lugar?.numero ? `${novedad.lugar.calle} ${novedad.lugar.numero}` : (novedad.lugar?.nombre || "N/A")}>
                          {novedad.lugar?.calle && novedad.lugar?.numero
                            ? `${novedad.lugar.calle} ${novedad.lugar.numero}`
                            : novedad.lugar?.nombre || "N/A"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate" title={novedad.categoria?.nombre}>
                            {novedad.categoria?.nombre || "N/A"}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell max-w-xs truncate" title={novedad.dependencia?.nombre}>
                            {novedad.dependencia?.nombre || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenModal(novedad)} title="Ver Detalles">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Link href={`/novedades/edit/${novedad.id}`} passHref>
                              <Button variant="ghost" size="icon" title="Editar Novedad">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteNovedad(novedad.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                              title="Eliminar Novedad"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No se encontraron novedades que coincidan con los filtros seleccionados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paginación */}
      {/* ... (pagination rendering - seems okay) ... */}
      {pagination.lastPage > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => pagination.currentPage > 1 && handlePageChange(pagination.currentPage - 1)}
                  className={pagination.currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                  aria-disabled={pagination.currentPage === 1}
                />
              </PaginationItem>
              {getPageNumbers().map((page, index) =>
                typeof page === 'string' ? (
                  <PaginationItem key={`${page}-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(Number(page))}
                      isActive={pagination.currentPage === page}
                      className="cursor-pointer"
                      href="#"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => pagination.currentPage < pagination.lastPage && handlePageChange(pagination.currentPage + 1)}
                  className={pagination.currentPage === pagination.lastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                  aria-disabled={pagination.currentPage === pagination.lastPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal */}
      <NovedadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        novedad={novedadSeleccionada}
      />
    </div>
  )
}