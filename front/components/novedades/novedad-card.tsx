"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, User, Tag, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NovedadCardProps {
  novedad: {
    id: number
    titulo?: string
    descripcion?: string
    estado: string // Este es el estado general (pendiente, en_proceso, completado)
    fecha_inicio?: string
    funcionario?: { user?: { name?: string } }
    lugar?: { calle?: string; numero?: string }
    imagen?: string | null
    categoria?: { nombre?: string } // Esta es la categoría que queremos colorear dinámicamente
    dependencia?: { nombre?: string }
  }
  onViewDetails: () => void
  onEdit: () => void
  onDelete: (id: number) => void
}

// Paleta de colores para las categorías. Puedes expandirla.
// Cada objeto define las clases de Tailwind para fondo, texto y borde.
const CATEGORY_COLOR_PALETTE = [
  { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200" },
  { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
  { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200" },
  { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200" },
  { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
];
const DEFAULT_CATEGORY_COLOR_CLASSES = "bg-gray-100 text-gray-800 border-gray-200";

// Función para obtener las clases de color y el texto para el badge de categoría
const getCategoryBadgeStyle = (categoryName?: string) => {
  if (!categoryName || categoryName.trim() === "") {
    return {
      text: "Sin Categoría",
      className: DEFAULT_CATEGORY_COLOR_CLASSES,
    };
  }

  // Función hash simple para convertir el string de la categoría en un número
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    const char = categoryName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convertir a entero de 32bit
  }
  hash = Math.abs(hash); // Asegurar que sea positivo

  const colorIndex = hash % CATEGORY_COLOR_PALETTE.length;
  const selectedColor = CATEGORY_COLOR_PALETTE[colorIndex];
  const className = `${selectedColor.bg} ${selectedColor.text} ${selectedColor.border}`;

  // Formatear el nombre de la categoría para mostrar (opcional)
  // Ej: "categoria_ejemplo" -> "Categoria Ejemplo"
  const displayText = categoryName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    text: displayText,
    className: className,
  };
};


export function NovedadCard({ novedad, onViewDetails, onEdit, onDelete }: NovedadCardProps) {
  if (!novedad) return null

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible"
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  // Esta función es para el ESTADO de la novedad (pendiente, en_proceso, etc.)
  // La mantenemos por si la usas para el campo `novedad.estado` en otro lugar.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "en_proceso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completado":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente"
      case "en_proceso":
        return "En Proceso"
      case "completado":
        return "Completado"
      default:
        return status || "Sin estado"
    }
  }

  const imageUrl = novedad?.imagen
    ? `${APIURL}/storage/${novedad.imagen}`
    : "pdf.jpg" // Considera una imagen placeholder más genérica si no es un PDF

  // Obtenemos el estilo para el badge de la categoría dinámicamente
  const categoryBadgeStyle = getCategoryBadgeStyle(novedad.categoria?.nombre);

  return (
    <Card className="overflow-hidden flex flex-col" style={{ height: "100%" }}>
      <div className="relative h-48 w-full cursor-pointer" onClick={onViewDetails}>
        <Image
          src={imageUrl}
          alt={novedad?.titulo ?? "Novedad sin título"}
          fill
          className="object-cover"
        />
        {/* Usamos el estilo dinámico para el badge de categoría */}
        <Badge
          className={`absolute top-2 right-2 ${categoryBadgeStyle.className}`}
          variant="outline"
        >
          {categoryBadgeStyle.text}
        </Badge>
      </div>

      <CardHeader className="pb-2 cursor-pointer" onClick={onViewDetails}>
        {novedad?.titulo ? (
          <h3 className="text-lg font-semibold line-clamp-1">{novedad.titulo}</h3>
        ) : (
          <div className="flex items-center text-yellow-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Novedad sin título</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 flex-grow cursor-pointer" onClick={onViewDetails}>
        {novedad?.descripcion ? (
          <p className="text-sm text-gray-600 line-clamp-2">{novedad.descripcion}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">Sin descripción</p>
        )}

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{formatDate(novedad?.fecha_inicio)}</span>
          </div>

          <div className="flex items-center text-gray-500">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{novedad?.funcionario?.user?.name ?? "Funcionario no asignado"}</span>
          </div>

          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {novedad?.lugar?.calle && novedad?.lugar?.numero
                ? `${novedad.lugar.calle} ${novedad.lugar.numero}`
                : "Ubicación no especificada"}
            </span>
          </div>

          {/* Este Badge/Tag es para el ESTADO de la novedad. Podrías usar getStatusColor/getStatusText aquí si quieres */}
          <div className="flex items-center text-gray-500">
            <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
            {/* Aquí mostramos el texto del estado. Si quisieras un badge coloreado para el estado:
                <Badge variant="outline" className={getStatusColor(novedad.estado)}>
                  {getStatusText(novedad.estado)}
                </Badge>
            */}
            <span className="truncate">{getStatusText(novedad.estado)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{novedad?.dependencia?.nombre ?? "Sin dependencia"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-4">
        <Link href={`/novedades/edit/${novedad.id}`} passHref>
          <Button variant="outline" size="sm" onClick={onEdit}>
            Editar
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(novedad.id)}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}