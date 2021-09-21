import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type Bundle = {
  __typename?: 'Bundle';
  ethPrice: Scalars['BigDecimal'];
  id: Scalars['ID'];
};

export type Bundle_Filter = {
  ethPrice?: Maybe<Scalars['BigDecimal']>;
  ethPrice_gt?: Maybe<Scalars['BigDecimal']>;
  ethPrice_gte?: Maybe<Scalars['BigDecimal']>;
  ethPrice_in?: Maybe<Array<Scalars['BigDecimal']>>;
  ethPrice_lt?: Maybe<Scalars['BigDecimal']>;
  ethPrice_lte?: Maybe<Scalars['BigDecimal']>;
  ethPrice_not?: Maybe<Scalars['BigDecimal']>;
  ethPrice_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Bundle_OrderBy {
  EthPrice = 'ethPrice',
  Id = 'id'
}

export type Burn = {
  __typename?: 'Burn';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  needsComplete: Scalars['Boolean'];
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['BigInt'];
  to?: Maybe<Scalars['Bytes']>;
  transaction: Transaction;
};

export type Burn_Filter = {
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount0_gt?: Maybe<Scalars['BigDecimal']>;
  amount0_gte?: Maybe<Scalars['BigDecimal']>;
  amount0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: Maybe<Scalars['BigDecimal']>;
  amount0_lte?: Maybe<Scalars['BigDecimal']>;
  amount0_not?: Maybe<Scalars['BigDecimal']>;
  amount0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amount1_gt?: Maybe<Scalars['BigDecimal']>;
  amount1_gte?: Maybe<Scalars['BigDecimal']>;
  amount1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: Maybe<Scalars['BigDecimal']>;
  amount1_lte?: Maybe<Scalars['BigDecimal']>;
  amount1_not?: Maybe<Scalars['BigDecimal']>;
  amount1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeTo?: Maybe<Scalars['Bytes']>;
  feeTo_contains?: Maybe<Scalars['Bytes']>;
  feeTo_in?: Maybe<Array<Scalars['Bytes']>>;
  feeTo_not?: Maybe<Scalars['Bytes']>;
  feeTo_not_contains?: Maybe<Scalars['Bytes']>;
  feeTo_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidity?: Maybe<Scalars['BigDecimal']>;
  liquidity_gt?: Maybe<Scalars['BigDecimal']>;
  liquidity_gte?: Maybe<Scalars['BigDecimal']>;
  liquidity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: Maybe<Scalars['BigDecimal']>;
  liquidity_lte?: Maybe<Scalars['BigDecimal']>;
  liquidity_not?: Maybe<Scalars['BigDecimal']>;
  liquidity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  logIndex?: Maybe<Scalars['BigInt']>;
  logIndex_gt?: Maybe<Scalars['BigInt']>;
  logIndex_gte?: Maybe<Scalars['BigInt']>;
  logIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: Maybe<Scalars['BigInt']>;
  logIndex_lte?: Maybe<Scalars['BigInt']>;
  logIndex_not?: Maybe<Scalars['BigInt']>;
  logIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  needsComplete?: Maybe<Scalars['Boolean']>;
  needsComplete_in?: Maybe<Array<Scalars['Boolean']>>;
  needsComplete_not?: Maybe<Scalars['Boolean']>;
  needsComplete_not_in?: Maybe<Array<Scalars['Boolean']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['Bytes']>;
  sender_contains?: Maybe<Scalars['Bytes']>;
  sender_in?: Maybe<Array<Scalars['Bytes']>>;
  sender_not?: Maybe<Scalars['Bytes']>;
  sender_not_contains?: Maybe<Scalars['Bytes']>;
  sender_not_in?: Maybe<Array<Scalars['Bytes']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  to?: Maybe<Scalars['Bytes']>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
};

export enum Burn_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  NeedsComplete = 'needsComplete',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export type LiquidityPosition = {
  __typename?: 'LiquidityPosition';
  id: Scalars['ID'];
  liquidityTokenBalance: Scalars['BigDecimal'];
  pair: Pair;
  user: User;
};

export type LiquidityPositionSnapshot = {
  __typename?: 'LiquidityPositionSnapshot';
  block: Scalars['Int'];
  id: Scalars['ID'];
  liquidityPosition: LiquidityPosition;
  liquidityTokenBalance: Scalars['BigDecimal'];
  liquidityTokenTotalSupply: Scalars['BigDecimal'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  timestamp: Scalars['Int'];
  token0PriceUSD: Scalars['BigDecimal'];
  token1PriceUSD: Scalars['BigDecimal'];
  user: User;
};

export type LiquidityPositionSnapshot_Filter = {
  block?: Maybe<Scalars['Int']>;
  block_gt?: Maybe<Scalars['Int']>;
  block_gte?: Maybe<Scalars['Int']>;
  block_in?: Maybe<Array<Scalars['Int']>>;
  block_lt?: Maybe<Scalars['Int']>;
  block_lte?: Maybe<Scalars['Int']>;
  block_not?: Maybe<Scalars['Int']>;
  block_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidityPosition?: Maybe<Scalars['String']>;
  liquidityPosition_contains?: Maybe<Scalars['String']>;
  liquidityPosition_ends_with?: Maybe<Scalars['String']>;
  liquidityPosition_gt?: Maybe<Scalars['String']>;
  liquidityPosition_gte?: Maybe<Scalars['String']>;
  liquidityPosition_in?: Maybe<Array<Scalars['String']>>;
  liquidityPosition_lt?: Maybe<Scalars['String']>;
  liquidityPosition_lte?: Maybe<Scalars['String']>;
  liquidityPosition_not?: Maybe<Scalars['String']>;
  liquidityPosition_not_contains?: Maybe<Scalars['String']>;
  liquidityPosition_not_ends_with?: Maybe<Scalars['String']>;
  liquidityPosition_not_in?: Maybe<Array<Scalars['String']>>;
  liquidityPosition_not_starts_with?: Maybe<Scalars['String']>;
  liquidityPosition_starts_with?: Maybe<Scalars['String']>;
  liquidityTokenBalance?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_lt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply_lt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_lte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_not?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  reserve0?: Maybe<Scalars['BigDecimal']>;
  reserve0_gt?: Maybe<Scalars['BigDecimal']>;
  reserve0_gte?: Maybe<Scalars['BigDecimal']>;
  reserve0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: Maybe<Scalars['BigDecimal']>;
  reserve0_lte?: Maybe<Scalars['BigDecimal']>;
  reserve0_not?: Maybe<Scalars['BigDecimal']>;
  reserve0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1?: Maybe<Scalars['BigDecimal']>;
  reserve1_gt?: Maybe<Scalars['BigDecimal']>;
  reserve1_gte?: Maybe<Scalars['BigDecimal']>;
  reserve1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: Maybe<Scalars['BigDecimal']>;
  reserve1_lte?: Maybe<Scalars['BigDecimal']>;
  reserve1_not?: Maybe<Scalars['BigDecimal']>;
  reserve1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['Int']>;
  timestamp_gt?: Maybe<Scalars['Int']>;
  timestamp_gte?: Maybe<Scalars['Int']>;
  timestamp_in?: Maybe<Array<Scalars['Int']>>;
  timestamp_lt?: Maybe<Scalars['Int']>;
  timestamp_lte?: Maybe<Scalars['Int']>;
  timestamp_not?: Maybe<Scalars['Int']>;
  timestamp_not_in?: Maybe<Array<Scalars['Int']>>;
  token0PriceUSD?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_gt?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_gte?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token0PriceUSD_lt?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_lte?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_not?: Maybe<Scalars['BigDecimal']>;
  token0PriceUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_gt?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_gte?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD_lt?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_lte?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_not?: Maybe<Scalars['BigDecimal']>;
  token1PriceUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum LiquidityPositionSnapshot_OrderBy {
  Block = 'block',
  Id = 'id',
  LiquidityPosition = 'liquidityPosition',
  LiquidityTokenBalance = 'liquidityTokenBalance',
  LiquidityTokenTotalSupply = 'liquidityTokenTotalSupply',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Timestamp = 'timestamp',
  Token0PriceUsd = 'token0PriceUSD',
  Token1PriceUsd = 'token1PriceUSD',
  User = 'user'
}

export type LiquidityPosition_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidityTokenBalance?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_lt?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: Maybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  user_contains?: Maybe<Scalars['String']>;
  user_ends_with?: Maybe<Scalars['String']>;
  user_gt?: Maybe<Scalars['String']>;
  user_gte?: Maybe<Scalars['String']>;
  user_in?: Maybe<Array<Scalars['String']>>;
  user_lt?: Maybe<Scalars['String']>;
  user_lte?: Maybe<Scalars['String']>;
  user_not?: Maybe<Scalars['String']>;
  user_not_contains?: Maybe<Scalars['String']>;
  user_not_ends_with?: Maybe<Scalars['String']>;
  user_not_in?: Maybe<Array<Scalars['String']>>;
  user_not_starts_with?: Maybe<Scalars['String']>;
  user_starts_with?: Maybe<Scalars['String']>;
};

export enum LiquidityPosition_OrderBy {
  Id = 'id',
  LiquidityTokenBalance = 'liquidityTokenBalance',
  Pair = 'pair',
  User = 'user'
}

export type Mint = {
  __typename?: 'Mint';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender?: Maybe<Scalars['Bytes']>;
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  transaction: Transaction;
};

export type Mint_Filter = {
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount0_gt?: Maybe<Scalars['BigDecimal']>;
  amount0_gte?: Maybe<Scalars['BigDecimal']>;
  amount0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: Maybe<Scalars['BigDecimal']>;
  amount0_lte?: Maybe<Scalars['BigDecimal']>;
  amount0_not?: Maybe<Scalars['BigDecimal']>;
  amount0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amount1_gt?: Maybe<Scalars['BigDecimal']>;
  amount1_gte?: Maybe<Scalars['BigDecimal']>;
  amount1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: Maybe<Scalars['BigDecimal']>;
  amount1_lte?: Maybe<Scalars['BigDecimal']>;
  amount1_not?: Maybe<Scalars['BigDecimal']>;
  amount1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeTo?: Maybe<Scalars['Bytes']>;
  feeTo_contains?: Maybe<Scalars['Bytes']>;
  feeTo_in?: Maybe<Array<Scalars['Bytes']>>;
  feeTo_not?: Maybe<Scalars['Bytes']>;
  feeTo_not_contains?: Maybe<Scalars['Bytes']>;
  feeTo_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidity?: Maybe<Scalars['BigDecimal']>;
  liquidity_gt?: Maybe<Scalars['BigDecimal']>;
  liquidity_gte?: Maybe<Scalars['BigDecimal']>;
  liquidity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: Maybe<Scalars['BigDecimal']>;
  liquidity_lte?: Maybe<Scalars['BigDecimal']>;
  liquidity_not?: Maybe<Scalars['BigDecimal']>;
  liquidity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  logIndex?: Maybe<Scalars['BigInt']>;
  logIndex_gt?: Maybe<Scalars['BigInt']>;
  logIndex_gte?: Maybe<Scalars['BigInt']>;
  logIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: Maybe<Scalars['BigInt']>;
  logIndex_lte?: Maybe<Scalars['BigInt']>;
  logIndex_not?: Maybe<Scalars['BigInt']>;
  logIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['Bytes']>;
  sender_contains?: Maybe<Scalars['Bytes']>;
  sender_in?: Maybe<Array<Scalars['Bytes']>>;
  sender_not?: Maybe<Scalars['Bytes']>;
  sender_not_contains?: Maybe<Scalars['Bytes']>;
  sender_not_in?: Maybe<Array<Scalars['Bytes']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  to?: Maybe<Scalars['Bytes']>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
};

export enum Mint_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pair = {
  __typename?: 'Pair';
  burns: Array<Burn>;
  createdAtBlockNumber: Scalars['BigInt'];
  createdAtTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityProviderCount: Scalars['BigInt'];
  mints: Array<Mint>;
  pairHourData: Array<PairHourData>;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveETH: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  swaps: Array<Swap>;
  token0: Token;
  token0Price: Scalars['BigDecimal'];
  token1: Token;
  token1Price: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
  trackedReserveETH: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};


export type PairBurnsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
};


export type PairLiquidityPositionSnapshotsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPositionSnapshot_Filter>;
};


