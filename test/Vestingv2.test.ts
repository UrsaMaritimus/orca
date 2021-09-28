import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ORCA,
  ORCA__factory,
  VestingWallet,
  VestingWallet__factory,
  TeamPayment,
  TeamPayment__factory,
} from '../libs/shared/contracts/src';

describe('Orca Vesting v2 test', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let OrcaFac: ORCA__factory;
  let wallet: VestingWallet;
  let WalletFac: VestingWallet__factory;
  let teamPayer: TeamPayment;
  let TeamPayerFac: TeamPayment__factory;
  let startTime: number;
  let endDuration: number;

  before(async () => {
    accounts = await ethers.getSigners();
    OrcaFac = (await ethers.getContractFactory(
      'ORCA',
      accounts[0]
    )) as ORCA__factory;

    TeamPayerFac = (await ethers.getContractFactory(
      'TeamPayment',
      accounts[0]
    )) as TeamPayment__factory;

    WalletFac = (await ethers.getContractFactory(
      'VestingWallet',
      accounts[0]
    )) as VestingWallet__factory;
  });

  beforeEach(async function () {
    orca = await OrcaFac.deploy();
    await orca.deployed();
    expect(orca.address).to.be.properAddress;

    const { timestamp } = await ethers.provider.getBlock('latest');
    startTime = timestamp + 1000;
    endDuration = 60 * 60 * 24 * 365 * 2;

    teamPayer = await TeamPayerFac.deploy(
      orca.address,
      [accounts[1].address, accounts[2].address],
      [50, 50]
    );
    await teamPayer.deployed();
    expect(teamPayer.address).to.be.properAddress;

    wallet = await WalletFac.deploy(
      orca.address,
      teamPayer.address,
      startTime,
      endDuration,
      true
    );

    await wallet.deployed();
    expect(wallet.address).to.be.properAddress;

    await orca.approve(wallet.address, await orca.totalSupply());
    expect(await orca.allowance(accounts[0].address, wallet.address)).to.equal(
      await orca.totalSupply()
    );
  });

  context('Vesting contract works correctly', async () => {
    beforeEach(async () => {
      await wallet.receiveToken(ethers.utils.parseEther('15000000'));
    });
    it('to properly fund', async () => {
      expect(await wallet.beneficiary()).to.equal(teamPayer.address);
      expect(await orca.balanceOf(wallet.address)).to.equal(
        ethers.utils.parseEther('15000000')
      );
    });

    it('to have zero vested amount initially', async () => {
      const { timestamp } = await ethers.provider.getBlock('latest');
      expect(await wallet.vestedAmount(timestamp)).to.equal(0);

      await expect(wallet.release())
        .to.emit(wallet, 'TokensReleased')
        .withArgs(0, teamPayer.address);
    });

    it('will release after time has passed', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const expectedAmount = ethers.utils
        .parseEther('15000000')
        .mul(DURATION)
        .div(endDuration);
      const initBalance = await orca.balanceOf(teamPayer.address);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);

      await expect(wallet.release())
        .to.emit(wallet, 'TokensReleased')
        .withArgs(expectedAmount, teamPayer.address);

      expect(await orca.balanceOf(teamPayer.address)).to.equal(
        initBalance.add(expectedAmount)
      );

      expect(await wallet.totalReleased()).to.equal(expectedAmount);
    });

    it('will  allow multiple release after time has passed', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const expectedAmount = ethers.utils
        .parseEther('15000000')
        .mul(DURATION)
        .div(endDuration);
      const initBalance = await orca.balanceOf(teamPayer.address);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);

      await wallet.release();

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + 2 * DURATION,
      ]);

      await wallet.release();

      expect(await orca.balanceOf(teamPayer.address)).to.be.closeTo(
        initBalance.add(expectedAmount.mul(2)),
        1
      );

      expect(await wallet.totalReleased()).to.be.closeTo(
        expectedAmount.mul(2),
        1
      );
    });

    it('distributes all tokens at end of period', async () => {
      const expectedBalance = ethers.utils.parseEther('15000000');

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + endDuration + 5,
      ]);
      await ethers.provider.send('evm_mine', []);

      await expect(wallet.release())
        .to.emit(wallet, 'TokensReleased')
        .withArgs(expectedBalance, teamPayer.address);

      expect(await orca.balanceOf(teamPayer.address)).to.equal(expectedBalance);
    });

    it('allows revoke', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const expectedAmount = ethers.utils
        .parseEther('15000000')
        .mul(DURATION)
        .div(endDuration);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);

      await expect(wallet.revoke()).to.emit(wallet, 'Revoked');
      expect(await orca.balanceOf(teamPayer.address)).to.equal(expectedAmount);
      expect(await orca.balanceOf(wallet.address)).to.equal(0);
    });

    it('does not allow releasing before start time', async () => {
      await expect(teamPayer.release(accounts[1].address)).to.be.revertedWith(
        'PaymentSplitter: account is not due payment'
      );
    });
  });

  context('allows payment splitting', () => {
    beforeEach(async () => {
      await wallet.receiveToken(ethers.utils.parseEther('15000000'));
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await wallet.release();
      expect(await orca.balanceOf(teamPayer.address)).to.equal(
        ethers.utils.parseEther('15000000').mul(DURATION).div(endDuration)
      );
    });

    it('does not allow releasing to account with no shares', async () => {
      await expect(teamPayer.release(accounts[0].address)).to.be.revertedWith(
        'PaymentSplitter: account has no shares'
      );
    });

    it('allows proper payment splitting', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const expectedAmount = ethers.utils
        .parseEther('15000000')
        .mul(DURATION)
        .mul(50)
        .div(100)
        .div(endDuration);

      expect(await teamPayer.totalReleased()).to.equal(0);
      expect(await teamPayer.totalShares()).to.equal(100);

      expect(await teamPayer.released(accounts[1].address)).to.equal(0);
      expect(await teamPayer.released(accounts[2].address)).to.equal(0);

      await expect(teamPayer.release(accounts[1].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[1].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(0);
      expect(await teamPayer.totalReleased()).to.equal(expectedAmount);

      await expect(teamPayer.release(accounts[2].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[2].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.totalReleased()).to.equal(expectedAmount.mul(2));

      // Second time!
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION * 2,
      ]);
      await wallet.release();

      expect(await orca.balanceOf(teamPayer.address)).to.equal(
        ethers.utils
          .parseEther('15000000')
          .mul(DURATION)
          .div(endDuration)
          .add(1)
      );

      await expect(teamPayer.release(accounts[1].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[1].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount.mul(2)
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.totalReleased()).to.equal(expectedAmount.mul(3));

      await expect(teamPayer.release(accounts[2].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[2].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount.mul(2)
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(
        expectedAmount.mul(2)
      );
      expect(await teamPayer.totalReleased()).to.equal(expectedAmount.mul(4));
    });

    it('allows adding a payee and proper reward sharing', async () => {
      const share = 50;
      const totalShare = 100 + share;
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const expectedAmount = ethers.utils
        .parseEther('15000000')
        .mul(DURATION)
        .mul(share)
        .div(totalShare)
        .div(endDuration);

      await expect(teamPayer.addPayee(accounts[3].address, share))
        .to.emit(teamPayer, 'PayeeAdded')
        .withArgs(accounts[3].address, share);

      expect(await teamPayer.totalShares()).to.eq(totalShare);

      expect(await teamPayer.totalReleased()).to.equal(0);

      expect(await teamPayer.released(accounts[1].address)).to.equal(0);
      expect(await teamPayer.released(accounts[2].address)).to.equal(0);
      expect(await teamPayer.released(accounts[3].address)).to.equal(0);

      await expect(teamPayer.release(accounts[1].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[1].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(0);
      expect(await teamPayer.released(accounts[3].address)).to.equal(0);

      expect(await teamPayer.totalReleased()).to.equal(expectedAmount);

      await expect(teamPayer.release(accounts[2].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[2].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[3].address)).to.equal(0);

      expect(await teamPayer.totalReleased()).to.equal(expectedAmount.mul(2));

      await expect(teamPayer.release(accounts[3].address))
        .to.emit(teamPayer, 'PaymentReleased')
        .withArgs(accounts[3].address, expectedAmount);

      expect(await teamPayer.released(accounts[1].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[2].address)).to.equal(
        expectedAmount
      );
      expect(await teamPayer.released(accounts[3].address)).to.equal(
        expectedAmount
      );

      expect(await teamPayer.totalReleased()).to.equal(expectedAmount.mul(3));
    });
  });
});
