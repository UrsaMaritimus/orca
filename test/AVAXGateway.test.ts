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
  Bankv2,
  Bankv2__factory,
  AVAIv2,
  AVAIv2__factory,
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

  context('Upgrading bank and avai', async () => {
    let avaiV2: AVAIv2;
    let wVaultV2: Bankv2;
    beforeEach(async () => {
      const avaiV2Fac = (await ethers.getContractFactory(
        'AVAIv2',
        accounts[0]
      )) as AVAIv2__factory;

      avaiV2 = (await upgrades.upgradeProxy(avai.address, avaiV2Fac)) as AVAIv2;

      const bankv2Fac = (await ethers.getContractFactory(
        'Bankv2'
      )) as Bankv2__factory;
      const newBank = await bankv2Fac.deploy();
      await newBank.deployed();

      avaiV2.upgradeToNewBank(newBank.address);

      wVaultV2 = Bankv2__factory.connect(await avai.banks(0), accounts[0]);
    });

    it('Should deposit collateral with gateway', async () => {
      await wVaultV2.createVault();

      // initial collateral
      const initCollat = await wVaultV2.vaultCollateral(2);

      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await expect(gateway.depositAVAX(wVaultV2.address, 2, overrides))
        .to.emit(wVaultV2, 'DepositCollateral')
        .withArgs(2, ethers.utils.parseEther('10.0'));

      expect(await wVaultV2.vaultCollateral(2)).to.equal(
        initCollat.add(ethers.utils.parseEther('10.0'))
      );

      // Check balances according to blockchain
      await expect(() =>
        gateway.depositAVAX(wVaultV2.address, 2, overrides)
      ).to.changeEtherBalance(accounts[0], ethers.utils.parseEther('-10.0'));

      const initBalance = await wavax.balanceOf(wVaultV2.address);
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);
      expect(await wavax.balanceOf(wVaultV2.address)).to.equal(
        initBalance.add(overrides.value)
      );
    });

    it('Should only allow vault owner to deposit as long as vault exists with gateway', async () => {
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await expect(
        gateway.depositAVAX(wVaultV2.address, 2, overrides)
      ).to.be.revertedWith('Vault does not exist');

      await wVaultV2.createVault();

      await expect(
        gateway.connect(accounts[1]).depositAVAX(wVaultV2.address, 2, overrides)
      ).to.be.revertedWith('Vault is not owned by you');
    });

    it('Should allow withdrawal all with gateway', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };
      await wVaultV2.createVault();
      // Check AVAX
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // initial collateral
      const initCollat = await wVaultV2.vaultCollateral(2);

      // Lets try withdrawing
      await expect(() =>
        gateway.withdrawAVAX(wVaultV2.address, 2, overrides.value)
      ).to.changeEtherBalance(accounts[0], overrides.value);

      expect(await wVaultV2.vaultCollateral(2)).to.equal(
        initCollat.sub(overrides.value)
      );

      // Check ERC20
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // initial collateral
      const secondCollat = await wVaultV2.vaultCollateral(2);

      const initBalance = await wavax.balanceOf(wVaultV2.address);
      await gateway.withdrawAVAX(wVaultV2.address, 2, overrides.value);
      expect(await wavax.balanceOf(wVaultV2.address)).to.equal(
        initBalance.sub(overrides.value)
      );

      expect(await wVaultV2.vaultCollateral(2)).to.equal(
        secondCollat.sub(overrides.value)
      );
    });

    it('Should allow withdrawal partial amounts', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };
      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // Lets try withdrawing
      await expect(() =>
        gateway.withdrawAVAX(
          wVaultV2.address,
          2,
          ethers.utils.parseEther('5.0')
        )
      ).to.changeEtherBalance(accounts[0], ethers.utils.parseEther('5.0'));

      const initBalance = await wavax.balanceOf(wVaultV2.address);
      await gateway.withdrawAVAX(
        wVaultV2.address,
        2,
        ethers.utils.parseEther('5.0')
      );
      expect(await wavax.balanceOf(wVaultV2.address)).to.equal(
        initBalance.sub(ethers.utils.parseEther('5.0'))
      );
    });

    it('should emit withdraw collateral', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // Lets try withdrawing
      await expect(
        gateway.withdrawAVAX(
          wVaultV2.address,
          2,
          ethers.utils.parseEther('5.0')
        )
      )
        .to.emit(wVaultV2, 'WithdrawCollateral')
        .withArgs(2, ethers.utils.parseEther('5.0'));
    });

    it('should destroy vault', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // Lets try destroying
      await expect(gateway.destroyVault(wVaultV2.address, 2))
        .to.emit(wVaultV2, 'DestroyVault')
        .withArgs(2);
    });

    it('should transfer WAVAX upon destroy vault', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // Lets try destroying
      await expect(() =>
        gateway.destroyVault(wVaultV2.address, 2)
      ).to.changeEtherBalance(accounts[0], overrides.value);

      expect(await wavax.balanceOf(wVaultV2.address)).to.equal(0);
    });

    it('should only let user delete vault', async () => {
      // Set up
      const overrides = {
        value: ethers.utils.parseEther('10.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      await expect(
        gateway.connect(accounts[1]).destroyVault(wVaultV2.address, 2)
      ).to.be.reverted;
    });

    it('should let user get paid after liquidation', async () => {
      // Get WAVAX
      const overrides = {
        value: ethers.utils.parseEther('100.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);
      await avaiV2.setDebtCeiling(0, ethers.utils.parseEther('1000000.0'));

      const collat = await wVaultV2.vaultCollateral(2);
      const price = await wVaultV2.getPriceSource();
      const collateralAsDebt = collat
        .mul(price)
        .mul(100)
        .div(150)
        .div('100000000');

      // Borrow max avaiV2
      await wVaultV2.borrowToken(2, collateralAsDebt);

      // But what if we change the price source? dun dun dun
      fakePrice = await FakePrice.deploy(
        (await wVaultV2.getPriceSource()).sub(ethers.utils.parseUnits('1.0', 8))
      );
      await fakePrice.deployed();
      await avaiV2.setPriceSource(0, fakePrice.address);

      const mintVal = await wVaultV2.checkCost(2);
      // Let the user have minter role
      await avaiV2.grantRole(await avaiV2.MINTER_ROLE(), accounts[1].address);
      await avaiV2
        .connect(accounts[1])
        .mint(accounts[1].address, mintVal.add(10)); // 1000 avaiV2

      const tokenExtract = await wVaultV2.checkExtract(2);
      await expect(wVaultV2.connect(accounts[1]).liquidateVault(2)).to.emit(
        wVaultV2,
        'LiquidateVault'
      );

      // Try getting paid
      // Should revert, this account has nothing
      await expect(gateway.getPaid(wVaultV2.address)).to.be.revertedWith(
        'No liquidations associated with account.'
      );
      // Lets try getting paid
      await expect(() =>
        gateway.connect(accounts[1]).getPaid(wVaultV2.address)
      ).to.changeEtherBalance(accounts[1], tokenExtract);
    });

    it('should not allow new debt after being paused', async () => {
      // Set up
      // Get WAVAX
      const overrides = {
        value: ethers.utils.parseEther('100.0'),
      };

      await wVaultV2.createVault();
      await gateway.depositAVAX(wVaultV2.address, 2, overrides);

      // Should borrow and emit BorrowToken!
      await expect(wVaultV2.borrowToken(2, ethers.utils.parseEther('5.0')))
        .to.emit(wVaultV2, 'BorrowToken')
        .withArgs(2, ethers.utils.parseEther('5.0'));

      //Pause now

      await avaiV2.setMintingPaused(0, true);

      // Should borrow and emit BorrowToken!
      await expect(
        wVaultV2.borrowToken(2, ethers.utils.parseEther('5.0'))
      ).to.be.revertedWith(
        'Minting for this bank is paused. Deposits, payments, and withdrawals are all still functional'
      );

      // Can still pay back
      // Calc closing fee
      const initAmount = ethers.utils.parseEther('5.0');
      const closingFee = await wVaultV2.closingFee();
      const tokenPeg = await wVaultV2.getPricePeg();
      const priceSource = await wVaultV2.getPriceSource();

      const _closingFee = initAmount
        .mul(closingFee)
        .mul(tokenPeg)
        .div(priceSource.mul(10000));

      await expect(wVaultV2.payBackToken(2, initAmount))
        .to.emit(wVaultV2, 'PayBackToken')
        .withArgs(2, initAmount, _closingFee);

      // Can still withdraw
      const withdrawAmount = ethers.utils
        .parseEther('5.0')
        .mul(9950)
        .div(10000);
      // Because waffles doesn't work
      await expect(gateway.withdrawAVAX(wVaultV2.address, 2, withdrawAmount))
        .to.emit(wVaultV2, 'WithdrawCollateral')
        .withArgs(2, withdrawAmount);
    });
  });
});
