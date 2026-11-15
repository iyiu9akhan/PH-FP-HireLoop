import Banner from "@/components/banner/Banner"
import Navbar from "@/components/navbar/Navbar"
import Stats from "@/components/stats/Stats"

const fade =
  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)"

const noise =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

export default function Page() {
  return (
    <main className="relative overflow-x-clip bg-[#010103]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="isolate bg-[#010103]">
          <img
            src="/images/hero/header-shade.png"
            alt=""
            className="block w-full opacity-100 mix-blend-luminosity brightness-50"
          />
        </div>

        {/* Globe: max 1440px, center */}
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto max-w-360">
            <div className="pt-[37%]">
              <img
                src="/images/hero/header-globe.png"
                alt=""
                className="block w-full"
                style={{ maskImage: fade, WebkitMaskImage: fade }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: noise }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-330 px-4 pt-6 pb-40">
        <Navbar />
        <Banner />
        <Stats />
      </div>
    </main>
  )
}
