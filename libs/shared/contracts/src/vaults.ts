export const VaultContracts = {
  fuji: {
    wavax: '0x76c5d333c1a5590134a8dbf14818bef8c79d5bad'.toLowerCase(),
    weth: '0xdeed4da259b3ec891d15652ea8546e09495d220a'.toLowerCase(),
    wbtc: '0x33944f1c55dc6c99af2bde42ddab8ea1d9e64036'.toLowerCase(),
    yrtAaveAvax: '0x78bb09557fd4d8fd472ee01752d7a7f2091111c9'.toLowerCase(),
  },
  mainnet: {
    // Bank number
    wavax: '0xC029713E92383426C9b387b124C0BF6271d08b80'.toLowerCase(), // 0
    weth: '0x4805D6563B36a02C5012c11d6e15552f50066d58'.toLowerCase(), // 1
    wbtc: '0x1eA60d781376C06693dFB21d7e5951cAEc13F7E4'.toLowerCase(), // 2
    yrtAaveAvax: '0x8aee038726715d78C49dFb2f12e76DE70C2F48eC'.toLowerCase(), //3
    yrtAaveBtc: '0x18419976Ba05dd9cE44544B8d91590704aFA4a29'.toLowerCase(), // 4
    yrtAaveEth: '0x8b61488Ca2D727826c7Afe4eDbF810159F17D398'.toLowerCase(), // 5
    yrtJoe: '0xa1A34E32c24911daA45e338dB9D785c1b323F280'.toLowerCase(), // 6
  },
};

export const VaultTypes = [
  { name: 'wavax', symbol: 'WAVAX' },
  { name: 'weth', symbol: 'WETH.e' },
  { name: 'wbtc', symbol: 'WBTC.e' },
  { name: 'yrtAaveAvax', symbol: 'YRT' },
  { name: 'yrtAaveBtc', symbol: 'YRT' },
  { name: 'yrtAaveEth', symbol: 'YRT' },
  { name: 'yrtJoe', symbol: 'YRT' },
];
