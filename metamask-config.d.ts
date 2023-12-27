/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface Ethereum {
  request: ({ method, params }: { method: string; params?: unknown[] }) => Promise<any>;
}

interface Window {
  ethereum?: Ethereum;
}