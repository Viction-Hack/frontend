import Link from "next/link"
import Image from "next/image"
import Header from "../ui/Header"
import Footer from "../ui/Footer"
import ChainlistHeader from "@/ui/ChainlistHeader"

export default function LandingPage() {
  return (
    <>
      <ChainlistHeader />
      <Header />
      <main className="bg-green-200 flex-1 flex-row justify-center items-center min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Doldrums
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the stability of a delta-neutral
                  stablecoin.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="/dashboard"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#fdfdfd] dark:bg-gray-800">
          <div className="flex flex-row justify-between px-5 md:px-8">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Doldrums
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Delta-Neutral Stablecoin
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  DUSD, a stablecoin at Doldrums leverages delta-neutral strategies to provide a stable, reliable, and secure
                  cryptocurrency for all your financial needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Learn More
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4">
              <Image src="/dollar.png" alt="Dollar Image" width={600} height={600} />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-200  dark:bg-gray-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800 dark:text-white">
              Technologies & Partnerships
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
              Cutting-edge technologies and strategic partnerships for enhanced performance and UX.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-10 mx-5 w-1/2 h-1/2 hover:bg-gray-100">
              <Image src="/layerzero.svg" alt="LayerZero Logo" width={100} height={100} />
              <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">LayerZero</h3>
              <p className="mt-2 text-center text-gray-500 dark:text-gray-300">
                Integrating with LayerZero for seamless cross-chain communication and interoperability.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-10 mx-5 w-1/2 h-1/2 hover:bg-gray-100">
              <Image src="/viction.svg" alt="Viction Logo" width={160} height={160} />
              <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">Viction</h3>
              <p className="mt-2 text-center text-gray-500 dark:text-gray-300">
                Leverages state-of-art technology of Viction to enhance the financial ecosystem and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
