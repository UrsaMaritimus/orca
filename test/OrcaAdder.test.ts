import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ORCA,
  ORCA__factory,
  OrcaAdder__factory,
  OrcaAdder,
  OrcaPod,
  OrcaPod__factory,
  Bank__factory,
  Bank,
  WAVAX__factory,
  WAVAX,
  ERC20,
  ERC20__factory,
  IYakStrategy__factory,
  IYakStrategy,
} from '../libs/shared/contracts/src';

const orcaAddress = '0x8b1d98a91f853218ddbb066f20b8c63e782e2430';
const wavaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const usdcAddress = '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664';
const seafund = '0xcb660A14A6612E0627A4516c3DCdB3838b1190e9';
const treasury = '0x10131d4f3193a59A46d3ab57D765f2604e77B4E3';
const dev = '0x274280b26debd319c52f611b59926f8f00373907';
const orcaLPAddress = '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5';
const usdcLPAddress = '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1';
const treasuryAmount = 4000;
const podAmount = 4000;
const devAmount = 500;
const seafundAmount = 1500;

const avaxBankAddress = '0xC029713E92383426C9b387b124C0BF6271d08b80';

const avaxAaveYak = '0x957Ca4a4aA7CDc866cf430bb140753F04e273bC0';

const avai = '0x346a59146b9b4a77100d369a3d18e8007a9f46a6';
const avaiAVAXLP = '0x6CbfB991986EbbBc91Bf21CeaA3cBf1BD82469cf';

const toBytes32 = (bn) => {
  return ethers.utils.hexlify(ethers.utils.zeroPad(bn.toHexString(), 32));
};

const setStorageAt = async (address, index, value) => {
  await ethers.provider.send('hardhat_setStorageAt', [address, index, value]);
  await ethers.provider.send('evm_mine', []); // Just mines to the next block
};

