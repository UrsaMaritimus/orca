import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20__factory,
  OracleBridge,
  OracleBridge__factory,
  AggregatorV3Interface__factory,
} from '../libs/shared/contracts/src';

const USDCPriceSource = '0xF096872672F44d6EBA71458D74fe67F9a77a23B9';
const usdc = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';
const BTCPriceSource = '0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743';
const wbtc = '0x50b7545627a5162F82A992c33b87aDc75187B218';
const AVAXPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';
const wavax = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const ETHPriceSource = '0x976B3D034E162d8bD72D6b9C989d545b839003b0';
const eth = '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB';

const joeStratWBTC = '0x4fD1CF1E437dbFad5dFfE1DD5e16bF96A24C382c';
const joeStratUSDC = '0xeeD4385af3C876E51CA3AB76AD2cFCa1422AC747';
const joeStratAVAX = '0xf6cCf601bd024612aAF85440153c2df0524E4607';
const joeStratETH = '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E';
describe('Oracle Bridge Test', function () {
  let accounts: SignerWithAddress[];
  let oracleFac: OracleBridge__factory;

  before(async () => {
    accounts = await ethers.getSigners();
    oracleFac = (await ethers.getContractFactory(
      'OracleBridge',
      accounts[0]
    )) as OracleBridge__factory;
  });

  it('gives the correct price for usdc for joe', async () => {
    const oracle = await oracleFac.deploy(USDCPriceSource, usdc, joeStratUSDC);
    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));

    const actual = AggregatorV3Interface__factory.connect(
      USDCPriceSource,
      accounts[0]
    );

    expect(
      (await actual.latestRoundData())[1].toNumber()
    ).to.be.lessThanOrEqual(answer.toNumber());
  });

  it('gives the correct price for btc for joe', async () => {
    const oracle = await oracleFac.deploy(BTCPriceSource, wbtc, joeStratWBTC);
    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));
    const actual = AggregatorV3Interface__factory.connect(
      BTCPriceSource,
      accounts[0]
    );

    expect(
      (await actual.latestRoundData())[1].toNumber()
    ).to.be.lessThanOrEqual(answer.toNumber());
  });

  it('gives the correct price for avax for joe', async () => {
    const oracle = await oracleFac.deploy(AVAXPriceSource, wavax, joeStratAVAX);
    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));
    const actual = AggregatorV3Interface__factory.connect(
      AVAXPriceSource,
      accounts[0]
    );

    expect(
      (await actual.latestRoundData())[1].toNumber()
    ).to.be.lessThanOrEqual(answer.toNumber());
  });

  it('gives the correct price for eth for joe', async () => {
    const oracle = await oracleFac.deploy(ETHPriceSource, eth, joeStratETH);
    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));

    const actual = AggregatorV3Interface__factory.connect(
      ETHPriceSource,
      accounts[0]
    );

    expect(
      (await actual.latestRoundData())[1].toNumber()
    ).to.be.lessThanOrEqual(answer.toNumber());
  });
});