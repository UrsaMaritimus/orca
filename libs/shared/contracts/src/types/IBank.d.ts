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

interface IBankInterface extends ethers.utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "changeTreasury(address)": FunctionFragment;
    "depositCollateral(uint256,uint256)": FunctionFragment;
    "destroyVault(uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getPaid(address)": FunctionFragment;
    "initialize(uint256,address,string,string,address,address)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setClosingFee(uint256)": FunctionFragment;
    "setDebtCeiling(uint256)": FunctionFragment;
    "setDebtRatio(uint256)": FunctionFragment;
    "setGainRatio(uint256)": FunctionFragment;
    "setGateway(address)": FunctionFragment;
    "setMinimumDebt(uint256)": FunctionFragment;
    "setMintingPaused(bool)": FunctionFragment;
    "setOpeningFee(uint256)": FunctionFragment;
    "setPriceSource(address)": FunctionFragment;
    "setStabilityPool(address)": FunctionFragment;
    "setTokenPeg(uint256)": FunctionFragment;
    "setTreasury(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferVault(uint256,address)": FunctionFragment;
    "vaultExists(uint256)": FunctionFragment;
    "withdrawCollateral(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "changeTreasury",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "destroyVault",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPaid", values: [string]): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [BigNumberish, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setClosingFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDebtCeiling",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDebtRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setGainRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setGateway", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setMinimumDebt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMintingPaused",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setOpeningFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPriceSource",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStabilityPool",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPeg",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTreasury",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferVault",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "vaultExists",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCollateral",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "destroyVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPaid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setClosingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDebtCeiling",
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
  decodeFunctionResult(functionFragment: "setGateway", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMinimumDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMintingPaused",
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
    functionFragment: "setStabilityPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPeg",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vaultExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCollateral",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class IBank extends BaseContract {
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

  interface: IBankInterface;

  functions: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    changeTreasury(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { operator: string }>;

    getPaid(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      minimumCollateralPercentage_: BigNumberish,
      priceSource_: string,
      name_: string,
      symbol_: string,
      token_: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { owner: string }>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setClosingFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDebtCeiling(
      debtCeiling_: BigNumberish,
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

    setGateway(
      gateway_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinimumDebt(
      minimumDebt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMintingPaused(
      paused_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOpeningFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPriceSource(
      priceSource_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStabilityPool(
      stabilityPool_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenPeg(
      tokenPeg_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      treasury_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferVault(
      vaultID: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vaultExists(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    withdrawCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  changeTreasury(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositCollateral(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  destroyVault(
    vaultID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getPaid(
    user: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    minimumCollateralPercentage_: BigNumberish,
    priceSource_: string,
    name_: string,
    symbol_: string,
    token_: string,
    owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    _approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setClosingFee(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDebtCeiling(
    debtCeiling_: BigNumberish,
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

  setGateway(
    gateway_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinimumDebt(
    minimumDebt_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMintingPaused(
    paused_: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOpeningFee(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPriceSource(
    priceSource_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStabilityPool(
    stabilityPool_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenPeg(
    tokenPeg_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    treasury_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferVault(
    vaultID: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vaultExists(
    vaultID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  withdrawCollateral(
    vaultID: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    changeTreasury(to: string, overrides?: CallOverrides): Promise<void>;

    depositCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getPaid(user: string, overrides?: CallOverrides): Promise<void>;

    initialize(
      minimumCollateralPercentage_: BigNumberish,
      priceSource_: string,
      name_: string,
      symbol_: string,
      token_: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setClosingFee(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDebtCeiling(
      debtCeiling_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDebtRatio(
      debtRatio_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGainRatio(
      gainRatio_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGateway(gateway_: string, overrides?: CallOverrides): Promise<void>;

    setMinimumDebt(
      minimumDebt_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMintingPaused(
      paused_: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setOpeningFee(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPriceSource(
      priceSource_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setStabilityPool(
      stabilityPool_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenPeg(
      tokenPeg_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasury(
      treasury_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferVault(
      vaultID: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vaultExists(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdrawCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;
  };

  estimateGas: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    changeTreasury(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPaid(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      minimumCollateralPercentage_: BigNumberish,
      priceSource_: string,
      name_: string,
      symbol_: string,
      token_: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setClosingFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDebtCeiling(
      debtCeiling_: BigNumberish,
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

    setGateway(
      gateway_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinimumDebt(
      minimumDebt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMintingPaused(
      paused_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOpeningFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPriceSource(
      priceSource_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStabilityPool(
      stabilityPool_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenPeg(
      tokenPeg_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasury(
      treasury_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferVault(
      vaultID: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vaultExists(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeTreasury(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    destroyVault(
      vaultID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPaid(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      minimumCollateralPercentage_: BigNumberish,
      priceSource_: string,
      name_: string,
      symbol_: string,
      token_: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setClosingFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDebtCeiling(
      debtCeiling_: BigNumberish,
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

    setGateway(
      gateway_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinimumDebt(
      minimumDebt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMintingPaused(
      paused_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOpeningFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPriceSource(
      priceSource_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStabilityPool(
      stabilityPool_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenPeg(
      tokenPeg_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      treasury_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferVault(
      vaultID: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vaultExists(
      vaultID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawCollateral(
      vaultID: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
