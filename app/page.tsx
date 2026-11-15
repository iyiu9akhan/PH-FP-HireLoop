import Banner from "@/components/banner/Banner"
import GlobeBg from "@/components/banner/globeBg/GlobeBg"
import Navbar from "@/components/navbar/Navbar"
import Stats from "@/components/stats/Stats"

export default function Page() {
  return (
    <main className="relative overflow-x-clip bg-[#010103]">
      <GlobeBg />

      <div className="relative z-10 mx-auto max-w-330 px-4 pt-6">
        <Navbar />
        <Banner />
        <Stats />
      </div>
    </main>
  )
}
