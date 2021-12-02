import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ORCA,
  ORCA__factory,
  OrcaTeamVesting__factory,
  OrcaTeamVesting,
} from '../libs/shared/src/contracts/types';

describe('Orca Vesting test', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let OrcaFac: ORCA__factory;
  let OrcaVesting: OrcaTeamVesting;
  let OrcaVestingFac: OrcaTeamVesting__factory;
  let startTime: number;
  let endDuration: number;

  before(async () => {
    accounts = await ethers.getSigners();
    OrcaFac = (await ethers.getContractFactory(
      'ORCA',
      accounts[0]
    )) as ORCA__factory;

    OrcaVestingFac = (await ethers.getContractFactory(
      'OrcaTeamVesting',
      accounts[0]
    )) as OrcaTeamVesting__factory;
  });

  beforeEach(async function () {
    orca = await OrcaFac.deploy();
    await orca.deployed();
    expect(orca.address).to.be.properAddress;

    const { timestamp } = await ethers.provider.getBlock('latest');
    startTime = timestamp + 1000;
    endDuration = 60 * 60 * 24 * 365 * 2;
    OrcaVesting = await OrcaVestingFac.deploy(
      orca.address,
      [accounts[1].address, accounts[2].address],
      [50, 50],
      startTime,
      endDuration,
      true
    );
    await OrcaVesting.deployed();
    expect(OrcaVesting.address).to.be.properAddress;

    await orca.approve(OrcaVesting.address, await orca.totalSupply());
    expect(
      await orca.allowance(accounts[0].address, OrcaVesting.address)
    ).to.equal(await orca.totalSupply());
  });

  it('to properly fund', async () => {
    await OrcaVesting.receiveToken(ethers.utils.parseEther('15000000'));
    expect(await orca.balanceOf(OrcaVesting.address)).to.equal(
      ethers.utils.parseEther('15000000')
    );
  });

  context('Allows proper vesting', async () => {
    beforeEach(async () => {
      await OrcaVesting.receiveToken(ethers.utils.parseEther('15000000'));
      expect(await orca.balanceOf(OrcaVesting.address)).to.equal(
        ethers.utils.parseEther('15000000')
      );
    });

    it('does not allow releasing to account with no shares', async () => {
      await expect(OrcaVesting.release(accounts[0].address)).to.be.revertedWith(
        'Account has no shares'
      );
    });

    it('does not allow releasing before start time', async () => {
      await expect(OrcaVesting.release(accounts[1].address)).to.be.revertedWith(
        'Account is not due payment'
      );
    });

    it('allows releasing after start time', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day

      const initBalance = await orca.balanceOf(accounts[1].address);
      const expectedBalance = ethers.utils
        .parseEther('15000000')
        .mul(50)
        .div(100)
        .mul(DURATION)
        .div(endDuration);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);
      await OrcaVesting.release(accounts[1].address);

      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        initBalance.add(expectedBalance),
        expectedBalance.div(100)
      );
    });

    it('allows multiple correct releases', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const initBalance = await orca.balanceOf(accounts[1].address);
      const expectedBalance = ethers.utils
        .parseEther('15000000')
        .mul(50)
        .div(100)
        .mul(DURATION)
        .div(endDuration);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);
      await OrcaVesting.release(accounts[1].address);
      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        initBalance.add(expectedBalance),
        expectedBalance.div(100)
      );

      // Wait another day
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + 2 * DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);
      await OrcaVesting.release(accounts[1].address);
      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        initBalance.add(expectedBalance.mul(2)),
        expectedBalance.mul(2).div(100)
      );
    });

    it('allows multiple correct releases to multiple users', async () => {
      const DURATION = 1 * 24 * 60 * 60; // 1 day
      const initBalance = await orca.balanceOf(accounts[1].address);
      const expectedBalance = ethers.utils
        .parseEther('15000000')
        .mul(50)
        .div(100)
        .mul(DURATION)
        .div(endDuration);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);
      await OrcaVesting.release(accounts[1].address);
      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        initBalance.add(expectedBalance),
        expectedBalance.div(100)
      );

      // Wait another day
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + 2 * DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);
      await OrcaVesting.release(accounts[2].address);
      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[2].address)).to.be.closeTo(
        expectedBalance.mul(2),
        expectedBalance.mul(2).div(100)
      );

      // @ts-expect-error bignumber is not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        initBalance.add(expectedBalance),
        expectedBalance.div(100)
      );
    });

    it('distributes all tokens by end of vesting period', async () => {
      const initBalance = await orca.balanceOf(accounts[1].address);
      const expectedBalance = ethers.utils
        .parseEther('15000000')
        .mul(50)
        .div(100);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + endDuration + 5,
      ]);
      await ethers.provider.send('evm_mine', []);

      await OrcaVesting.release(accounts[1].address);
      await OrcaVesting.release(accounts[2].address);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        initBalance.add(expectedBalance)
      );
      expect(await orca.balanceOf(accounts[2].address)).to.equal(
        expectedBalance
      );
    });
  });
});
