import React from "react"
import { BriefcaseBusiness, ChartColumn, UserSearch, Star } from "lucide-react"

const stats = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfication Rate" },
]

const Stats = () => {
  return (
    <section className="mt-89.5 mb-18 text-center">
      <h1 className="mx-auto mb-12 max-w-150 font-manrope text-[40px] leading-[130%] tracking-[-1px] text-white/70">
        Assisting over <span className="text-white">15,000 job seekers</span>{" "}
        find their dream positions.
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="relative flex h-63.5 flex-col justify-between rounded-2xl bg-[linear-gradient(180deg,#010102_30px,#313131_452px)] p-6 text-left"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10"
            />

            <Icon className="size-6 text-white" strokeWidth={1.5} />

            <div className="flex flex-col gap-2">
              <p className="font-plus-jakarta text-[56px] leading-[115%] font-semibold tracking-[-0.02em] text-white">
                {value}
              </p>
              <p className="font-inter-tight text-base leading-[130%] font-normal text-white">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
