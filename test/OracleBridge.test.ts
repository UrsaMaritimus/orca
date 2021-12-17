import { expect } from 'chai';

import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  OracleBridge__factory,
  AggregatorV3Interface__factory,
  OracleLPBridge,
  OracleLPBridge__factory,
} from '../libs/shared/src/contracts/types';

const USDCPriceSource = '0xF096872672F44d6EBA71458D74fe67F9a77a23B9';
const usdc = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';
const BTCPriceSource = '0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743';
const wbtc = '0x50b7545627a5162F82A992c33b87aDc75187B218';
const AVAXPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';
const wavax = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const ETHPriceSource = '0x976B3D034E162d8bD72D6b9C989d545b839003b0';
const eth = '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB';

const joeStratUSDC = '0xeeD4385af3C876E51CA3AB76AD2cFCa1422AC747';
const joeStratAVAX = '0xf6cCf601bd024612aAF85440153c2df0524E4607';
const joeStratETH = '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E';
describe('Oracle Bridge Test', function () {
  let accounts: SignerWithAddress[];
  let oracleFac: OracleBridge__factory;
  let oracleLPFac: OracleLPBridge__factory;

  before(async () => {
    accounts = await ethers.getSigners();
    oracleFac = (await ethers.getContractFactory(
      'OracleBridge',
      accounts[0]
    )) as OracleBridge__factory;

    oracleLPFac = (await ethers.getContractFactory(
      'OracleLPBridge',
      accounts[0]
    )) as OracleLPBridge__factory;
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

  it('gives the correct price for btc for aave', async () => {
    const oracleFacBtc = (await ethers.getContractFactory(
      'YakAvaxBTCOracle',
      accounts[0]
    )) as OracleBridge__factory;
    const oracle = await oracleFacBtc.deploy(
      BTCPriceSource,
      wbtc,
      '0x0f7F48d4b66bF5a53d4f21fA6Ffca45f70Cef770'
    );
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
  it('gives price for avax/usdc LP', async () => {
    const oracle = await oracleLPFac.deploy(
      AVAXPriceSource,
      '0xF096872672F44d6EBA71458D74fe67F9a77a23B9',
      '0xa389f9430876455c36478deea9769b7ca4e3ddb1',
      '0xA1801f4FFD40b192A13A54614E66d3625d5C422e'
    );

    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));
  });

  it('gives price for avax/weth LP', async () => {
    const oracle = await oracleLPFac.deploy(
      AVAXPriceSource,
      '0x976B3D034E162d8bD72D6b9C989d545b839003b0',
      '0xfe15c2695f1f920da45c30aae47d11de51007af9',
      '0x45AF056a757D6649c24D74c2E4fE449682F6A2dB'
    );

    await oracle.deployed();
    expect(oracle.address).to.be.properAddress;
    const [roundId, answer, startedAt, updatedAt, answeredInRound] =
      await oracle.latestRoundData();
    console.log(ethers.utils.formatUnits(answer, 8));
  });
});
