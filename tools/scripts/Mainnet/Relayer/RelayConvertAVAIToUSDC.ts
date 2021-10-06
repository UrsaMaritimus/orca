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

const ConvertToUSDC = async () => {
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  // Pangolin
  const router = Router__factory.connect(PANGOLIN_ROUTER, signer);

  //ERC20
  const AVAI = ERC20__factory.connect(AVAI_MAIN, signer);

  // Tokens
  const usdc_token = new Token(chainId, USDC_MAIN, 6, 'USDC', 'USD Coin');
  const avai_token = new Token(chainId, AVAI_MAIN, 18, 'AVAI', 'AVAI');

  //AVAI to USDC
  // Make pangolin pair
  const usdcPair = Pair__factory.connect(AVAI_USDC, signer);
  const { reserve0: avaiBalance, reserve1: usdBalance } =
    await usdcPair.getReserves();

  const usdc_avai_pair = new Pair(
    new TokenAmount(usdc_token, usdBalance.toString()),
    new TokenAmount(avai_token, avaiBalance.toString()),
    chainId
  );

  const avaiTrade = Trade.bestTradeExactIn(
    [usdc_avai_pair],
    new TokenAmount(
      avai_token,
      (await AVAI.balanceOf(await signer.getAddress())).toString()
    ),
    usdc_token
  );

  const { args } = Router.swapCallParameters(avaiTrade[0], {
    feeOnTransfer: false,
    allowedSlippage: new Percent(JSBI.BigInt(50), JSBI.BigInt(10000)),
    deadline: currentTimestamp.toNumber(),
    recipient: await signer.getAddress(),
  });

  await router.swapExactTokensForTokens(
    ethers.BigNumber.from(args[0]),
    ethers.BigNumber.from(args[1]),
    args[2] as string[],
    args[3] as string,
    currentTimestamp.toHexString()
  );
};

ConvertToUSDC()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
