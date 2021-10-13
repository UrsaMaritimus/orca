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
  PriceSource__factory,
  PriceSource,
  WAVAX__factory,
  WAVAX,
} from '../libs/shared/contracts/src';

describe('Liquidator Test', function () {
  let accounts: SignerWithAddress[];
  let Vault: Bank__factory;
  let Stablecoin: AVAI__factory;
  let Gateway: WAVAXGateway__factory;
  let vault: Bank;
  let avai: AVAI;
  let wVault: Bank;
  let gateway: WAVAXGateway;
  let wavax: WAVAX;
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

    await wVault.createVault();
    await wVault.depositCollateral(2, ethers.utils.parseEther('10.0'));
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
      .div(newPrice.mul(10).mul(debtRatio));

    expect(tokenExtract).to.equal(extractCalc);
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
      .div((await wVault.getPriceSource()).mul(10000));

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

    // Initial WAVAX held by liquidator
    const initialWAVAX = await wavax.balanceOf(wVault.address);
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
    const initBalanceVault = await wavax.balanceOf(wVault.address);
    const initBalanceUser = await wavax.balanceOf(accounts[1].address);
    await wVault.connect(accounts[1]).getPaid(accounts[1].address);

    expect(await wavax.balanceOf(wVault.address)).to.equal(
      initBalanceVault.sub(tokenExtract)
    );
    expect(await wavax.balanceOf(accounts[1].address)).to.equal(
      initBalanceUser.add(tokenExtract)
    );
    /*
    await expect(() =>
      wVault.connect(accounts[1]).getPaid()
    ).to.changeTokenBalances(
      wavax,
      [wVault, accounts[1]],
      [tokenExtract.mul(-1), tokenExtract]
    );*/
  });
});
