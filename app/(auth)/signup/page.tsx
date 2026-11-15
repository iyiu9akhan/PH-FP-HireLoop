import type { Metadata } from "next"
import SignupForm from "@/components/auth/SignupForm"

export const metadata: Metadata = { title: "Sign up | HireLoop" }

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010103] px-4 py-10">
      <SignupForm />
    </main>
  )
}