export type PairLiquidityPositionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
};


export type PairMintsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
};


export type PairPairHourDataArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairHourData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairHourData_Filter>;
};


export type PairSwapsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type PairDayData = {
  __typename?: 'PairDayData';
  dailyTxns: Scalars['BigInt'];
  dailyVolumeToken0: Scalars['BigDecimal'];
  dailyVolumeToken1: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  pairAddress: Scalars['Bytes'];
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  token0: Token;
  token1: Token;
  totalSupply: Scalars['BigDecimal'];
};

export type PairDayData_Filter = {
  dailyTxns?: Maybe<Scalars['BigInt']>;
  dailyTxns_gt?: Maybe<Scalars['BigInt']>;
  dailyTxns_gte?: Maybe<Scalars['BigInt']>;
  dailyTxns_in?: Maybe<Array<Scalars['BigInt']>>;
  dailyTxns_lt?: Maybe<Scalars['BigInt']>;
  dailyTxns_lte?: Maybe<Scalars['BigInt']>;
  dailyTxns_not?: Maybe<Scalars['BigInt']>;
  dailyTxns_not_in?: Maybe<Array<Scalars['BigInt']>>;
  dailyVolumeToken0?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken0_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken1?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken1_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  date?: Maybe<Scalars['Int']>;
  date_gt?: Maybe<Scalars['Int']>;
  date_gte?: Maybe<Scalars['Int']>;
  date_in?: Maybe<Array<Scalars['Int']>>;
  date_lt?: Maybe<Scalars['Int']>;
  date_lte?: Maybe<Scalars['Int']>;
  date_not?: Maybe<Scalars['Int']>;
  date_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pairAddress?: Maybe<Scalars['Bytes']>;
  pairAddress_contains?: Maybe<Scalars['Bytes']>;
  pairAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  pairAddress_not?: Maybe<Scalars['Bytes']>;
  pairAddress_not_contains?: Maybe<Scalars['Bytes']>;
  pairAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reserve0?: Maybe<Scalars['BigDecimal']>;
  reserve0_gt?: Maybe<Scalars['BigDecimal']>;
  reserve0_gte?: Maybe<Scalars['BigDecimal']>;
  reserve0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: Maybe<Scalars['BigDecimal']>;
  reserve0_lte?: Maybe<Scalars['BigDecimal']>;
  reserve0_not?: Maybe<Scalars['BigDecimal']>;
  reserve0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1?: Maybe<Scalars['BigDecimal']>;
  reserve1_gt?: Maybe<Scalars['BigDecimal']>;
  reserve1_gte?: Maybe<Scalars['BigDecimal']>;
  reserve1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: Maybe<Scalars['BigDecimal']>;
  reserve1_lte?: Maybe<Scalars['BigDecimal']>;
  reserve1_not?: Maybe<Scalars['BigDecimal']>;
  reserve1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token0?: Maybe<Scalars['String']>;
  token0_contains?: Maybe<Scalars['String']>;
  token0_ends_with?: Maybe<Scalars['String']>;
  token0_gt?: Maybe<Scalars['String']>;
  token0_gte?: Maybe<Scalars['String']>;
  token0_in?: Maybe<Array<Scalars['String']>>;
  token0_lt?: Maybe<Scalars['String']>;
  token0_lte?: Maybe<Scalars['String']>;
  token0_not?: Maybe<Scalars['String']>;
  token0_not_contains?: Maybe<Scalars['String']>;
  token0_not_ends_with?: Maybe<Scalars['String']>;
  token0_not_in?: Maybe<Array<Scalars['String']>>;
  token0_not_starts_with?: Maybe<Scalars['String']>;
  token0_starts_with?: Maybe<Scalars['String']>;
  token1?: Maybe<Scalars['String']>;
  token1_contains?: Maybe<Scalars['String']>;
  token1_ends_with?: Maybe<Scalars['String']>;
  token1_gt?: Maybe<Scalars['String']>;
  token1_gte?: Maybe<Scalars['String']>;
  token1_in?: Maybe<Array<Scalars['String']>>;
  token1_lt?: Maybe<Scalars['String']>;
  token1_lte?: Maybe<Scalars['String']>;
  token1_not?: Maybe<Scalars['String']>;
  token1_not_contains?: Maybe<Scalars['String']>;
  token1_not_ends_with?: Maybe<Scalars['String']>;
  token1_not_in?: Maybe<Array<Scalars['String']>>;
  token1_not_starts_with?: Maybe<Scalars['String']>;
  token1_starts_with?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['BigDecimal']>;
  totalSupply_gt?: Maybe<Scalars['BigDecimal']>;
  totalSupply_gte?: Maybe<Scalars['BigDecimal']>;
  totalSupply_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: Maybe<Scalars['BigDecimal']>;
  totalSupply_lte?: Maybe<Scalars['BigDecimal']>;
  totalSupply_not?: Maybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum PairDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeToken0 = 'dailyVolumeToken0',
  DailyVolumeToken1 = 'dailyVolumeToken1',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  PairAddress = 'pairAddress',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Token0 = 'token0',
  Token1 = 'token1',
  TotalSupply = 'totalSupply'
}

