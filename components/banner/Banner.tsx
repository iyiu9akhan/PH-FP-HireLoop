import React from "react"
import NewJob from "./newJob/NewJob"
import SearchBar from "./searchBar/SearchBar"

const Banner = () => {
  return (
    <div className="mt-44.25 text-center flex flex-col items-center">
      <NewJob />
      <h1 className="mb-4 font-manrope text-[56px] leading-[115%] font-bold tracking-[-2%] text-white capitalize">
        Find Your Dream Job Today
      </h1>
      <p className="max-w-196 font-manrope text-[20px] leading-[160%] font-normal text-white/60 mb-12">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role — faster.
      </p>
      <SearchBar />
    </div>
  )
}

export default Banner
