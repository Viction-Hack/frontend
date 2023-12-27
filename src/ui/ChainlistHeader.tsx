export default function ChainlistHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex justify-center text-black font-bold bg-[#bbf7d0] items-center">
      Add&nbsp;
      <a className="flex items-center justify-center hover:underline" target="_blank" href="https://chainlist.org/?search=tomochain&testnets=true" rel="noopener noreferrer">
        Viction Testnet Network
      </a>
      &nbsp;in your wallet before the interaction!&nbsp;
    </header>
  );
}