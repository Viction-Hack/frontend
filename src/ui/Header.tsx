import Link from 'next/link';
import CoinsIcon from './CoinsIcon';
import ConnectButton from './ConnectWallet';

const Header = () => {

  const linkText: { [key: string]: string } = { // Add index signature
    "/": "Home",
    "/dashboard": "Dashboard",
    "/token": "Mint & Redeem",
    "/oft": "Bridge",
    "/earn": "Earn",
  };


  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-black">
      <Link className="flex items-center justify-center" href="/">
        <CoinsIcon className="h-6 w-6" />
        <span className="sr-only">DeltaNeutral Stablecoin</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 mr-3">
        {['/', '/dashboard', '/token', '/oft', '/earn'].map((href) => (
          <Link key={href} href={href} className={`text-m font-medium hover:underline underline-offset-4 ${'text-lightgold font-bold'}`}>

            {linkText[href]}

          </Link>
        ))}
      </nav>
      <ConnectButton />
    </header>
  );
}

export default Header;