import { expect } from 'chai';

import { ethers, upgrades } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  AVAI__factory,
  AVAI,
  AVAIv2,
  AVAIv2__factory,
  Bank,
  Bank__factory,
} from '../libs/shared/contracts/src';

describe('Stablecoin', async function () {
  let accounts: SignerWithAddress[];
  let Stablecoin: AVAI__factory;
  let Vault: Bank__factory;
  let avai: AVAI;
  let vault: Bank;

  before(async () => {
    accounts = await ethers.getSigners();
    Stablecoin = (await ethers.getContractFactory(
      'AVAI',
      accounts[0]
    )) as AVAI__factory;

    Vault = (await ethers.getContractFactory(
      'Bank',
      accounts[0]
    )) as Bank__factory;
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
  });

  it('Keeps proper default admin roles', async () => {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    // Check first account
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(true);
  });

  it('can enumerate roles', async () => {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    // Grant default admin roles
    await avai.grantRole(DEFAULT_ADMIN_ROLE, accounts[0].address);
    expect(await avai.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.equal(1);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(true);
  });

  it('can revoke and renounce roles', async () => {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    // Grant default admin roles
    await avai.grantRole(DEFAULT_ADMIN_ROLE, accounts[0].address);
    await avai.grantRole(DEFAULT_ADMIN_ROLE, accounts[1].address);
    await avai.grantRole(DEFAULT_ADMIN_ROLE, accounts[2].address);
    expect(await avai.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.equal(3);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(true);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[1].address)
    ).to.equal(true);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[2].address)
    ).to.equal(true);

    await avai.revokeRole(DEFAULT_ADMIN_ROLE, accounts[1].address);
    expect(await avai.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.equal(2);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[1].address)
    ).to.equal(false);

    await avai.renounceRole(DEFAULT_ADMIN_ROLE, accounts[0].address);
    expect(await avai.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.equal(1);
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(false);
  });
  it('assigns proper admin role', async function () {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    // Check first account
    expect(
      await avai.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address)
    ).to.equal(true);
  });

  it("Doesn't assign role to other uses", async () => {
    const DEFAULT_ADMIN_ROLE = await avai.DEFAULT_ADMIN_ROLE();
    const MINTER_ROLE = await avai.MINTER_ROLE();
    const BURNER_ROLE = await avai.BURNER_ROLE();
    // Check rest of accounts
    accounts.slice(1).forEach(async (account) => {
      expect(await avai.hasRole(DEFAULT_ADMIN_ROLE, account.address)).to.equal(
        false
      );
    });

    accounts.forEach(async (account) => {
      expect(await avai.hasRole(MINTER_ROLE, account.address)).to.equal(false);
      expect(await avai.hasRole(BURNER_ROLE, account.address)).to.equal(false);
    });
  });

  it('DEFAULT_ADMIN_ROLE can create MINTER_ROLE', async () => {
    // Should be false initially
    expect(
      await avai.hasRole(await avai.MINTER_ROLE(), accounts[2].address)
    ).to.equal(false);
    // Grant the role
    await avai
      .connect(accounts[0])
      .grantRole(await avai.MINTER_ROLE(), accounts[2].address);
    // Should now be true!
    expect(
      await avai.hasRole(await avai.MINTER_ROLE(), accounts[2].address)
    ).to.equal(true);
  });

  it('No one else can create MINTER_ROLE', async () => {
    expect(
      await avai.hasRole(await avai.MINTER_ROLE(), accounts[2].address)
    ).to.equal(false);
    // Try and grant the role
    await expect(
      avai
        .connect(accounts[1])
        .grantRole(await avai.MINTER_ROLE(), accounts[2].address)
    ).to.be.reverted;

    // Grant role to an account, and then try and grant role
    await avai
      .connect(accounts[0])
      .grantRole(await avai.MINTER_ROLE(), accounts[2].address);

    // Make sure has role
    expect(
      await avai.hasRole(await avai.MINTER_ROLE(), accounts[2].address)
    ).to.equal(true);

    // Try and grant the role
    await expect(
      avai
        .connect(accounts[2])
        .grantRole(await avai.MINTER_ROLE(), accounts[3].address)
    ).to.be.reverted;
  });

  it('allows MINTER_ROLE to mint', async () => {
    // set third account as MINTER_ROLE
    await avai
      .connect(accounts[0])
      .grantRole(await avai.MINTER_ROLE(), accounts[2].address);

    // Mint
    await expect(() =>
      avai.connect(accounts[2]).mint(accounts[0].address, 110000)
    ).to.changeTokenBalance(avai, accounts[0], 110000);
  });

  it("Doesn't allow minting from accounts that are not MINTER_ROLE", async () => {
    // Even default admin shouldn't be allowed to mint
    await expect(avai.connect(accounts[0]).mint(accounts[1].address, 1)).to.be
      .reverted;

    // Check account with no role
    await expect(avai.connect(accounts[1]).mint(accounts[1].address, 1)).to.be
      .reverted;
  });

  it('Allows burning of tokens only to BURNER_ROLE', async () => {
    await avai
      .connect(accounts[0])
      .grantRole(await avai.MINTER_ROLE(), accounts[0].address);
    // Does this with account[0] though
    await avai.mint(accounts[1].address, 110000);
    // Should revert, doesn't have burn allowance
    await expect(avai.burn(accounts[1].address, 50000)).to.be.reverted;

    // Should allow burning now.
    await avai.grantRole(await avai.BURNER_ROLE(), accounts[0].address);

    // Try it!
    await expect(() =>
      avai.burn(accounts[1].address, 50000)
    ).to.changeTokenBalance(avai, accounts[1], -50000);
  });

  it('Successfully adds vaults', async () => {
    await expect(
      avai.addBank(
        150,
        '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD',
        'avAVAX',
        'avAVAX',
        '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'
      )
    ).to.emit(avai, 'CreateVaultType');

    await expect(
      avai.addBank(
        150,
        '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD',
        'avAVAX',
        'avAVAX',
        '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'
      )
    ).to.emit(avai, 'CreateVaultType');

    expect(await avai.banks(1)).to.be.properAddress;
  });

  it('only allows admin to add vaults', async () => {
    await expect(
      avai
        .connect(accounts[1])
        .addBank(
          150,
          '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD',
          'avAVAX',
          'avAVAX',
          '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'
        )
    ).to.be.reverted;
  });

  it('gives minter and burner role to vault', async () => {
    await expect(
      avai.addBank(
        150,
        '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD',
        'avAVAX',
        'avAVAX',
        '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'
      )
    ).to.emit(avai, 'CreateVaultType');
    const vaultAddress = await avai.banks(0);

    expect(await avai.hasRole(await avai.MINTER_ROLE(), vaultAddress)).to.equal(
      true
    );
    expect(await avai.hasRole(await avai.BURNER_ROLE(), vaultAddress)).to.equal(
      true
    );
  });
});
