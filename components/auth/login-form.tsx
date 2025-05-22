"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff } from "lucide-react" // Import Eye and EyeOff icons
import { Alert, AlertDescription } from "@/components/ui/alert"
import Cookies from "js-cookie"


interface ApiUser {
  id: number;
  name: string;
  apellido: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user?: ApiUser;
}

export function LoginForm() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // State for password visibility
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${APIURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error al conectar con el servidor." }));
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data: LoginResponse = await response.json();

      Cookies.set("token", data.token, { expires: 7, path: '/' });
      localStorage.setItem("token", data.token);

      if (data.user && data.user.role) {
        const userString = JSON.stringify(data.user);
        Cookies.set("user", userString, { expires: 7, path: '/' });
        localStorage.setItem("user", userString);

        if (data.user.role === "viewer") {
          router.push("/noticias");
        } else if (data.user.role === "admin") {
          router.push("/dashboard");
        }
        else {
          router.push("/dashboard");
        }
      } else {
        console.warn("User data or role not provided in login response. Redirecting to /dashboard.");
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "Credenciales inválidas. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto"> {/* Added max-w-md and mx-auto for better centering */}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={credentials.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                {/* Optional: Link to forgot password */}
                {/* <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  ¿Olvidó su contraseña?
                </Link> */}
              </div>
              <div className="relative"> {/* Wrapper for input and icon */}
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10" // Add padding to the right for the icon
                />
                <Button
                  type="button" // Important: set type to button to prevent form submission
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}