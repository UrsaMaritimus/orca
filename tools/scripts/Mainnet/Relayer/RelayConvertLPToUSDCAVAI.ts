import {
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
const AVAI_USDC = '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0';
const PANGOLIN_ROUTER = '0xe54ca86531e17ef3616d22ca28b0d458b6c89106';

// ERC20
const USDC_MAIN = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';
const AVAI_MAIN = '0x346A59146b9b4a77100D369a3d18E8007A9F46a6';

const chainId = 43114;

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
  const router = Router__factory.connect(PANGOLIN_ROUTER, signer);

  //ERC20
  const USDC = ERC20__factory.connect(USDC_MAIN, signer);
  const AVAI = ERC20__factory.connect(AVAI_MAIN, signer);

  // Tokens
  const usdc_token = new Token(chainId, USDC_MAIN, 6, 'USDC', 'USD Coin');
  const avai_token = new Token(chainId, AVAI_MAIN, 18, 'AVAI', 'AVAI');
  const wavax_token = WAVAX[chainId];

  // Deal with USDC-AVAI pair
  const usdcPair = Pair__factory.connect(AVAI_USDC, signer);
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
    JSBI.multiply(amountToRemoveB.raw, JSBI.BigInt(10000 - 50)),
    JSBI.BigInt(10000)
  );

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