export type PairHourData = {
  __typename?: 'PairHourData';
  hourStartUnix: Scalars['Int'];
  hourlyTxns: Scalars['BigInt'];
  hourlyVolumeToken0: Scalars['BigDecimal'];
  hourlyVolumeToken1: Scalars['BigDecimal'];
  hourlyVolumeUSD: Scalars['BigDecimal'];
  id: Scalars['ID'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
};

export type PairHourData_Filter = {
  hourStartUnix?: Maybe<Scalars['Int']>;
  hourStartUnix_gt?: Maybe<Scalars['Int']>;
  hourStartUnix_gte?: Maybe<Scalars['Int']>;
  hourStartUnix_in?: Maybe<Array<Scalars['Int']>>;
  hourStartUnix_lt?: Maybe<Scalars['Int']>;
  hourStartUnix_lte?: Maybe<Scalars['Int']>;
  hourStartUnix_not?: Maybe<Scalars['Int']>;
  hourStartUnix_not_in?: Maybe<Array<Scalars['Int']>>;
  hourlyTxns?: Maybe<Scalars['BigInt']>;
  hourlyTxns_gt?: Maybe<Scalars['BigInt']>;
  hourlyTxns_gte?: Maybe<Scalars['BigInt']>;
  hourlyTxns_in?: Maybe<Array<Scalars['BigInt']>>;
  hourlyTxns_lt?: Maybe<Scalars['BigInt']>;
  hourlyTxns_lte?: Maybe<Scalars['BigInt']>;
  hourlyTxns_not?: Maybe<Scalars['BigInt']>;
  hourlyTxns_not_in?: Maybe<Array<Scalars['BigInt']>>;
  hourlyVolumeToken0?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_gt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_gte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken0_lt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_lte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_not?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken1?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_gt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_gte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken1_lt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_lte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_not?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  reserve0?: Maybe<Scalars['BigDecimal']>;
  reserve0_gt?: Maybe<Scalars['BigDecimal']>;
  reserve0_gte?: Maybe<Scalars['BigDecimal']>;
  reserve0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: Maybe<Scalars['BigDecimal']>;
  reserve0_lte?: Maybe<Scalars['BigDecimal']>;
  reserve0_not?: Maybe<Scalars['BigDecimal']>;
  reserve0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1?: Maybe<Scalars['BigDecimal']>;
  reserve1_gt?: Maybe<Scalars['BigDecimal']>;
  reserve1_gte?: Maybe<Scalars['BigDecimal']>;
  reserve1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: Maybe<Scalars['BigDecimal']>;
  reserve1_lte?: Maybe<Scalars['BigDecimal']>;
  reserve1_not?: Maybe<Scalars['BigDecimal']>;
  reserve1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum PairHourData_OrderBy {
  HourStartUnix = 'hourStartUnix',
  HourlyTxns = 'hourlyTxns',
  HourlyVolumeToken0 = 'hourlyVolumeToken0',
  HourlyVolumeToken1 = 'hourlyVolumeToken1',
  HourlyVolumeUsd = 'hourlyVolumeUSD',
  Id = 'id',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD'
}

export type Pair_Filter = {
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  liquidityProviderCount?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_gt?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_gte?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidityProviderCount_lt?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_lte?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_not?: Maybe<Scalars['BigInt']>;
  liquidityProviderCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  reserve0?: Maybe<Scalars['BigDecimal']>;
  reserve0_gt?: Maybe<Scalars['BigDecimal']>;
  reserve0_gte?: Maybe<Scalars['BigDecimal']>;
  reserve0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: Maybe<Scalars['BigDecimal']>;
  reserve0_lte?: Maybe<Scalars['BigDecimal']>;
  reserve0_not?: Maybe<Scalars['BigDecimal']>;
  reserve0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1?: Maybe<Scalars['BigDecimal']>;
  reserve1_gt?: Maybe<Scalars['BigDecimal']>;
  reserve1_gte?: Maybe<Scalars['BigDecimal']>;
  reserve1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: Maybe<Scalars['BigDecimal']>;
  reserve1_lte?: Maybe<Scalars['BigDecimal']>;
  reserve1_not?: Maybe<Scalars['BigDecimal']>;
  reserve1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveETH?: Maybe<Scalars['BigDecimal']>;
  reserveETH_gt?: Maybe<Scalars['BigDecimal']>;
  reserveETH_gte?: Maybe<Scalars['BigDecimal']>;
  reserveETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveETH_lt?: Maybe<Scalars['BigDecimal']>;
  reserveETH_lte?: Maybe<Scalars['BigDecimal']>;
  reserveETH_not?: Maybe<Scalars['BigDecimal']>;
  reserveETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token0?: Maybe<Scalars['String']>;
  token0Price?: Maybe<Scalars['BigDecimal']>;
  token0Price_gt?: Maybe<Scalars['BigDecimal']>;
  token0Price_gte?: Maybe<Scalars['BigDecimal']>;
  token0Price_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token0Price_lt?: Maybe<Scalars['BigDecimal']>;
  token0Price_lte?: Maybe<Scalars['BigDecimal']>;
  token0Price_not?: Maybe<Scalars['BigDecimal']>;
  token0Price_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token0_contains?: Maybe<Scalars['String']>;
  token0_ends_with?: Maybe<Scalars['String']>;
  token0_gt?: Maybe<Scalars['String']>;
  token0_gte?: Maybe<Scalars['String']>;
  token0_in?: Maybe<Array<Scalars['String']>>;
  token0_lt?: Maybe<Scalars['String']>;
  token0_lte?: Maybe<Scalars['String']>;
  token0_not?: Maybe<Scalars['String']>;
  token0_not_contains?: Maybe<Scalars['String']>;
  token0_not_ends_with?: Maybe<Scalars['String']>;
  token0_not_in?: Maybe<Array<Scalars['String']>>;
  token0_not_starts_with?: Maybe<Scalars['String']>;
  token0_starts_with?: Maybe<Scalars['String']>;
  token1?: Maybe<Scalars['String']>;
  token1Price?: Maybe<Scalars['BigDecimal']>;
  token1Price_gt?: Maybe<Scalars['BigDecimal']>;
  token1Price_gte?: Maybe<Scalars['BigDecimal']>;
  token1Price_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token1Price_lt?: Maybe<Scalars['BigDecimal']>;
  token1Price_lte?: Maybe<Scalars['BigDecimal']>;
  token1Price_not?: Maybe<Scalars['BigDecimal']>;
  token1Price_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token1_contains?: Maybe<Scalars['String']>;
  token1_ends_with?: Maybe<Scalars['String']>;
  token1_gt?: Maybe<Scalars['String']>;
  token1_gte?: Maybe<Scalars['String']>;
  token1_in?: Maybe<Array<Scalars['String']>>;
  token1_lt?: Maybe<Scalars['String']>;
  token1_lte?: Maybe<Scalars['String']>;
  token1_not?: Maybe<Scalars['String']>;
  token1_not_contains?: Maybe<Scalars['String']>;
  token1_not_ends_with?: Maybe<Scalars['String']>;
  token1_not_in?: Maybe<Array<Scalars['String']>>;
  token1_not_starts_with?: Maybe<Scalars['String']>;
  token1_starts_with?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['BigDecimal']>;
  totalSupply_gt?: Maybe<Scalars['BigDecimal']>;
  totalSupply_gte?: Maybe<Scalars['BigDecimal']>;
  totalSupply_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: Maybe<Scalars['BigDecimal']>;
  totalSupply_lte?: Maybe<Scalars['BigDecimal']>;
  totalSupply_not?: Maybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_gt?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_gte?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH_lt?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_lte?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_not?: Maybe<Scalars['BigDecimal']>;
  trackedReserveETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  txCount?: Maybe<Scalars['BigInt']>;
  txCount_gt?: Maybe<Scalars['BigInt']>;
  txCount_gte?: Maybe<Scalars['BigInt']>;
  txCount_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount_lt?: Maybe<Scalars['BigInt']>;
  txCount_lte?: Maybe<Scalars['BigInt']>;
  txCount_not?: Maybe<Scalars['BigInt']>;
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_lt?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_not?: Maybe<Scalars['BigDecimal']>;
  volumeToken0_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_lt?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_not?: Maybe<Scalars['BigDecimal']>;
  volumeToken1_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum Pair_OrderBy {
  Burns = 'burns',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Id = 'id',
  LiquidityPositionSnapshots = 'liquidityPositionSnapshots',
  LiquidityPositions = 'liquidityPositions',
  LiquidityProviderCount = 'liquidityProviderCount',
  Mints = 'mints',
  PairHourData = 'pairHourData',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveEth = 'reserveETH',
  ReserveUsd = 'reserveUSD',
  Swaps = 'swaps',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  TotalSupply = 'totalSupply',
  TrackedReserveEth = 'trackedReserveETH',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export type PangolinDayData = {
  __typename?: 'PangolinDayData';
  dailyVolumeETH: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  dailyVolumeUntracked: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  totalLiquidityETH: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
  totalVolumeETH: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
};

export type PangolinDayData_Filter = {
  dailyVolumeETH?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUntracked?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUntracked_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  date?: Maybe<Scalars['Int']>;
  date_gt?: Maybe<Scalars['Int']>;
  date_gte?: Maybe<Scalars['Int']>;
  date_in?: Maybe<Array<Scalars['Int']>>;
  date_lt?: Maybe<Scalars['Int']>;
  date_lte?: Maybe<Scalars['Int']>;
  date_not?: Maybe<Scalars['Int']>;
  date_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  txCount?: Maybe<Scalars['BigInt']>;
  txCount_gt?: Maybe<Scalars['BigInt']>;
  txCount_gte?: Maybe<Scalars['BigInt']>;
  txCount_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount_lt?: Maybe<Scalars['BigInt']>;
  txCount_lte?: Maybe<Scalars['BigInt']>;
  txCount_not?: Maybe<Scalars['BigInt']>;
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PangolinDayData_OrderBy {
  DailyVolumeEth = 'dailyVolumeETH',
  DailyVolumeUsd = 'dailyVolumeUSD',
  DailyVolumeUntracked = 'dailyVolumeUntracked',
  Date = 'date',
  Id = 'id',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalVolumeEth = 'totalVolumeETH',
  TotalVolumeUsd = 'totalVolumeUSD',
  TxCount = 'txCount'
}

export type PangolinFactory = {
  __typename?: 'PangolinFactory';
  id: Scalars['ID'];
  pairCount: Scalars['Int'];
  totalLiquidityETH: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
  totalVolumeETH: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
};

export type PangolinFactory_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  pairCount?: Maybe<Scalars['Int']>;
  pairCount_gt?: Maybe<Scalars['Int']>;
  pairCount_gte?: Maybe<Scalars['Int']>;
  pairCount_in?: Maybe<Array<Scalars['Int']>>;
  pairCount_lt?: Maybe<Scalars['Int']>;
  pairCount_lte?: Maybe<Scalars['Int']>;
  pairCount_not?: Maybe<Scalars['Int']>;
  pairCount_not_in?: Maybe<Array<Scalars['Int']>>;
  totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  totalVolumeETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  txCount?: Maybe<Scalars['BigInt']>;
  txCount_gt?: Maybe<Scalars['BigInt']>;
  txCount_gte?: Maybe<Scalars['BigInt']>;
  txCount_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount_lt?: Maybe<Scalars['BigInt']>;
  txCount_lte?: Maybe<Scalars['BigInt']>;
  txCount_not?: Maybe<Scalars['BigInt']>;
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum PangolinFactory_OrderBy {
  Id = 'id',
  PairCount = 'pairCount',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalVolumeEth = 'totalVolumeETH',
  TotalVolumeUsd = 'totalVolumeUSD',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  pangolinDayData?: Maybe<PangolinDayData>;
  pangolinDayDatas: Array<PangolinDayData>;
  pangolinFactories: Array<PangolinFactory>;
  pangolinFactory?: Maybe<PangolinFactory>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryBundleArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBundlesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bundle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bundle_Filter>;
};


export type QueryBurnArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBurnsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
};


export type QueryLiquidityPositionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryLiquidityPositionSnapshotArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryLiquidityPositionSnapshotsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPositionSnapshot_Filter>;
};


export type QueryLiquidityPositionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
};


export type QueryMintArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryMintsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
};


export type QueryPairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
};


