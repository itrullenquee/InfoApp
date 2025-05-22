"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"


export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {

    
    // También eliminar de localStorage para compatibilidad
    localStorage.removeItem("token")
    
    // Redirigir a la página de login
    router.push("/login")
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      <span>Cerrar Sesión</span>
    </Button>
  )
} 