/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "IERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "IERC20MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC721ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "BeaconProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BeaconProxy__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20Votes",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Votes__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Bank",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bank__factory>;
    getContractFactory(
      name: "IBank",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBank__factory>;
    getContractFactory(
      name: "ILiquidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiquidator__factory>;
    getContractFactory(
      name: "IStablecoin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStablecoin__factory>;
    getContractFactory(
      name: "IWAVAX",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWAVAX__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "TimelockController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TimelockController__factory>;
    getContractFactory(
      name: "OracleBridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OracleBridge__factory>;
    getContractFactory(
      name: "ORCA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ORCA__factory>;
    getContractFactory(
      name: "OrcaStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrcaStaking__factory>;
    getContractFactory(
      name: "UpgradeableBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradeableBeacon__factory>;
    getContractFactory(
      name: "WAVAX",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WAVAX__factory>;
    getContractFactory(
      name: "PodLeader",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PodLeader__factory>;
    getContractFactory(
      name: "PodLeader",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PodLeader__factory>;
    getContractFactory(
      name: "AVAI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AVAI__factory>;
    getContractFactory(
      name: "TeamPayment",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TeamPayment__factory>;
    getContractFactory(
      name: "FakeBTC",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FakeBTC__factory>;
    getContractFactory(
      name: "PriceSource",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PriceSource__factory>;
    getContractFactory(
      name: "FakeUSDC",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FakeUSDC__factory>;
    getContractFactory(
      name: "Bankv2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bankv2__factory>;
    getContractFactory(
      name: "AVAIv2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AVAIv2__factory>;
    getContractFactory(
      name: "USDCExchangev2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.USDCExchangev2__factory>;
    getContractFactory(
      name: "USDCExchange",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.USDCExchange__factory>;
    getContractFactory(
      name: "OrcaTeamVesting",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrcaTeamVesting__factory>;
    getContractFactory(
      name: "VestingWallet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VestingWallet__factory>;
    getContractFactory(
      name: "WAVAXGateway",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WAVAXGateway__factory>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
  }
}
