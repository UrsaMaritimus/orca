import {
  JSBI,
  Pair,
  Percent,
  Router,
  TokenAmount,
  Token,
  WAVAX,
  Trade,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';
import { ERC20__factory } from '../../../../libs/shared/contracts/src';

const DEV_WALLET = '0x47ff3502D3a4Ac0d2af858C379466cBF5AEAFc0A';

// ERC20
const USDC_MAIN = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';

const TransferUSDC = async () => {
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  //ERC20
  const USDC = ERC20__factory.connect(USDC_MAIN, signer);

  // Send rest of usdc to dev fund
  await USDC.transfer(
    DEV_WALLET,
    await USDC.balanceOf(await signer.getAddress())
  );
};

TransferUSDC()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
