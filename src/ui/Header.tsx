import Link from 'next/link';
import CoinsIcon from './CoinsIcon';
import ConnectButton from './ConnectWallet';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
      <Link className="flex items-center justify-center" href="/">
        <CoinsIcon className="h-6 w-6" />
        <span className="sr-only">DeltaNeutral Stablecoin</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 mr-3">
        <Link className="text-m font-medium hover:underline underline-offset-4" href="/">
          About
        </Link>
        <Link className="text-m font-medium hover:underline underline-offset-4" href="/dashboard">
          Dashboard
        </Link>
        <Link className="text-m font-medium hover:underline underline-offset-4" href="/token">
          Mint & Redeem
        </Link>
        <Link className="text-m font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
      <ConnectButton />
    </header>
  );
}