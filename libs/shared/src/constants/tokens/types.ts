export type TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
  decimals: number;
  symbol: string;
  address: {
    mainnet: string;
    fuji: string;
  };
};

export type BankInfo = TokenInfo & {
  collateral: boolean;
  url?: string;
  tooltip: boolean;
  tooltipText?: React.ReactElement;
  yaktoken: boolean;
  yakBase?: string;
  underlyingDecimals?: number;
};

export type FarmInfo = TokenInfo & {
  reward: string;
  rewardImg: string;
  active: boolean;
};
