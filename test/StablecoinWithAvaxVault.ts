import { expect } from 'chai';

import { ethers, waffle } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAXVault,
  AVAXVault__factory,
  AVAI,
  AVAI__factory,
  AggregatorV3Interface__factory,
} from '../libs/shared/contracts/src';

describe('Avax Vault Interactions', function () {
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

    // Create treasury vault
    await vault.createVault();
    vault.setTreasury(1);

    // Add vault to stablecoin
    avai.addVault(vault.address);
  });

  // Now lets check out the two contracts interact

  // Lets do some actual vault stuff!
  it('Should successfully emit create vault event and increase vault count upon create vault', async () => {
    const initialVaultCount = await vault.totalSupply();
    await expect(vault.createVault())
      .to.emit(vault, 'CreateVault')
      .withArgs(2, accounts[0].address);
    expect(await vault.totalSupply()).to.equal(initialVaultCount.add(1));
  });

  it('Should successfully emit erc721 token upon create vault', async () => {
    const initialVaultCount = await vault.totalSupply();
    // FIrst owner makers vault
    await vault.connect(accounts[2]).createVault();
    expect(
      await vault.connect(accounts[2]).balanceOf(accounts[2].address)
    ).to.equal(1);
    expect(await vault.tokenOfOwnerByIndex(accounts[2].address, 0)).to.equal(2);

    // Second owner makes vault
    await vault.connect(accounts[1]).createVault();
    expect(
      await vault.connect(accounts[1]).balanceOf(accounts[1].address)
    ).to.equal(1);
    expect(await vault.tokenOfOwnerByIndex(accounts[1].address, 0)).to.equal(3);
    // Count should go up by two
    expect(await vault.totalSupply()).to.equal(initialVaultCount.add(2));
  });

  // Deposit collateral
  it('Should deposit collateral', async () => {
    await vault.createVault();

    // initial collateral
    const initCollat = await vault.vaultCollateral(2);

    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await expect(vault.depositCollateral(2, overrides))
      .to.emit(vault, 'DepositCollateral')
      .withArgs(2, overrides.value);

    expect(await vault.vaultCollateral(2)).to.equal(
      initCollat.add(overrides.value)
    );

    // Check balances according to blockchain
    await expect(() =>
      vault.depositCollateral(2, overrides)
    ).to.changeEtherBalances(
      [accounts[0], vault],
      [ethers.utils.parseEther('-10.0'), overrides.value]
    );
    console.log(await accounts[0].getBalance());
  });

  it('Should only allow vault owner to deposit as long as vault exists', async () => {
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await expect(vault.depositCollateral(2, overrides)).to.be.revertedWith(
      'Vault does not exist'
    );

    await vault.createVault();

    await expect(
      vault.connect(accounts[1]).depositCollateral(2, overrides)
    ).to.be.revertedWith('Vault is not owned by you');
  });

  it('Should allow withdrawal all', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };
    await vault.createVault();
    await vault.depositCollateral(2, overrides);

    // initial collateral
    const initCollat = await vault.vaultCollateral(2);

    // Lets try withdrawing
    await expect(() =>
      vault.withdrawCollateral(2, overrides.value)
    ).changeEtherBalances(
      [accounts[0], vault],
      [overrides.value, ethers.utils.parseEther('-10.0')]
    );

    expect(await vault.vaultCollateral(2)).to.equal(
      initCollat.sub(overrides.value)
    );
  });

  it('Should allow withdrawal partial amounts', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };
    await vault.createVault();
    await vault.depositCollateral(2, overrides);

    // Lets try withdrawing
    await expect(() =>
      vault.withdrawCollateral(2, ethers.utils.parseEther('5.0'))
    ).changeEtherBalances(
      [accounts[0], vault],
      [ethers.utils.parseEther('5.0'), ethers.utils.parseEther('-5.0')]
    );
  });

  it('should emit withdraw collateral', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };
    await vault.createVault();
    await vault.depositCollateral(2, overrides);

    // Lets try withdrawing
    await expect(vault.withdrawCollateral(2, ethers.utils.parseEther('5.0')))
      .to.emit(vault, 'WithdrawCollateral')
      .withArgs(2, ethers.utils.parseEther('5.0'));
  });

  it('Should only allow vault owner to withdraw as long as vault exists', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await expect(
      vault.withdrawCollateral(2, overrides.value)
    ).to.be.revertedWith('Vault does not exist');

    await vault.createVault();
    await vault.depositCollateral(2, overrides);

    await expect(
      vault.connect(accounts[1]).withdrawCollateral(2, overrides.value)
    ).to.be.revertedWith('Vault is not owned by you');
  });

  // Lets get some debt!
  it('should allow debt to be borrowed and all variables are correct', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await vault.createVault();
    await vault.depositCollateral(2, overrides);

    // Should revert if vault doesn't exist
    await expect(
      vault.borrowToken(3, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault does not exist');

    // Should revert if borrowing zero
    await expect(
      vault.borrowToken(2, ethers.utils.parseEther('0.0'))
    ).to.be.revertedWith('Must borrow non-zero amount');

    // Should revert if minting more than debt ceiling
    await expect(
      vault.borrowToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Cannot mint over debt ceiling.');

    // Should revert if not owner
    await expect(
      vault.connect(accounts[1]).borrowToken(2, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault is not owned by you');

    // Initial debt
    const initDebt = await vault.vaultDebt(2);
    const initTotalDebt = await vault.totalDebt();
    // Should borrow and emit BorrowToken!
    await expect(vault.borrowToken(2, ethers.utils.parseEther('5.0')))
      .to.emit(vault, 'BorrowToken')
      .withArgs(2, ethers.utils.parseEther('5.0'));

    // New debt should change
    expect(await vault.vaultDebt(2)).to.equal(
      initDebt.add(ethers.utils.parseEther('5.0'))
    );

    // New total debt should change
    expect(await vault.totalDebt()).to.equal(
      initTotalDebt.add(ethers.utils.parseEther('5.0'))
    );

    // Should change balance of avai
    expect(await avai.totalSupply()).to.equal(ethers.utils.parseEther('5.0'));

    // Should change balance of user
    await expect(() =>
      vault.borrowToken(2, ethers.utils.parseEther('1.0'))
    ).to.changeTokenBalance(avai, accounts[0], ethers.utils.parseEther('1.0'));
  });

  it('Should put below minimum collateral percentage and revert', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await vault.createVault();
    await vault.depositCollateral(2, overrides);
    // For test
    await vault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

    // Calculate invalid collateral
    const collat = await vault.vaultCollateral(2);
    const price = await vault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000')
      .add(1);

    await expect(vault.borrowToken(2, collateralAsDebt)).to.be.revertedWith(
      'Borrow would put vault below minimum collateral percentage'
    );

    // sub 1, should work
    await expect(() =>
      vault.borrowToken(2, collateralAsDebt.sub(1))
    ).to.changeTokenBalance(avai, accounts[0], collateralAsDebt.sub(1));
  });

  // Lets pay back the token!
  it('should pay back the token', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await vault.createVault();
    await vault.depositCollateral(2, overrides);
    // Borrow 10 AVAI
    await vault.borrowToken(2, ethers.utils.parseEther('10.0'));

    // Try out some tests

    // Should revert if vault doesn't exist
    await expect(
      vault.payBackToken(3, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault does not exist');

    // Should revert if not vault owner
    await expect(
      vault.connect(accounts[1]).payBackToken(2, ethers.utils.parseEther('5.0'))
    ).to.be.revertedWith('Vault is not owned by you');

    // Should revert if balance is too low
    await expect(
      vault.payBackToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Token balance too low');

    // Calc closing fee
    const initAmount = ethers.utils.parseEther('5.0');
    const closingFee = await vault.closingFee();
    const tokenPeg = await vault.getPricePeg();
    const priceSource = await vault.getPriceSource();

    const _closingFee = initAmount
      .mul(closingFee)
      .mul(tokenPeg)
      .div(priceSource.mul(10000));

    const initDebt = await vault.vaultDebt(2);
    const initTotalDebt = await vault.totalDebt();
    const initTreasuryCollat = await vault.vaultCollateral(1);
    const initCollat = await vault.vaultCollateral(2);
    const initAvai = await avai.totalSupply();

    await expect(vault.payBackToken(2, initAmount))
      .to.emit(vault, 'PayBackToken')
      .withArgs(2, initAmount, _closingFee);

    // check vaults after
    expect(await vault.vaultDebt(2)).to.equal(initDebt.sub(initAmount));
    expect(await vault.vaultCollateral(1)).to.equal(
      initTreasuryCollat.add(_closingFee)
    );
    expect(await vault.vaultCollateral(2)).to.equal(
      initCollat.sub(_closingFee)
    );

    // and debt
    expect(await vault.totalDebt()).to.equal(initTotalDebt.sub(initAmount));

    // Check total supply
    expect(await avai.totalSupply()).to.equal(initAvai.sub(initAmount));

    // Check balances of user, should change
    await expect(() => vault.payBackToken(2, initAmount)).to.changeTokenBalance(
      avai,
      accounts[0],
      ethers.utils.parseEther('-5.0')
    );
  });

  it('vault debt less than amount to pay back revert', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await vault.createVault();
    await vault.depositCollateral(2, overrides);
    // Borrow 10 AVAI
    await vault.borrowToken(2, ethers.utils.parseEther('10.0'));

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
      vault.payBackToken(2, ethers.utils.parseEther('15.0'))
    ).to.be.revertedWith('Vault debt less than amount to pay back');
  });

  it('should allow withdrawal of collateral while having debt', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await vault.createVault();
    await vault.depositCollateral(2, overrides);
    await vault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

    const collat = await vault.vaultCollateral(2);
    const price = await vault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000');

    // Borrow max AVAI
    await vault.borrowToken(2, collateralAsDebt);

    // Should revert
    await expect(vault.withdrawCollateral(2, 1)).to.be.revertedWith(
      'Withdrawal would put vault below minimum collateral percentage'
    );

    // Return some debt, pays 0.5% of returned collateral
    await expect(() =>
      vault.payBackToken(2, collateralAsDebt.div(2))
    ).to.changeTokenBalance(avai, accounts[0], collateralAsDebt.div(2).mul(-1));

    expect(await vault.vaultDebt(2)).to.equal(collateralAsDebt.div(2));

    const withdrawAmount = ethers.utils.parseEther('5.0').mul(9950).div(10000);
    // Lets withdraw max collateral now
    await expect(() =>
      vault.withdrawCollateral(2, withdrawAmount)
    ).to.changeEtherBalances(
      [accounts[0], vault],
      [withdrawAmount, withdrawAmount.mul(-1)]
    );
  });
});
