export const VaultContracts = {
  fuji: {
    wavax: '0x76c5d333c1a5590134a8dbf14818bef8c79d5bad'.toLowerCase(),
    weth: '0xdeed4da259b3ec891d15652ea8546e09495d220a'.toLowerCase(),
    wbtc: '0x33944f1c55dc6c99af2bde42ddab8ea1d9e64036'.toLowerCase(),
    yrtAaveAvax: '0x78bb09557fd4d8fd472ee01752d7a7f2091111c9'.toLowerCase(),
    yrtAaveAvax2: '0x017dfba034707c5dee2b2e6b138f56d016625c2b'.toLowerCase(),
  },
  mainnet: {
    wavax: '0xC029713E92383426C9b387b124C0BF6271d08b80'.toLowerCase(),
    weth: '0x4805D6563B36a02C5012c11d6e15552f50066d58'.toLowerCase(),
    wbtc: '0x1eA60d781376C06693dFB21d7e5951cAEc13F7E4'.toLowerCase(),
  },
};

export const VaultTypes = [
  { name: 'wavax', symbol: 'WAVAX' },
  { name: 'weth', symbol: 'WETH.e' },
  { name: 'wbtc', symbol: 'WBTC.e' },
  { name: 'yrtAaveAvax', symbol: 'YRT' },
  { name: 'yrtAaveAvax2', symbol: 'YRT' },
];
