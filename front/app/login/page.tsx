"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import Cookies from "js-cookie"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">

        <LoginForm />
      </div>
    </div>
  )
} 