export type QueryPairHourDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairHourDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairHourData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairHourData_Filter>;
};


export type QueryPairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
};


export type QueryPangolinDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPangolinDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PangolinDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PangolinDayData_Filter>;
};


export type QueryPangolinFactoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PangolinFactory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PangolinFactory_Filter>;
};


export type QueryPangolinFactoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QuerySwapArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QuerySwapsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};


export type QueryTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
};


export type QueryTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
};


export type QueryTransactionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transaction_Filter>;
};


export type QueryUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  pangolinDayData?: Maybe<PangolinDayData>;
  pangolinDayDatas: Array<PangolinDayData>;
  pangolinFactories: Array<PangolinFactory>;
  pangolinFactory?: Maybe<PangolinFactory>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionBundleArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBundlesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bundle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bundle_Filter>;
};


export type SubscriptionBurnArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBurnsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
};


export type SubscriptionLiquidityPositionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionLiquidityPositionSnapshotArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionLiquidityPositionSnapshotsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPositionSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPositionSnapshot_Filter>;
};


export type SubscriptionLiquidityPositionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
};


export type SubscriptionMintArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionMintsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
};


export type SubscriptionPairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
};


export type SubscriptionPairHourDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairHourDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairHourData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairHourData_Filter>;
};


