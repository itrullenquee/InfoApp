"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Bell,
  FileText,
  Users,
  Building2,
  BetweenHorizontalStart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  role: string[]
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      console.log("user", userData)
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setRole(parsedUser.role)
          console.log("Rol del usuario:", parsedUser.role)
        } catch (error) {
          console.error("Error al parsear userData:", error)
        }
      }
      setLoading(false)
    }
  }, [])

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      role: ["admin", "novedades", "proyectos"],
    },
    {
      title: "Categorias",
      href: "/categorias",
      icon: <BetweenHorizontalStart className="h-5 w-5" />,
      role: ["admin"],
    },
    {
      title: "Novedades",
      href: "/novedades",
      icon: <Bell className="h-5 w-5" />,
      role: ["admin", "novedades"],
    },
    {
      title: "Proyectos",
      href: "/proyectos",
      icon: <FileText className="h-5 w-5" />,
      role: ["admin", "proyectos"],
    },
    {
      title: "Usuarios",
      href: "/usuarios",
      icon: <Users className="h-5 w-5" />,
      role: ["admin"],
    },
    {
      title: "Oficinas",
      href: "/oficinas",
      icon: <Building2 className="h-5 w-5" />,
      role: ["admin"],
    },
  ]

  const filteredNavItems = role
    ? navItems.filter((item) => item.role.includes(role))
    : []

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
        isMobile && !isOpen ? "hidden" : "",
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4">
          {!isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center h-8 rounded-md hover:bg-accent"
            >
              {isOpen ? "←" : "→"}
            </button>
          )}
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {!loading && filteredNavItems.length > 0 ? (
            filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    : "text-foreground hover:bg-accent",
                  !isOpen && "justify-center",
                )}
              >
                {item.icon}
                {isOpen && <span className="ml-3">{item.title}</span>}
              </Link>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm mt-10">
              Cargando menú...
            </div>
          )}
        </nav>
      </div>
    </aside>
  )
}
