import { expect } from 'chai';

import { ethers, waffle, upgrades } from 'hardhat';

import {
  AVAI__factory,
  AVAI,
  BaseVault,
  BaseVault__factory,
  WAVAXGateway,
  WAVAXGateway__factory,
  WAVAX__factory,
  WAVAX,
} from '../libs/shared/contracts/src';

describe('ERC20 Vault Test', function () {
  let accounts;
  let Vault: BaseVault__factory;
  let Stablecoin: AVAI__factory;
  let Gateway: WAVAXGateway__factory;
  let vault: BaseVault;
  let avai: AVAI;
  let wVault: BaseVault;
  let gateway: WAVAXGateway;
  let wavax: WAVAX;

  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  before(async () => {
    accounts = await ethers.getSigners();
    Vault = (await ethers.getContractFactory(
      'BaseVault'
    )) as BaseVault__factory;
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
    Gateway = (await ethers.getContractFactory(
      'WAVAXGateway',
      accounts[0]
    )) as WAVAXGateway__factory;
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

    gateway = await Gateway.deploy(token);
    await gateway.deployed();
    expect(gateway.address).to.be.properAddress;

    expect(avai.address).to.be.properAddress;
    expect(vault.address).to.be.properAddress;
    // Deploy wAVAX vault
    await expect(
      avai.addVault(
        minimumCollateralPercentage,
        priceSource_,
        symbol,
        name,
        token
      )
    )
      .to.emit(avai, 'CreateVaultType')
      .withArgs(token, symbol);

    wVault = BaseVault__factory.connect(await avai.vaults(0), accounts[0]);
    // Create treasury vault
    await wVault.createVault();
    await wVault.setTreasury(1);
    // We use a gateway for our purposes
    await gateway.authorizeVault(wVault.address);
    await wVault.setGateway(gateway.address);

    // Get WAVAX
    const overrides = {
      value: ethers.utils.parseEther('100.0'),
    };

    wavax = WAVAX__factory.connect(token, accounts[0]);
    await expect(() => wavax.deposit(overrides)).to.changeEtherBalance(
      accounts[0],
      ethers.utils.parseEther('100.0').mul(-1)
    );

    await expect(() => wavax.deposit(overrides)).to.changeTokenBalance(
      wavax,
      accounts[0],
      ethers.utils.parseEther('100.0')
    );

    wavax.approve(wVault.address, ethers.constants.MaxUint256);
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

    await expect(wVault.depositCollateral(2, ethers.utils.parseEther('10.0')))
      .to.emit(wVault, 'DepositCollateral')
      .withArgs(2, ethers.utils.parseEther('10.0'));

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.add(ethers.utils.parseEther('10.0'))
    );

    // Check balances according to blockchain
    await expect(() =>
      wVault.depositCollateral(2, ethers.utils.parseEther('10.0'))
    ).to.changeTokenBalances(
      wavax,
      [accounts[0], wVault],
      [ethers.utils.parseEther('-10.0'), ethers.utils.parseEther('10.0')]
    );
    console.log(await accounts[0].getBalance());
  });

  it('Should only allow vault owner to deposit as long as vault exists', async () => {
    await expect(
      wVault.depositCollateral(2, ethers.utils.parseEther('10.0'))
    ).to.be.revertedWith('Vault does not exist');

    await wVault.createVault();

    await expect(
      wVault
        .connect(accounts[1])
        .depositCollateral(2, ethers.utils.parseEther('10.0'))
    ).to.be.revertedWith('Vault is not owned by you');
  });

  it('Should allow withdrawal all', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));

    // initial collateral
    const initCollat = await wVault.vaultCollateral(2);

    // Lets try withdrawing
    await expect(() =>
      wVault.withdrawCollateral(2, ethers.utils.parseEther('10.0'))
    ).changeTokenBalances(
      wavax,
      [accounts[0], wVault],
      [ethers.utils.parseEther('10.0'), ethers.utils.parseEther('-10.0')]
    );

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.sub(ethers.utils.parseEther('10.0'))
    );
  });

  it('Should allow withdrawal partial amounts', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));

    // Lets try withdrawing
    await expect(() =>
      wVault.withdrawCollateral(2, ethers.utils.parseEther('5.0'))
    ).changeTokenBalances(
      wavax,
      [accounts[0], wVault],
      [ethers.utils.parseEther('5.0'), ethers.utils.parseEther('-5.0')]
    );
  });

  it('should emit withdraw collateral', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));

    // Lets try withdrawing
    await expect(wVault.withdrawCollateral(2, ethers.utils.parseEther('5.0')))
      .to.emit(wVault, 'WithdrawCollateral')
      .withArgs(2, ethers.utils.parseEther('5.0'));
  });

  it('Should only allow vault owner to withdraw as long as vault exists', async () => {
    // Set up

    await expect(
      wVault.withdrawCollateral(2, ethers.utils.parseEther('10.0'))
    ).to.be.revertedWith('Vault does not exist');

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));

    await expect(
      wVault
        .connect(accounts[1])
        .withdrawCollateral(2, ethers.utils.parseEther('10.0'))
    ).to.be.revertedWith('Vault is not owned by you');
  });

  // Lets get some debt!
  it('should allow debt to be borrowed and all variables are correct', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));

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
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
    // For test
    await wVault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

    // Calculate invalid collateral
    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000')
      .add(1);

    await expect(wVault.borrowToken(2, collateralAsDebt)).to.be.revertedWith(
      'Borrow would put vault below minimum collateral percentage'
    );

    // sub 1, should work
    await expect(() =>
      wVault.borrowToken(2, collateralAsDebt.sub(1))
    ).to.changeTokenBalance(avai, accounts[0], collateralAsDebt.sub(1));
  });

  // Lets pay back the token!
  it('should pay back the token', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
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
      .div(priceSource.mul(10000));

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
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
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
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
    await wVault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

    const collat = await wVault.vaultCollateral(2);
    const price = await wVault.getPriceSource();
    const collateralAsDebt = collat
      .mul(price)
      .mul(100)
      .div(150)
      .div('100000000');

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

    const withdrawAmount = ethers.utils.parseEther('5.0').mul(9950).div(10000);
    // Lets withdraw max collateral now
    await expect(() =>
      wVault.withdrawCollateral(2, withdrawAmount)
    ).to.changeTokenBalances(
      wavax,
      [accounts[0], wVault],
      [withdrawAmount, withdrawAmount.mul(-1)]
    );
  });

  it('should allow destroying of vault', async () => {
    // Set up

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
    await wVault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

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
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
    await wVault.setDebtCeiling(ethers.utils.parseEther('1000000.0'));

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
    await expect(() => wVault.destroyVault(2)).to.changeTokenBalances(
      wavax,
      [accounts[0], wVault],
      [currentCollat, currentCollat.mul(-1)]
    );
  });
});
