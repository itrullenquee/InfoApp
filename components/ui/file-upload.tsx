"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
  accept?: string
  onChange: (file: File | null) => void
  value?: File | null
}

export function FileUpload({ accept, onChange, value }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(value || null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null

    if (selectedFile) {
      setFile(selectedFile)
      onChange(selectedFile)

      // Crear preview para imágenes
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      {!file ? (
        <div
          className="border-2 border-dashed rounded-md p-4 text-center hover:bg-gray-50 cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-6 w-6 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Haga clic para seleccionar un archivo</p>
          <p className="text-xs text-gray-400 mt-1">
            {accept === "image/*" ? "JPG, PNG o GIF" : accept === ".pdf" ? "PDF" : "Cualquier archivo"}
          </p>
          <Input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
        </div>
      ) : (
        <div className="border rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {preview ? (
                <div className="h-10 w-10 rounded overflow-hidden">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs uppercase font-medium text-gray-500">{file.name.split(".").pop()}</span>
                </div>
              )}
              <div className="text-sm">
                <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={handleRemoveFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

