import UserBox from './UserBox';
import VusdBox from './VusdBox';
import '@/app/page.css'

export default function Dashboard() {
  return (
    <>
      <main className="pages bg-blue-200 bg-opacity-50 flex flex-col justify-center items-center min-h-screen p-4 md:p-6">
        <section className="w-full text-center py-12 md:py-2 lg:py-3 xl:py-4">
          <div className="container mx-auto px-4 md:px-6 mb-10">
            <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl mb-5">
              Dashboard
            </h1>
            <h2 className="text-m text-lightgold sm:text-l md:text-xl lg:text-2xl">
              Check your wallet and DUSD status
            </h2>
          </div>
        </section>
        <section className="w-5/6 mx-auto items-center sm:rounded-lg lg:py-2">
          <div className="mx-8 flex-row justify-center space-x-4">
            <UserBox />
            <VusdBox />
          </div>
        </section>
      </main>
    </>
  );
}