export type SubscriptionPairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
};


export type SubscriptionPangolinDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPangolinDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PangolinDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PangolinDayData_Filter>;
};


export type SubscriptionPangolinFactoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PangolinFactory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PangolinFactory_Filter>;
};


export type SubscriptionPangolinFactoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionSwapArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionSwapsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenDayDataArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenDayDatasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTransactionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transaction_Filter>;
};


export type SubscriptionUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<User_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  amount0In: Scalars['BigDecimal'];
  amount0Out: Scalars['BigDecimal'];
  amount1In: Scalars['BigDecimal'];
  amount1Out: Scalars['BigDecimal'];
  amountUSD: Scalars['BigDecimal'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  transaction: Transaction;
};

export type Swap_Filter = {
  amount0In?: Maybe<Scalars['BigDecimal']>;
  amount0In_gt?: Maybe<Scalars['BigDecimal']>;
  amount0In_gte?: Maybe<Scalars['BigDecimal']>;
  amount0In_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount0In_lt?: Maybe<Scalars['BigDecimal']>;
  amount0In_lte?: Maybe<Scalars['BigDecimal']>;
  amount0In_not?: Maybe<Scalars['BigDecimal']>;
  amount0In_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount0Out?: Maybe<Scalars['BigDecimal']>;
  amount0Out_gt?: Maybe<Scalars['BigDecimal']>;
  amount0Out_gte?: Maybe<Scalars['BigDecimal']>;
  amount0Out_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount0Out_lt?: Maybe<Scalars['BigDecimal']>;
  amount0Out_lte?: Maybe<Scalars['BigDecimal']>;
  amount0Out_not?: Maybe<Scalars['BigDecimal']>;
  amount0Out_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1In?: Maybe<Scalars['BigDecimal']>;
  amount1In_gt?: Maybe<Scalars['BigDecimal']>;
  amount1In_gte?: Maybe<Scalars['BigDecimal']>;
  amount1In_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1In_lt?: Maybe<Scalars['BigDecimal']>;
  amount1In_lte?: Maybe<Scalars['BigDecimal']>;
  amount1In_not?: Maybe<Scalars['BigDecimal']>;
  amount1In_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1Out?: Maybe<Scalars['BigDecimal']>;
  amount1Out_gt?: Maybe<Scalars['BigDecimal']>;
  amount1Out_gte?: Maybe<Scalars['BigDecimal']>;
  amount1Out_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amount1Out_lt?: Maybe<Scalars['BigDecimal']>;
  amount1Out_lte?: Maybe<Scalars['BigDecimal']>;
  amount1Out_not?: Maybe<Scalars['BigDecimal']>;
  amount1Out_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  logIndex?: Maybe<Scalars['BigInt']>;
  logIndex_gt?: Maybe<Scalars['BigInt']>;
  logIndex_gte?: Maybe<Scalars['BigInt']>;
  logIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: Maybe<Scalars['BigInt']>;
  logIndex_lte?: Maybe<Scalars['BigInt']>;
  logIndex_not?: Maybe<Scalars['BigInt']>;
  logIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pair?: Maybe<Scalars['String']>;
  pair_contains?: Maybe<Scalars['String']>;
  pair_ends_with?: Maybe<Scalars['String']>;
  pair_gt?: Maybe<Scalars['String']>;
  pair_gte?: Maybe<Scalars['String']>;
  pair_in?: Maybe<Array<Scalars['String']>>;
  pair_lt?: Maybe<Scalars['String']>;
  pair_lte?: Maybe<Scalars['String']>;
  pair_not?: Maybe<Scalars['String']>;
  pair_not_contains?: Maybe<Scalars['String']>;
  pair_not_ends_with?: Maybe<Scalars['String']>;
  pair_not_in?: Maybe<Array<Scalars['String']>>;
  pair_not_starts_with?: Maybe<Scalars['String']>;
  pair_starts_with?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['Bytes']>;
  sender_contains?: Maybe<Scalars['Bytes']>;
  sender_in?: Maybe<Array<Scalars['Bytes']>>;
  sender_not?: Maybe<Scalars['Bytes']>;
  sender_not_contains?: Maybe<Scalars['Bytes']>;
  sender_not_in?: Maybe<Array<Scalars['Bytes']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  to?: Maybe<Scalars['Bytes']>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
};

