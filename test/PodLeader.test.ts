import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ORCA,
  ORCA__factory,
  PodLeader__factory,
  PodLeader,
} from '../libs/shared/contracts/src';
import { time, timeStamp } from 'console';

describe('Pod Leader test', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let OrcaFac: ORCA__factory;
  let podLeader: PodLeader;
  let PodLeaderFac: PodLeader__factory;
  let startTime: number;
  let rewardsPerSecond = ethers.utils.parseEther('1');
  let initialRewardsBalance = ethers.utils.parseEther('13406250');

  before(async () => {
    accounts = await ethers.getSigners();
    OrcaFac = (await ethers.getContractFactory(
      'ORCA',
      accounts[0]
    )) as ORCA__factory;
    PodLeaderFac = (await ethers.getContractFactory(
      'PodLeader',
      accounts[0]
    )) as PodLeader__factory;
  });

  beforeEach(async function () {
    orca = await OrcaFac.deploy();
    await orca.deployed();
    expect(orca.address).to.be.properAddress;

    // Get block number
    const { timestamp } = await ethers.provider.getBlock('latest');
    startTime = timestamp - 5;
    podLeader = await PodLeaderFac.deploy(
      orca.address,
      startTime,
      rewardsPerSecond,
      accounts[0].address
    );
    expect(podLeader.address).to.be.properAddress;
    await orca.increaseAllowance(podLeader.address, await orca.totalSupply());
  });

  it('should not give out rewards if not active', async () => {
    const { timestamp } = await ethers.provider.getBlock('latest');
    expect(timestamp).to.gte(startTime);
    expect(await podLeader.rewardsActive()).to.eq(false);
  });

  it('Should if theres a pool and rewards added! withUpdate=true', async () => {
    expect(await podLeader.rewardsActive()).to.eq(false);
    const { timestamp } = await ethers.provider.getBlock('latest');
    const ALLOC_POINTS = '10';
    const DEPOSIT_FEE = 75;

    await podLeader.addRewardsBalance(ethers.utils.parseEther('1'));
    await podLeader.add(ALLOC_POINTS, orca.address, true, DEPOSIT_FEE);
    expect(timestamp).to.gte(startTime);
    expect(await podLeader.rewardsActive()).to.eq(true);
  });

  it('Should if theres a pool and rewards added! withUpdate=false', async () => {
    expect(await podLeader.rewardsActive()).to.eq(false);
    const { timestamp } = await ethers.provider.getBlock('latest');
    const ALLOC_POINTS = '10';
    const DEPOSIT_FEE = 75;

    await podLeader.addRewardsBalance(ethers.utils.parseEther('1'));
    await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);
    expect(timestamp).to.gte(startTime);
    expect(await podLeader.rewardsActive()).to.eq(true);
  });

  it('updates end time stamp when rewards are added', async () => {
    let endTimestamp = await podLeader.endTimestamp();
    expect(endTimestamp).to.eq(0);
    expect(await podLeader.rewardsPerSecond()).to.eq(rewardsPerSecond);

    let addRewardsBalanceTx = await podLeader.addRewardsBalance(
      initialRewardsBalance.div(2)
    );
    let addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    let addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await podLeader.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div('2').div(rewardsPerSecond)
      )
    );

    addRewardsBalanceTx = await podLeader.addRewardsBalance(
      initialRewardsBalance.div(2)
    );
    addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await podLeader.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div(rewardsPerSecond)
      )
    );
  });

  context('add', async () => {
    beforeEach(async () => {
      await podLeader.addRewardsBalance(initialRewardsBalance);
      expect(await orca.balanceOf(podLeader.address)).to.equal(
        initialRewardsBalance
      );
    });

    it('Successfully adds ORCA single staking pool', async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      const initNumPools = await podLeader.poolLength();
      const initTotalAllocPoints = await podLeader.totalAllocPoint();
      await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);
      expect(await podLeader.poolLength()).to.equal(initNumPools.add(1));
      expect(await podLeader.totalAllocPoint()).to.equal(
        initTotalAllocPoints.add(ALLOC_POINTS)
      );

      const newPool = await podLeader.poolInfo(initNumPools);
      expect(newPool.token).to.equal(orca.address);
      expect(newPool.allocPoint).to.equal(ALLOC_POINTS);
      expect(newPool.depositFeeBP).to.equal(DEPOSIT_FEE);
    });

    it('Successfully adds a second and third pool', async () => {
      const DEPOSIT_FEE = 75;
      await podLeader.add('10', orca.address, false, DEPOSIT_FEE);
      await podLeader.add('20', orca.address, false, DEPOSIT_FEE);
      await podLeader.add('0', orca.address, false, DEPOSIT_FEE);
      expect(await podLeader.poolLength()).to.eq(3);
      expect(await podLeader.totalAllocPoint()).to.eq(30);
    });

    it('does not allow non-owner to add pool', async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await expect(
        podLeader
          .connect(accounts[1])
          .add(ALLOC_POINTS, podLeader.address, false, DEPOSIT_FEE)
      ).to.be.reverted;
    });
  });

  context('set', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await podLeader.addRewardsBalance(initialRewardsBalance);
      await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);
    });

    it('allows owner to set alloc points for pool', async () => {
      const ALLOC_POINTS = '20';
      const numPools = await podLeader.poolLength();
      const pid = numPools.sub(1);
      await podLeader.set(pid, ALLOC_POINTS, true);
      const pool = await podLeader.poolInfo(pid);
      expect(pool.allocPoint).to.eq(ALLOC_POINTS);
    });

    it('does not allow non-owner to set alloc points for pool', async () => {
      const ALLOC_POINTS = '20';
      const numPools = await podLeader.poolLength();
      const pid = numPools.sub(1);
      await expect(podLeader.connect(accounts[1]).set(pid, ALLOC_POINTS, true))
        .to.be.reverted;
    });

    it('allows owner to set deposit fee for pool', async () => {
      const DEPOSIT_FEE = 50;
      const numPools = await podLeader.poolLength();
      const pid = numPools.sub(1);
      await podLeader.updateDepositFee(pid, DEPOSIT_FEE, true);
      const pool = await podLeader.poolInfo(pid);
      expect(pool.depositFeeBP).to.eq(DEPOSIT_FEE);
    });

    it('does not allow non-owner to set deposit for pool', async () => {
      const DEPOSIT_FEE = '50';
      const numPools = await podLeader.poolLength();
      const pid = numPools.sub(1);
      await expect(
        podLeader.connect(accounts[1]).updateDepositFee(pid, DEPOSIT_FEE, true)
      ).to.be.reverted;
    });
  });

  context('deposit', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await podLeader.addRewardsBalance(initialRewardsBalance);
      await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows a user to deposit', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const treasury = await podLeader.treasury();
      const orcaBalanceTreasury = await orca.balanceOf(treasury);

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);

      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);
      const poolInfo = await podLeader.poolInfo(poolIndex);

      expect(userInfo.amount).to.equal(
        orcaBalance.sub(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );

      expect(userInfo.rewardTokenDebt).to.equal(0);
      expect(poolInfo.totalStaked).to.equal(
        orcaBalance.sub(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);
      expect(await orca.balanceOf(treasury)).to.equal(
        orcaBalanceTreasury.add(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );
    });

    it('allows harvest with zero deposit', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const treasury = await podLeader.treasury();
      const orcaBalanceTreasury = await orca.balanceOf(treasury);

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      const amountToClaim = await podLeader.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      const afterDepositOrcaBalance = await orca.balanceOf(accounts[1].address);

      // Should update things
      await podLeader.connect(accounts[1]).deposit(poolIndex, 0);

      const poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(userInfo.amount).to.equal(
        orcaBalance.sub(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );
      expect(poolInfo.totalStaked).to.equal(
        orcaBalance.sub(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );

      // @ts-expect-error bignumber instead of number
      expect(userInfo.rewardTokenDebt).to.be.closeTo(
        amountToClaim,
        amountToClaim.div(100)
      );

      expect(await orca.balanceOf(treasury)).to.equal(
        orcaBalanceTreasury.add(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );

      // @ts-expect-error bignumber instead of number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        afterDepositOrcaBalance.add(amountToClaim),
        amountToClaim.div(100)
      );
    });
  });

  context('withdraw', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await podLeader.addRewardsBalance(initialRewardsBalance);
      await podLeader.add(ALLOC_POINTS, orca.address, true, DEPOSIT_FEE);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows user top withdraw from pool', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance.sub(
        orcaBalance.mul(DEPOSIT_FEE).div(10000)
      );
      const treasury = await podLeader.treasury();
      const orcaBalanceTreasury = await orca.balanceOf(treasury);

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      const amountToClaim = await podLeader.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      await podLeader
        .connect(accounts[1])
        .withdraw(poolIndex, withdrawOrcaBalance);

      const poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.equal(0);
      expect(userInfo.amount).to.equal(0);
      expect(userInfo.rewardTokenDebt).to.equal(0);

      // @ts-expect-error bignumber is not number, duh
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        withdrawOrcaBalance.add(amountToClaim),
        amountToClaim.div(100)
      );

      expect(await orca.balanceOf(treasury)).to.equal(
        orcaBalanceTreasury.add(orcaBalance.mul(DEPOSIT_FEE).div(10000))
      );
    });

    it('does not allow a 0 withdraw', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      await expect(podLeader.withdraw(poolIndex, 0)).to.be.revertedWith(
        'PodLeader::withdraw: amount must be > 0'
      );

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);
    });

    it('allows withdraw after reward period is over', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance.sub(
        orcaBalance.mul(DEPOSIT_FEE).div(10000)
      );

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      // Speed ahead to end
      const endTimestamp = await podLeader.endTimestamp();

      expect(await podLeader.rewardsActive()).to.equal(true);
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        endTimestamp.toNumber() + 1,
      ]);
      await ethers.provider.send('evm_mine', []);
      expect(await podLeader.rewardsActive()).to.equal(false);

      const amountToClaim = await podLeader.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      await podLeader
        .connect(accounts[1])
        .withdraw(poolIndex, withdrawOrcaBalance);

      const poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.equal(0);
      expect(userInfo.amount).to.equal(0);

      //@ts-expect-error bignumber not number
      expect(await orca.balanceOf(accounts[1].address)).to.be.closeTo(
        withdrawOrcaBalance.add(amountToClaim),
        amountToClaim.div(100)
      );

      //@ts-expect-error bignumber not number
      expect(await orca.balanceOf(podLeader.address)).to.be.closeTo(
        ethers.utils.parseUnits('0'),
        amountToClaim.div(100)
      );
    });
  });

  context('set rewards per second', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows user to deposit BEFORE rewards are added', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const treasury = await podLeader.treasury();
      const orcaBalanceTreasury = await orca.balanceOf(treasury);
      const withdrawOrcaBalance = orcaBalance.sub(
        orcaBalance.mul(DEPOSIT_FEE).div(10000)
      );

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(userInfo.amount).to.eq(withdrawOrcaBalance);
      expect(userInfo.rewardTokenDebt).to.eq(0);
      expect(poolInfo.token).to.eq(orca.address);
      expect(poolInfo.allocPoint).to.eq(10);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      expect(poolInfo.totalStaked).to.eq(withdrawOrcaBalance);
      expect(await orca.balanceOf(treasury)).to.eq(
        orcaBalanceTreasury.add(orcaBalance.sub(withdrawOrcaBalance))
      );

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      poolInfo = await podLeader.poolInfo(poolIndex);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      expect(
        await podLeader.pendingRewards(poolIndex, accounts[1].address)
      ).to.eq(0);
    });

    it('accumulates proper rewards AFTER rewards are added', async () => {
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await podLeader.poolInfo(poolIndex);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await podLeader.updatePool(poolIndex);
      await podLeader.addRewardsBalance(initialRewardsBalance);

      poolInfo = await podLeader.poolInfo(poolIndex);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp + DURATION);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      poolInfo = await podLeader.poolInfo(poolIndex);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      const expectedRewardsAmount = rewardsPerSecond.mul(DURATION);

      // @ts-expect-error bignumber not number
      expect(
        await podLeader.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div(100));
    });

    it('accumlates proper rewards after rewards/per sec changed', async () => {
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await podLeader.addRewardsBalance(initialRewardsBalance);

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await podLeader.poolInfo(poolIndex);
      let newRewardsPerSecond = rewardsPerSecond;

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await podLeader.updatePool(poolIndex);

      let expectedRewardsAmount = rewardsPerSecond.mul(DURATION);
      // @ts-expect-error bignumber is not number
      expect(
        await podLeader.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div(10));

      // Lets update now
      await podLeader.setRewardsPerSecond(newRewardsPerSecond);
      expect(await podLeader.rewardsPerSecond()).to.eq(newRewardsPerSecond);

      // Lets look ahead
      poolInfo = await podLeader.poolInfo(poolIndex);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp + DURATION);
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      // Check if it worked
      expectedRewardsAmount = expectedRewardsAmount.add(
        newRewardsPerSecond.mul(DURATION)
      );

      // @ts-expect-error big number not number
      expect(
        await podLeader.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div('100'));
    });
  });

  context('emergency withdraw works', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const DEPOSIT_FEE = 75;
      await podLeader.add(ALLOC_POINTS, orca.address, false, DEPOSIT_FEE);
      await podLeader.addRewardsBalance(initialRewardsBalance);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows emergency withdraw', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance.sub(
        orcaBalance.mul(DEPOSIT_FEE).div(10000)
      );

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      expect(await podLeader.rewardsActive()).to.eq(true);
      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      // emergency withdraw! Should reset most things for the user, but doesn't get rewards
      await podLeader.connect(accounts[1]).emergencyWithdraw(poolIndex);

      const poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.eq(0);
      expect(userInfo.amount).to.eq(0);
      expect(userInfo.rewardTokenDebt).to.eq(0);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        withdrawOrcaBalance
      );

      expect(await orca.balanceOf(podLeader.address)).to.equal(
        initialRewardsBalance
      );
    });

    it('allows emergency withdraw after rewards period', async () => {
      const DEPOSIT_FEE = 75;
      const numPools = await podLeader.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance.sub(
        orcaBalance.mul(DEPOSIT_FEE).div(10000)
      );

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(podLeader.address, orcaBalance);
      await podLeader.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      expect(await podLeader.rewardsActive()).to.eq(true);
      const endTimestamp = await podLeader.endTimestamp();
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        endTimestamp.add(1).toNumber(),
      ]);
      await ethers.provider.send('evm_mine', []);
      expect(await podLeader.rewardsActive()).to.eq(false);

      // emergency withdraw! Should reset most things for the user, but doesn't get rewards
      await podLeader.connect(accounts[1]).emergencyWithdraw(poolIndex);

      const poolInfo = await podLeader.poolInfo(poolIndex);
      const userInfo = await podLeader.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.eq(0);
      expect(userInfo.amount).to.eq(0);
      expect(userInfo.rewardTokenDebt).to.eq(0);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        withdrawOrcaBalance
      );
      expect(await orca.balanceOf(podLeader.address)).to.equal(
        initialRewardsBalance
      );
    });
  });
});
