import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  Bank,
  Bank__factory,
  PriceSource__factory,
  PriceSource,
  FakeBTC,
  FakeBTC__factory,
} from '../libs/shared/contracts/src';

describe('BTC Liquidator Test', function () {
  let accounts: SignerWithAddress[];
  let Vault: Bank__factory;
  let Stablecoin: AVAI__factory;
  let vault: Bank;
  let avai: AVAI;
  let wVault: Bank;
  let FakePrice: PriceSource__factory;
  let fakePrice: PriceSource;
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

    let btcFac = (await ethers.getContractFactory(
      'FakeBTC',
      accounts[0]
    )) as FakeBTC__factory;

    btc = await btcFac.deploy();

    expect(avai.address).to.be.properAddress;
    expect(vault.address).to.be.properAddress;
    // Deploy wAVAX vault
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
  });

  it('should set correct variables and allow changes to gain/debt ratio', async () => {
    expect(await wVault.debtRatio()).to.equal(2);
    expect(await wVault.gainRatio()).to.equal(11);

    //gain debt
    // Only owner!
    await expect(wVault.setGainRatio(15)).to.be.reverted;
    await avai.setGainRatio(0, 12);
    expect(await wVault.gainRatio()).to.equal(12);

    await expect(wVault.setDebtRatio(4)).to.be.reverted;
    await avai.setDebtRatio(0, 3);
    expect(await wVault.debtRatio()).to.equal(3);
  });

  it('should revert due to vault not existing and not being below MCP', async () => {
    // Should revert, vault doesn't exist
    await expect(
      wVault.connect(accounts[1]).liquidateVault(3)
    ).to.be.revertedWith('Vault does not exist');

    // Obviously MCP is till good
    await expect(
      wVault.connect(accounts[1]).liquidateVault(2)
    ).to.be.revertedWith('Vault is not below minimum collateral percentage');
    // Seperate check
    expect(await wVault.connect(accounts[1]).checkLiquidation(2)).to.equal(
      false
    );
  });

  it('should not revert following lowering of price', async () => {
    // But what if we change the price source? dun dun dun
    fakePrice = await FakePrice.deploy(
      (await wVault.getPriceSource()).sub(ethers.utils.parseUnits('1.0', 8))
    );
    await fakePrice.deployed();
    await avai.setPriceSource(0, fakePrice.address);

    // Won't revert anymore!
    await wVault.connect(accounts[1]).checkLiquidation(2);
  });

  it('should revert if not enough AVAI balance', async () => {
    // But what if we change the price source? dun dun dun
    fakePrice = await FakePrice.deploy(
      (await wVault.getPriceSource()).sub(ethers.utils.parseUnits('1000.0', 8))
    );
    await fakePrice.deployed();
    await avai.setPriceSource(0, fakePrice.address);

    // Won't revert anymore!
    await wVault.connect(accounts[1]).checkLiquidation(2);
    // Accounts[1] needs some AVAI, lets mint it for test
    await expect(
      wVault.connect(accounts[1]).liquidateVault(2)
    ).to.be.revertedWith('Token balance too low to pay off outstanding debt');
  });

  it('should calculate correct token extract', async () => {
    // Calculate what new vault collateral should be
    const tokenExtract = await wVault.checkExtract(2);
    const newPrice = await wVault.getPriceSource();
    const debtValue = (await wVault.vaultDebt(2)).mul(
      await wVault.getPricePeg()
    );
    const gainRatio = await wVault.gainRatio();
    const debtRatio = await wVault.debtRatio();

    // Make sure extract is correct
    const extractCalc = debtValue
      .mul(gainRatio)
      .div(newPrice.mul(10).mul(debtRatio))
      .div(1e10);

    expect(tokenExtract).to.equal(extractCalc);
    console.log(tokenExtract);
  });

  // Check liquidation! Long test, this one
  it('Should allow liquidation', async () => {
    // But what if we change the price source? dun dun dun
    fakePrice = await FakePrice.deploy(
      (await wVault.getPriceSource()).sub(ethers.utils.parseUnits('1.0', 8))
    );
    await fakePrice.deployed();
    await avai.setPriceSource(0, fakePrice.address);

    // Won't revert anymore!
    await wVault.connect(accounts[1]).checkLiquidation(2);

    // Accounts[1] needs some AVAI, lets mint it for test
    await expect(
      wVault.connect(accounts[1]).liquidateVault(2)
    ).to.be.revertedWith('Token balance too low to pay off outstanding debt');
    const mintVal = await wVault.checkCost(2);
    // Let the user have minter role
    await avai.grantRole(await avai.MINTER_ROLE(), accounts[1].address);
    await avai.connect(accounts[1]).mint(accounts[1].address, mintVal.add(10)); // 1000 AVAI

    // Some calcs for compare
    const halfDebt = (await wVault.vaultDebt(2)).div(await wVault.debtRatio());

    // From liquidation of debt
    const closingFee = halfDebt
      .mul(await wVault.closingFee())
      .mul(await wVault.getPricePeg())
      .div((await wVault.getPriceSource()).mul(10000))
      .div(10 ** (18 - (await btc.decimals())));

    // Calculate what new total debt should be
    const initTotalDebt = await wVault.totalDebt();
    const newTotalDebt = initTotalDebt.sub(halfDebt);

    // Calculate what the new vault debt should be
    const newVaultDebt = (await wVault.vaultDebt(2)).sub(halfDebt);

    // Calculate what new vault collateral should be
    const tokenExtract = await wVault.checkExtract(2);
    const newVaultCollateral = (await wVault.vaultCollateral(2)).sub(
      closingFee.add(tokenExtract)
    );

    // Initial tokenDebt held by liquidator
    const initialTokenDebt = await wVault.tokenDebt(accounts[1].address);

    /**
     * LETS LIQUIDATE
     */
    // Should go through
    await expect(wVault.connect(accounts[1]).liquidateVault(2))
      .to.emit(wVault, 'LiquidateVault')
      .withArgs(
        2,
        accounts[0].address,
        accounts[1].address,
        halfDebt,
        tokenExtract,
        closingFee
      );

    // Should still be same owner
    expect(await wVault.ownerOf(2)).to.equal(accounts[0].address);

    // closing fee should be added to collateral (in treasury)
    expect(closingFee).to.equal(await wVault.vaultCollateral(1));

    // Total debt should decrease
    expect(await wVault.totalDebt()).to.equal(newTotalDebt);

    // Should decrease vaults debt
    expect(await wVault.vaultDebt(2)).to.equal(newVaultDebt);

    // Should decrease collateral
    expect(await wVault.vaultCollateral(2)).to.equal(newVaultCollateral);

    // Liquidator should be holding the token for acceptance by the user
    expect(await wVault.tokenDebt(accounts[1].address)).to.equal(
      initialTokenDebt.add(tokenExtract)
    );

    // Should revert, this account has nothing
    await expect(wVault.getPaid(accounts[0].address)).to.be.revertedWith(
      'No liquidations associated with account.'
    );

    // Should revert, not owned by account
    await expect(wVault.getPaid(accounts[1].address)).to.be.revertedWith(
      'Cannot get paid if not yours'
    );

    // Because waffles doesn't work
    const initBalanceVault = await btc.balanceOf(wVault.address);
    const initBalanceUser = await btc.balanceOf(accounts[1].address);
    await wVault.connect(accounts[1]).getPaid(accounts[1].address);

    expect(await btc.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(tokenExtract)
    );
    expect(await btc.balanceOf(accounts[1].address)).to.equal(
      initBalanceUser.add(tokenExtract)
    );
  });
});
