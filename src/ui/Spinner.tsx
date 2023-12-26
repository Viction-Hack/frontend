import Image from 'next/image'

const Spinner = () => (
  <div className='flex items-center z-10 justify-center bg-transparent'>
    <Image src='/spinner.gif' alt='spinner' width={40} height={40} />
  </div>
)

export default Spinner