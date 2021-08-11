import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';

import {
  AVAI__factory,
  AVAI,
  BaseVault,
  BaseVault__factory,
  WAVAXGateway,
  WAVAXGateway__factory,
  ERC20__factory,
} from '../libs/shared/contracts/src';

describe('Avax Vault Test with Gateway', function () {
  let accounts;
  let Vault: BaseVault__factory;
  let Stablecoin: AVAI__factory;
  let Gateway: WAVAXGateway__factory;
  let vault: BaseVault;
  let avai: AVAI;
  let wVault: BaseVault;
  let gateway: WAVAXGateway;

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

    await expect(() =>
      gateway.depositAVAX(wVault.address, 2, overrides)
    ).to.changeTokenBalance(
      ERC20__factory.connect(token, accounts[0]),
      wVault,
      ethers.utils.parseEther('10.0')
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

    // Lets try withdrawing
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, overrides.value)
    ).to.changeTokenBalance(
      ERC20__factory.connect(token, accounts[0]),
      wVault,
      overrides.value.mul(-1)
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

    // Lets try withdrawing
    await expect(() =>
      gateway.withdrawAVAX(wVault.address, 2, ethers.utils.parseEther('5.0'))
    ).to.changeTokenBalance(
      ERC20__factory.connect(token, accounts[0]),
      wVault,
      ethers.utils.parseEther('5.0').mul(-1)
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
});