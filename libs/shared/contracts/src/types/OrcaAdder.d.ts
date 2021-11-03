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

interface OrcaAdderInterface extends ethers.utils.Interface {
  functions: {
    "addBank(address)": FunctionFragment;
    "addLPToken(address)": FunctionFragment;
    "addSwapLP(address,address)": FunctionFragment;
    "addToken(address)": FunctionFragment;
    "addYakStrat(address)": FunctionFragment;
    "allocate()": FunctionFragment;
    "changeDev(address)": FunctionFragment;
    "changeDistributionRatio(uint256,uint256,uint256,uint256)": FunctionFragment;
    "changeSeafund(address)": FunctionFragment;
    "changeTreasury(address)": FunctionFragment;
    "dev()": FunctionFragment;
    "getBankCount()": FunctionFragment;
    "getLPTokens()": FunctionFragment;
    "getTokens()": FunctionFragment;
    "getYakCount()": FunctionFragment;
    "initialize(address,address,address,address,address,address,address,uint256,uint256,uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pod()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "seafund()": FunctionFragment;
    "transferBankVault(uint256,uint256,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferToken(address,address,uint256)": FunctionFragment;
    "treasury()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addBank", values: [string]): string;
  encodeFunctionData(functionFragment: "addLPToken", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addSwapLP",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "addToken", values: [string]): string;
  encodeFunctionData(functionFragment: "addYakStrat", values: [string]): string;
  encodeFunctionData(functionFragment: "allocate", values?: undefined): string;
  encodeFunctionData(functionFragment: "changeDev", values: [string]): string;
  encodeFunctionData(
    functionFragment: "changeDistributionRatio",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeSeafund",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeTreasury",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "dev", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBankCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLPTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getTokens", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getYakCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pod", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "seafund", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferBankVault",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;

  decodeFunctionResult(functionFragment: "addBank", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addLPToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addSwapLP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addYakStrat",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allocate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeDev", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeDistributionRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeSeafund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dev", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBankCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLPTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getYakCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pod", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seafund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferBankVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class OrcaAdder extends BaseContract {
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

  interface: OrcaAdderInterface;

  functions: {
    addBank(
      bank: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addLPToken(
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addSwapLP(
      token: string,
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addYakStrat(
      yak: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    allocate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeDev(
      _dev: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeDistributionRatio(
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeSeafund(
      _seafund: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    dev(overrides?: CallOverrides): Promise<[string]>;

    getBankCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLPTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    getYakCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    initialize(
      _pod: string,
      _orca: string,
      _wavax: string,
      _usdc: string,
      _seafund: string,
      _treasury: string,
      _dev: string,
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pod(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seafund(overrides?: CallOverrides): Promise<[string]>;

    transferBankVault(
      bank: BigNumberish,
      vault: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferToken(
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;
  };

  addBank(
    bank: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addLPToken(
    lp: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addSwapLP(
    token: string,
    lp: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addYakStrat(
    yak: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  allocate(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeDev(
    _dev: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeDistributionRatio(
    _treasuryAmount: BigNumberish,
    _devAmount: BigNumberish,
    _seafundAmount: BigNumberish,
    _podAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeSeafund(
    _seafund: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeTreasury(
    _treasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  dev(overrides?: CallOverrides): Promise<string>;

  getBankCount(overrides?: CallOverrides): Promise<BigNumber>;

  getLPTokens(overrides?: CallOverrides): Promise<BigNumber>;

  getTokens(overrides?: CallOverrides): Promise<BigNumber>;

  getYakCount(overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    _pod: string,
    _orca: string,
    _wavax: string,
    _usdc: string,
    _seafund: string,
    _treasury: string,
    _dev: string,
    _treasuryAmount: BigNumberish,
    _devAmount: BigNumberish,
    _seafundAmount: BigNumberish,
    _podAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pod(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seafund(overrides?: CallOverrides): Promise<string>;

  transferBankVault(
    bank: BigNumberish,
    vault: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferToken(
    _to: string,
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addBank(bank: string, overrides?: CallOverrides): Promise<void>;

    addLPToken(lp: string, overrides?: CallOverrides): Promise<void>;

    addSwapLP(
      token: string,
      lp: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addToken(token: string, overrides?: CallOverrides): Promise<void>;

    addYakStrat(yak: string, overrides?: CallOverrides): Promise<void>;

    allocate(overrides?: CallOverrides): Promise<void>;

    changeDev(_dev: string, overrides?: CallOverrides): Promise<void>;

    changeDistributionRatio(
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeSeafund(_seafund: string, overrides?: CallOverrides): Promise<void>;

    changeTreasury(_treasury: string, overrides?: CallOverrides): Promise<void>;

    dev(overrides?: CallOverrides): Promise<string>;

    getBankCount(overrides?: CallOverrides): Promise<BigNumber>;

    getLPTokens(overrides?: CallOverrides): Promise<BigNumber>;

    getTokens(overrides?: CallOverrides): Promise<BigNumber>;

    getYakCount(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _pod: string,
      _orca: string,
      _wavax: string,
      _usdc: string,
      _seafund: string,
      _treasury: string,
      _dev: string,
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    pod(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    seafund(overrides?: CallOverrides): Promise<string>;

    transferBankVault(
      bank: BigNumberish,
      vault: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferToken(
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;
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
    addBank(
      bank: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addLPToken(
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addSwapLP(
      token: string,
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addYakStrat(
      yak: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    allocate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeDev(
      _dev: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeDistributionRatio(
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeSeafund(
      _seafund: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    dev(overrides?: CallOverrides): Promise<BigNumber>;

    getBankCount(overrides?: CallOverrides): Promise<BigNumber>;

    getLPTokens(overrides?: CallOverrides): Promise<BigNumber>;

    getTokens(overrides?: CallOverrides): Promise<BigNumber>;

    getYakCount(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _pod: string,
      _orca: string,
      _wavax: string,
      _usdc: string,
      _seafund: string,
      _treasury: string,
      _dev: string,
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pod(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seafund(overrides?: CallOverrides): Promise<BigNumber>;

    transferBankVault(
      bank: BigNumberish,
      vault: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferToken(
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addBank(
      bank: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addLPToken(
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addSwapLP(
      token: string,
      lp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addYakStrat(
      yak: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    allocate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeDev(
      _dev: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeDistributionRatio(
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeSeafund(
      _seafund: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    dev(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBankCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLPTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getYakCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _pod: string,
      _orca: string,
      _wavax: string,
      _usdc: string,
      _seafund: string,
      _treasury: string,
      _dev: string,
      _treasuryAmount: BigNumberish,
      _devAmount: BigNumberish,
      _seafundAmount: BigNumberish,
      _podAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seafund(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferBankVault(
      bank: BigNumberish,
      vault: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferToken(
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
