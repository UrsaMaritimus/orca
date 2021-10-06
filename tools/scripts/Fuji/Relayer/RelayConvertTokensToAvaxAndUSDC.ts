import {
  Currency,
  CurrencyAmount,
  JSBI,
  Pair,
  Percent,
  TokenAmount,
  Trade,
  Token,
  WAVAX,
  Router,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';

import { ERC20__factory } from '../../../../libs/shared/contracts/src';

import { Router__factory, Pair__factory } from '../../contracts';
import { sign } from 'crypto';

// Pangolin
const AVAI_USDC_FUJI = '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217';
const PANGOLIN_ROUTER_FUJI = '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921';

// ERC20
const USDC_FUJI = '0xC1517ac40949643188efF133E2d4d6954eb23378';
const AVAI_FUJI = '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385';

const chainId = 43113;

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

const ConvertToAvax = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  // Pangolin
  const router = Router__factory.connect(PANGOLIN_ROUTER_FUJI, signer);

  //ERC20
  const USDC = ERC20__factory.connect(USDC_FUJI, signer);
  const AVAI = ERC20__factory.connect(AVAI_FUJI, signer);

  // Tokens
  const usdc_token = new Token(chainId, USDC_FUJI, 6, 'USDC', 'USD Coin');
  const avai_token = new Token(chainId, AVAI_FUJI, 18, 'AVAI', 'AVAI');
  const wavax_token = WAVAX[chainId];

  // Balances
  const initAvaxBalance = await signer.getBalance();
  const initUsdcBalance = await USDC.balanceOf(await signer.getAddress());
  const initAVAIBalance = await AVAI.balanceOf(await signer.getAddress());

  //AVAI to USDC
  // Make pangolin pair
  const usdcPair = Pair__factory.connect(AVAI_USDC_FUJI, signer);
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

  // Approve

  /*await USDC.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );

  await AVAI.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );*/

  await router.swapExactTokensForTokens(
    ethers.BigNumber.from(args[0]),
    ethers.BigNumber.from(args[1]),
    args[2] as string[],
    args[3] as string,
    currentTimestamp.toHexString()
  );

  //ETH to USDC
};

ConvertToAvax()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
