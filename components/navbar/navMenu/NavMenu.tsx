import Link from "next/link"

export const menuItems = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const NavMenu = ({ className = "" }: { className?: string }) => {
  return (
    <ul className={className}>
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-white hover:text-white/70 font-sans font-normal text-[16px] leading-[180%] tracking-[-0.2px]">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu