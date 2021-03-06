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

interface USDCExchangev2Interface extends ethers.utils.Interface {
  functions: {
    "avai()": FunctionFragment;
    "avaiRate()": FunctionFragment;
    "changeTreasury(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "mint(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "redeem(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAVAIRate(uint256)": FunctionFragment;
    "setHourlyLimit(uint256)": FunctionFragment;
    "setUSDCRate(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
    "usdReserves()": FunctionFragment;
    "usdc()": FunctionFragment;
    "usdcRate()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "avai", values?: undefined): string;
  encodeFunctionData(functionFragment: "avaiRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeTreasury",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAVAIRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setHourlyLimit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setUSDCRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "usdReserves",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "usdc", values?: undefined): string;
  encodeFunctionData(functionFragment: "usdcRate", values?: undefined): string;

  decodeFunctionResult(functionFragment: "avai", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "avaiRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAVAIRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setHourlyLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUSDCRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "usdReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usdc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "usdcRate", data: BytesLike): Result;

  events: {
    "ChangeAVAIRate(uint256)": EventFragment;
    "ChangeHourlyLimit(uint256)": EventFragment;
    "ChangeTreasury(address)": EventFragment;
    "ChangeUSDCRate(uint256)": EventFragment;
    "Mint(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Redeem(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeAVAIRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangeHourlyLimit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangeTreasury"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangeUSDCRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
}

export class USDCExchangev2 extends BaseContract {
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

  interface: USDCExchangev2Interface;

  functions: {
    avai(overrides?: CallOverrides): Promise<[string]>;

    avaiRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    changeTreasury(
      newTreasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      usdc_: string,
      avai_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mint(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    redeem(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAVAIRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setHourlyLimit(
      _limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUSDCRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    usdReserves(overrides?: CallOverrides): Promise<[BigNumber]>;

    usdc(overrides?: CallOverrides): Promise<[string]>;

    usdcRate(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  avai(overrides?: CallOverrides): Promise<string>;

  avaiRate(overrides?: CallOverrides): Promise<BigNumber>;

  changeTreasury(
    newTreasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    usdc_: string,
    avai_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mint(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  redeem(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAVAIRate(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setHourlyLimit(
    _limit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUSDCRate(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  usdReserves(overrides?: CallOverrides): Promise<BigNumber>;

  usdc(overrides?: CallOverrides): Promise<string>;

  usdcRate(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    avai(overrides?: CallOverrides): Promise<string>;

    avaiRate(overrides?: CallOverrides): Promise<BigNumber>;

    changeTreasury(
      newTreasury: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      usdc_: string,
      avai_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    mint(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    redeem(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAVAIRate(_rate: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setHourlyLimit(
      _limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setUSDCRate(_rate: BigNumberish, overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;

    usdReserves(overrides?: CallOverrides): Promise<BigNumber>;

    usdc(overrides?: CallOverrides): Promise<string>;

    usdcRate(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    ChangeAVAIRate(
      newAVAIRate?: null
    ): TypedEventFilter<[BigNumber], { newAVAIRate: BigNumber }>;

    ChangeHourlyLimit(
      newHourlyLimit?: null
    ): TypedEventFilter<[BigNumber], { newHourlyLimit: BigNumber }>;

    ChangeTreasury(
      newTreasury?: null
    ): TypedEventFilter<[string], { newTreasury: string }>;

    ChangeUSDCRate(
      newUSDCRate?: null
    ): TypedEventFilter<[BigNumber], { newUSDCRate: BigNumber }>;

    Mint(
      minter?: null,
      amount?: null,
      fee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { minter: string; amount: BigNumber; fee: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Redeem(
      redeemer?: null,
      amount?: null,
      fee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { redeemer: string; amount: BigNumber; fee: BigNumber }
    >;
  };

  estimateGas: {
    avai(overrides?: CallOverrides): Promise<BigNumber>;

    avaiRate(overrides?: CallOverrides): Promise<BigNumber>;

    changeTreasury(
      newTreasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      usdc_: string,
      avai_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mint(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    redeem(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAVAIRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setHourlyLimit(
      _limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUSDCRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    usdReserves(overrides?: CallOverrides): Promise<BigNumber>;

    usdc(overrides?: CallOverrides): Promise<BigNumber>;

    usdcRate(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    avai(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    avaiRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeTreasury(
      newTreasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      usdc_: string,
      avai_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeem(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAVAIRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setHourlyLimit(
      _limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUSDCRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdc(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdcRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
