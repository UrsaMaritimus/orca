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
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
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
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "BaseVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseVault__factory>;
    getContractFactory(
      name: "IBaseVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBaseVault__factory>;
    getContractFactory(
      name: "ILiquidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiquidator__factory>;
    getContractFactory(
      name: "IStablecoin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStablecoin__factory>;
    getContractFactory(
      name: "IStakingRewards",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakingRewards__factory>;
    getContractFactory(
      name: "IVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVault__factory>;
    getContractFactory(
      name: "IWAVAX",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWAVAX__factory>;
    getContractFactory(
      name: "Liquidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Liquidator__factory>;
    getContractFactory(
      name: "AVAXLiquidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AVAXLiquidator__factory>;
    getContractFactory(
      name: "Stablecoin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Stablecoin__factory>;
    getContractFactory(
      name: "PriceSource",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PriceSource__factory>;
    getContractFactory(
      name: "AVAI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AVAI__factory>;
    getContractFactory(
      name: "AVAXVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AVAXVault__factory>;
    getContractFactory(
      name: "ERC20Vault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Vault__factory>;

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
