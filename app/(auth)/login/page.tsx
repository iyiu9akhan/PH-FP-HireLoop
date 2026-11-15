import type { Metadata } from "next"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = { title: "Log in | HireLoop" }

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010103] px-4 py-10">
      <LoginForm />
    </main>
  )
}