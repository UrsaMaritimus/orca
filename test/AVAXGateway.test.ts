import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  Bank,
  Bank__factory,
  WAVAXGateway,
  WAVAXGateway__factory,
  ERC20Upgradeable__factory,
  ERC20Upgradeable,
  PriceSource,
  PriceSource__factory,
} from '../libs/shared/contracts/src';

describe('Avax Vault Test with Gateway', function () {
  let accounts: SignerWithAddress[];
  let Vault: Bank__factory;
  let Stablecoin: AVAI__factory;
  let Gateway: WAVAXGateway__factory;
  let vault: Bank;
  let avai: AVAI;
  let wVault: Bank;
  let gateway: WAVAXGateway;
  let wavax: ERC20Upgradeable;
  let FakePrice: PriceSource__factory;
  let fakePrice: PriceSource;

  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  before(async () => {
    accounts = await ethers.getSigners();
    Vault = (await ethers.getContractFactory('Bank')) as Bank__factory;
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;
    Gateway = (await ethers.getContractFactory(
      'WAVAXGateway',
      accounts[0]
    )) as WAVAXGateway__factory;
    FakePrice = (await ethers.getContractFactory(
      'PriceSource',
      accounts[0]
    )) as PriceSource__factory;
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
      avai.addBank(
        minimumCollateralPercentage,
        priceSource_,
        symbol,
        name,
        token
      )
    ).to.emit(avai, 'CreateVaultType');

    wVault = Bank__factory.connect(await avai.banks(0), accounts[0]);
    // Create treasury vault
    await wVault.createVault();
    await avai.setTreasury(0, 1);
    // We use a gateway for our purposes
    await gateway.authorizeVault(wVault.address);
    await avai.setGateway(0, gateway.address);

    // wavax setup
    wavax = ERC20Upgradeable__factory.connect(token, accounts[0]);
  });

  // Deposit collateral
  it('Should deposit collateral with gateway', async () => {
    await wVault.createVault();

    // initial collateral
    const initCollat = await wVault.vaultCollateral(2);

    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await expect(gateway.depositAVAX(wVault.address, 2, overrides))
      .to.emit(wVault, 'DepositCollateral')
      .withArgs(2, ethers.utils.parseEther('10.0'));

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.add(ethers.utils.parseEther('10.0'))
    );

    // Check balances according to blockchain
    await expect(() =>
      gateway.depositAVAX(wVault.address, 2, overrides)
    ).to.changeEtherBalance(accounts[0], ethers.utils.parseEther('-10.0'));

    const initBalance = await wavax.balanceOf(wVault.address);
    await gateway.depositAVAX(wVault.address, 2, overrides);
    expect(await wavax.balanceOf(wVault.address)).to.equal(
      initBalance.add(overrides.value)
    );

    /** waffles not working right now
    await expect(() =>
      gateway.depositAVAX(wVault.address, 2, overrides)
    ).to.changeTokenBalance(
      ERC20Upgradeable__factory.connect(token, accounts[0]),
      wVault,
      ethers.utils.parseEther('10.0')
    );*/
  });

  it('Should only allow vault owner to deposit as long as vault exists with gateway', async () => {
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await expect(
      gateway.depositAVAX(wVault.address, 2, overrides)
    ).to.be.revertedWith('Vault does not exist');

    await wVault.createVault();

    await expect(
      gateway.connect(accounts[1]).depositAVAX(wVault.address, 2, overrides)
    ).to.be.revertedWith('Vault is not owned by you');
  });

  it('Should allow withdrawal all with gateway', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };
    await wVault.createVault();
    // Check AVAX
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // initial collateral
    const initCollat = await wVault.vaultCollateral(2);

    // Lets try withdrawing
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, overrides.value)
    ).to.changeEtherBalance(accounts[0], overrides.value);

    expect(await wVault.vaultCollateral(2)).to.equal(
      initCollat.sub(overrides.value)
    );

    // Check ERC20
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // initial collateral
    const secondCollat = await wVault.vaultCollateral(2);

    const initBalance = await wavax.balanceOf(wVault.address);
    await gateway.withdrawAVAX(wVault.address, 2, overrides.value);
    expect(await wavax.balanceOf(wVault.address)).to.equal(
      initBalance.sub(overrides.value)
    );
    /*
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, overrides.value)
    ).to.changeTokenBalance(
      ERC20Upgradeable__factory.connect(token, accounts[0]),
      wVault,
      overrides.value.mul(-1)
    );
    */

    expect(await wVault.vaultCollateral(2)).to.equal(
      secondCollat.sub(overrides.value)
    );
  });

  it('Should allow withdrawal partial amounts', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };
    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // Lets try withdrawing
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, ethers.utils.parseEther('5.0'))
    ).to.changeEtherBalance(accounts[0], ethers.utils.parseEther('5.0'));

    const initBalance = await wavax.balanceOf(wVault.address);
    await gateway.withdrawAVAX(
      wVault.address,
      2,
      ethers.utils.parseEther('5.0')
    );
    expect(await wavax.balanceOf(wVault.address)).to.equal(
      initBalance.sub(ethers.utils.parseEther('5.0'))
    );
    /*
    // Lets try withdrawing
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, ethers.utils.parseEther('5.0'))
    ).to.changeTokenBalance(
      ERC20Upgradeable__factory.connect(token, accounts[0]),
      wVault,
      ethers.utils.parseEther('5.0').mul(-1)
    );*/
  });

  it('should emit withdraw collateral', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // Lets try withdrawing
    await expect(
      gateway.withdrawAVAX(wVault.address, 2, ethers.utils.parseEther('5.0'))
    )
      .to.emit(wVault, 'WithdrawCollateral')
      .withArgs(2, ethers.utils.parseEther('5.0'));
  });

  it('should destroy vault', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // Lets try destroying
    await expect(gateway.destroyVault(wVault.address, 2))
      .to.emit(wVault, 'DestroyVault')
      .withArgs(2);
  });

  it('should transfer WAVAX upon destroy vault', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);

    // Lets try destroying
    await expect(() =>
      gateway.destroyVault(wVault.address, 2)
    ).to.changeEtherBalance(accounts[0], overrides.value);

    expect(await wavax.balanceOf(wVault.address)).to.equal(0);
  });

  it('should only let user delete vault', async () => {
    // Set up
    const overrides = {
      value: ethers.utils.parseEther('10.0'),
    };

    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);

    await expect(gateway.connect(accounts[1]).destroyVault(wVault.address, 2))
      .to.be.reverted;
  });

  it('should let user get paid after liquidation', async () => {
    // Get WAVAX
    const overrides = {
      value: ethers.utils.parseEther('100.0'),
    };

    await wVault.createVault();
    await gateway.depositAVAX(wVault.address, 2, overrides);
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

    // But what if we change the price source? dun dun dun
    fakePrice = await FakePrice.deploy(
      (await wVault.getPriceSource()).sub(ethers.utils.parseUnits('1.0', 8))
    );
    await fakePrice.deployed();
    await avai.setPriceSource(0, fakePrice.address);

    const mintVal = await wVault.checkCost(2);
    // Let the user have minter role
    await avai.grantRole(await avai.MINTER_ROLE(), accounts[1].address);
    await avai.connect(accounts[1]).mint(accounts[1].address, mintVal.add(10)); // 1000 AVAI

    // Allow liquidator to transfer AVAI
    await avai
      .connect(accounts[1])
      .increaseAllowance(wVault.address, ethers.utils.parseEther('100000.0'));

    const tokenExtract = await wVault.checkExtract(2);
    await expect(wVault.connect(accounts[1]).liquidateVault(2)).to.emit(
      wVault,
      'LiquidateVault'
    );

    // Try getting paid
    // Should revert, this account has nothing
    await expect(gateway.getPaid(wVault.address)).to.be.revertedWith(
      'No liquidations associated with account.'
    );
    // Lets try getting paid
    await expect(() =>
      gateway.connect(accounts[1]).getPaid(wVault.address)
    ).to.changeEtherBalance(accounts[1], tokenExtract);
  });
});
