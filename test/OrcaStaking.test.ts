import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ORCA,
  ORCA__factory,
  OrcaStaking,
  OrcaStaking__factory,
} from '../libs/shared/contracts/src';

describe('Orca Staking test', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let OrcaFac: ORCA__factory;
  let staking: OrcaStaking;
  let StakingFac: OrcaStaking__factory;
  let startTime: number;
  let rewardsPerSecond = ethers.utils.parseEther('0.001');
  let initialRewardsBalance = ethers.utils.parseEther('500');

  before(async () => {
    accounts = await ethers.getSigners();
    OrcaFac = (await ethers.getContractFactory(
      'ORCA',
      accounts[0]
    )) as ORCA__factory;
    StakingFac = (await ethers.getContractFactory(
      'OrcaStaking',
      accounts[0]
    )) as OrcaStaking__factory;
  });

  beforeEach(async function () {
    orca = await OrcaFac.deploy();
    await orca.deployed();
    expect(orca.address).to.be.properAddress;
    // Get block number
    const { timestamp } = await ethers.provider.getBlock('latest');
    startTime = timestamp - 5;
    staking = await StakingFac.deploy(
      startTime,
      rewardsPerSecond,
      accounts[2].address
    );
    expect(staking.address).to.be.properAddress;
  });

  it('should not give out rewards if not active', async () => {
    const { timestamp } = await ethers.provider.getBlock('latest');
    expect(timestamp).to.gte(startTime);
    expect(await staking.rewardsActive()).to.eq(false);
  });

  it('Should if theres a pool and rewards added! withUpdate=true', async () => {
    expect(await staking.rewardsActive()).to.eq(false);
    const { timestamp } = await ethers.provider.getBlock('latest');
    const ALLOC_POINTS = '10';
    const overrides = {
      value: ethers.utils.parseEther('1'),
    };
    await staking.addRewardsBalance(overrides);
    await staking.add(ALLOC_POINTS, orca.address, true);
    expect(timestamp).to.gte(startTime);
    expect(await staking.rewardsActive()).to.eq(true);
  });

  it('Should if theres a pool and rewards added! withUpdate=false', async () => {
    expect(await staking.rewardsActive()).to.eq(false);
    const { timestamp } = await ethers.provider.getBlock('latest');
    const ALLOC_POINTS = '10';
    const overrides = {
      value: ethers.utils.parseEther('1'),
    };
    await staking.addRewardsBalance(overrides);
    await staking.add(ALLOC_POINTS, orca.address, false);
    expect(timestamp).to.gte(startTime);
    expect(await staking.rewardsActive()).to.eq(true);
  });

  it('updates end time stamp when rewards are added', async () => {
    let endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(0);
    expect(await staking.rewardsPerSecond()).to.eq(rewardsPerSecond);
    const overrides = {
      value: initialRewardsBalance.div(2),
    };
    let addRewardsBalanceTx = await staking.addRewardsBalance(overrides);
    let addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    let addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div('2').div(rewardsPerSecond)
      )
    );

    addRewardsBalanceTx = await staking.addRewardsBalance(overrides);
    addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div(rewardsPerSecond)
      )
    );
  });

  it('allows treasury to add rewards', async () => {
    const overrides = {
      value: initialRewardsBalance,
    };
    await staking.connect(accounts[2]).addRewardsBalance(overrides);
    expect(await ethers.provider.getBalance(staking.address)).to.equal(
      initialRewardsBalance
    );

    await expect(
      staking.connect(accounts[1]).addRewardsBalance(overrides)
    ).to.be.revertedWith('Cannot do this, not owner or treasury.');
  });

  it('allows treasury to change rewards rate', async () => {
    let endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(0);
    expect(await staking.rewardsPerSecond()).to.eq(rewardsPerSecond);
    const overrides = {
      value: initialRewardsBalance.div(2),
    };
    let addRewardsBalanceTx = await staking
      .connect(accounts[2])
      .addRewardsBalance(overrides);
    let addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    let addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div('2').div(rewardsPerSecond)
      )
    );

    addRewardsBalanceTx = await staking.addRewardsBalance(overrides);
    addRewardsBalanceTxReceipt = await addRewardsBalanceTx.wait(0);
    addRewardsBalanceTxBlock = await ethers.provider.getBlock(
      addRewardsBalanceTxReceipt.blockNumber
    );
    endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(addRewardsBalanceTxBlock.timestamp).add(
        initialRewardsBalance.div(rewardsPerSecond)
      )
    );

    let changeRewardsRateTx = await staking
      .connect(accounts[2])
      .setRewardsPerSecond(ethers.utils.parseEther('0.0001'));
    let changeRewardsTxReceipt = await changeRewardsRateTx.wait(0);
    let changeRewardsTxBlock = await ethers.provider.getBlock(
      changeRewardsTxReceipt.blockNumber
    );
    endTimestamp = await staking.endTimestamp();
    expect(endTimestamp).to.eq(
      ethers.BigNumber.from(changeRewardsTxBlock.timestamp).add(
        initialRewardsBalance.div(ethers.utils.parseEther('0.0001'))
      )
    );
  });

  context('add', async () => {
    beforeEach(async () => {
      const overrides = {
        value: initialRewardsBalance,
      };
      await staking.addRewardsBalance(overrides);
      expect(await ethers.provider.getBalance(staking.address)).to.equal(
        initialRewardsBalance
      );
    });

    it('successfully adds ORCA single staking pool', async () => {
      const ALLOC_POINTS = '10';
      const initNumPools = await staking.poolLength();
      const initTotalAllocPoints = await staking.totalAllocPoint();
      await staking.add(ALLOC_POINTS, orca.address, false);
      expect(await staking.poolLength()).to.equal(initNumPools.add(1));
      expect(await staking.totalAllocPoint()).to.equal(
        initTotalAllocPoints.add(ALLOC_POINTS)
      );

      const newPool = await staking.poolInfo(initNumPools);
      expect(newPool.token).to.equal(orca.address);
      expect(newPool.allocPoint).to.equal(ALLOC_POINTS);
    });

    it('successfully adds a second and third pool', async () => {
      await staking.add('10', orca.address, false);
      await staking.add('20', orca.address, false);
      await staking.add('0', orca.address, false);
      expect(await staking.poolLength()).to.eq(3);
      expect(await staking.totalAllocPoint()).to.eq(30);
    });

    it('does not allow non-owner to add pool', async () => {
      const ALLOC_POINTS = '10';
      await expect(
        staking.connect(accounts[2]).add(ALLOC_POINTS, staking.address, false)
      ).to.be.reverted;
    });
  });

  context('set', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const overrides = {
        value: initialRewardsBalance,
      };
      await staking.addRewardsBalance(overrides);
      await staking.add(ALLOC_POINTS, orca.address, false);
    });

    it('allows owner to set alloc points for pool', async () => {
      const ALLOC_POINTS = '20';
      const numPools = await staking.poolLength();
      const pid = numPools.sub(1);
      await staking.set(pid, ALLOC_POINTS, true);
      const pool = await staking.poolInfo(pid);
      expect(pool.allocPoint).to.eq(ALLOC_POINTS);
    });

    it('does not allow non-owner to set alloc points for pool', async () => {
      const ALLOC_POINTS = '20';
      const numPools = await staking.poolLength();
      const pid = numPools.sub(1);
      await expect(staking.connect(accounts[1]).set(pid, ALLOC_POINTS, true)).to
        .be.reverted;
    });
  });

  context('deposit', async () => {
    beforeEach(async () => {
      const overrides = {
        value: initialRewardsBalance,
      };
      const ALLOC_POINTS = '10';
      await staking.addRewardsBalance(overrides);
      await staking.add(ALLOC_POINTS, orca.address, false);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows a user to deposit', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);

      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);
      const poolInfo = await staking.poolInfo(poolIndex);
      expect(userInfo.amount).to.equal(orcaBalance);

      expect(userInfo.rewardTokenDebt).to.equal(0);
      expect(poolInfo.totalStaked).to.equal(orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);
    });

    it('allows harvest with zero deposit', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);

      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      const amountToClaim = await staking.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      const afterDepositAvaxBalance = await ethers.provider.getBalance(
        accounts[1].address
      );
      // Should update things
      let tx = await staking.connect(accounts[1]).deposit(poolIndex, 0);
      let txReceipt = await tx.wait(0);
      let gasSpent = ethers.BigNumber.from('0').add(
        txReceipt.gasUsed.mul(tx.gasPrice)
      );

      const poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(userInfo.amount).to.equal(orcaBalance);
      expect(poolInfo.totalStaked).to.equal(orcaBalance);

      // @ts-expect-error bignumber instead of number
      expect(userInfo.rewardTokenDebt).to.be.closeTo(
        amountToClaim,
        amountToClaim.div(100)
      );

      // @ts-expect-error bignumber instead of number
      expect(
        await ethers.provider.getBalance(accounts[1].address)
      ).to.be.closeTo(
        afterDepositAvaxBalance.add(amountToClaim).sub(gasSpent),
        amountToClaim.div(100)
      );
    });
  });

  context('withdraw', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const overrides = {
        value: initialRewardsBalance,
      };
      await staking.addRewardsBalance(overrides);
      await staking.add(ALLOC_POINTS, orca.address, true);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows user to withdraw from pool', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance;

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);

      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      const amountToClaim = await staking.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      const afterDepositAvaxBalance = await ethers.provider.getBalance(
        accounts[1].address
      );
      let tx = await staking
        .connect(accounts[1])
        .withdraw(poolIndex, withdrawOrcaBalance);

      let txReceipt = await tx.wait(0);
      let gasSpent = ethers.BigNumber.from('0').add(
        txReceipt.gasUsed.mul(tx.gasPrice)
      );

      const poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.equal(0);
      expect(userInfo.amount).to.equal(0);
      expect(userInfo.rewardTokenDebt).to.equal(0);

      expect(await orca.balanceOf(accounts[1].address)).to.eq(
        withdrawOrcaBalance
      );

      // @ts-expect-error bignumber instead of number
      expect(
        await ethers.provider.getBalance(accounts[1].address)
      ).to.be.closeTo(
        afterDepositAvaxBalance.add(amountToClaim).sub(gasSpent),
        amountToClaim.div(100)
      );
    });

    it('does not allow a 0 withdraw', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);

      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      await expect(staking.withdraw(poolIndex, 0)).to.be.revertedWith(
        'Staking::withdraw: amount must be > 0'
      );

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);
    });

    it('allows withdraw after reward period is over', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance;

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      // Speed ahead to end
      const endTimestamp = await staking.endTimestamp();

      expect(await staking.rewardsActive()).to.equal(true);
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        endTimestamp.toNumber() + 1,
      ]);
      await ethers.provider.send('evm_mine', []);
      expect(await staking.rewardsActive()).to.equal(false);

      const amountToClaim = await staking.pendingRewards(
        poolIndex,
        accounts[1].address
      );

      const afterDepositAvaxBalance = await ethers.provider.getBalance(
        accounts[1].address
      );
      let tx = await staking
        .connect(accounts[1])
        .withdraw(poolIndex, withdrawOrcaBalance);

      let txReceipt = await tx.wait(0);
      let gasSpent = ethers.BigNumber.from('0').add(
        txReceipt.gasUsed.mul(tx.gasPrice)
      );

      const poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.equal(0);
      expect(userInfo.amount).to.equal(0);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        withdrawOrcaBalance
      );
      // @ts-expect-error bignumber instead of number
      expect(
        await ethers.provider.getBalance(accounts[1].address)
      ).to.be.closeTo(
        afterDepositAvaxBalance.add(amountToClaim).sub(gasSpent),
        amountToClaim.div(100)
      );

      //@ts-expect-error bignumber not number
      expect(await ethers.provider.getBalance(staking.address)).to.be.closeTo(
        ethers.utils.parseEther('0'),
        amountToClaim.div(100)
      );
    });
  });

  context('set rewards per second', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';

      await staking.add(ALLOC_POINTS, orca.address, false);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows user to deposit BEFORE rewards are added', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance;

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(userInfo.amount).to.eq(withdrawOrcaBalance);
      expect(userInfo.rewardTokenDebt).to.eq(0);
      expect(poolInfo.token).to.eq(orca.address);
      expect(poolInfo.allocPoint).to.eq(10);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      expect(poolInfo.totalStaked).to.eq(withdrawOrcaBalance);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      poolInfo = await staking.poolInfo(poolIndex);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      expect(
        await staking.pendingRewards(poolIndex, accounts[1].address)
      ).to.eq(0);
    });

    it('accumulates proper rewards AFTER rewards are added', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);

      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await staking.poolInfo(poolIndex);

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await staking.updatePool(poolIndex);

      const overrides = {
        value: initialRewardsBalance,
      };

      await staking.addRewardsBalance(overrides);

      poolInfo = await staking.poolInfo(poolIndex);
      expect(poolInfo.lastRewardTimestamp).to.eq(timestamp + DURATION);

      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      poolInfo = await staking.poolInfo(poolIndex);
      expect(poolInfo.accRewardsPerShare).to.eq(0);
      const expectedRewardsAmount = rewardsPerSecond.mul(DURATION);

      // @ts-expect-error bignumber not number
      expect(
        await staking.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div(100));
    });

    it('accumlates proper rewards after rewards/per sec changed', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const overrides = {
        value: initialRewardsBalance,
      };
      await staking.addRewardsBalance(overrides);

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      const { timestamp } = await ethers.provider.getBlock('latest');

      let poolInfo = await staking.poolInfo(poolIndex);
      let newRewardsPerSecond = rewardsPerSecond;

      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        poolInfo.lastRewardTimestamp.toNumber() + DURATION,
      ]);
      await staking.updatePool(poolIndex);

      let expectedRewardsAmount = rewardsPerSecond.mul(DURATION);
      // @ts-expect-error bignumber is not number
      expect(
        await staking.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div(10));

      // Lets update now
      await staking.setRewardsPerSecond(newRewardsPerSecond);
      expect(await staking.rewardsPerSecond()).to.eq(newRewardsPerSecond);

      // Lets look ahead
      poolInfo = await staking.poolInfo(poolIndex);
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
        await staking.pendingRewards(poolIndex, accounts[1].address)
      ).to.be.closeTo(expectedRewardsAmount, expectedRewardsAmount.div('100'));
    });
  });

  context('emergency withdraw works', async () => {
    beforeEach(async () => {
      const ALLOC_POINTS = '10';
      const overrides = {
        value: initialRewardsBalance,
      };
      await staking.add(ALLOC_POINTS, orca.address, false);
      await staking.addRewardsBalance(overrides);

      // Send to account[1]
      await accounts[0].sendTransaction({
        to: accounts[1].address,
        value: ethers.utils.parseEther('20'),
      });

      //send orca to account[1]
      await orca.transfer(accounts[1].address, ethers.utils.parseEther('1000'));
    });

    it('allows emergency withdraw', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance;

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      expect(await staking.rewardsActive()).to.eq(true);
      const DURATION = 1 * 24 * 60 * 60;
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        startTime + DURATION,
      ]);
      await ethers.provider.send('evm_mine', []);

      // emergency withdraw! Should reset most things for the user, but doesn't get rewards
      await staking.connect(accounts[1]).emergencyWithdraw(poolIndex);

      const poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.eq(0);
      expect(userInfo.amount).to.eq(0);
      expect(userInfo.rewardTokenDebt).to.eq(0);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        withdrawOrcaBalance
      );

      expect(await ethers.provider.getBalance(staking.address)).to.equal(
        initialRewardsBalance
      );
    });

    it('allows emergency withdraw after rewards period', async () => {
      const numPools = await staking.poolLength();
      const poolIndex = numPools.sub(1);
      const orcaBalance = await orca.balanceOf(accounts[1].address);
      const withdrawOrcaBalance = orcaBalance;

      // Send in
      await orca
        .connect(accounts[1])
        .increaseAllowance(staking.address, orcaBalance);
      await staking.connect(accounts[1]).deposit(poolIndex, orcaBalance);

      expect(await orca.balanceOf(accounts[1].address)).to.equal(0);

      expect(await staking.rewardsActive()).to.eq(true);
      const endTimestamp = await staking.endTimestamp();
      await ethers.provider.send('evm_setNextBlockTimestamp', [
        endTimestamp.add(1).toNumber(),
      ]);
      await ethers.provider.send('evm_mine', []);
      expect(await staking.rewardsActive()).to.eq(false);

      // emergency withdraw! Should reset most things for the user, but doesn't get rewards
      await staking.connect(accounts[1]).emergencyWithdraw(poolIndex);

      const poolInfo = await staking.poolInfo(poolIndex);
      const userInfo = await staking.userInfo(poolIndex, accounts[1].address);

      expect(poolInfo.totalStaked).to.eq(0);
      expect(userInfo.amount).to.eq(0);
      expect(userInfo.rewardTokenDebt).to.eq(0);
      expect(await orca.balanceOf(accounts[1].address)).to.equal(
        withdrawOrcaBalance
      );
      expect(await ethers.provider.getBalance(staking.address)).to.equal(
        initialRewardsBalance
      );
    });
  });
});
