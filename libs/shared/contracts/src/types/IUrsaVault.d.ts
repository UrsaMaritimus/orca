/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IUrsaVaultInterface extends ethers.utils.Interface {
  functions: {
    "addVaultCollateral(uint256,uint256)": FunctionFragment;
    "addVaultDebt(uint256,uint256)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "createVaultType(address,uint256,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "getBase(uint256)": FunctionFragment;
    "getClosingFee(uint256)": FunctionFragment;
    "getDebtCeiling(uint256)": FunctionFragment;
    "getMinimumCollateralPercentage(uint256)": FunctionFragment;
    "getOpeningFee(uint256)": FunctionFragment;
    "getPriceSource(uint256)": FunctionFragment;
    "getTokenPriceSource(uint256)": FunctionFragment;
    "getTotalDebt(uint256)": FunctionFragment;
    "getVaultCollateral(uint256)": FunctionFragment;
    "getVaultDebt(uint256)": FunctionFragment;
    "getVaultOwner(uint256)": FunctionFragment;
    "getVaultVaultType(uint256)": FunctionFragment;
    "isKnownVault(uint256)": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "setBase(uint256,address)": FunctionFragment;
    "setClosingFee(uint256,uint256)": FunctionFragment;
    "setDebtCeiling(uint256,uint256)": FunctionFragment;
    "setMinimumCollateralPercentage(uint256,uint256)": FunctionFragment;
    "setOpeningFee(uint256,uint256)": FunctionFragment;
    "setPriceSource(uint256,address)": FunctionFragment;
    "setTokenPricePeg(uint256,uint256)": FunctionFragment;
    "subVaultCollateral(uint256,uint256)": FunctionFragment;
    "subVaultDebt(uint256,uint256)": FunctionFragment;
    "totalVaults()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addVaultCollateral",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addVaultDebt",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "createVaultType",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getBase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getClosingFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDebtCeiling",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMinimumCollateralPercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOpeningFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceSource",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPriceSource",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalDebt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultCollateral",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultDebt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultVaultType",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isKnownVault",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBase",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setClosingFee",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDebtCeiling",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinimumCollateralPercentage",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setOpeningFee",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPriceSource",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPricePeg",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "subVaultCollateral",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "subVaultDebt",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalVaults",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addVaultCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addVaultDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createVaultType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClosingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDebtCeiling",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinimumCollateralPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOpeningFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriceSource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPriceSource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultVaultType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isKnownVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setBase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setClosingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDebtCeiling",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinimumCollateralPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOpeningFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPriceSource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPricePeg",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subVaultCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subVaultDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalVaults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;

  events: {
    "CreateVault(uint256,address)": EventFragment;
    "CreateVaultType(uint256,string)": EventFragment;
    "DestroyVault(uint256)": EventFragment;
    "TransferVault(uint256,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateVaultType"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DestroyVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferVault"): EventFragment;
}

export class IUrsaVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IUrsaVaultInterface;

  functions: {
    addVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createVaultType(
      base: string,
      debtCeiling: BigNumberish,
      closingFee: BigNumberish,
      openingFee: BigNumberish,
      tokenPeg: BigNumberish,
      avaxPriceSourceAddress: string,
      minimumCollateralPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBase(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getClosingFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getDebtCeiling(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMinimumCollateralPercentage(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOpeningFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTotalDebt(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVaultCollateral(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVaultDebt(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVaultOwner(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getVaultVaultType(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isKnownVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mint(
      to: string,
      vaultType: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBase(
      vaultType: BigNumberish,
      _base: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setClosingFee(
      vaultType: BigNumberish,
      _closingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDebtCeiling(
      vaultType: BigNumberish,
      _debtCeiling: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinimumCollateralPercentage(
      vaultType: BigNumberish,
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOpeningFee(
      vaultType: BigNumberish,
      _openingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPriceSource(
      vaultType: BigNumberish,
      _priceSource: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenPricePeg(
      vaultType: BigNumberish,
      _tokenPriceSource: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    subVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    subVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalVaults(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addVaultCollateral(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addVaultDebt(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burn(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createVaultType(
    base: string,
    debtCeiling: BigNumberish,
    closingFee: BigNumberish,
    openingFee: BigNumberish,
    tokenPeg: BigNumberish,
    avaxPriceSourceAddress: string,
    minimumCollateralPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBase(vaultType: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getClosingFee(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDebtCeiling(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMinimumCollateralPercentage(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOpeningFee(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPriceSource(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenPriceSource(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTotalDebt(
    vaultType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVaultCollateral(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVaultDebt(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVaultOwner(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getVaultVaultType(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isKnownVault(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mint(
    to: string,
    vaultType: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBase(
    vaultType: BigNumberish,
    _base: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setClosingFee(
    vaultType: BigNumberish,
    _closingFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDebtCeiling(
    vaultType: BigNumberish,
    _debtCeiling: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinimumCollateralPercentage(
    vaultType: BigNumberish,
    _percentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOpeningFee(
    vaultType: BigNumberish,
    _openingFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPriceSource(
    vaultType: BigNumberish,
    _priceSource: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenPricePeg(
    vaultType: BigNumberish,
    _tokenPriceSource: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  subVaultCollateral(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  subVaultDebt(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalVaults(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    createVaultType(
      base: string,
      debtCeiling: BigNumberish,
      closingFee: BigNumberish,
      openingFee: BigNumberish,
      tokenPeg: BigNumberish,
      avaxPriceSourceAddress: string,
      minimumCollateralPercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getBase(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getClosingFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDebtCeiling(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMinimumCollateralPercentage(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOpeningFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalDebt(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateral(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultDebt(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultOwner(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getVaultVaultType(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isKnownVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(
      to: string,
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setBase(
      vaultType: BigNumberish,
      _base: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setClosingFee(
      vaultType: BigNumberish,
      _closingFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDebtCeiling(
      vaultType: BigNumberish,
      _debtCeiling: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinimumCollateralPercentage(
      vaultType: BigNumberish,
      _percentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOpeningFee(
      vaultType: BigNumberish,
      _openingFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPriceSource(
      vaultType: BigNumberish,
      _priceSource: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenPricePeg(
      vaultType: BigNumberish,
      _tokenPriceSource: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    subVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    subVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalVaults(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    CreateVault(
      vaultID?: null,
      creator?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { vaultID: BigNumber; creator: string }
    >;

    CreateVaultType(
      vaultID?: null,
      name?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { vaultID: BigNumber; name: string }
    >;

    DestroyVault(
      vaultID?: null
    ): TypedEventFilter<[BigNumber], { vaultID: BigNumber }>;

    TransferVault(
      vaultID?: null,
      from?: null,
      to?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { vaultID: BigNumber; from: string; to: string }
    >;
  };

  estimateGas: {
    addVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createVaultType(
      base: string,
      debtCeiling: BigNumberish,
      closingFee: BigNumberish,
      openingFee: BigNumberish,
      tokenPeg: BigNumberish,
      avaxPriceSourceAddress: string,
      minimumCollateralPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBase(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClosingFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDebtCeiling(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMinimumCollateralPercentage(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOpeningFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalDebt(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateral(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultDebt(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultOwner(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultVaultType(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isKnownVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      to: string,
      vaultType: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBase(
      vaultType: BigNumberish,
      _base: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setClosingFee(
      vaultType: BigNumberish,
      _closingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDebtCeiling(
      vaultType: BigNumberish,
      _debtCeiling: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinimumCollateralPercentage(
      vaultType: BigNumberish,
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOpeningFee(
      vaultType: BigNumberish,
      _openingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPriceSource(
      vaultType: BigNumberish,
      _priceSource: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenPricePeg(
      vaultType: BigNumberish,
      _tokenPriceSource: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    subVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    subVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalVaults(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createVaultType(
      base: string,
      debtCeiling: BigNumberish,
      closingFee: BigNumberish,
      openingFee: BigNumberish,
      tokenPeg: BigNumberish,
      avaxPriceSourceAddress: string,
      minimumCollateralPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBase(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClosingFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDebtCeiling(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMinimumCollateralPercentage(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOpeningFee(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenPriceSource(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalDebt(
      vaultType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultCollateral(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultDebt(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultOwner(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultVaultType(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isKnownVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      to: string,
      vaultType: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBase(
      vaultType: BigNumberish,
      _base: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setClosingFee(
      vaultType: BigNumberish,
      _closingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDebtCeiling(
      vaultType: BigNumberish,
      _debtCeiling: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinimumCollateralPercentage(
      vaultType: BigNumberish,
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOpeningFee(
      vaultType: BigNumberish,
      _openingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPriceSource(
      vaultType: BigNumberish,
      _priceSource: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenPricePeg(
      vaultType: BigNumberish,
      _tokenPriceSource: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    subVaultCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    subVaultDebt(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalVaults(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
