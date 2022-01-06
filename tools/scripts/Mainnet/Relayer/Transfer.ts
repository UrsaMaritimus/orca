import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';

import {
  ERC20__factory,
  WAVAXGateway__factory,
  Bank__factory,
} from '../../../../libs/shared/src/contracts/types';

const AVAX_BANK = '0xC029713E92383426C9b387b124C0BF6271d08b80';
const ETH_BANK = '0x4805D6563B36a02C5012c11d6e15552f50066d58';
const GATEWAY = '0x4FFFa5602112fd0C7B327A503F67f229F6D0828A';

const Transfer = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);
  /*
  const avaiOrcaLP = ERC20__factory.connect(
    '0x1A9Bd67c82C0e8E47C3ad2FA772FCb9B7A831A37',
    signer
  );
  await avaiOrcaLP.transfer(
    '0x59A24B6E1bDDc15b3aD844B0DfcD86421363F62c',
    ethers.utils.parseEther('20')
  );

  const avaiUSDCLP = ERC20__factory.connect(
    '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0',
    signer
  );
  await avaiUSDCLP.transfer(
    '0x59A24B6E1bDDc15b3aD844B0DfcD86421363F62c',
    ethers.utils.parseEther('0.000052382213431435')
  );

  const avaxOrcaLP = ERC20__factory.connect(
    '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5',
    signer
  );
  await avaxOrcaLP.transfer(
    '0x59A24B6E1bDDc15b3aD844B0DfcD86421363F62c',
    ethers.utils.parseEther('1')
  );
    */
  const usdc = ERC20__factory.connect(
    '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    signer
  );
  await usdc.transfer(
    '0x67e5c1a82a6bbFb646f3E5755bf929Cd46B1eAB2',
    await usdc.balanceOf(await signer.getAddress())
  );
  /*
  const orca = ERC20__factory.connect(
    '0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
    signer
  );
  await orca.transfer(
    '0x59A24B6E1bDDc15b3aD844B0DfcD86421363F62c',
    ethers.utils.parseEther('33054')
  );*/
};

Transfer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