export enum Swap_OrderBy {
  Amount0In = 'amount0In',
  Amount0Out = 'amount0Out',
  Amount1In = 'amount1In',
  Amount1Out = 'amount1Out',
  AmountUsd = 'amountUSD',
  From = 'from',
  Id = 'id',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export type Token = {
  __typename?: 'Token';
  decimals: Scalars['BigInt'];
  derivedETH?: Maybe<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  pairBase: Array<Pair>;
  pairDayDataBase: Array<PairDayData>;
  pairDayDataQuote: Array<PairDayData>;
  pairQuote: Array<Pair>;
  symbol: Scalars['String'];
  tokenDayData: Array<TokenDayData>;
  totalLiquidity: Scalars['BigDecimal'];
  totalSupply: Scalars['BigInt'];
  tradeVolume: Scalars['BigDecimal'];
  tradeVolumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
};


export type TokenPairBaseArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
};


export type TokenPairDayDataBaseArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
};


export type TokenPairDayDataQuoteArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
};


export type TokenPairQuoteArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
};


export type TokenTokenDayDataArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
};

export type TokenDayData = {
  __typename?: 'TokenDayData';
  dailyTxns: Scalars['BigInt'];
  dailyVolumeETH: Scalars['BigDecimal'];
  dailyVolumeToken: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  priceUSD: Scalars['BigDecimal'];
  token: Token;
  totalLiquidityETH: Scalars['BigDecimal'];
  totalLiquidityToken: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
};

