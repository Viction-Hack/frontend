import UserBox from './UserBox';
import VusdBox from './VusdBox';

export default function Dashboard() {
  return (
    <>
      <main className="bg-green-200  flex-1 flex-row justify-center items-center min-h-screen p-4 md:p-6">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Dashboard
              </h1>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-gray-800 w-3/5">
          <div className="container px-4 md:px-6">
            <UserBox />
            <VusdBox />
          </div>
        </section>
      </main>
    </>
  )
}
