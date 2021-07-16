import { ethers } from 'hardhat';

import { expect } from 'chai';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { AVAI__factory, AVAI } from '../libs/shared/contracts/src';

describe('Stablecoin', function () {
  let accounts: SignerWithAddress[];
  let Stablecoin: AVAI__factory;
  let avai: AVAI;

  before(async () => {
    accounts = await ethers.getSigners();
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
  });

  beforeEach(async function () {
    avai = await Stablecoin.deploy('AVAI');
    await avai.deployed();
  });

  it('assigns proper admin role', async function () {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    // Check first account
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(true);

    // Check rest of accounts
    acccounts.forE;
  });
});
