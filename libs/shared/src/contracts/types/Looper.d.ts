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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface LooperInterface extends ethers.utils.Interface {
  functions: {
    "authorizeVault()": FunctionFragment;
    "avai()": FunctionFragment;
    "avaiIndex()": FunctionFragment;
    "bank()": FunctionFragment;
    "deposit(uint256,uint256,uint8,uint16)": FunctionFragment;
    "destroyVault(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "shareToken()": FunctionFragment;
    "swap()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "underlyingIndex()": FunctionFragment;
    "underlyingToken()": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "authorizeVault",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "avai", values?: undefined): string;
  encodeFunctionData(functionFragment: "avaiIndex", values?: undefined): string;
  encodeFunctionData(functionFragment: "bank", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "destroyVault",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "shareToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "swap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "underlyingIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "underlyingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "avai", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "avaiIndex", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bank", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "destroyVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "shareToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "underlyingIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "underlyingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class Looper extends BaseContract {
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

  interface: LooperInterface;

  functions: {
    authorizeVault(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    avai(overrides?: CallOverrides): Promise<[string]>;

    avaiIndex(overrides?: CallOverrides): Promise<[number]>;

    bank(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      vaultID: BigNumberish,
      amount: BigNumberish,
      loops: BigNumberish,
      maxBorrow: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    shareToken(overrides?: CallOverrides): Promise<[string]>;

    swap(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    underlyingIndex(overrides?: CallOverrides): Promise<[number]>;

    underlyingToken(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  authorizeVault(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  avai(overrides?: CallOverrides): Promise<string>;

  avaiIndex(overrides?: CallOverrides): Promise<number>;

  bank(overrides?: CallOverrides): Promise<string>;

  deposit(
    vaultID: BigNumberish,
    amount: BigNumberish,
    loops: BigNumberish,
    maxBorrow: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  destroyVault(
    vaultID: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  shareToken(overrides?: CallOverrides): Promise<string>;

  swap(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  underlyingIndex(overrides?: CallOverrides): Promise<number>;

  underlyingToken(overrides?: CallOverrides): Promise<string>;

  withdraw(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authorizeVault(overrides?: CallOverrides): Promise<void>;

    avai(overrides?: CallOverrides): Promise<string>;

    avaiIndex(overrides?: CallOverrides): Promise<number>;

    bank(overrides?: CallOverrides): Promise<string>;

    deposit(
      vaultID: BigNumberish,
      amount: BigNumberish,
      loops: BigNumberish,
      maxBorrow: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    shareToken(overrides?: CallOverrides): Promise<string>;

    swap(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    underlyingIndex(overrides?: CallOverrides): Promise<number>;

    underlyingToken(overrides?: CallOverrides): Promise<string>;

    withdraw(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    authorizeVault(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    avai(overrides?: CallOverrides): Promise<BigNumber>;

    avaiIndex(overrides?: CallOverrides): Promise<BigNumber>;

    bank(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      vaultID: BigNumberish,
      amount: BigNumberish,
      loops: BigNumberish,
      maxBorrow: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    shareToken(overrides?: CallOverrides): Promise<BigNumber>;

    swap(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    underlyingIndex(overrides?: CallOverrides): Promise<BigNumber>;

    underlyingToken(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authorizeVault(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    avai(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    avaiIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bank(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      vaultID: BigNumberish,
      amount: BigNumberish,
      loops: BigNumberish,
      maxBorrow: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    shareToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    underlyingIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    underlyingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
