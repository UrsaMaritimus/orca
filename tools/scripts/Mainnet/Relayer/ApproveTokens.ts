import {
  CurrencyAmount,
  JSBI,
  Pair,
  Percent,
  TokenAmount,
  Trade,
  Token,
  Router,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';

import { ERC20__factory } from '../../../../libs/shared/contracts/src';

import { Router__factory, Pair__factory } from '../../contracts';

// Pangolin
const AVAI_USDC = '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0';
const PANGOLIN_ROUTER = '0xe54ca86531e17ef3616d22ca28b0d458b6c89106';

// ERC20
const USDC_MAIN = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';
const AVAI_MAIN = '0x346A59146b9b4a77100D369a3d18E8007A9F46a6';
const ETH_MAIN = '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB';

const chainId = 43114;

const currentTimestamp = ethers.BigNumber.from(new Date().getTime() + 100000);

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function computeSlippageAdjustedAmounts(
  trade: Trade | undefined,
  allowedSlippage: number
): { tradeIn: CurrencyAmount; tradeOut: CurrencyAmount } {
  const pct = basisPointsToPercent(allowedSlippage);
  return {
    tradeIn: trade.maximumAmountIn(pct),
    tradeOut: trade.minimumAmountOut(pct),
  };
}

const ApproveTokens = async () => {
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  // Pangolin
  const router = Router__factory.connect(PANGOLIN_ROUTER, signer);

  //ERC20
  const USDC = ERC20__factory.connect(USDC_MAIN, signer);
  const AVAI = ERC20__factory.connect(AVAI_MAIN, signer);
  const ETH = ERC20__factory.connect(ETH_MAIN, signer);
  const usdcPair = Pair__factory.connect(AVAI_USDC, signer);

  // Approve

  /*await USDC.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );

  await AVAI.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );

*/

  await ETH.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );

  /*
  await usdcPair.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );*/
};

ApproveTokens()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
