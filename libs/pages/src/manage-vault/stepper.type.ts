import { BigNumber } from 'ethers';

export type VaultInfo = {
  collateral: BigNumber;
  debt: BigNumber;
  LTV: BigNumber;
  maxLTV: number;
  maxLTVUSD: BigNumber;
  borrowingPowerAvailable: BigNumber;
  borrowingPowerAvailableUSD: BigNumber;
  borrowingPowerUsed: BigNumber;
  borrowingPowerUsedUSD: BigNumber;
  tokenPrice: BigNumber;
  availableWithdraw: BigNumber;
  peg: BigNumber;
  mcp: BigNumber;
  closingFee: BigNumber;
  openingFee: BigNumber;
};

export type StepperProps = {
  token: 'AVAX' | 'ETH' | 'BTC';
  approved?: boolean;
  vaultID: number;
  vaultInfo: {
    collateral: BigNumber;
    debt: BigNumber;
    LTV: BigNumber;
    maxLTV: number;
    maxLTVUSD: BigNumber;
    borrowingPowerAvailable: BigNumber;
    borrowingPowerAvailableUSD: BigNumber;
    borrowingPowerUsed: BigNumber;
    borrowingPowerUsedUSD: BigNumber;
    tokenPrice: BigNumber;
    availableWithdraw: BigNumber;
    peg: BigNumber;
    mcp: BigNumber;
    closingFee: BigNumber;
    openingFee: BigNumber;
    yakBalance: string;
  };
};

export type ActionProps = {
  isOwner: boolean;
} & StepperProps;
