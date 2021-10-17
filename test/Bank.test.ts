import { expect } from 'chai';

import { ethers, waffle, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  Bank,
  Bank__factory,
  AggregatorV3Interface__factory,
  ERC20Upgradeable__factory,
} from '../libs/shared/contracts/src';

describe('Bank', function () {
  let accounts: SignerWithAddress[];
  let Vault: Bank__factory;
  let Stablecoin: AVAI__factory;
  let vault: Bank;
  let avai: AVAI;
  let wVault: Bank;

  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x31CF013A08c6Ac228C94551d535d5BAfE19c602a';
  const symbol = 'btcAVAX';
  const name = 'btcAVAX';
  const token = '0xc4a8272248A5233aC3359D4BC100bC671EBdE4Cd';

  before(async () => {
    accounts = await ethers.getSigners();
    Vault = (await ethers.getContractFactory('Bank')) as Bank__factory;
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
  });

  beforeEach(async function () {
    vault = await Vault.deploy();
    await vault.deployed();
    expect(vault.address).to.be.properAddress;

    avai = (await upgrades.deployProxy(Stablecoin, [
      'AVAI',
      vault.address,
    ])) as AVAI;
    await avai.deployed();

    expect(avai.address).to.be.properAddress;
    expect(vault.address).to.be.properAddress;
    // Deploy wAVAX vault
    await expect(
      avai.addBank(
        minimumCollateralPercentage,
        priceSource_,
        symbol,
        name,
        token
      )
    ).to.emit(avai, 'CreateVaultType');

    wVault = Bank__factory.connect(await avai.banks(0), accounts[0]);
  });

  // Lets check some of the Bank interactions!
  // Ownership checked in each individual type i.e. ERC20 vault or AVAX vault

  // Start with basic unit tests
  it('gets proper price peg and tokenPeg is equal to this', async () => {
    const pricePeg = await wVault.getPricePeg();
    // USDT/USDC has 6 decimal points.
    // But chainlink returns 8 decimal points
    expect(pricePeg).to.equal(ethers.utils.parseUnits('0.1', 'gwei'));
    expect(pricePeg).to.equal(await wVault.tokenPeg());
  });

  // Only to be used at discretion of the community!
  it('can set new token peg', async () => {
    await avai.setTokenPeg(0, ethers.utils.parseUnits('1.0', 'gwei'));

    const pricePeg = await wVault.getPricePeg();
    // USDT/USDC has 6 decimal points.
    // But chainlink returns 8 decimal points
    expect(pricePeg).to.equal(ethers.utils.parseUnits('1.0', 'gwei'));
    expect(pricePeg).to.equal(await wVault.tokenPeg());
  });

  it('doesnt let token peg be zero', async () => {
    await expect(wVault.setTokenPeg(0)).to.be.reverted;
  });

  it('Only allows account with treasury role to change peg', async () => {
    await expect(wVault.setTokenPeg(ethers.utils.parseUnits('1.0', 'gwei'))).to
      .be.reverted;
  });

  it('sets proper debt ceiling', async () => {
    expect(await wVault.debtCeiling()).to.equal(
      ethers.utils.parseEther('10.0')
    );
  });

  it('can set proper debt ceiling', async () => {
    await avai.setDebtCeiling(0, ethers.utils.parseEther('100.0'));
    expect(await wVault.debtCeiling()).to.equal(
      ethers.utils.parseEther('100.0')
    );
  });

  it("doesn't lower debt ceiling", async () => {
    // Initially is at 10e18
    await expect(wVault.setDebtCeiling(ethers.utils.parseEther('1.0'))).to.be
      .reverted;
  });

  it('only allows accounts with treasury to increase ceiling', async () => {
    await expect(
      wVault
        .connect(accounts[1])
        .setDebtCeiling(ethers.utils.parseEther('100.0'))
    ).to.be.reverted;
  });

  it('gets price source from chainlink properly', async () => {
    const priceFromVault = await wVault.getPriceSource();
    const chainlink = AggregatorV3Interface__factory.connect(
      priceSource_,
      accounts[0]
    );
    const priceFromChainLink = await chainlink.latestRoundData();
    expect(priceFromVault).to.equal(priceFromChainLink.answer);
  });

  // Only to be used at discretion of the community! If Chainlink fails, for example
  it('can set new price source', async () => {
    const newPriceSource = '0x31CF013A08c6Ac228C94551d535d5BAfE19c602a';
    await avai.setPriceSource(0, newPriceSource);

    // Make sure source is right
    expect(await wVault.priceSource()).to.equal(newPriceSource);

    // Make sure it reads right!
    const priceFromVault = await wVault.getPriceSource();
    const chainlink = AggregatorV3Interface__factory.connect(
      newPriceSource,
      accounts[0]
    );
    const priceFromChainLink = await chainlink.latestRoundData();
    expect(priceFromVault).to.equal(priceFromChainLink.answer);
  });

  it("Doesn't set zero address as price source", async () => {
    await expect(wVault.setPriceSource(ethers.constants.AddressZero)).to.be
      .reverted;
  });

  it('only allows treasury to change price source', async () => {
    const newPriceSource = '0x31CF013A08c6Ac228C94551d535d5BAfE19c602a';
    await expect(wVault.connect(accounts[1]).setPriceSource(newPriceSource)).to
      .be.reverted;
  });

  it('sets correct inital stability pool', async () => {
    expect(await wVault.stabilityPool()).to.equal(ethers.constants.AddressZero);
  });

  it('correctly changes stability pool', async () => {
    await expect(
      avai.setStabilityPool(0, accounts[1].address)
    ).to.be.revertedWith('Must be a contract to be the stability pool.');
    await avai.setStabilityPool(0, wVault.address); // Workis now that it is a contract
    expect(await wVault.stabilityPool()).to.equal(wVault.address);
  });

  it("doesn't allow stability pool to be zero address", async () => {
    await expect(wVault.setStabilityPool(ethers.constants.AddressZero)).to.be
      .reverted;
  });

  it('only allowed treasury to change', async () => {
    await expect(
      wVault.connect(accounts[1]).setStabilityPool(accounts[1].address)
    ).to.be.reverted;
  });

  it('sets correct opening fee', async () => {
    expect(await wVault.openingFee()).to.equal(0);
  });

  it('changes opening fee correctly', async () => {
    await avai.setOpeningFee(0, 50);
    expect(await wVault.openingFee()).to.equal(50);
  });

  it('only allows treasury to change opening fee', async () => {
    await expect(wVault.connect(accounts[1]).setOpeningFee(50)).to.be.reverted;
  });

  it('sets correct closing fee', async () => {
    expect(await wVault.closingFee()).to.equal(75);
  });

  it('changes closing fee correctly', async () => {
    await avai.setClosingFee(0, 100);
    expect(await wVault.closingFee()).to.equal(100);
  });

  it('only allows treasury to change closing fee', async () => {
    await expect(wVault.connect(accounts[1]).setClosingFee(100)).to.be.reverted;
  });

  // Treasury setting tests
  it('sets treasury properly', async () => {
    await wVault.createVault();
    await avai.setTreasury(0, 1);

    expect(await wVault.treasury()).to.equal(1);
  });

  it('Only allows wVault that exists to be set as treasury', async () => {
    await wVault.createVault();
    await expect(wVault.setTreasury(2)).to.be.reverted;
  });

  it('Only allows treasury set by TREASURY_ROLE', async () => {
    await wVault.createVault();
    await expect(wVault.connect(accounts[1]).setTreasury(1)).to.be.reverted;
  });

  it('Should set correct token as collateral', async () => {
    const tokenAddress = ERC20Upgradeable__factory.connect(
      await wVault.token(),
      accounts[0]
    );

    expect(await tokenAddress.name()).to.equal('Wrapped BTC');
  });

  it('Should set min collateral percentage correctly', async () => {
    expect(await wVault.minimumCollateralPercentage()).to.equal(150);
  });

  it('should set stablecoin to admin and no other accounts', async () => {
    const DEFAULT_ADMIN_ROLE = await wVault.DEFAULT_ADMIN_ROLE();
    // Check first account
    expect(await wVault.hasRole(DEFAULT_ADMIN_ROLE, avai.address)).to.equal(
      true
    );
    // No other account should have default admin role
    // Check rest of accounts
    accounts.forEach(async (account) => {
      expect(
        await wVault.hasRole(DEFAULT_ADMIN_ROLE, account.address)
      ).to.equal(false);
    });
  });

  it('should set deployer to treasury role and no other accounts', async () => {
    const TREASURY_ROLE = await wVault.TREASURY_ROLE();
    // Check avai
    expect(await wVault.hasRole(TREASURY_ROLE, avai.address)).to.equal(true);
    // No other account should have default admin role
    // Check rest of accounts
    accounts.forEach(async (account) => {
      expect(await wVault.hasRole(TREASURY_ROLE, account.address)).to.equal(
        false
      );
    });
  });
});
