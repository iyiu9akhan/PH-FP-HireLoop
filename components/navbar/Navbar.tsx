import Image from "next/image"
import { Menu } from "lucide-react"
import brand_logo from "@/app/images/logo.png"
import NavMenu from "./navMenu/NavMenu"
import NavBtn from "./navBtn/NavBtn"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between rounded-[16px] bg-header-gray py-3.75 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <Link href="/">
        <Image src={brand_logo} alt="Brand Logo" priority className="ml-6" />
      </Link>

      <div className="mr-2 hidden items-center gap-8 md:flex">
        <NavMenu className="flex items-center gap-10" />
        <span className="h-6 w-px bg-white/20" />
        <NavBtn className="flex items-center gap-6" />
      </div>

      <Sheet>
        <SheetTrigger
          className="mr-4 text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </SheetTrigger>
        <SheetContent side="right" className="border-white/10 bg-header-gray">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="mt-12 flex flex-col gap-8 px-4">
            <NavMenu className="flex flex-col gap-5" />
            <NavBtn className="flex flex-col items-start gap-4" />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default Navbar
