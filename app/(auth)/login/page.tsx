"use client"

import { useRouter } from "next/navigation"
import LoginForm, { type LoginPayload } from "@/components/auth/LoginForm"
import { authClient } from "@/lib/auth-client"

export default function Login() {
  const router = useRouter()

  async function handleLogin(data: LoginPayload) {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.remember,
      callbackURL: "/",
    })

    if (error) {
      console.log("Login error:", error.message)
      return
    }

    router.push("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010103] px-4 py-10">
      <LoginForm onSubmit={handleLogin} />
    </main>
  )
}