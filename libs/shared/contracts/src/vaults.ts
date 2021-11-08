export const VaultContracts = {
  fuji: {
    wavax: '0x76c5d333c1a5590134a8dbf14818bef8c79d5bad'.toLowerCase(),
    weth: '0xdeed4da259b3ec891d15652ea8546e09495d220a'.toLowerCase(),
    wbtc: '0x33944f1c55dc6c99af2bde42ddab8ea1d9e64036'.toLowerCase(),
    yrtAaveAvax: '0x78bb09557fd4d8fd472ee01752d7a7f2091111c9'.toLowerCase(),
  },
  mainnet: {
    wavax: '0xC029713E92383426C9b387b124C0BF6271d08b80'.toLowerCase(), // 1
    weth: '0x4805D6563B36a02C5012c11d6e15552f50066d58'.toLowerCase(), // 2
    wbtc: '0x1eA60d781376C06693dFB21d7e5951cAEc13F7E4'.toLowerCase(), // 3
    yrtAaveAvax: '0x8aee038726715d78C49dFb2f12e76DE70C2F48eC'.toLowerCase(), //4
  },
};

export const VaultTypes = [
  { name: 'wavax', symbol: 'WAVAX' },
  { name: 'weth', symbol: 'WETH.e' },
  { name: 'wbtc', symbol: 'WBTC.e' },
  { name: 'yrtAaveAvax', symbol: 'YRT' },
];
