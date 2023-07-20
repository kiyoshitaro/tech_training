import { ETH_ADDRESS } from "zksync-web3/build/src/utils";

export const TOKENS: Record<
  number,
  Record<
    string,
    {
      name: string;
      symbol: string;
      address: string;
      decimals: number;
    }
  >
> = {
  280: {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      address: ETH_ADDRESS,
      decimals: 18,
    },
    WETH: {
      name: 'Wrapped Ethereum',
      symbol: 'WETH',
      address: '0x20b28b1e4665fff290650586ad76e977eab90c5d',
      decimals: 18,
    },
    DAI: {
      name: 'DAI',
      symbol: 'DAI',
      address: '0x3e7676937a7e96cfb7616f255b9ad9ff47363d4b',
      decimals: 18,
    },
    LINK: {
      name: 'ChainLink Token (goerli)',
      symbol: 'LINK',
      address: '0x40609141db628beee3bfab8034fc2d8278d0cc78',
      decimals: 18,
    },
    USDC: {
      name: 'USD Coin (goerli)',
      symbol: 'USDC',
      address: '0x0faF6df7054946141266420b43783387A78d82A9',
      decimals: 6,
    },
    zkUSD: {
      name: 'zkUSD',
      symbol: 'zkUSD',
      address: '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b',
      decimals: 6,
    },
  },
  324: {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      address: ETH_ADDRESS,
      decimals: 18,
    },
    WETH: {
      name: 'Wrapped Ethereum',
      symbol: 'WETH',
      address: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
      decimals: 18,
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
      decimals: 6,
    },
    zkUSD: {
      name: 'zkUSD',
      symbol: 'zkUSD',
      address: '0xfC7E56298657B002b3e656400E746b7212912757',
      decimals: 6,
    },
  },
  1: {
    TKN: {
      name: 'TKN',
      symbol: '$TKN',
      address: '0xb478c6245e3D85D6EC3486B62ea872128d562541',
      decimals: 18,
    },
    WETH: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
    },
  },
  5: {
    TKN: {
      name: 'TKN (goerli)',
      symbol: '$TKN',
      address: '0x61f275c54577a66cf4e4ccc6D20CbE04d31ae889',
      decimals: 18,
    },
    WETH: {
      name: 'Wrapped Ether (goerli)',
      symbol: 'WETH',
      address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
      decimals: 18,
    },
  },
};
