import {
  Currency,
  CurrencyAmount,
  JSBI,
  Pair,
  Percent,
  TokenAmount,
  Token,
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
const AVAI_USDC_FUJI = '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217';
const PANGOLIN_ROUTER_FUJI = '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921';

// ERC20
const USDC_FUJI = '0xC1517ac40949643188efF133E2d4d6954eb23378';
const AVAI_FUJI = '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385';

const slippage = 0.005;

const chainId = 43113;

const currentTimestamp = ethers.BigNumber.from(new Date().getTime() + 100000);
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

  // Deal with USDC-AVAI pair
  const usdcPair = Pair__factory.connect(AVAI_USDC_FUJI, signer);
  const { reserve0: avaiBalance, reserve1: usdBalance } =
    await usdcPair.getReserves();

  // Make pangolin pair
  const usdc_avai_pair = new Pair(
    new TokenAmount(usdc_token, usdBalance.toString()),
    new TokenAmount(avai_token, avaiBalance.toString()),
    chainId
  );
  const balanceUser = new TokenAmount(
    usdc_avai_pair.liquidityToken,
    (await usdcPair.balanceOf(await signer.getAddress())).toString()
  );

  const totalSupply = new TokenAmount(
    usdc_avai_pair.liquidityToken,
    (await usdcPair.totalSupply()).toString()
  );

  const liquidityValueA = usdc_avai_pair.getLiquidityValue(
    avai_token,
    totalSupply,
    balanceUser,
    false
  );

  const liquidityValueB = usdc_avai_pair.getLiquidityValue(
    usdc_token,
    totalSupply,
    balanceUser,
    false
  );

  const percentToRemove = new Percent('100', '100');
  const amountToRemoveLiquidity = new TokenAmount(
    balanceUser.token,
    percentToRemove.multiply(balanceUser.raw).quotient
  );
  const amountToRemoveA = new TokenAmount(
    usdc_token,
    percentToRemove.multiply(liquidityValueA.raw).quotient
  );
  const amountToRemoveB = new TokenAmount(
    avai_token,
    percentToRemove.multiply(liquidityValueB.raw).quotient
  );

  const avaiAmount = JSBI.divide(
    JSBI.multiply(amountToRemoveA.raw, JSBI.BigInt(10000 - 50)),
    JSBI.BigInt(10000)
  );
  const usdcAmount = JSBI.divide(
    JSBI.multiply(amountToRemoveB.raw, JSBI.BigInt(10000)),
    JSBI.BigInt(10000)
  );

  /*
  await usdcPair.approve(
    router.address,
    ethers.utils.parseEther('10000000000000000')
  );*/

  await router.removeLiquidity(
    avai_token.address,
    usdc_token.address,
    amountToRemoveLiquidity.raw.toString(),
    avaiAmount.toString(),
    usdcAmount.toString(),
    await signer.getAddress(),
    currentTimestamp.toHexString()
  );
};

ConvertToAvax()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
