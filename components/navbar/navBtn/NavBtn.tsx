"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth-client"
import { User, LogOut } from "lucide-react"

const NavBtn = ({ className = "" }: { className?: string }) => {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
          router.refresh()
        },
      },
    })
  }

  if (isPending) {
    return <div className={className}>Loading...</div>
  }

  console.log("session:", session)

  return (
    <div className={className}>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 font-medium text-brand-purple hover:underline"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 rounded-[12px] border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-medium text-brand-purple">
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-[12px] bg-brand-purple px-[22.5px] py-3.25 text-[18px] font-medium text-white hover:bg-brand-purple/90"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavBtn
