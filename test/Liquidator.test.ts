import { expect } from 'chai';

import { ethers, waffle } from 'hardhat';

import {
  AVAI__factory,
  AVAI,
  AVAXVault,
  AVAXVault__factory,
  AVAXLiquidator,
  AVAXLiquidator__factory,
  PriceSource__factory,
  PriceSource,
} from '../libs/shared/contracts/src';

describe('Liquidator interactions', function () {
  let accounts;
  let Vault: AVAXVault__factory;
  let Stablecoin: AVAI__factory;
  let vault: AVAXVault;
  let avai: AVAI;
  let Liq: AVAXLiquidator__factory;
  let liq: AVAXLiquidator;
  let FakePrice: PriceSource__factory;
  let fakePrice: PriceSource;

  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  //WAVAX
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

    Liq = (await ethers.getContractFactory(
      'AVAXLiquidator',
      accounts[0]
    )) as AVAXLiquidator__factory;

    FakePrice = (await ethers.getContractFactory(
      'PriceSource',
      accounts[0]
    )) as PriceSource__factory;
  });

  beforeEach(async function () {
    avai = await Stablecoin.deploy('AVAI');
    await avai.deployed();

    expect(avai.address).to.be.properAddress;

    vault = await Vault.deploy(priceSource_, symbol, name, token, avai.address);
    await vault.deployed();

    expect(vault.address).to.be.properAddress;
    expect(await vault.totalSupply()).to.equal(0);

    // Create treasury vault
    await vault.createVault();
    vault.setTreasury(1);

    // Add vault to stablecoin
    avai.addVault(vault.address);

    // Make liquidator
    liq = await Liq.deploy(avai.address, vault.address);
    await liq.deployed();
    expect(liq.address).to.be.properAddress;

    // Set base vault to liquidator
    await vault.setStabilityPool(liq.address);
    expect(await vault.stabilityPool()).to.equal(liq.address);
  });

  it('should set correct variables and allow changes to gain/debt ratio', async () => {
    expect(await liq.stablecoin()).to.equal(avai.address);
    expect(await liq.vault()).to.equal(vault.address);
    expect(await liq.debtRatio()).to.equal(2);
    expect(await liq.gainRatio()).to.equal(11);
    expect(await liq.treasury()).to.equal(accounts[0].address);
    expect(await liq.owner()).to.equal(accounts[0].address);

    //gain debt
    // Only owner!
    await expect(liq.connect(accounts[1]).setGainRatio(15)).to.be.reverted;
    await liq.setGainRatio(12);
    expect(await liq.gainRatio()).to.equal(12);

    await expect(liq.connect(accounts[1]).setDebtRatio(4)).to.be.reverted;
    await liq.setDebtRatio(3);
    expect(await liq.debtRatio()).to.equal(3);
  });

  it('should transfer ownership correctly', async () => {
    expect(await liq.treasury()).to.equal(accounts[0].address);
    expect(await liq.owner()).to.equal(accounts[0].address);

    // Change ownership

    // Accounts[1] should not be able to
    await expect(liq.connect(accounts[1]).setTreasury(accounts[1].address)).to
      .be.reverted;
    // Lets transfer now!
    liq.setTreasury(accounts[1].address);

    expect(await liq.treasury()).to.equal(accounts[1].address);
    expect(await liq.owner()).to.equal(accounts[1].address);

    // Accounts[0] should now not be able to
    await expect(liq.connect(accounts[0]).setTreasury(accounts[0].address)).to
      .be.reverted;
  });

  // Check liquidation! Long test, this one
  it('Should allow liquidation', async () => {
    // Set up with accounts[0]
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

    // With accounts[1]

    // Should revert, vault doesn't exist
    await expect(liq.connect(accounts[1]).liquidateVault(3)).to.be.revertedWith(
      'Vault must exist'
    );

    // Obviously MCP is till good
    await expect(liq.connect(accounts[1]).liquidateVault(2)).to.be.revertedWith(
      'Vault is not below minimum collateral percentage'
    );
    await expect(
      liq.connect(accounts[1]).checkLiquidation(2)
    ).to.be.revertedWith('Vault is not below minimum collateral percentage');

    // But what if we change the price source? dun dun dun
    fakePrice = await FakePrice.deploy(
      (await vault.getPriceSource()).sub(ethers.utils.parseUnits('1.0', 8))
    );
    await fakePrice.deployed();
    await vault.setPriceSource(fakePrice.address);

    // Won't revert anymore!
    await liq.connect(accounts[1]).checkLiquidation(2);

    // Accounts[1] needs some AVAI, lets mint it for test
    await expect(liq.connect(accounts[1]).liquidateVault(2)).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance'
    );
    await avai.grantRole(await avai.MINTER_ROLE(), accounts[1].address);
    await avai
      .connect(accounts[1])
      .mint(accounts[1].address, ethers.utils.parseEther('1000.0')); // 1000 AVAI

    // Should revert because not approved
    await expect(liq.connect(accounts[1]).liquidateVault(2)).to.be.revertedWith(
      'ERC20: transfer amount exceeds allowance'
    );

    // Allow liquidator to transfer AVAI
    await avai
      .connect(accounts[1])
      .approve(liq.address, ethers.utils.parseEther('1000.0'));

    // Some calcs for compare
    const collateralValue = (await vault.vaultCollateral(2))
      .mul(await vault.getPriceSource())
      .mul(100);
    const maxDebtValue = collateralValue.div(minimumCollateralPercentage);
    const maxDebt = maxDebtValue.div(await vault.getPricePeg());

    // How much is burnt on liquidation
    const debtDifference = (await vault.vaultDebt(2)).sub(maxDebt);

    // From liquidation of debt
    const closingFeeOne = debtDifference
      .mul(await vault.closingFee())
      .mul(await vault.getPricePeg())
      .div((await vault.getPriceSource()).mul(10000));

    // paying off rest
    const closingFeeTwo = (await liq.checkCost(2))
      .sub(debtDifference)
      .mul(await vault.closingFee())
      .mul(await vault.getPricePeg())
      .div((await vault.getPriceSource()).mul(10000));

    // Calculate what new total debt should be
    const initTotalDebt = await vault.totalDebt();
    const newTotalDebt = initTotalDebt
      .sub(debtDifference)
      .sub((await liq.checkCost(2)).sub(debtDifference));

    // Calculate what the new vault debt should be
    const newVaultDebt = maxDebt.sub(
      (await liq.checkCost(2)).sub(debtDifference)
    );

    // Calculate what new vault collateral should be
    const tokenExtract = await liq.checkExtract(2);
    const newVaultCollateral = (await vault.vaultCollateral(2))
      .sub(closingFeeOne)
      .sub(closingFeeTwo)
      .sub(tokenExtract);

    // Initial tokenDebt held by liquidator
    const initialTokenDebt = await liq.tokenDebt(accounts[1].address);

    // Initial AVAX held by liquidator
    const initialAVAX = await accounts[0].provider.getBalance(liq.address);
    /**
     * LETS LIQUIDATE
     */
    // Should go through
    await expect(liq.connect(accounts[1]).liquidateVault(2))
      .to.emit(vault, 'LiquidateVault')
      .withArgs(2, accounts[0].address, liq.address, debtDifference);

    // Should still be same owner
    expect(await vault.ownerOf(2)).to.equal(accounts[0].address);

    // closing fee should be added to collateral
    expect(closingFeeOne.add(closingFeeTwo)).to.equal(
      await vault.vaultCollateral(1)
    );

    // Total debt should decrease
    expect(await vault.totalDebt()).to.equal(newTotalDebt);

    // Should decrease vaults debt
    expect(await vault.vaultDebt(2)).to.equal(newVaultDebt);

    // Should decrease collateral
    expect(await vault.vaultCollateral(2)).to.equal(newVaultCollateral);

    // Liquidator should be holding the token for acceptance by the user
    expect(await liq.tokenDebt(accounts[1].address)).to.equal(
      initialTokenDebt.add(tokenExtract)
    );

    // FINAL TESTS
    expect(await accounts[0].provider.getBalance(liq.address)).to.equal(
      initialAVAX.add(tokenExtract)
    );

    // Should revert, this account has nothing
    await expect(liq.getPaid()).to.be.revertedWith(
      "Don't have anything for you."
    );

    await expect(() =>
      liq.connect(accounts[1]).getPaid()
    ).to.changeEtherBalances(
      [liq, accounts[1]],
      [tokenExtract.mul(-1), tokenExtract]
    );
  });
});
