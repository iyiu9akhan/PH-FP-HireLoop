"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

export type LoginPayload = {
  email: string
  password: string
  remember: boolean
}

type LoginFormProps = {
  onSubmit: (data: LoginPayload) => Promise<void>
}

const input =
  "h-12 w-full rounded-[12px] border border-white/10 bg-[#0f0f0f] px-4 font-satoshi text-base text-white outline-none placeholder:text-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 aria-invalid:border-red-500/70"
const label = "font-manrope text-sm font-medium text-white"
const error = "text-sm text-red-400"

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [show, setShow] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
  })

  const submit = async (values: LoginValues) => {
    const payload: LoginPayload = {
      email: values.email,
      password: values.password,
      remember: values.remember,
    }

    console.log("Login data:", payload)
    await onSubmit(payload)
  }

  return (
    <div className="mx-auto w-full max-w-120 rounded-2xl border border-white/10 bg-linear-to-b from-[#0a0a0c] to-[#161616] p-6 sm:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-manrope text-3xl font-bold tracking-[-0.02em] text-white">
          Welcome back
        </h1>
        <p className="mt-2 font-manrope text-white/60">
          Log in to continue your journey
        </p>
      </div>

      <button
        type="button"
        onClick={() => console.log("Google login:", { provider: "google" })}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] border border-white/15 bg-white/5 font-manrope font-medium text-white transition hover:bg-white/10"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4 font-manrope text-sm text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        or log in with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={input}
            {...register("email")}
          />
          {errors.email && <p className={error}>{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={label}>Password</label>
            <Link href="/forgot-password" className="font-manrope text-sm text-brand-purple hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              className={`${input} pr-12`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-white/60 hover:text-white"
            >
              {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          {errors.password && <p className={error}>{errors.password.message}</p>}
        </div>

        <label className="flex cursor-pointer items-center gap-3 font-manrope text-sm text-white/70">
          <input type="checkbox" className="size-4 accent-brand-purple" {...register("remember")} />
          Remember me
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer rounded-[12px] bg-brand-purple font-manrope text-base font-semibold text-white hover:bg-brand-purple/90"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center font-manrope text-sm text-white/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-brand-purple hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A11.99 11.99 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.29 14.3A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.3V6.61H1.28A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.09z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A11.99 11.99 0 0 0 1.28 6.61l4.01 3.09C6.23 6.88 8.88 4.77 12 4.77z" />
  </svg>
)

export default LoginForm