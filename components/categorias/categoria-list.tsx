'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Edit, MoreHorizontal, Trash2, Eye,
    Hotel
} from "lucide-react"

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"
import { Card } from "@/components/ui/card"

interface Categoria {
    id: string
    nombre: string
}

export default function CategoriasList() {
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/categorias`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                  })
                setCategorias(response.data)
            } catch (error) {
                console.error("Error fetching categorias:", error)
            }
        }
        fetchCategorias()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${APIURL}/api/categorias/${id}`)
            setCategorias(categorias.filter((categoria) => categoria.id !== id))
        } catch (error) {
            console.error("Error deleting categoria:", error)
        }
    }

    return (
        <div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Hotel className="h-4 w-4 mr-2 text-gray-400" />
                                        <div className="font-medium">{categoria.nombre}</div>
                                    </div>
                                </TableCell>
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
                                            <Link href={`/categorias/edit/${categoria.id}`}>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Editar</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(categoria.id)}>
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
            </Card>


            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
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
