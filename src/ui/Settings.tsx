import Image from 'next/image'

const Settings = () => (
  <div className='flex items-center justify-center bg-transparent'>
    <Image src='/setting.svg' alt='spinner' width={25} height={25} />
  </div>
)

export default Settings