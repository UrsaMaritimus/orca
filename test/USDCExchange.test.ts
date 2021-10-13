import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  FakeUSDC,
  FakeUSDC__factory,
  USDCExchange,
  USDCExchange__factory,
  Bank,
  Bank__factory,
  USDCExchangev2,
  USDCExchangev2__factory,
} from '../libs/shared/contracts/src';

describe('USDC Swap Test', function () {
  let accounts: SignerWithAddress[];
  let avai: AVAI;
  let Stablecoin: AVAI__factory;
  let usdc: FakeUSDC;
  let USDC: FakeUSDC__factory;
  let exchange: USDCExchange;
  let Exchange: USDCExchange__factory;
  let Vault: Bank__factory;
  let vault: Bank;

  before(async () => {
    accounts = await ethers.getSigners();
    Exchange = (await ethers.getContractFactory(
      'USDCExchange'
    )) as USDCExchange__factory;
    USDC = (await ethers.getContractFactory('FakeUSDC')) as FakeUSDC__factory;
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
    Vault = (await ethers.getContractFactory(
      'Bank',
      accounts[0]
    )) as Bank__factory;
  });

  beforeEach(async function () {
    vault = await Vault.deploy();
    await vault.deployed();
    expect(vault.address).to.be.properAddress;

    avai = (await upgrades.deployProxy(Stablecoin, [
      'AVAI',
      vault.address,
    ])) as AVAI;
    expect(avai.address).to.be.properAddress;

    usdc = await USDC.deploy();
    await usdc.deployed();
    expect(usdc.address).to.be.properAddress;

    exchange = (await upgrades.deployProxy(Exchange, [
      usdc.address,
      avai.address,
    ])) as USDCExchange;

    await avai.grantRole(await avai.MINTER_ROLE(), exchange.address);
    await avai.grantRole(await avai.BURNER_ROLE(), exchange.address);
    expect(
      await avai.hasRole(await avai.MINTER_ROLE(), exchange.address)
    ).to.equal(true);
    expect(
      await avai.hasRole(await avai.BURNER_ROLE(), exchange.address)
    ).to.equal(true);
  });

  it('usdc rate to be set correctly', async () => {
    expect(await exchange.usdcRate()).to.equal(10075);
  });

  it('avai rate to be set correctly', async () => {
    expect(await exchange.avaiRate()).to.equal(9925);
  });

  it('sets tokens correcly', async () => {
    expect(await exchange.usdc()).to.equal(usdc.address);
    expect(await exchange.avai()).to.equal(avai.address);
  });

  it('sets treasury correctly', async () => {
    expect(await exchange.treasury()).to.equal(accounts[0].address);
  });

  it('allows owner to change rates', async () => {
    await expect(exchange.connect(accounts[1]).setUSDCRate(10050)).to.be
      .reverted;
    await expect(exchange.connect(accounts[1]).setAVAIRate(9950)).to.be
      .reverted;

    await exchange.setUSDCRate(10050);
    expect(await exchange.usdcRate()).to.equal(10050);

    await exchange.setAVAIRate(9950);
    expect(await exchange.avaiRate()).to.equal(9950);
  });

  it('allows change of treasury and owner', async () => {
    // Check it reverts first
    await expect(exchange.connect(accounts[1]).setUSDCRate(10050)).to.be
      .reverted;
    await expect(
      exchange.connect(accounts[1]).changeTreasury(accounts[1].address)
    ).to.be.reverted;

    // change owner ship
    await exchange.changeTreasury(accounts[1].address);

    expect(await exchange.treasury()).to.equal(accounts[1].address);
    // Accounts[0] still owner
    await expect(exchange.connect(accounts[1]).setUSDCRate(10050)).to.be
      .reverted;
    await expect(
      exchange.connect(accounts[1]).changeTreasury(accounts[0].address)
    ).to.be.reverted;

    // And now should be able to change things
    await exchange.connect(accounts[0]).setUSDCRate(10050);
    expect(await exchange.usdcRate()).to.equal(10050);
  });

  it('has correct initial usd reserves', async () => {
    //init 0
    expect(await exchange.usdReserves()).to.equal(0);
  });

  it('allows minting with usdc', async () => {
    // Try with zero, should revert
    await expect(exchange.mint(0)).to.be.revertedWith('Cannot mint 0 AVAI');
    // Trade 10 USDC
    const tradeUSDC = ethers.utils.parseUnits('10', 6);
    // Get in return
    const returnAVAI = ethers.utils.parseEther('10').mul(1e4).div(10075);
    // Fee
    const tradeFee = tradeUSDC.sub(tradeUSDC.mul(1e4).div(10075));
    //Send usdc to account[1]
    usdc.transfer(accounts[1].address, tradeUSDC);

    // Second account should have usdc
    const initUSDCBalanceTreasury = await usdc.balanceOf(accounts[0].address);
    const initUSDCBalanceExchange = await usdc.balanceOf(exchange.address);
    const initAVAIBalance = await avai.balanceOf(accounts[1].address);

    // Approve USDC spend first
    await usdc
      .connect(accounts[1])
      .increaseAllowance(exchange.address, tradeUSDC);

    // Increase per hour limit
    await exchange.setHourlyLimit(5000);

    await exchange.connect(accounts[1]).mint(tradeUSDC);

    expect(await avai.balanceOf(accounts[1].address)).to.equal(
      initAVAIBalance.add(returnAVAI)
    );
    expect(await usdc.balanceOf(exchange.address)).to.equal(
      initUSDCBalanceExchange.add(tradeUSDC.sub(tradeFee))
    );

    expect(await usdc.balanceOf(accounts[0].address)).to.equal(
      initUSDCBalanceTreasury.add(tradeFee)
    );
  });

  it('allows redeeming of USDC for AVAI, starting with 10 usdc', async () => {
    // Try with zero, should revert
    await expect(exchange.connect(accounts[1]).redeem(0)).to.be.revertedWith(
      'Cannot redeem 0 USDC'
    );
    // Put some USDC in first
    // Trade 10 USDC
    const tradeUSDC = ethers.utils.parseUnits('10', 6);
    // Get in return
    const returnAVAI = ethers.utils.parseEther('10').mul(1e4).div(10075);
    //Send usdc to account[1]
    usdc.transfer(accounts[1].address, tradeUSDC);
    // Approve USDC spend first
    await usdc
      .connect(accounts[1])
      .increaseAllowance(exchange.address, tradeUSDC);

    await expect(exchange.connect(accounts[1]).redeem(0)).to.be.revertedWith(
      'Cannot redeem 0 USDC'
    );

    // Increase per hour limit
    await exchange.setHourlyLimit(5000);

    await exchange.connect(accounts[1]).mint(tradeUSDC);

    // Redeem the AVAI we got
    await exchange.connect(accounts[1]).redeem(returnAVAI);
  });

  it('allows redeeming of USDC for AVAI, starting with 52 usdc', async () => {
    // Try with zero, should revert
    await expect(exchange.connect(accounts[1]).redeem(0)).to.be.revertedWith(
      'Cannot redeem 0 USDC'
    );
    // Put some USDC in first
    // Trade 10 USDC
    const tradeUSDC = ethers.utils.parseUnits('52', 6);
    // Get in return
    const returnAVAI = ethers.utils.parseEther('52').mul(1e4).div(10075);
    //Send usdc to account[1]
    usdc.transfer(accounts[1].address, tradeUSDC);
    // Approve USDC spend first
    await usdc
      .connect(accounts[1])
      .increaseAllowance(exchange.address, tradeUSDC);

    await expect(exchange.connect(accounts[1]).redeem(0)).to.be.revertedWith(
      'Cannot redeem 0 USDC'
    );
    // Increase per hour limit
    await exchange.setHourlyLimit(5000);
    await exchange.connect(accounts[1]).mint(tradeUSDC);

    // Check balances
    const treasuryInitUSDC = await usdc.balanceOf(accounts[0].address);
    const usdcReceieved = returnAVAI
      .mul(9925)
      .div(ethers.utils.parseUnits('1', 16));
    const fee = returnAVAI
      .div(ethers.utils.parseUnits('1', 12))
      .sub(usdcReceieved);

    // Redeem the AVAI we got
    await exchange.connect(accounts[1]).redeem(returnAVAI);
    // Check balances of USDC
    // AVAI should be zero everywhere as well
    expect(await usdc.balanceOf(exchange.address)).to.equal(0);
    expect(await usdc.balanceOf(accounts[0].address)).to.equal(
      treasuryInitUSDC.add(fee)
    );
    expect(await usdc.balanceOf(accounts[1].address)).to.equal(usdcReceieved);

    expect(await exchange.usdReserves()).to.equal(0);
    expect(await avai.balanceOf(exchange.address)).to.equal(0);
    expect(await avai.balanceOf(accounts[1].address)).to.equal(0);
  });
});