export type TokenDayData_Filter = {
  dailyTxns?: Maybe<Scalars['BigInt']>;
  dailyTxns_gt?: Maybe<Scalars['BigInt']>;
  dailyTxns_gte?: Maybe<Scalars['BigInt']>;
  dailyTxns_in?: Maybe<Array<Scalars['BigInt']>>;
  dailyTxns_lt?: Maybe<Scalars['BigInt']>;
  dailyTxns_lte?: Maybe<Scalars['BigInt']>;
  dailyTxns_not?: Maybe<Scalars['BigInt']>;
  dailyTxns_not_in?: Maybe<Array<Scalars['BigInt']>>;
  dailyVolumeETH?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeToken_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  date?: Maybe<Scalars['Int']>;
  date_gt?: Maybe<Scalars['Int']>;
  date_gte?: Maybe<Scalars['Int']>;
  date_in?: Maybe<Array<Scalars['Int']>>;
  date_lt?: Maybe<Scalars['Int']>;
  date_lte?: Maybe<Scalars['Int']>;
  date_not?: Maybe<Scalars['Int']>;
  date_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  priceUSD?: Maybe<Scalars['BigDecimal']>;
  priceUSD_gt?: Maybe<Scalars['BigDecimal']>;
  priceUSD_gte?: Maybe<Scalars['BigDecimal']>;
  priceUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  priceUSD_lt?: Maybe<Scalars['BigDecimal']>;
  priceUSD_lte?: Maybe<Scalars['BigDecimal']>;
  priceUSD_not?: Maybe<Scalars['BigDecimal']>;
  priceUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  token?: Maybe<Scalars['String']>;
  token_contains?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_gt?: Maybe<Scalars['String']>;
  token_gte?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_lt?: Maybe<Scalars['String']>;
  token_lte?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityToken?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityToken_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityToken_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeEth = 'dailyVolumeETH',
  DailyVolumeToken = 'dailyVolumeToken',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  PriceUsd = 'priceUSD',
  Token = 'token',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityToken = 'totalLiquidityToken',
  TotalLiquidityUsd = 'totalLiquidityUSD'
}

