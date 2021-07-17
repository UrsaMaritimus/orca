import { expect } from 'chai';

import { ethers, waffle } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAXVault,
  AVAXVault__factory,
  AVAI,
  AVAI__factory,
  AggregatorV3Interface__factory,
  ERC20__factory,
} from '../libs/shared/contracts/src';

describe('Base Vault', function () {
  let accounts: SignerWithAddress[];
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

    vault = await Vault.deploy(
      minimumCollateralPercentage,
      priceSource_,
      symbol,
      name,
      token,
      avai.address
    );
    await vault.deployed();

    expect(vault.address).to.be.properAddress;
    expect(await vault.totalSupply()).to.equal(0);
  });

  // Lets check some of the BaseVault interactions!
  // Ownership checked in each individual type i.e. ERC20 vault or AVAX vault

  // Start with basic unit tests
  it('gets proper price peg and tokenPeg is equal to this', async () => {
    const pricePeg = await vault.getPricePeg();
    // USDT/USDC has 6 decimal points.
    // But chainlink returns 8 decimal points
    expect(pricePeg).to.equal(ethers.utils.parseUnits('0.1', 'gwei'));
    expect(pricePeg).to.equal(await vault.tokenPeg());
  });

  // Only to be used at discretion of the community!
  it('can set new token peg', async () => {
    await vault.setTokenPeg(ethers.utils.parseUnits('1.0', 'gwei'));

    const pricePeg = await vault.getPricePeg();
    // USDT/USDC has 6 decimal points.
    // But chainlink returns 8 decimal points
    expect(pricePeg).to.equal(ethers.utils.parseUnits('1.0', 'gwei'));
    expect(pricePeg).to.equal(await vault.tokenPeg());
  });

  it('doesnt let token peg be zero', async () => {
    await expect(vault.setTokenPeg(0)).to.be.reverted;
  });

  it('Only allows account with treasury role to change peg', async () => {
    await expect(
      vault
        .connect(accounts[1])
        .setTokenPeg(ethers.utils.parseUnits('1.0', 'gwei'))
    ).to.be.reverted;
  });

  it('sets proper debt ceiling', async () => {
    expect(await vault.debtCeiling()).to.equal(ethers.utils.parseEther('10.0'));
  });

  it('can set proper debt ceiling', async () => {
    await vault.setDebtCeiling(ethers.utils.parseEther('100.0'));
    expect(await vault.debtCeiling()).to.equal(
      ethers.utils.parseEther('100.0')
    );
  });

  it("doesn't lower debt ceiling", async () => {
    // Initially is at 10e18
    await expect(vault.setDebtCeiling(ethers.utils.parseEther('1.0'))).to.be
      .reverted;
  });

  it('only allows accounts with treasury to increase ceiling', async () => {
    await expect(
      vault
        .connect(accounts[1])
        .setDebtCeiling(ethers.utils.parseEther('100.0'))
    ).to.be.reverted;
  });

  it('gets price source from chainlink properly', async () => {
    const priceFromVault = await vault.getPriceSource();
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
    await vault.setPriceSource(newPriceSource);

    // Make sure source is right
    expect(await vault.priceSource()).to.equal(newPriceSource);

    // Make sure it reads right!
    const priceFromVault = await vault.getPriceSource();
    const chainlink = AggregatorV3Interface__factory.connect(
      newPriceSource,
      accounts[0]
    );
    const priceFromChainLink = await chainlink.latestRoundData();
    expect(priceFromVault).to.equal(priceFromChainLink.answer);
  });

  it("Doesn't set zero address as price source", async () => {
    await expect(vault.setPriceSource(ethers.constants.AddressZero)).to.be
      .reverted;
  });

  it('only allows treasury to change price source', async () => {
    const newPriceSource = '0x31CF013A08c6Ac228C94551d535d5BAfE19c602a';
    await expect(vault.connect(accounts[1]).setPriceSource(newPriceSource)).to
      .be.reverted;
  });

  it('sets correct inital stability pool', async () => {
    expect(await vault.stabilityPool()).to.equal(ethers.constants.AddressZero);
  });

  it('correctly changes stability pool', async () => {
    await vault.setStabiltyPool(accounts[1].address);
    expect(await vault.stabilityPool()).to.equal(accounts[1].address);
  });

  it("doesn't allow stability pool to be zero address", async () => {
    await expect(vault.setStabiltyPool(ethers.constants.AddressZero)).to.be
      .reverted;
  });

  it('only allowed treasury to change', async () => {
    await expect(
      vault.connect(accounts[1]).setStabiltyPool(accounts[1].address)
    ).to.be.reverted;
  });

  it('sets correct opening fee', async () => {
    expect(await vault.openingFee()).to.equal(0);
  });

  it('changes opening fee correctly', async () => {
    await vault.setOpeningFee(50);
    expect(await vault.openingFee()).to.equal(50);
  });

  it('only allows treasury to change opening fee', async () => {
    await expect(vault.connect(accounts[1]).setOpeningFee(50)).to.be.reverted;
  });

  it('sets correct closing fee', async () => {
    expect(await vault.closingFee()).to.equal(50);
  });

  it('changes closing fee correctly', async () => {
    await vault.setClosingFee(100);
    expect(await vault.closingFee()).to.equal(100);
  });

  it('only allows treasury to change closing fee', async () => {
    await expect(vault.connect(accounts[1]).setClosingFee(100)).to.be.reverted;
  });

  // Treasury setting tests
  it('sets treasury properly', async () => {
    await vault.createVault();
    await vault.setTreasury(1);

    expect(await vault.treasury()).to.equal(1);
  });

  it('Only allows vault that exists to be set as treasury', async () => {
    await vault.createVault();
    await expect(vault.setTreasury(2)).to.be.reverted;
  });

  it('Only allows treasury set by TREASURY_ROLE', async () => {
    await vault.createVault();
    await expect(vault.connect(accounts[1]).setTreasury(1)).to.be.reverted;
  });

  it('Should set correct token as collateral', async () => {
    const tokenAddress = ERC20__factory.connect(
      await vault._token(),
      accounts[0]
    );

    expect(await tokenAddress.name()).to.equal('Wrapped AVAX');
  });
});
