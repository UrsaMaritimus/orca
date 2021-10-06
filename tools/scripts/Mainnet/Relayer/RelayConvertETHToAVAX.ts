import {
  CurrencyAmount,
  JSBI,
  Pair,
  Percent,
  TokenAmount,
  Trade,
  Token,
  Router,
  WAVAX,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';

import { ERC20__factory } from '../../../../libs/shared/contracts/src';

import { Router__factory, Pair__factory } from '../../contracts';

// Pangolin
const ETH_WAVAX = '0x7c05d54fc5CB6e4Ad87c6f5db3b807C94bB89c52';
const PANGOLIN_ROUTER = '0xe54ca86531e17ef3616d22ca28b0d458b6c89106';

// ERC20
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
  const ETH = ERC20__factory.connect(ETH_MAIN, signer);

  // Tokens
  const avax = WAVAX[chainId];
  const eth_token = new Token(chainId, ETH_MAIN, 18, 'AVAI', 'AVAI');

  //AVAI to USDC
  // Make pangolin pair
  const ethPair = Pair__factory.connect(ETH_WAVAX, signer);
  const { reserve0: ethBalance, reserve1: avaxBalance } =
    await ethPair.getReserves();

  const eth_avax_pair = new Pair(
    new TokenAmount(avax, avaxBalance.toString()),
    new TokenAmount(eth_token, ethBalance.toString()),
    chainId
  );

  const avaiTrade = Trade.bestTradeExactIn(
    [eth_avax_pair],
    new TokenAmount(
      eth_token,
      (await ETH.balanceOf(await signer.getAddress())).toString()
    ),
    avax
  );

  const { args } = Router.swapCallParameters(avaiTrade[0], {
    feeOnTransfer: false,
    allowedSlippage: new Percent(JSBI.BigInt(50), JSBI.BigInt(10000)),
    deadline: currentTimestamp.toNumber(),
    recipient: await signer.getAddress(),
  });

  await router.swapExactTokensForAVAX(
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
