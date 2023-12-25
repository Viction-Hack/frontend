export default function VusdBox() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">DUSD Overview</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Stablecoin Minted</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">75% ($1,500,000)</dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Delta-Hedged Positions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">25% ($500,000)</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}