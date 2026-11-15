import React from "react"
import Image from "next/image"
import jobicon from "@/app/images/newJob/jobicon.png"

const NewJob = () => {
  return (
    <div className="mb-8 flex items-center justify-center">
      <span
        aria-hidden
        className="h-px w-16 bg-linear-to-r from-[#010123] to-[#A8A8A8] opacity-70"
      />

      <div className="relative inline-flex items-center gap-4 rounded-[24px] bg-linear-to-b from-[#262626] to-transparent px-6 py-3">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px] bg-linear-to-b from-[#A8A8A8]/40 to-transparent p-px"
          style={{
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
          }}
        />

        <Image src={jobicon} alt="job icon" className="size-6 object-contain" />
        <h1 className="font-space-mono text-[20px] leading-[120%] font-normal text-white/50 uppercase">
          <span className="font-bold text-white">50,000+</span> new jobs this
          month
        </h1>
      </div>

      <span
        aria-hidden
        className="h-px w-16 bg-linear-to-r from-[#A8A8A8] to-[#010123] opacity-70"
      />
    </div>
  )
}

export default NewJob
