"use client"

import { Dialog } from "@headlessui/react"
import { Calendar, FileText, MapPin, Tag, User } from "lucide-react"
import Image from "next/image"

interface NovedadModalProps {
  isOpen: boolean
  onClose: () => void
  novedad?: {
    id: number
    titulo?: string
    descripcion?: string
    fecha_inicio?: string
    funcionario?: { user?: { name?: string } }
    lugar?: { calle?: string; numero?: string }
    imagen?: string
    pdf?: string
    categoria?: { nombre?: string }
    dependencia?: { nombre?: string }

  }
}

export function NovedadModal({ isOpen, onClose, novedad }: NovedadModalProps) {
  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      : "Fecha no disponible"

  if (!novedad) return null // ⛔️ Evita render si no hay datos
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {novedad.titulo ?? "Sin título"}
          </Dialog.Title>

          {/* Imagen */}
          <div className="relative w-full h-[36rem] rounded-lg overflow-hidden mb-4">
            <Image
              src={
                novedad.imagen
                  ? `${APIURL}/storage/${novedad.imagen}`
                  : "/pdf.jpg"
              }
              alt={novedad.titulo ?? "Imagen de novedad"}
              fill
              className="object-top "
            />
          </div>

          {/* Detalles */}
          <div className="space-y-4 text-gray-700">
            <p className="text-base whitespace-pre-wrap">
              {novedad.descripcion ?? "Sin descripción disponible."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>{formatDate(novedad.fecha_inicio)}</span>
              </div>

              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span>{novedad.funcionario?.user?.name ?? "Funcionario no asignado"}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>
                  {novedad.lugar?.calle && novedad.lugar?.numero
                    ? `${novedad.lugar.calle} ${novedad.lugar.numero}`
                    : "Ubicación no especificada"}
                </span>
              </div>

              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                <span>{novedad.categoria?.nombre ?? "Sin categoría"}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                <span>{novedad.dependencia?.nombre ?? "Sin categoría"}</span>
              </div>
            </div>

            {/* PDF */}
            {novedad.pdf && (
              <a
                href={`${APIURL}/storage/${novedad.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-6 text-blue-600 hover:underline"
              >
                <FileText className="w-4 h-4 mr-2" />
                Ver archivo adjunto (PDF)
              </a>
            )}
          </div>

          {/* Botón de cierre */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              Cerrar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