export type Token_Filter = {
  decimals?: Maybe<Scalars['BigInt']>;
  decimals_gt?: Maybe<Scalars['BigInt']>;
  decimals_gte?: Maybe<Scalars['BigInt']>;
  decimals_in?: Maybe<Array<Scalars['BigInt']>>;
  decimals_lt?: Maybe<Scalars['BigInt']>;
  decimals_lte?: Maybe<Scalars['BigInt']>;
  decimals_not?: Maybe<Scalars['BigInt']>;
  decimals_not_in?: Maybe<Array<Scalars['BigInt']>>;
  derivedETH?: Maybe<Scalars['BigDecimal']>;
  derivedETH_gt?: Maybe<Scalars['BigDecimal']>;
  derivedETH_gte?: Maybe<Scalars['BigDecimal']>;
  derivedETH_in?: Maybe<Array<Scalars['BigDecimal']>>;
  derivedETH_lt?: Maybe<Scalars['BigDecimal']>;
  derivedETH_lte?: Maybe<Scalars['BigDecimal']>;
  derivedETH_not?: Maybe<Scalars['BigDecimal']>;
  derivedETH_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  totalLiquidity?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: Maybe<Scalars['BigInt']>;
  totalSupply_gt?: Maybe<Scalars['BigInt']>;
  totalSupply_gte?: Maybe<Scalars['BigInt']>;
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: Maybe<Scalars['BigInt']>;
  totalSupply_lte?: Maybe<Scalars['BigInt']>;
  totalSupply_not?: Maybe<Scalars['BigInt']>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  tradeVolume?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  tradeVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  tradeVolume_gt?: Maybe<Scalars['BigDecimal']>;
  tradeVolume_gte?: Maybe<Scalars['BigDecimal']>;
  tradeVolume_in?: Maybe<Array<Scalars['BigDecimal']>>;
  tradeVolume_lt?: Maybe<Scalars['BigDecimal']>;
  tradeVolume_lte?: Maybe<Scalars['BigDecimal']>;
  tradeVolume_not?: Maybe<Scalars['BigDecimal']>;
  tradeVolume_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  txCount?: Maybe<Scalars['BigInt']>;
  txCount_gt?: Maybe<Scalars['BigInt']>;
  txCount_gte?: Maybe<Scalars['BigInt']>;
  txCount_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount_lt?: Maybe<Scalars['BigInt']>;
  txCount_lte?: Maybe<Scalars['BigInt']>;
  txCount_not?: Maybe<Scalars['BigInt']>;
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  untrackedVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: Maybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum Token_OrderBy {
  Decimals = 'decimals',
  DerivedEth = 'derivedETH',
  Id = 'id',
  Name = 'name',
  PairBase = 'pairBase',
  PairDayDataBase = 'pairDayDataBase',
  PairDayDataQuote = 'pairDayDataQuote',
  PairQuote = 'pairQuote',
  Symbol = 'symbol',
  TokenDayData = 'tokenDayData',
  TotalLiquidity = 'totalLiquidity',
  TotalSupply = 'totalSupply',
  TradeVolume = 'tradeVolume',
  TradeVolumeUsd = 'tradeVolumeUSD',
  TxCount = 'txCount',
  UntrackedVolumeUsd = 'untrackedVolumeUSD'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt'];
  burns: Array<Maybe<Burn>>;
  id: Scalars['ID'];
  mints: Array<Maybe<Mint>>;
  swaps: Array<Maybe<Swap>>;
  timestamp: Scalars['BigInt'];
};


export type TransactionBurnsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
};


export type TransactionMintsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
};


export type TransactionSwapsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
};

export type Transaction_Filter = {
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  burns?: Maybe<Array<Scalars['String']>>;
  burns_contains?: Maybe<Array<Scalars['String']>>;
  burns_not?: Maybe<Array<Scalars['String']>>;
  burns_not_contains?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  mints?: Maybe<Array<Scalars['String']>>;
  mints_contains?: Maybe<Array<Scalars['String']>>;
  mints_not?: Maybe<Array<Scalars['String']>>;
  mints_not_contains?: Maybe<Array<Scalars['String']>>;
  swaps?: Maybe<Array<Scalars['String']>>;
  swaps_contains?: Maybe<Array<Scalars['String']>>;
  swaps_not?: Maybe<Array<Scalars['String']>>;
  swaps_not_contains?: Maybe<Array<Scalars['String']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Burns = 'burns',
  Id = 'id',
  Mints = 'mints',
  Swaps = 'swaps',
  Timestamp = 'timestamp'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  liquidityPositions?: Maybe<Array<LiquidityPosition>>;
  usdSwapped: Scalars['BigDecimal'];
};


export type UserLiquidityPositionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
};

export type User_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  usdSwapped?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_gt?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_gte?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdSwapped_lt?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_lte?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_not?: Maybe<Scalars['BigDecimal']>;
  usdSwapped_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum User_OrderBy {
  Id = 'id',
  LiquidityPositions = 'liquidityPositions',
  UsdSwapped = 'usdSwapped'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetTokenDataSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokenDataSubscription = { __typename?: 'Subscription', pairs: Array<{ __typename?: 'Pair', id: string, reserveUSD: any, totalSupply: any }> };

export type UsdcPriceSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UsdcPriceSubscription = { __typename?: 'Subscription', token?: Maybe<{ __typename?: 'Token', derivedETH?: Maybe<any> }> };


export const GetTokenDataDocument = gql`
    subscription GetTokenData($id: ID!) @api(name: png) {
  pairs(first: 5, where: {id: $id}) {
    id
    reserveUSD
    totalSupply
  }
}
    `;

/**
 * __useGetTokenDataSubscription__
 *
 * To run a query within a React component, call `useGetTokenDataSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenDataSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenDataSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTokenDataSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<GetTokenDataSubscription, GetTokenDataSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<GetTokenDataSubscription, GetTokenDataSubscriptionVariables>(GetTokenDataDocument, options);
      }
export type GetTokenDataSubscriptionHookResult = ReturnType<typeof useGetTokenDataSubscription>;
export type GetTokenDataSubscriptionResult = Apollo.SubscriptionResult<GetTokenDataSubscription>;
export const UsdcPriceDocument = gql`
    subscription UsdcPrice @api(name: png) {
  token(id: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664") {
    derivedETH
  }
}
    `;

/**
 * __useUsdcPriceSubscription__
 *
 * To run a query within a React component, call `useUsdcPriceSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUsdcPriceSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsdcPriceSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUsdcPriceSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<UsdcPriceSubscription, UsdcPriceSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<UsdcPriceSubscription, UsdcPriceSubscriptionVariables>(UsdcPriceDocument, options);
      }
export type UsdcPriceSubscriptionHookResult = ReturnType<typeof useUsdcPriceSubscription>;
export type UsdcPriceSubscriptionResult = Apollo.SubscriptionResult<UsdcPriceSubscription>;