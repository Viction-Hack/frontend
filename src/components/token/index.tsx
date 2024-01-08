import ActionBox from './ActionBox';
import '@/app/page.css'

export default function Token() {
  return (
    <>
      <main className="pages bg-blue-200 bg-opacity-50  flex-1 flex-row justify-center items-center min-h-screen p-4 md:p-6">
        <section className="w-full py-12 md:py-2 lg:py-3 xl:py-4">
          <div className="container mx-auto px-4 md:px-6 mb-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-5">
                Mint & Redeem
              </h1>
              <h2 className="text-m text-lightgold sm:text-l md:text-xl lg:text-2xl/none">
                Mint DUSD with various assets and<br /><br /> Redeem them for the underlying assets.
              </h2>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-2 lg:py-3 xl:py-4">
          <ActionBox />
        </section>

      </main>
    </>
  )
}
