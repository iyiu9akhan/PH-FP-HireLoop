import React from "react"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const SearchBar = () => {
  return (
    <div className="mx-auto flex w-full max-w-196 flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-3 rounded-[16px] border border-white/15 bg-[#0f0f0f] p-4 md:flex-row md:items-center md:gap-0 md:py-1 md:pr-2 md:pl-6">
        <label className="flex flex-1 items-center gap-3">
          <Search className="size-6 shrink-0 text-white" />
          <input
            type="text"
            placeholder="Job tilte, skill or company"
            className="w-full min-w-0 bg-transparent font-satoshi text-base leading-[170%] text-white outline-none placeholder:text-white/80"
          />
        </label>

        <span className="mx-6 hidden h-6 w-px bg-white/20 md:block" />

        <label className="flex flex-1 items-center gap-3">
          <MapPin className="size-6 shrink-0 text-white" />
          <input
            type="text"
            placeholder="Location or Remote"
            className="w-full min-w-0 bg-transparent font-satoshi text-base leading-[170%] text-white outline-none placeholder:text-white/80"
          />
        </label>

        <Button
          aria-label="Search jobs"
          className="size-12 w-full shrink-0 cursor-pointer rounded-[12px] bg-brand-purple text-white hover:bg-brand-purple/90 md:w-13"
        >
          <Search className="size-6" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="font-manrope text-base leading-[130%] text-white/70">
          Trending Position
        </span>
        {trendingRoles.map((role) => (
          <button
            key={role}
            type="button"
            className="rounded-[24px] border border-white/10 bg-[#1f1f1f] px-3 py-2 font-manrope text-sm leading-[150%] text-white transition hover:bg-white/10"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
