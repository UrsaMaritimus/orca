export const VaultContracts = {
  fuji: {
    wavax: '0x76c5d333c1a5590134a8dbf14818bef8c79d5bad'.toLowerCase(),
    weth: '0xdeed4da259b3ec891d15652ea8546e09495d220a'.toLowerCase(),
    wbtc: '0x33944f1c55dc6c99af2bde42ddab8ea1d9e64036'.toLowerCase(),
    yrtAaveAvax: '0x78bb09557fd4d8fd472ee01752d7a7f2091111c9'.toLowerCase(),
  },
  mainnet: {
    // Bank number
    wavax: '0xC029713E92383426C9b387b124C0BF6271d08b80'.toLowerCase(), // 0 83% LTV
    weth: '0x4805D6563B36a02C5012c11d6e15552f50066d58'.toLowerCase(), // 1 83% LTV
    wbtc: '0x1eA60d781376C06693dFB21d7e5951cAEc13F7E4'.toLowerCase(), // 2 83% LTV
    yrtAaveAvax: '0x8aee038726715d78C49dFb2f12e76DE70C2F48eC'.toLowerCase(), //3 80% LTV
    yrtAaveBtc: '0x18419976Ba05dd9cE44544B8d91590704aFA4a29'.toLowerCase(), // 4 80% LTV
    yrtAaveEth: '0x8b61488Ca2D727826c7Afe4eDbF810159F17D398'.toLowerCase(), // 5 80% LTV
    yrtJoe: '0xa1A34E32c24911daA45e338dB9D785c1b323F280'.toLowerCase(), // 6 75% LTV
    yrtQiAvax: '0x2b583646EC93245562Fd08A3b5f44Aa55417766B'.toLowerCase(), // 7 80% LTV
    yrtQiLink: '0x22a86D96b26308ba1971F8080AAD965884061076'.toLowerCase(), // 8 80% LTV
    yrtQiBtc: '0x64D56b4B6C844015EC07e52A1267D5d5d4F4E5BD'.toLowerCase(), // 9 80% LTV
    yrtQiEth: '0xc59b6794e5DeE450d264669f34e7849A90083774'.toLowerCase(), // 10 80% LTV
    yrtQi: '0xC09caDDA753c54292BeB1D10429bD175556b8b5E'.toLowerCase(), // 11 75% LTV
    yrtQiDai: '0xEa03cDCdD912522400d21Ee89A5bC46Bffe11AC3'.toLowerCase(), //12  86% LTV
    yrtQiUsdt: '0xAf8d16500A58b868C34be9106d674b820d67C979'.toLowerCase(), //13  86% LTV
    yrtQiUsdc: '0xd694F97dd5874fA4e712FDFB781231D93642D29b'.toLowerCase(), //14 86% LTV
    //yrtAvaxJoeJLP: '0xff7aDB357cecf7f2067016dd7493A53B0DF4427D'.toLowerCase(), // 15 75% LTV
    //yrtAvaxQiPGL: '0xA0d2e5f091fD3A8F6439D464B0f51983da507c61'.toLowerCase(), // 16 75% LTV
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
  { name: 'yrtQiAvax', symbol: 'YRT' },
  { name: 'yrtQiLink', symbol: 'YRT' },
  { name: 'yrtQiBtc', symbol: 'YRT' },
  { name: 'yrtQiEth', symbol: 'YRT' },
  { name: 'yrtQi', symbol: 'YRT' },
  { name: 'yrtQiDai', symbol: 'YRT' },
  { name: 'yrtQiUsdc', symbol: 'YRT' },
  { name: 'yrtQiUsdt', symbol: 'YRT' },
  { name: 'yrtAvaxJoeJLP', symbol: 'YRT' },
  { name: 'yrtAvaxQiPGL', sumbol: 'YRT' },
];
