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
const USDC_WAVAX = '0xbd918Ed441767fe7924e99F6a0E0B568ac1970D9';
const PANGOLIN_ROUTER = '0xe54ca86531e17ef3616d22ca28b0d458b6c89106';

// ERC20
const USDC_MAIN = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';

const chainId = 43114;

const currentTimestamp = ethers.BigNumber.from(new Date().getTime() + 100000);

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
  const USDC = ERC20__factory.connect(USDC_MAIN, signer);

  // Tokens
  const avax = WAVAX[chainId];
  const usdc_token = new Token(chainId, USDC_MAIN, 6, 'USDC.e', 'USD Coine');

  //AVAI to USDC
  // Make pangolin pair
  const usdcPair = Pair__factory.connect(USDC_WAVAX, signer);
  const { reserve0: usdcBalance, reserve1: avaxBalance } =
    await usdcPair.getReserves();

  const usdc_avax_pair = new Pair(
    new TokenAmount(avax, avaxBalance.toString()),
    new TokenAmount(usdc_token, usdcBalance.toString()),
    chainId
  );

  const usdcTrade = Trade.bestTradeExactIn(
    [usdc_avax_pair],
    new TokenAmount(
      usdc_token,
      (await USDC.balanceOf(await signer.getAddress())).div(10000).toString()
    ),
    avax
  );

  const { args } = Router.swapCallParameters(usdcTrade[0], {
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
