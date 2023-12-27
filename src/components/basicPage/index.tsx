export default function BasicPage() {
  return (
    <>
      <main className="bg-green-200  flex-1 flex-row justify-center items-center min-h-screen p-4 md:p-6">
        <section className="w-full py-12 md:py-2 lg:py-3 xl:py-4">
          <div className="container mx-auto px-4 md:px-6 mb-10">
            <div className="flex flex-col items-center space-y-4 text-center">
            </div>
          </div>
        </section>
        <section className="flex w-5/6 mx-auto justify-center items-center sm:rounded-lg lg:py-2 bg-green-50">
          <div className="flex flex-row text-lg font-bold items-center h-full mx-auto px-4 md:px-6">
            <h1>Connect Wallet to continue</h1>
          </div>
        </section>
      </main>
    </>
  )
}
