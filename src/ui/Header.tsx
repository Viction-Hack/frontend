import Link from 'next/link';
import CoinsIcon from './CoinsIcon';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <CoinsIcon className="h-6 w-6" />
        <span className="sr-only">DeltaNeutral Stablecoin</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Stablecoin Info
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          How it Works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
    </header>
  );
}