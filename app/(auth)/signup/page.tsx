"use client"

import { useRouter } from "next/navigation"
import SignupForm, { type SignupPayload } from "@/components/auth/SignupForm"
import { authClient } from "@/lib/auth-client"

export default function SignupPage() {
  const router = useRouter()

  async function handleSignUp(data: SignupPayload) {
    const { error } = await authClient.signUp.email({
      name: data.fullName,
      email: data.email,
      password: data.password,
      callbackURL: "/",
      role: data.role,
      companyName: data.companyName,
    })

    if (error) {
      console.log("Signup error:", error.message)
      return
    }

    router.push("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010103] px-4 py-10">
      <SignupForm onSubmit={handleSignUp} />
    </main>
  )
}