describe('Orca adder tests', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let usdc: ERC20;
  let OrcaAdder: OrcaAdder;
  let OrcaAdderFac: OrcaAdder__factory;
  let OrcaPod: OrcaPod;
  let OrcaPodFac: OrcaPod__factory;

  before(async () => {
    accounts = await ethers.getSigners();
    orca = ORCA__factory.connect(orcaAddress, accounts[0]);
    usdc = ERC20__factory.connect(usdcAddress, accounts[0]);
    OrcaAdderFac = (await ethers.getContractFactory(
      'OrcaAdder',
      accounts[0]
    )) as OrcaAdder__factory;

    OrcaPodFac = (await ethers.getContractFactory(
      'OrcaPod',
      accounts[0]
    )) as OrcaPod__factory;
  });

  beforeEach(async function () {
    OrcaPod = await OrcaPodFac.deploy(orcaAddress);
    await OrcaPod.deployed();
    expect(OrcaPod.address).to.be.properAddress;

    // Deposit some into OrcaPod
    await orca.approve(OrcaPod.address, ethers.utils.parseEther('100000'));
    const orcaBalance = await orca.balanceOf(accounts[0].address);
    await OrcaPod.enter(orcaBalance);
    expect(await orca.balanceOf(OrcaPod.address)).to.equal(orcaBalance);
    expect(await OrcaPod.balanceOf(accounts[0].address)).to.equal(orcaBalance);
    // Make OrcaAdder
    OrcaAdder = (await upgrades.deployProxy(OrcaAdderFac, [
      OrcaPod.address,
      orcaAddress,
      wavaxAddress,
      usdcAddress,
      seafund,
      treasury,
      dev,
      orcaLPAddress,
      usdcLPAddress,
    ])) as OrcaAdder;
    await OrcaAdder.deployed();
    expect(OrcaAdder.address).to.be.properAddress;
  });
  context('Vault', async () => {
    let wVault: Bank;
    let wavax: WAVAX;
    let vaultNum: number;
    beforeEach(async () => {
      wVault = Bank__factory.connect(avaxBankAddress, accounts[0]);
      // Get WAVAX
      const overrides = {
        value: ethers.utils.parseEther('1.0'),
      };

      wavax = WAVAX__factory.connect(wavaxAddress, accounts[0]);
      await expect(() => wavax.deposit(overrides)).to.changeEtherBalance(
        accounts[0],
        ethers.utils.parseEther('1.0').mul(-1)
      );

      wavax.approve(wVault.address, ethers.constants.MaxUint256);

      const initialVaultCount = await wVault.totalSupply();

      await wVault.createVault();
      expect(await wVault.totalSupply()).to.equal(initialVaultCount.add(1));
      const balance = await wVault.balanceOf(accounts[0].address);
      vaultNum = (
        await wVault.tokenOfOwnerByIndex(
          accounts[0].address,
          balance.toNumber() - 1
        )
      ).toNumber();
      await wVault.depositCollateral(vaultNum, ethers.utils.parseEther('1.0'));
    });
    it('allows transfering of vaults', async () => {
      // Add bank
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Transfer vault over
      await wVault.transferVault(vaultNum, OrcaAdder.address);
      expect(await wVault.balanceOf(OrcaAdder.address)).to.equal(1);
      expect(await wVault.ownerOf(vaultNum)).to.equal(OrcaAdder.address);
      // Transfer back vault
      await OrcaAdder.transferBankVault(0, vaultNum, accounts[0].address);

      expect(await wVault.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await wVault.ownerOf(vaultNum)).to.equal(accounts[0].address);
    });

    it('allows trading of wavax to orca and usdc', async () => {
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Add bank
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Transfer vault over
      await wVault.transferVault(vaultNum, OrcaAdder.address);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);
    });
  });

  context('YRT tokens', async () => {
    let yakAvax: IYakStrategy;
    beforeEach(async () => {
      const overrides = {
        value: ethers.utils.parseEther('1.0'),
      };
      yakAvax = IYakStrategy__factory.connect(avaxAaveYak, accounts[0]);
      await yakAvax['deposit()'](overrides);
      const balanceYak = await yakAvax.balanceOf(accounts[0].address);
      await yakAvax.transfer(OrcaAdder.address, balanceYak);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(balanceYak);
    });

    it('Allows transfering out of yak Avax', async () => {
      const initAdderBalance = await yakAvax.balanceOf(OrcaAdder.address);

      await OrcaAdder.transferToken(
        accounts[0].address,
        yakAvax.address,
        initAdderBalance
      );

      const afterAdderBalance = await yakAvax.balanceOf(OrcaAdder.address);
      const afterUserBalance = await yakAvax.balanceOf(accounts[0].address);

      expect(afterAdderBalance).to.equal(0);
      expect(afterUserBalance).to.equal(initAdderBalance);
    });

    it('allows adding of YRT token and proper allocation', async () => {
      await OrcaAdder.addYakStrat(avaxAaveYak);
      expect(await OrcaAdder.getYakCount()).to.equal(1);
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);
    });
  });

  context('LP pairs', async () => {
    let orcaLP: ERC20;
    beforeEach(async () => {
      orcaLP = ERC20__factory.connect(orcaLPAddress, accounts[0]);

      // Manipulate balance
      const locallyManipulatedBalance = ethers.utils.parseEther('10');
      // Get storage slot index
      const index = ethers.utils.solidityKeccak256(
        ['uint256', 'uint256'],
        [accounts[0].address, 1] // key, slot
      );
      await setStorageAt(
        orcaLP.address,
        index.toString(),
        toBytes32(locallyManipulatedBalance).toString()
      );

      const balance = await orcaLP.balanceOf(accounts[0].address);
      await orcaLP.transfer(OrcaAdder.address, balance);
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(balance);
    });

    it('Allows transfering out LP', async () => {
      const initAdderBalance = await orcaLP.balanceOf(OrcaAdder.address);

      await OrcaAdder.transferToken(
        accounts[0].address,
        orcaLP.address,
        initAdderBalance
      );

      const afterAdderBalance = await orcaLP.balanceOf(OrcaAdder.address);
      const afterUserBalance = await orcaLP.balanceOf(accounts[0].address);

      expect(afterAdderBalance).to.equal(0);
      expect(afterUserBalance).to.equal(initAdderBalance);
    });

    it('allows adding of LP token and proper allocation', async () => {
      await OrcaAdder.addLPToken(orcaLPAddress);
      expect(await OrcaAdder.getLPTokens()).to.equal(1);

      await OrcaAdder.addSwapLP(orcaAddress, orcaLPAddress);
      expect(await OrcaAdder.getTokens()).to.equal(1);

      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);
      console.log(await orcaLP.balanceOf(OrcaAdder.address));
      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);
      console.log(ethers.utils.formatEther(afterOrcaPod.sub(initOrcaPod)));
      console.log(ethers.utils.formatUnits(afterDev.sub(initDev), 6));
      console.log(ethers.utils.formatUnits(afterSeafund.sub(initSeafund), 6));
      console.log(ethers.utils.formatUnits(afterTreasry.sub(initTreasry), 6));
    });
  });

  context('together', async () => {
    let orcaLP: ERC20;
    let yakAvax: IYakStrategy;
    let wVault: Bank;
    let wavax: WAVAX;
    let vaultNum: number;

    beforeEach(async () => {
      wVault = Bank__factory.connect(avaxBankAddress, accounts[0]);
      // Get WAVAX
      const overrides = {
        value: ethers.utils.parseEther('1.0'),
      };

      wavax = WAVAX__factory.connect(wavaxAddress, accounts[0]);
      await expect(() => wavax.deposit(overrides)).to.changeEtherBalance(
        accounts[0],
        ethers.utils.parseEther('1.0').mul(-1)
      );

      wavax.approve(wVault.address, ethers.constants.MaxUint256);

      const initialVaultCount = await wVault.totalSupply();

      await wVault.createVault();
      expect(await wVault.totalSupply()).to.equal(initialVaultCount.add(1));

      const balance = await wVault.balanceOf(accounts[0].address);
      vaultNum = (
        await wVault.tokenOfOwnerByIndex(
          accounts[0].address,
          balance.toNumber() - 1
        )
      ).toNumber();
      await wVault.depositCollateral(vaultNum, ethers.utils.parseEther('1.0'));

      orcaLP = ERC20__factory.connect(orcaLPAddress, accounts[0]);

      // Manipulate balance
      const locallyManipulatedBalance = ethers.utils.parseEther('10');
      // Get storage slot index
      const index = ethers.utils.solidityKeccak256(
        ['uint256', 'uint256'],
        [accounts[0].address, 1] // key, slot
      );
      await setStorageAt(
        orcaLP.address,
        index.toString(),
        toBytes32(locallyManipulatedBalance).toString()
      );

      yakAvax = IYakStrategy__factory.connect(avaxAaveYak, accounts[0]);
      await yakAvax['deposit()'](overrides);
    });
    it('allocate all', async () => {
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Add bank

      // Transfer vault over
      await wVault.transferVault(vaultNum, OrcaAdder.address);
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Set up LP tokens
      const orcaLpbalance = await orcaLP.balanceOf(accounts[0].address);
      await orcaLP.transfer(OrcaAdder.address, orcaLpbalance);
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(orcaLpbalance);
      await OrcaAdder.addLPToken(orcaLPAddress);
      expect(await OrcaAdder.getLPTokens()).to.equal(1);

      await OrcaAdder.addSwapLP(orcaAddress, orcaLPAddress);
      expect(await OrcaAdder.getTokens()).to.equal(1);

      // Set up yak
      const balanceYak = await yakAvax.balanceOf(accounts[0].address);
      await yakAvax.transfer(OrcaAdder.address, balanceYak);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(balanceYak);

      await OrcaAdder.addYakStrat(avaxAaveYak);
      expect(await OrcaAdder.getYakCount()).to.equal(1);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);

      //check final balances are zero of everything
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await orca.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await usdc.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await ethers.provider.getBalance(OrcaAdder.address)).to.equal(0);
    });

    it('allocate all if bank zero', async () => {
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Add bank

      // Transfer vault over
      //await wVault.transferVault(vaultNum, OrcaAdder.address);
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Set up LP tokens
      const orcaLpbalance = await orcaLP.balanceOf(accounts[0].address);
      await orcaLP.transfer(OrcaAdder.address, orcaLpbalance);
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(orcaLpbalance);
      await OrcaAdder.addLPToken(orcaLPAddress);
      expect(await OrcaAdder.getLPTokens()).to.equal(1);

      await OrcaAdder.addSwapLP(orcaAddress, orcaLPAddress);
      expect(await OrcaAdder.getTokens()).to.equal(1);

      // Set up yak
      const balanceYak = await yakAvax.balanceOf(accounts[0].address);
      await yakAvax.transfer(OrcaAdder.address, balanceYak);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(balanceYak);

      await OrcaAdder.addYakStrat(avaxAaveYak);
      expect(await OrcaAdder.getYakCount()).to.equal(1);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);

      //check final balances are zero of everything
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await orca.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await usdc.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await ethers.provider.getBalance(OrcaAdder.address)).to.equal(0);
    });

    it('allocate all if LP zero', async () => {
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Add bank

      // Transfer vault over
      await wVault.transferVault(vaultNum, OrcaAdder.address);
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Set up LP tokens
      const orcaLpbalance = await orcaLP.balanceOf(accounts[0].address);
      //await orcaLP.transfer(OrcaAdder.address, orcaLpbalance);
      //expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(orcaLpbalance);
      await OrcaAdder.addLPToken(orcaLPAddress);
      expect(await OrcaAdder.getLPTokens()).to.equal(1);

      await OrcaAdder.addSwapLP(orcaAddress, orcaLPAddress);
      expect(await OrcaAdder.getTokens()).to.equal(1);

      // Set up yak
      const balanceYak = await yakAvax.balanceOf(accounts[0].address);
      await yakAvax.transfer(OrcaAdder.address, balanceYak);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(balanceYak);

      await OrcaAdder.addYakStrat(avaxAaveYak);
      expect(await OrcaAdder.getYakCount()).to.equal(1);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);

      //check final balances are zero of everything
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await orca.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await usdc.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await ethers.provider.getBalance(OrcaAdder.address)).to.equal(0);
    });

    it('allocate all if yak zero', async () => {
      const initOrcaPod = await orca.balanceOf(OrcaPod.address);
      const initDev = await usdc.balanceOf(dev);
      const initSeafund = await usdc.balanceOf(seafund);
      const initTreasry = await usdc.balanceOf(treasury);

      // Add bank

      // Transfer vault over
      await wVault.transferVault(vaultNum, OrcaAdder.address);
      await OrcaAdder.addBank(wVault.address);
      expect(await OrcaAdder.getBankCount()).to.equal(1);

      // Set up LP tokens
      const orcaLpbalance = await orcaLP.balanceOf(accounts[0].address);
      await orcaLP.transfer(OrcaAdder.address, orcaLpbalance);
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(orcaLpbalance);
      await OrcaAdder.addLPToken(orcaLPAddress);
      expect(await OrcaAdder.getLPTokens()).to.equal(1);

      await OrcaAdder.addSwapLP(orcaAddress, orcaLPAddress);
      expect(await OrcaAdder.getTokens()).to.equal(1);

      // Set up yak
      const balanceYak = await yakAvax.balanceOf(accounts[0].address);
      //await yakAvax.transfer(OrcaAdder.address, balanceYak);
      //expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(balanceYak);

      await OrcaAdder.addYakStrat(avaxAaveYak);
      expect(await OrcaAdder.getYakCount()).to.equal(1);

      // Allocate the profits!
      await OrcaAdder.allocate();

      // Check if allocated properly
      const afterOrcaPod = await orca.balanceOf(OrcaPod.address);
      const afterDev = await usdc.balanceOf(dev);
      const afterSeafund = await usdc.balanceOf(seafund);
      const afterTreasry = await usdc.balanceOf(treasury);

      expect(afterOrcaPod).to.be.gt(initOrcaPod);
      expect(afterDev).to.be.gt(initDev);
      expect(afterSeafund).to.be.gt(initSeafund);
      expect(afterTreasry).to.be.gt(initTreasry);

      //check final balances are zero of everything
      expect(await orcaLP.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await orca.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await usdc.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await yakAvax.balanceOf(OrcaAdder.address)).to.equal(0);
      expect(await ethers.provider.getBalance(OrcaAdder.address)).to.equal(0);
    });
  });

  context('deployed version', async () => {
    it('allocates', async () => {
      const testUSDC = ERC20__factory.connect(
        '0xC1517ac40949643188efF133E2d4d6954eb23378',
        accounts[0]
      );
      const deployedOrcaAdder = OrcaAdder__factory.connect(
        '0x660B86a4F0069AA5f094740982Dd58905B36F378',
        accounts[0]
      );
      deployedOrcaAdder.allocate();
      console.log(
        await testUSDC.balanceOf('0xC3D6CfB63fd93A4Ea277EB66922D12E8EE7CEdC6')
      );
    });
  });
});
