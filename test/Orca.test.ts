import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ORCA, ORCA__factory } from '../libs/shared/contracts/src';

describe('Orca tests', function () {
  let accounts: SignerWithAddress[];
  let orca: ORCA;
  let OrcaFac: ORCA__factory;
  before(async () => {
    accounts = await ethers.getSigners();
    OrcaFac = (await ethers.getContractFactory(
      'ORCA',
      accounts[0]
    )) as ORCA__factory;
  });

  beforeEach(async function () {
    orca = await OrcaFac.deploy();
    await orca.deployed();
    expect(orca.address).to.be.properAddress;
  });

  it('supply to be 150 million', async () => {
    const totalSupply = ethers.utils.parseEther('150000000');
    expect(await orca.totalSupply()).to.equal(totalSupply);
    expect(await orca.balanceOf(accounts[0].address)).to.equal(totalSupply);
  });
});
