import Link from "next/link"
import { Button } from "@/components/ui/button"

const NavBtn = ({ className = "" }: { className?: string }) => {
  return (
    <div className={className}>
      <Link href="/login" className="font-medium text-brand-purple">
        Sign In
      </Link>

      <Link
        href="/signup"
        className="text-[18px] font-medium rounded-[12px] bg-brand-purple px-[22.5px] py-3.25 hover:bg-brand-purple/90"
      >
        Get Started
      </Link>
    </div>
  )
}

export default NavBtn
