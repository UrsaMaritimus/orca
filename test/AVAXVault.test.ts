import { expect } from 'chai';

import { ethers, waffle } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAXVault,
  AVAXVault__factory,
  AVAI,
  AVAI__factory,
} from '../libs/shared/contracts/src';

describe('AVAX Vault', function () {
  let accounts;
  let Vault: AVAXVault__factory;
  let Stablecoin: AVAI__factory;
  let vault: AVAXVault;
  let avai: AVAI;
  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  before(async () => {
    accounts = await ethers.getSigners();
    Vault = (await ethers.getContractFactory(
      'AVAXVault'
    )) as AVAXVault__factory;
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
  });

  beforeEach(async function () {
    avai = await Stablecoin.deploy('AVAI');
    await avai.deployed();

    expect(avai.address).to.be.properAddress;

    vault = await Vault.deploy(priceSource_, symbol, name, token, avai.address);
    await vault.deployed();

    expect(vault.address).to.be.properAddress;
    expect(await vault.totalSupply()).to.equal(0);
  });

  it('should set stablecoin to admin and no other accounts', async () => {
    const DEFAULT_ADMIN_ROLE = await vault.DEFAULT_ADMIN_ROLE();
    // Check first account
    expect(await vault.hasRole(DEFAULT_ADMIN_ROLE, avai.address)).to.equal(
      true
    );
    // No other account should have default admin role
    // Check rest of accounts
    accounts.forEach(async (account) => {
      expect(await vault.hasRole(DEFAULT_ADMIN_ROLE, account.address)).to.equal(
        false
      );
    });
  });

  it('should set deployer to treasury role and no other accounts', async () => {
    const TREASURY_ROLE = await vault.TREASURY_ROLE();
    // Check first account
    expect(await vault.hasRole(TREASURY_ROLE, accounts[0].address)).to.equal(
      true
    );
    // No other account should have default admin role
    // Check rest of accounts
    accounts.slice(1).forEach(async (account) => {
      expect(await vault.hasRole(TREASURY_ROLE, account.address)).to.equal(
        false
      );
    });

    // Check stablecoin as well
    expect(await vault.hasRole(TREASURY_ROLE, avai.address)).to.equal(false);
  });

  it('Should allow transfering of treasury role', async () => {
    const TREASURY_ROLE = await vault.TREASURY_ROLE();
    // Check first account
    expect(await vault.hasRole(TREASURY_ROLE, accounts[0].address)).to.equal(
      true
    );
    // Check second account
    expect(await vault.hasRole(TREASURY_ROLE, accounts[1].address)).to.equal(
      false
    );

    // Now transfer
    await vault.changeTreasury(accounts[1].address);
    // Recheck
    // Check first account
    expect(await vault.hasRole(TREASURY_ROLE, accounts[0].address)).to.equal(
      false
    );
    // Check second account
    expect(await vault.hasRole(TREASURY_ROLE, accounts[1].address)).to.equal(
      true
    );

    // Make sure nothing else has role
    accounts.slice(2).forEach(async (account) => {
      expect(await vault.hasRole(TREASURY_ROLE, account.address)).to.equal(
        false
      );
    });

    // Check stablecoin as well
    expect(await vault.hasRole(TREASURY_ROLE, avai.address)).to.equal(false);
  });

  // Lets check some of the BaseVault interactions!
});
