import UserBox from './UserBox';
import VusdBox from './VusdBox';
import Faucet from './Faucet';
 
export default function Dashboard() {
  return (
    <>
      <main className="bg-green-200  flex-1 flex-row justify-center items-center min-h-screen p-4 md:p-6">
        <section className="w-full py-12 md:py-2 lg:py-3 xl:py-4">
          <div className="container mx-auto px-4 md:px-6 mb-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-5">
                Dashboard
              </h1>
              <h2 className="text-m sm:text-l md:text-xl lg:text-2xl/none">
                Check your wallet and DUSD status
              </h2>
            </div>
          </div>
        </section>
        <section className="w-5/6 mx-auto items-center sm:rounded-lg lg:py-2 bg-green-50">
          <div className="flex flex-row container mx-auto px-4 md:px-6">
            <UserBox />
            <VusdBox />
            <Faucet />
          </div>
          {/* <div className="flex flex-row container mx-auto px-4 md:px-6">
            
          </div> */}
        </section>
      </main>
    </>
  )
}
