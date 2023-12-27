/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
interface Ethereum {
  request: ({ method, params }: { method: string; params?: unknown[] }) => Promise<any>;
}

interface Window {
  ethereum?: Ethereum;
}