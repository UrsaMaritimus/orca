import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  Bank,
  Bank__factory,
  FakeBTC,
  FakeBTC__factory,
} from '../libs/shared/contracts/src';

describe('BTC Vault Test', function () {
  let accounts: SignerWithAddress[];
  let Vault: Bank__factory;
  let Stablecoin: AVAI__factory;
  let vault: Bank;
  let avai: AVAI;
  let wVault: Bank;
  let btc: FakeBTC;

  const minimumCollateralPercentage = 120;
  const priceSource_ = '0x31CF013A08c6Ac228C94551d535d5BAfE19c602a';
  const symbol = 'btcAVAX';
  const name = 'btcAVAX';

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

    let btcFac = (await ethers.getContractFactory(
      'FakeBTC',
      accounts[0]
    )) as FakeBTC__factory;

    btc = await btcFac.deploy();

    expect(avai.address).to.be.properAddress;
    expect(vault.address).to.be.properAddress;
    // Deploy btc vault
    await expect(
      avai.addBank(
        minimumCollateralPercentage,
        priceSource_,
        symbol,
        name,
        btc.address
      )
    ).to.emit(avai, 'CreateVaultType');

    wVault = Bank__factory.connect(await avai.banks(0), accounts[0]);
    // Create treasury vault
    await wVault.createVault();
    await avai.setTreasury(0, 1);

    await btc.approve(wVault.address, ethers.utils.parseUnits('1000000', 8));
  });

  // Lets do some actual vault stuff!
  it('Should successfully emit create vault event and increase vault count upon create vault', async () => {
    const initialVaultCount = await wVault.totalSupply();
    await expect(wVault.createVault())
      .to.emit(wVault, 'CreateVault')
      .withArgs(2, accounts[0].address);
    expect(await wVault.totalSupply()).to.equal(initialVaultCount.add(1));
  });

  it('Should successfully emit erc721 token upon create wVault', async () => {
    const initialVaultCount = await wVault.totalSupply();
    // FIrst owner makers wVault
    await wVault.connect(accounts[2]).createVault();
    expect(
      await wVault.connect(accounts[2]).balanceOf(accounts[2].address)
    ).to.equal(1);
    expect(await wVault.tokenOfOwnerByIndex(accounts[2].address, 0)).to.equal(
      2
    );

    // Second owner makes wVault
    await wVault.connect(accounts[1]).createVault();
    expect(
      await wVault.connect(accounts[1]).balanceOf(accounts[1].address)
    ).to.equal(1);
    expect(await wVault.tokenOfOwnerByIndex(accounts[1].address, 0)).to.equal(
      3
    );
    // Count should go up by two
    expect(await wVault.totalSupply()).to.equal(initialVaultCount.add(2));
  });

  // Deposit collateral
  it('Should deposit collateral', async () => {
    await wVault.createVault();

    // initial collateral
    const initCollat = await wVault.vaultCollateral(2);

    await expect(
      wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8))
    )
      .to.emit(wVault, 'DepositCollateral')
      .withArgs(2, ethers.utils.parseUnits('10.0', 8));

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.add(ethers.utils.parseUnits('10.0', 8))
    );

    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[0].address);
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.add(ethers.utils.parseUnits('10.0', 8))
    );
    expect(await btc.balanceOf(accounts[0].address)).to.equal(
      initBalanceUser.sub(ethers.utils.parseUnits('10.0', 8))
    );

    /* waffles doesn't work
    await expect(() =>
      wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).to.changeTokenBalances(
      btc,
      [accounts[0], wVault],
      [ethers.utils.parseEther('-10.0'), ethers.utils.parseUnits('10.0', 8)]
    );*/
  });

  it('Should only allow vault owner to deposit as long as vault exists', async () => {
    await expect(
      wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).to.be.revertedWith('Vault does not exist');

    await wVault.createVault();

    await expect(
      wVault
        .connect(accounts[1])
        .depositCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).to.be.revertedWith('Vault is not owned by you');
  });

  it('Should allow withdrawal all', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    // initial collateral
    const initCollat = await wVault.vaultCollateral(2);

    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[0].address);
    await wVault.withdrawCollateral(2, ethers.utils.parseUnits('10.0', 8));

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(ethers.utils.parseUnits('10.0', 8))
    );
    expect(await btc.balanceOf(accounts[0].address)).to.equal(
      initBalanceUser.add(ethers.utils.parseUnits('10.0', 8))
    );

    /*
    await expect(() =>
      wVault.withdrawCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).changeTokenBalances(
      btc,
      [accounts[0], wVault],
      [ethers.utils.parseUnits('10.0', 8), ethers.utils.parseEther('-10.0')]
    );*/

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.sub(ethers.utils.parseUnits('10.0', 8))
    );
  });

  it('Should allow withdrawal partial amounts', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[0].address);
    await wVault.withdrawCollateral(2, ethers.utils.parseUnits('5.0', 8));

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(ethers.utils.parseUnits('5.0', 8))
    );
    expect(await btc.balanceOf(accounts[0].address)).to.equal(
      initBalanceUser.add(ethers.utils.parseUnits('5.0', 8))
    );
    /*
    // Lets try withdrawing
    await expect(() =>
      wVault.withdrawCollateral(2, ethers.utils.parseUnits('5.0', 8))
    ).changeTokenBalances(
      btc,
      [accounts[0], wVault],
      [ethers.utils.parseUnits('5.0', 8), ethers.utils.parseEther('-5.0')]
    );*/
  });

  it('should emit withdraw collateral', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    // Lets try withdrawing
    await expect(
      wVault.withdrawCollateral(2, ethers.utils.parseUnits('5.0', 8))
    )
      .to.emit(wVault, 'WithdrawCollateral')
      .withArgs(2, ethers.utils.parseUnits('5.0', 8));
  });

  it('Should only allow vault owner to withdraw as long as vault exists', async () => {
    // Set up

    await expect(
      wVault.withdrawCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).to.be.revertedWith('Vault does not exist');

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    await expect(
      wVault
        .connect(accounts[1])
        .withdrawCollateral(2, ethers.utils.parseUnits('10.0', 8))
    ).to.be.revertedWith('Vault is not owned by you');
  });

  // Lets get some debt!
  it('should allow debt to be borrowed and all variables are correct', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));

    // Should revert if vault doesn't exist
    await expect(
      wVault.borrowToken(3, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault does not exist');

    // Should revert if borrowing zero
    await expect(
      wVault.borrowToken(2, ethers.utils.parseEther('0.0'))
    ).to.be.revertedWith('Must borrow non-zero amount');

    // Should revert if minting more than debt ceiling
    await expect(
      wVault.borrowToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Cannot mint over debt ceiling.');

    // Should revert if not owner
    await expect(
      wVault.connect(accounts[1]).borrowToken(2, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault is not owned by you');

    // Initial debt
    const initDebt = await wVault.vaultDebt(2);
    const initTotalDebt = await wVault.totalDebt();
    // Should borrow and emit BorrowToken!
    await expect(wVault.borrowToken(2, ethers.utils.parseEther('5.0')))
      .to.emit(wVault, 'BorrowToken')
      .withArgs(2, ethers.utils.parseEther('5.0'));

    // New debt should change
    expect(await wVault.vaultDebt(2)).to.equal(
      initDebt.add(ethers.utils.parseEther('5.0'))
    );

    // New total debt should change
    expect(await wVault.totalDebt()).to.equal(
      initTotalDebt.add(ethers.utils.parseEther('5.0'))
    );

    // Should change balance of avai
    expect(await avai.totalSupply()).to.equal(ethers.utils.parseEther('5.0'));

    // Should change balance of user
    await expect(() =>
      wVault.borrowToken(2, ethers.utils.parseEther('1.0'))
    ).to.changeTokenBalance(avai, accounts[0], ethers.utils.parseEther('1.0'));
  });

  it('Should put below minimum collateral percentage and revert', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    // For test
    await avai.setDebtCeiling(0, ethers.utils.parseEther('1000000.0'));

    // Calculate invalid collateral
    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(120)
      .div('100000000')
      .mul(10 ** (18 - (await btc.decimals())))
      .add(10 ** (18 - (await btc.decimals())));

    await expect(wVault.borrowToken(2, collateralAsDebt)).to.be.revertedWith(
      'Borrow would put vault below minimum collateral percentage'
    );

    // sub 1, should work
    await expect(async () =>
      wVault.borrowToken(
        2,
        collateralAsDebt.sub(10 ** (18 - (await btc.decimals())))
      )
    ).to.changeTokenBalance(
      avai,
      accounts[0],
      collateralAsDebt.sub(10 ** (18 - (await btc.decimals())))
    );
  });

  // Lets pay back the token!
  it('should pay back the token', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    // Borrow 10 AVAI
    await wVault.borrowToken(2, ethers.utils.parseEther('10.0'));

    // Try out some tests

    // Should revert if vault doesn't exist
    await expect(
      wVault.payBackToken(3, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault does not exist');

    // Should revert if not vault owner
    await expect(
      wVault
        .connect(accounts[1])
        .payBackToken(2, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault is not owned by you');

    // Should revert if balance is too low
    await expect(
      wVault.payBackToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Token balance too low');

    // Calc closing fee
    const initAmount = ethers.utils.parseEther('5.0');
    const closingFee = await wVault.closingFee();
    const tokenPeg = await wVault.getPricePeg();
    const priceSource = await wVault.getPriceSource();

    const _closingFee = initAmount
      .mul(closingFee)
      .mul(tokenPeg)
      .div(priceSource.mul(10000))
      .div(1e10);

    const initDebt = await wVault.vaultDebt(2);
    const initTotalDebt = await wVault.totalDebt();
    const initTreasuryCollat = await wVault.vaultCollateral(1);
    const initCollat = await wVault.vaultCollateral(2);
    const initAvai = await avai.totalSupply();

    await expect(wVault.payBackToken(2, initAmount))
      .to.emit(wVault, 'PayBackToken')
      .withArgs(2, initAmount, _closingFee);

    // check vaults after
    expect(await wVault.vaultDebt(2)).to.equal(initDebt.sub(initAmount));
    expect(await wVault.vaultCollateral(1)).to.equal(
      initTreasuryCollat.add(_closingFee)
    );
    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.sub(_closingFee)
    );

    // and debt
    expect(await wVault.totalDebt()).to.equal(initTotalDebt.sub(initAmount));

    // Check total supply
    expect(await avai.totalSupply()).to.equal(initAvai.sub(initAmount));

    // Check balances of user, should change
    await expect(() =>
      wVault.payBackToken(2, initAmount)
    ).to.changeTokenBalance(avai, accounts[0], ethers.utils.parseEther('-5.0'));
  });

  it('vault debt less than amount to pay back revert', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    // Borrow 10 AVAI
    await wVault.borrowToken(2, ethers.utils.parseEther('10.0'));

    // Make some AVAI to pay back
    await avai.grantRole(await avai.MINTER_ROLE(), accounts[0].address);
    await expect(() =>
      avai.mint(accounts[0].address, ethers.utils.parseEther('1000.0'))
    ).to.changeTokenBalance(
      avai,
      accounts[0],
      ethers.utils.parseEther('1000.0')
    );

    // Should revert!
    await expect(
      wVault.payBackToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Vault debt less than amount to pay back');
  });

  it('should allow withdrawal of collateral while having debt', async () => {
    // Set up
    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    await avai.setDebtCeiling(0, ethers.utils.parseEther('1000000.0'));

    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(120)
      .div('100000000')
      .mul(10 ** (18 - (await btc.decimals())));

    // Borrow max AVAI
    await wVault.borrowToken(2, collateralAsDebt);

    // Should revert
    await expect(wVault.withdrawCollateral(2, 1)).to.be.revertedWith(
      'Withdrawal would put vault below minimum collateral percentage'
    );

    const initDebt = await wVault.vaultDebt(2);
    // Return some debt, pays 0.5% of returned collateral
    await expect(() =>
      wVault.payBackToken(2, collateralAsDebt.div(2))
    ).to.changeTokenBalance(avai, accounts[0], collateralAsDebt.div(2).mul(-1));

    expect(await wVault.vaultDebt(2)).to.equal(
      initDebt.sub(collateralAsDebt.div(2))
    );

    const withdrawAmount = ethers.utils
      .parseUnits('5.0', 8)
      .mul(9925)
      .div(10000);
    console.log(withdrawAmount);
    console.log(await wVault.vaultCollateral(2));
    console.log(await wVault.vaultDebt(2));
    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[0].address);

    await wVault.withdrawCollateral(2, withdrawAmount);

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(withdrawAmount)
    );
    expect(await btc.balanceOf(accounts[0].address)).to.equal(
      initBalanceUser.add(withdrawAmount)
    );

    // Lets withdraw max collateral now
    /*
    await expect(() =>
      wVault.withdrawCollateral(2, withdrawAmount)
    ).to.changeTokenBalances(
      btc,
      [accounts[0], wVault],
      [withdrawAmount, withdrawAmount.mul(-1)]
    );*/
  });

  it('should allow destroying of vault', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    await avai.setDebtCeiling(0, ethers.utils.parseEther('1000000.0'));

    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000');

    // Borrow max AVAI
    await wVault.borrowToken(2, collateralAsDebt);

    //Try destroying vault, should revert
    await expect(wVault.destroyVault(2)).to.be.revertedWith(
      'Vault as outstanding debt'
    );

    // Pay back tokens
    await wVault.payBackToken(2, collateralAsDebt);
    expect(await wVault.vaultDebt(2)).to.equal(0);

    // Try destroying again
    // Try with different user
    await expect(
      wVault.connect(accounts[1]).destroyVault(2)
    ).to.be.revertedWith('Vault is not owned by you');
    expect(await wVault.balanceOf(accounts[0].address)).to.equal(2);
    // Should work
    await expect(wVault.destroyVault(2))
      .to.emit(wVault, 'DestroyVault')
      .withArgs(2);

    // Because it is the treasury as well, should be one instead of two
    expect(await wVault.balanceOf(accounts[0].address)).to.equal(1);

    expect(await wVault.vaultExists(2)).to.equal(false);
    expect(await wVault.vaultCollateral(2)).to.equal(0);
    expect(await wVault.vaultDebt(2)).to.equal(0);
  });

  it('should pay back all collateral in vault', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseUnits('10.0', 8));
    await avai.setDebtCeiling(0, ethers.utils.parseEther('1000000.0'));

    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000');

    // Borrow max AVAI
    await wVault.borrowToken(2, collateralAsDebt);

    // Pay back tokens
    await wVault.payBackToken(2, collateralAsDebt);
    expect(await wVault.vaultDebt(2)).to.equal(0);

    const currentCollat = await wVault.vaultCollateral(2);

    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[0].address);
    await wVault.destroyVault(2);

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(currentCollat)
    );
    expect(await btc.balanceOf(accounts[0].address)).to.equal(
      initBalanceUser.add(currentCollat)
    );

    /*
    await expect(() => wVault.destroyVault(2)).to.changeTokenBalances(
      btc,
      [accounts[0], wVault],
      [currentCollat, currentCollat.mul(-1)]
    );*/
  });
});
