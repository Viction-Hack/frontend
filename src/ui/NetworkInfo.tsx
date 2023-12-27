export const ArbitrumNetwork = () => {
  return (
    <div className='flex flex-row items-center w-full bg-transparent rounded-2xl h-[30px] p-4'>
      <img
        src="/arbitrum.svg"
        alt="Arbitrum"
        className="h-6 w-6 rounded-full mr-2"
      />
      <span className="text-sm font-medium text-gray-500">Arbitrum</span>
    </div>
  )
}

export const VictionNetwork = () => {
  return (
    <div className='flex flex-row items-center w-full bg-transparent rounded-2xl h-[30px] p-4'>
      <img
        src="/viction.svg"
        alt="Viction"
        className="h-6 w-6 rounded-full mr-2"
      />
      <span className="text-sm font-medium text-gray-500">Viction</span>
    </div>
  )
}