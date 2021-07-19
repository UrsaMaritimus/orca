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

interface AVAXLiquidatorInterface extends ethers.utils.Interface {
  functions: {
    "checkCollat(uint256)": FunctionFragment;
    "checkCost(uint256)": FunctionFragment;
    "checkExtract(uint256)": FunctionFragment;
    "checkLiquidation(uint256)": FunctionFragment;
    "checkValid(uint256)": FunctionFragment;
    "debtRatio()": FunctionFragment;
    "gainRatio()": FunctionFragment;
    "getPaid()": FunctionFragment;
    "liquidateVault(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setDebtRatio(uint256)": FunctionFragment;
    "setGainRatio(uint256)": FunctionFragment;
    "setTreasury(address)": FunctionFragment;
    "stablecoin()": FunctionFragment;
    "tokenDebt(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
    "vault()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "checkCollat",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkCost",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkExtract",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkLiquidation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkValid",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "debtRatio", values?: undefined): string;
  encodeFunctionData(functionFragment: "gainRatio", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPaid", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "liquidateVault",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDebtRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setGainRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setTreasury", values: [string]): string;
  encodeFunctionData(
    functionFragment: "stablecoin",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "tokenDebt", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "checkCollat",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "checkCost", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkExtract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkLiquidation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "checkValid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debtRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gainRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPaid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidateVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDebtRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGainRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stablecoin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenDebt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;

  events: {
    "CreateVaultType(uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateVaultType"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class AVAXLiquidator extends BaseContract {
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

  interface: AVAXLiquidatorInterface;

  functions: {
    checkCollat(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    checkCost(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    checkExtract(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    checkLiquidation(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[void]>;

    checkValid(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber, BigNumber, BigNumber]>;

    debtRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    gainRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPaid(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidateVault(
      vaultId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDebtRatio(
      debtRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGainRatio(
      gainRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      newTreasury_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stablecoin(overrides?: CallOverrides): Promise<[string]>;

    tokenDebt(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    vault(overrides?: CallOverrides): Promise<[string]>;
  };

  checkCollat(
    vaultId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  checkCost(
    vaultId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  checkExtract(
    vaultId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  checkLiquidation(
    vaultId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<void>;

  checkValid(
    vaultId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[boolean, BigNumber, BigNumber, BigNumber]>;

  debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

  gainRatio(overrides?: CallOverrides): Promise<BigNumber>;

  getPaid(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidateVault(
    vaultId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDebtRatio(
    debtRatio_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGainRatio(
    gainRatio_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    newTreasury_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stablecoin(overrides?: CallOverrides): Promise<string>;

  tokenDebt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  vault(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    checkCollat(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    checkCost(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkExtract(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkLiquidation(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    checkValid(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber, BigNumber, BigNumber]>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    gainRatio(overrides?: CallOverrides): Promise<BigNumber>;

    getPaid(overrides?: CallOverrides): Promise<void>;

    liquidateVault(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setDebtRatio(
      debtRatio_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGainRatio(
      gainRatio_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasury(newTreasury_: string, overrides?: CallOverrides): Promise<void>;

    stablecoin(overrides?: CallOverrides): Promise<string>;

    tokenDebt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;

    vault(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    CreateVaultType(
      vaultID?: null,
      vault?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { vaultID: BigNumber; vault: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    checkCollat(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkCost(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkExtract(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkLiquidation(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkValid(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    gainRatio(overrides?: CallOverrides): Promise<BigNumber>;

    getPaid(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidateVault(
      vaultId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDebtRatio(
      debtRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGainRatio(
      gainRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasury(
      newTreasury_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stablecoin(overrides?: CallOverrides): Promise<BigNumber>;

    tokenDebt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    vault(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    checkCollat(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkCost(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkExtract(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkLiquidation(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkValid(
      vaultId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    debtRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gainRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPaid(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidateVault(
      vaultId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDebtRatio(
      debtRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGainRatio(
      gainRatio_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      newTreasury_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stablecoin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenDebt(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
