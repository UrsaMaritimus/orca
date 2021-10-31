import { expect } from 'chai';

import { ethers, waffle, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  SnapshotBridge,
  SingleStaking__factory,
  SnapshotBridge__factory,
} from '../libs/shared/contracts/src';

describe('Testing snapshot bridge', async () => {
  let accounts: SignerWithAddress[];
  let bridge: SnapshotBridge;
  let Bridge: SnapshotBridge__factory;
  before(async () => {
    accounts = await ethers.getSigners();
    Bridge = (await ethers.getContractFactory(
      'SnapshotBridge',
      accounts[0]
    )) as SnapshotBridge__factory;
  });

  beforeEach(async () => {
    bridge = await Bridge.deploy(
      '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb',
      '0x111E1E97435b57467E79d4930acc4B7EB3d478ad',
      '0x8B1d98A91F853218ddbb066F20b8c63E782e2430'
    );
    await bridge.deployed();
    expect(bridge.address).to.be.properAddress;
  });

  it('allows proper orca staking numbers to be seen', async () => {
    console.log(
      await bridge.stakingPoolVote(
        0,
        '0xdC407e3443f35Da98854e4b8f7059b3bBA6201D4'
      )
    );
  });

  it('shows proper orca in LP pools', async () => {
    console.log(
      await bridge.podLeaderVote(
        0,
        '0xdC407e3443f35Da98854e4b8f7059b3bBA6201D4'
      )
    );
  });
});
