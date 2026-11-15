"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Building2, Eye, EyeOff, UserSearch } from "lucide-react"
import { Button } from "@/components/ui/button"

const signupSchema = z
  .object({
    role: z.enum(["job_seeker", "recruiter"], { message: "Please select a role" }),
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(60, "Full name is too long"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    companyName: z.string().trim().max(80, "Company name is too long").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((v) => v, "You must accept the terms to continue"),
  })
  .superRefine((d, ctx) => {
    if (d.password !== d.confirmPassword) {
      ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match" })
    }
    if (d.role === "recruiter" && !d.companyName) {
      ctx.addIssue({ code: "custom", path: ["companyName"], message: "Company name is required for recruiters" })
    }
  })

type SignupValues = z.infer<typeof signupSchema>

export type SignupPayload = {
  fullName: string
  email: string
  password: string
  role: "job_seeker" | "recruiter"
  companyName?: string
}

type SignupFormProps = {
  onSubmit: (data: SignupPayload) => Promise<void>
}

const roles = [
  { value: "job_seeker", label: "Job Seeker", desc: "Find and apply to jobs", icon: UserSearch },
  { value: "recruiter", label: "Recruiter", desc: "Post jobs and hire talent", icon: Building2 },
] as const

const input =
  "h-12 w-full rounded-[12px] border border-white/10 bg-[#0f0f0f] px-4 font-satoshi text-base text-white outline-none placeholder:text-white/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 aria-invalid:border-red-500/70"
const label = "font-manrope text-sm font-medium text-white"
const error = "text-sm text-red-400"

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "job_seeker",
      fullName: "",
      email: "",
      companyName: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onTouched",
  })

  const role = watch("role")

  const submit = async (v: SignupValues) => {
    const payload: SignupPayload = {
      fullName: v.fullName,
      email: v.email,
      password: v.password,
      role: v.role,
      ...(v.role === "recruiter" && { companyName: v.companyName }),
    }

    console.log("Signup data:", payload)
    await onSubmit(payload)
  }

  return (
    <div className="mx-auto w-full max-w-120 rounded-2xl border border-white/10 bg-linear-to-b from-[#0a0a0c] to-[#161616] p-6 sm:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-manrope text-3xl font-bold tracking-[-0.02em] text-white">
          Create your account
        </h1>
        <p className="mt-2 font-manrope text-white/60">
          Join HireLoop and get started in minutes
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <legend className={`${label} mb-2`}>I am a</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {roles.map(({ value, label: l, desc, icon: Icon }) => (
              <label key={value} className="cursor-pointer">
                <input type="radio" value={value} className="peer sr-only" {...register("role")} />
                <div className="flex h-full flex-col gap-2 rounded-[12px] border border-white/10 bg-[#0f0f0f] p-4 transition hover:border-white/25 peer-checked:border-brand-purple peer-checked:bg-brand-purple/10 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-purple/40">
                  <Icon className="size-5 text-white" />
                  <p className="font-manrope text-sm font-semibold text-white">{l}</p>
                  <p className="font-manrope text-xs text-white/60">{desc}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.role && <p className={error}>{errors.role.message}</p>}
        </fieldset>

        <button
          type="button"
          onClick={() => console.log("Google signup:", { provider: "google", role: getValues("role") })}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] border border-white/15 bg-white/5 font-manrope font-medium text-white transition hover:bg-white/10"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className="flex items-center gap-4 font-manrope text-sm text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          or sign up with email
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className={label}>Full name</label>
          <input id="fullName" type="text" autoComplete="name" placeholder="John Doe" aria-invalid={!!errors.fullName} className={input} {...register("fullName")} />
          {errors.fullName && <p className={error}>{errors.fullName.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className={input} {...register("email")} />
          {errors.email && <p className={error}>{errors.email.message}</p>}
        </div>

        {role === "recruiter" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className={label}>Company name</label>
            <input id="companyName" type="text" autoComplete="organization" placeholder="Your company" aria-invalid={!!errors.companyName} className={input} {...register("companyName")} />
            {errors.companyName && <p className={error}>{errors.companyName.message}</p>}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={label}>Password</label>
            <div className="relative">
              <input id="password" type={showPass ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" aria-invalid={!!errors.password} className={`${input} pr-12`} {...register("password")} />
              <EyeToggle show={showPass} onClick={() => setShowPass((v) => !v)} />
            </div>
            {errors.password && <p className={error}>{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className={label}>Confirm password</label>
            <div className="relative">
              <input id="confirmPassword" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Repeat password" aria-invalid={!!errors.confirmPassword} className={`${input} pr-12`} {...register("confirmPassword")} />
              <EyeToggle show={showConfirm} onClick={() => setShowConfirm((v) => !v)} />
            </div>
            {errors.confirmPassword && <p className={error}>{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <p className="-mt-2 font-manrope text-xs text-white/50">
          At least 8 characters with uppercase, lowercase and a number.
        </p>

        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3 font-manrope text-sm text-white/70">
            <input type="checkbox" className="mt-0.5 size-4 accent-brand-purple" {...register("terms")} />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-brand-purple hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-brand-purple hover:underline">Privacy Policy</Link>
            </span>
          </label>
          {errors.terms && <p className={error}>{errors.terms.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer rounded-[12px] bg-brand-purple font-manrope text-base font-semibold text-white hover:bg-brand-purple/90"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center font-manrope text-sm text-white/60">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-purple hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

const EyeToggle = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={show ? "Hide password" : "Show password"}
    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-white/60 hover:text-white"
  >
    {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
  </button>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A11.99 11.99 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.29 14.3A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.3V6.61H1.28A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.09z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A11.99 11.99 0 0 0 1.28 6.61l4.01 3.09C6.23 6.88 8.88 4.77 12 4.77z" />
  </svg>
)

export default SignupForm