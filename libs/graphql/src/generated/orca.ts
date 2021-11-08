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

export type Bank = {
  __typename?: 'Bank';
  closingFee: Scalars['BigInt'];
  debtCeiling: Scalars['BigInt'];
  debtRatio: Scalars['BigInt'];
  gainRatio: Scalars['BigInt'];
  id: Scalars['ID'];
  minimumCollateralPercentage: Scalars['BigInt'];
  openingFee: Scalars['BigInt'];
  stablecoin: Stablecoin;
  token: Token;
  tokenPeg: Scalars['BigInt'];
  totalCollateral: Scalars['BigInt'];
  totalDebt: Scalars['BigInt'];
  treasury: Scalars['BigInt'];
  vaultCount: Scalars['Int'];
  vaults: Array<Vault>;
};


export type BankVaultsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Vault_Filter>;
};

export type Bank_Filter = {
  closingFee?: Maybe<Scalars['BigInt']>;
  closingFee_gt?: Maybe<Scalars['BigInt']>;
  closingFee_gte?: Maybe<Scalars['BigInt']>;
  closingFee_in?: Maybe<Array<Scalars['BigInt']>>;
  closingFee_lt?: Maybe<Scalars['BigInt']>;
  closingFee_lte?: Maybe<Scalars['BigInt']>;
  closingFee_not?: Maybe<Scalars['BigInt']>;
  closingFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtCeiling?: Maybe<Scalars['BigInt']>;
  debtCeiling_gt?: Maybe<Scalars['BigInt']>;
  debtCeiling_gte?: Maybe<Scalars['BigInt']>;
  debtCeiling_in?: Maybe<Array<Scalars['BigInt']>>;
  debtCeiling_lt?: Maybe<Scalars['BigInt']>;
  debtCeiling_lte?: Maybe<Scalars['BigInt']>;
  debtCeiling_not?: Maybe<Scalars['BigInt']>;
  debtCeiling_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtRatio?: Maybe<Scalars['BigInt']>;
  debtRatio_gt?: Maybe<Scalars['BigInt']>;
  debtRatio_gte?: Maybe<Scalars['BigInt']>;
  debtRatio_in?: Maybe<Array<Scalars['BigInt']>>;
  debtRatio_lt?: Maybe<Scalars['BigInt']>;
  debtRatio_lte?: Maybe<Scalars['BigInt']>;
  debtRatio_not?: Maybe<Scalars['BigInt']>;
  debtRatio_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gainRatio?: Maybe<Scalars['BigInt']>;
  gainRatio_gt?: Maybe<Scalars['BigInt']>;
  gainRatio_gte?: Maybe<Scalars['BigInt']>;
  gainRatio_in?: Maybe<Array<Scalars['BigInt']>>;
  gainRatio_lt?: Maybe<Scalars['BigInt']>;
  gainRatio_lte?: Maybe<Scalars['BigInt']>;
  gainRatio_not?: Maybe<Scalars['BigInt']>;
  gainRatio_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  minimumCollateralPercentage?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_gt?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_gte?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_in?: Maybe<Array<Scalars['BigInt']>>;
  minimumCollateralPercentage_lt?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_lte?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_not?: Maybe<Scalars['BigInt']>;
  minimumCollateralPercentage_not_in?: Maybe<Array<Scalars['BigInt']>>;
  openingFee?: Maybe<Scalars['BigInt']>;
  openingFee_gt?: Maybe<Scalars['BigInt']>;
  openingFee_gte?: Maybe<Scalars['BigInt']>;
  openingFee_in?: Maybe<Array<Scalars['BigInt']>>;
  openingFee_lt?: Maybe<Scalars['BigInt']>;
  openingFee_lte?: Maybe<Scalars['BigInt']>;
  openingFee_not?: Maybe<Scalars['BigInt']>;
  openingFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  stablecoin?: Maybe<Scalars['String']>;
  stablecoin_contains?: Maybe<Scalars['String']>;
  stablecoin_ends_with?: Maybe<Scalars['String']>;
  stablecoin_gt?: Maybe<Scalars['String']>;
  stablecoin_gte?: Maybe<Scalars['String']>;
  stablecoin_in?: Maybe<Array<Scalars['String']>>;
  stablecoin_lt?: Maybe<Scalars['String']>;
  stablecoin_lte?: Maybe<Scalars['String']>;
  stablecoin_not?: Maybe<Scalars['String']>;
  stablecoin_not_contains?: Maybe<Scalars['String']>;
  stablecoin_not_ends_with?: Maybe<Scalars['String']>;
  stablecoin_not_in?: Maybe<Array<Scalars['String']>>;
  stablecoin_not_starts_with?: Maybe<Scalars['String']>;
  stablecoin_starts_with?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  tokenPeg?: Maybe<Scalars['BigInt']>;
  tokenPeg_gt?: Maybe<Scalars['BigInt']>;
  tokenPeg_gte?: Maybe<Scalars['BigInt']>;
  tokenPeg_in?: Maybe<Array<Scalars['BigInt']>>;
  tokenPeg_lt?: Maybe<Scalars['BigInt']>;
  tokenPeg_lte?: Maybe<Scalars['BigInt']>;
  tokenPeg_not?: Maybe<Scalars['BigInt']>;
  tokenPeg_not_in?: Maybe<Array<Scalars['BigInt']>>;
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
  totalCollateral?: Maybe<Scalars['BigInt']>;
  totalCollateral_gt?: Maybe<Scalars['BigInt']>;
  totalCollateral_gte?: Maybe<Scalars['BigInt']>;
  totalCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  totalCollateral_lt?: Maybe<Scalars['BigInt']>;
  totalCollateral_lte?: Maybe<Scalars['BigInt']>;
  totalCollateral_not?: Maybe<Scalars['BigInt']>;
  totalCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebt?: Maybe<Scalars['BigInt']>;
  totalDebt_gt?: Maybe<Scalars['BigInt']>;
  totalDebt_gte?: Maybe<Scalars['BigInt']>;
  totalDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebt_lt?: Maybe<Scalars['BigInt']>;
  totalDebt_lte?: Maybe<Scalars['BigInt']>;
  totalDebt_not?: Maybe<Scalars['BigInt']>;
  totalDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  treasury?: Maybe<Scalars['BigInt']>;
  treasury_gt?: Maybe<Scalars['BigInt']>;
  treasury_gte?: Maybe<Scalars['BigInt']>;
  treasury_in?: Maybe<Array<Scalars['BigInt']>>;
  treasury_lt?: Maybe<Scalars['BigInt']>;
  treasury_lte?: Maybe<Scalars['BigInt']>;
  treasury_not?: Maybe<Scalars['BigInt']>;
  treasury_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vaultCount?: Maybe<Scalars['Int']>;
  vaultCount_gt?: Maybe<Scalars['Int']>;
  vaultCount_gte?: Maybe<Scalars['Int']>;
  vaultCount_in?: Maybe<Array<Scalars['Int']>>;
  vaultCount_lt?: Maybe<Scalars['Int']>;
  vaultCount_lte?: Maybe<Scalars['Int']>;
  vaultCount_not?: Maybe<Scalars['Int']>;
  vaultCount_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum Bank_OrderBy {
  ClosingFee = 'closingFee',
  DebtCeiling = 'debtCeiling',
  DebtRatio = 'debtRatio',
  GainRatio = 'gainRatio',
  Id = 'id',
  MinimumCollateralPercentage = 'minimumCollateralPercentage',
  OpeningFee = 'openingFee',
  Stablecoin = 'stablecoin',
  Token = 'token',
  TokenPeg = 'tokenPeg',
  TotalCollateral = 'totalCollateral',
  TotalDebt = 'totalDebt',
  Treasury = 'treasury',
  VaultCount = 'vaultCount',
  Vaults = 'vaults'
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type Exchange = {
  __typename?: 'Exchange';
  id: Scalars['ID'];
  mintingFee: Scalars['BigInt'];
  redeemingFee: Scalars['BigInt'];
  treasury: Scalars['BigInt'];
  usdHeld: Scalars['BigInt'];
};

export type Exchange_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  mintingFee?: Maybe<Scalars['BigInt']>;
  mintingFee_gt?: Maybe<Scalars['BigInt']>;
  mintingFee_gte?: Maybe<Scalars['BigInt']>;
  mintingFee_in?: Maybe<Array<Scalars['BigInt']>>;
  mintingFee_lt?: Maybe<Scalars['BigInt']>;
  mintingFee_lte?: Maybe<Scalars['BigInt']>;
  mintingFee_not?: Maybe<Scalars['BigInt']>;
  mintingFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  redeemingFee?: Maybe<Scalars['BigInt']>;
  redeemingFee_gt?: Maybe<Scalars['BigInt']>;
  redeemingFee_gte?: Maybe<Scalars['BigInt']>;
  redeemingFee_in?: Maybe<Array<Scalars['BigInt']>>;
  redeemingFee_lt?: Maybe<Scalars['BigInt']>;
  redeemingFee_lte?: Maybe<Scalars['BigInt']>;
  redeemingFee_not?: Maybe<Scalars['BigInt']>;
  redeemingFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  treasury?: Maybe<Scalars['BigInt']>;
  treasury_gt?: Maybe<Scalars['BigInt']>;
  treasury_gte?: Maybe<Scalars['BigInt']>;
  treasury_in?: Maybe<Array<Scalars['BigInt']>>;
  treasury_lt?: Maybe<Scalars['BigInt']>;
  treasury_lte?: Maybe<Scalars['BigInt']>;
  treasury_not?: Maybe<Scalars['BigInt']>;
  treasury_not_in?: Maybe<Array<Scalars['BigInt']>>;
  usdHeld?: Maybe<Scalars['BigInt']>;
  usdHeld_gt?: Maybe<Scalars['BigInt']>;
  usdHeld_gte?: Maybe<Scalars['BigInt']>;
  usdHeld_in?: Maybe<Array<Scalars['BigInt']>>;
  usdHeld_lt?: Maybe<Scalars['BigInt']>;
  usdHeld_lte?: Maybe<Scalars['BigInt']>;
  usdHeld_not?: Maybe<Scalars['BigInt']>;
  usdHeld_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Exchange_OrderBy {
  Id = 'id',
  MintingFee = 'mintingFee',
  RedeemingFee = 'redeemingFee',
  Treasury = 'treasury',
  UsdHeld = 'usdHeld'
}

export type Liquidation = {
  __typename?: 'Liquidation';
  id: Scalars['ID'];
  owed: Scalars['BigInt'];
  token: Token;
  user: User;
};

export type Liquidation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owed?: Maybe<Scalars['BigInt']>;
  owed_gt?: Maybe<Scalars['BigInt']>;
  owed_gte?: Maybe<Scalars['BigInt']>;
  owed_in?: Maybe<Array<Scalars['BigInt']>>;
  owed_lt?: Maybe<Scalars['BigInt']>;
  owed_lte?: Maybe<Scalars['BigInt']>;
  owed_not?: Maybe<Scalars['BigInt']>;
  owed_not_in?: Maybe<Array<Scalars['BigInt']>>;
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

export enum Liquidation_OrderBy {
  Id = 'id',
  Owed = 'owed',
  Token = 'token',
  User = 'user'
}

export type Orca = {
  __typename?: 'Orca';
  circulatingSupply: Scalars['BigInt'];
  id: Scalars['ID'];
  leader: Scalars['Bytes'];
  maxSupply: Scalars['BigInt'];
  team: Scalars['Bytes'];
  treasury: Scalars['Bytes'];
};

export type Orca_Filter = {
  circulatingSupply?: Maybe<Scalars['BigInt']>;
  circulatingSupply_gt?: Maybe<Scalars['BigInt']>;
  circulatingSupply_gte?: Maybe<Scalars['BigInt']>;
  circulatingSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  circulatingSupply_lt?: Maybe<Scalars['BigInt']>;
  circulatingSupply_lte?: Maybe<Scalars['BigInt']>;
  circulatingSupply_not?: Maybe<Scalars['BigInt']>;
  circulatingSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  leader?: Maybe<Scalars['Bytes']>;
  leader_contains?: Maybe<Scalars['Bytes']>;
  leader_in?: Maybe<Array<Scalars['Bytes']>>;
  leader_not?: Maybe<Scalars['Bytes']>;
  leader_not_contains?: Maybe<Scalars['Bytes']>;
  leader_not_in?: Maybe<Array<Scalars['Bytes']>>;
  maxSupply?: Maybe<Scalars['BigInt']>;
  maxSupply_gt?: Maybe<Scalars['BigInt']>;
  maxSupply_gte?: Maybe<Scalars['BigInt']>;
  maxSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  maxSupply_lt?: Maybe<Scalars['BigInt']>;
  maxSupply_lte?: Maybe<Scalars['BigInt']>;
  maxSupply_not?: Maybe<Scalars['BigInt']>;
  maxSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  team?: Maybe<Scalars['Bytes']>;
  team_contains?: Maybe<Scalars['Bytes']>;
  team_in?: Maybe<Array<Scalars['Bytes']>>;
  team_not?: Maybe<Scalars['Bytes']>;
  team_not_contains?: Maybe<Scalars['Bytes']>;
  team_not_in?: Maybe<Array<Scalars['Bytes']>>;
  treasury?: Maybe<Scalars['Bytes']>;
  treasury_contains?: Maybe<Scalars['Bytes']>;
  treasury_in?: Maybe<Array<Scalars['Bytes']>>;
  treasury_not?: Maybe<Scalars['Bytes']>;
  treasury_not_contains?: Maybe<Scalars['Bytes']>;
  treasury_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Orca_OrderBy {
  CirculatingSupply = 'circulatingSupply',
  Id = 'id',
  Leader = 'leader',
  MaxSupply = 'maxSupply',
  Team = 'team',
  Treasury = 'treasury'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PodLeader = {
  __typename?: 'PodLeader';
  endTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  orca: Scalars['Bytes'];
  orcaPerSec: Scalars['BigInt'];
  poolCount: Scalars['BigInt'];
  pools: Array<Pool>;
  startTimestamp: Scalars['BigInt'];
  totalAllocPoints: Scalars['BigInt'];
  treasury: Scalars['Bytes'];
};


export type PodLeaderPoolsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pool_Filter>;
};

export type PodLeader_Filter = {
  endTimestamp?: Maybe<Scalars['BigInt']>;
  endTimestamp_gt?: Maybe<Scalars['BigInt']>;
  endTimestamp_gte?: Maybe<Scalars['BigInt']>;
  endTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt?: Maybe<Scalars['BigInt']>;
  endTimestamp_lte?: Maybe<Scalars['BigInt']>;
  endTimestamp_not?: Maybe<Scalars['BigInt']>;
  endTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  orca?: Maybe<Scalars['Bytes']>;
  orcaPerSec?: Maybe<Scalars['BigInt']>;
  orcaPerSec_gt?: Maybe<Scalars['BigInt']>;
  orcaPerSec_gte?: Maybe<Scalars['BigInt']>;
  orcaPerSec_in?: Maybe<Array<Scalars['BigInt']>>;
  orcaPerSec_lt?: Maybe<Scalars['BigInt']>;
  orcaPerSec_lte?: Maybe<Scalars['BigInt']>;
  orcaPerSec_not?: Maybe<Scalars['BigInt']>;
  orcaPerSec_not_in?: Maybe<Array<Scalars['BigInt']>>;
  orca_contains?: Maybe<Scalars['Bytes']>;
  orca_in?: Maybe<Array<Scalars['Bytes']>>;
  orca_not?: Maybe<Scalars['Bytes']>;
  orca_not_contains?: Maybe<Scalars['Bytes']>;
  orca_not_in?: Maybe<Array<Scalars['Bytes']>>;
  poolCount?: Maybe<Scalars['BigInt']>;
  poolCount_gt?: Maybe<Scalars['BigInt']>;
  poolCount_gte?: Maybe<Scalars['BigInt']>;
  poolCount_in?: Maybe<Array<Scalars['BigInt']>>;
  poolCount_lt?: Maybe<Scalars['BigInt']>;
  poolCount_lte?: Maybe<Scalars['BigInt']>;
  poolCount_not?: Maybe<Scalars['BigInt']>;
  poolCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  startTimestamp?: Maybe<Scalars['BigInt']>;
  startTimestamp_gt?: Maybe<Scalars['BigInt']>;
  startTimestamp_gte?: Maybe<Scalars['BigInt']>;
  startTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt?: Maybe<Scalars['BigInt']>;
  startTimestamp_lte?: Maybe<Scalars['BigInt']>;
  startTimestamp_not?: Maybe<Scalars['BigInt']>;
  startTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalAllocPoints?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_gt?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_gte?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_in?: Maybe<Array<Scalars['BigInt']>>;
  totalAllocPoints_lt?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_lte?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_not?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_not_in?: Maybe<Array<Scalars['BigInt']>>;
  treasury?: Maybe<Scalars['Bytes']>;
  treasury_contains?: Maybe<Scalars['Bytes']>;
  treasury_in?: Maybe<Array<Scalars['Bytes']>>;
  treasury_not?: Maybe<Scalars['Bytes']>;
  treasury_not_contains?: Maybe<Scalars['Bytes']>;
  treasury_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum PodLeader_OrderBy {
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  Orca = 'orca',
  OrcaPerSec = 'orcaPerSec',
  PoolCount = 'poolCount',
  Pools = 'pools',
  StartTimestamp = 'startTimestamp',
  TotalAllocPoints = 'totalAllocPoints',
  Treasury = 'treasury'
}

export type Pool = {
  __typename?: 'Pool';
  allocPoint: Scalars['BigInt'];
  depositFee: Scalars['BigInt'];
  id: Scalars['ID'];
  lastRewardTimestamp: Scalars['BigInt'];
  leader: PodLeader;
  pair: Scalars['Bytes'];
  totalStaked: Scalars['BigInt'];
  treasuryAmount: Scalars['BigInt'];
  userCount: Scalars['BigInt'];
  users: Array<PoolUser>;
};


export type PoolUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PoolUser_Filter>;
};

export type PoolUser = {
  __typename?: 'PoolUser';
  id: Scalars['ID'];
  lastTimestamp: Scalars['BigInt'];
  pool: Pool;
  staked: Scalars['BigInt'];
  user: User;
};

export type PoolUser_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastTimestamp?: Maybe<Scalars['BigInt']>;
  lastTimestamp_gt?: Maybe<Scalars['BigInt']>;
  lastTimestamp_gte?: Maybe<Scalars['BigInt']>;
  lastTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  lastTimestamp_lt?: Maybe<Scalars['BigInt']>;
  lastTimestamp_lte?: Maybe<Scalars['BigInt']>;
  lastTimestamp_not?: Maybe<Scalars['BigInt']>;
  lastTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pool?: Maybe<Scalars['String']>;
  pool_contains?: Maybe<Scalars['String']>;
  pool_ends_with?: Maybe<Scalars['String']>;
  pool_gt?: Maybe<Scalars['String']>;
  pool_gte?: Maybe<Scalars['String']>;
  pool_in?: Maybe<Array<Scalars['String']>>;
  pool_lt?: Maybe<Scalars['String']>;
  pool_lte?: Maybe<Scalars['String']>;
  pool_not?: Maybe<Scalars['String']>;
  pool_not_contains?: Maybe<Scalars['String']>;
  pool_not_ends_with?: Maybe<Scalars['String']>;
  pool_not_in?: Maybe<Array<Scalars['String']>>;
  pool_not_starts_with?: Maybe<Scalars['String']>;
  pool_starts_with?: Maybe<Scalars['String']>;
  staked?: Maybe<Scalars['BigInt']>;
  staked_gt?: Maybe<Scalars['BigInt']>;
  staked_gte?: Maybe<Scalars['BigInt']>;
  staked_in?: Maybe<Array<Scalars['BigInt']>>;
  staked_lt?: Maybe<Scalars['BigInt']>;
  staked_lte?: Maybe<Scalars['BigInt']>;
  staked_not?: Maybe<Scalars['BigInt']>;
  staked_not_in?: Maybe<Array<Scalars['BigInt']>>;
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

export enum PoolUser_OrderBy {
  Id = 'id',
  LastTimestamp = 'lastTimestamp',
  Pool = 'pool',
  Staked = 'staked',
  User = 'user'
}

export type Pool_Filter = {
  allocPoint?: Maybe<Scalars['BigInt']>;
  allocPoint_gt?: Maybe<Scalars['BigInt']>;
  allocPoint_gte?: Maybe<Scalars['BigInt']>;
  allocPoint_in?: Maybe<Array<Scalars['BigInt']>>;
  allocPoint_lt?: Maybe<Scalars['BigInt']>;
  allocPoint_lte?: Maybe<Scalars['BigInt']>;
  allocPoint_not?: Maybe<Scalars['BigInt']>;
  allocPoint_not_in?: Maybe<Array<Scalars['BigInt']>>;
  depositFee?: Maybe<Scalars['BigInt']>;
  depositFee_gt?: Maybe<Scalars['BigInt']>;
  depositFee_gte?: Maybe<Scalars['BigInt']>;
  depositFee_in?: Maybe<Array<Scalars['BigInt']>>;
  depositFee_lt?: Maybe<Scalars['BigInt']>;
  depositFee_lte?: Maybe<Scalars['BigInt']>;
  depositFee_not?: Maybe<Scalars['BigInt']>;
  depositFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastRewardTimestamp?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_gt?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_gte?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  lastRewardTimestamp_lt?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_lte?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_not?: Maybe<Scalars['BigInt']>;
  lastRewardTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  leader?: Maybe<Scalars['String']>;
  leader_contains?: Maybe<Scalars['String']>;
  leader_ends_with?: Maybe<Scalars['String']>;
  leader_gt?: Maybe<Scalars['String']>;
  leader_gte?: Maybe<Scalars['String']>;
  leader_in?: Maybe<Array<Scalars['String']>>;
  leader_lt?: Maybe<Scalars['String']>;
  leader_lte?: Maybe<Scalars['String']>;
  leader_not?: Maybe<Scalars['String']>;
  leader_not_contains?: Maybe<Scalars['String']>;
  leader_not_ends_with?: Maybe<Scalars['String']>;
  leader_not_in?: Maybe<Array<Scalars['String']>>;
  leader_not_starts_with?: Maybe<Scalars['String']>;
  leader_starts_with?: Maybe<Scalars['String']>;
  pair?: Maybe<Scalars['Bytes']>;
  pair_contains?: Maybe<Scalars['Bytes']>;
  pair_in?: Maybe<Array<Scalars['Bytes']>>;
  pair_not?: Maybe<Scalars['Bytes']>;
  pair_not_contains?: Maybe<Scalars['Bytes']>;
  pair_not_in?: Maybe<Array<Scalars['Bytes']>>;
  totalStaked?: Maybe<Scalars['BigInt']>;
  totalStaked_gt?: Maybe<Scalars['BigInt']>;
  totalStaked_gte?: Maybe<Scalars['BigInt']>;
  totalStaked_in?: Maybe<Array<Scalars['BigInt']>>;
  totalStaked_lt?: Maybe<Scalars['BigInt']>;
  totalStaked_lte?: Maybe<Scalars['BigInt']>;
  totalStaked_not?: Maybe<Scalars['BigInt']>;
  totalStaked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  treasuryAmount?: Maybe<Scalars['BigInt']>;
  treasuryAmount_gt?: Maybe<Scalars['BigInt']>;
  treasuryAmount_gte?: Maybe<Scalars['BigInt']>;
  treasuryAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  treasuryAmount_lt?: Maybe<Scalars['BigInt']>;
  treasuryAmount_lte?: Maybe<Scalars['BigInt']>;
  treasuryAmount_not?: Maybe<Scalars['BigInt']>;
  treasuryAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  userCount?: Maybe<Scalars['BigInt']>;
  userCount_gt?: Maybe<Scalars['BigInt']>;
  userCount_gte?: Maybe<Scalars['BigInt']>;
  userCount_in?: Maybe<Array<Scalars['BigInt']>>;
  userCount_lt?: Maybe<Scalars['BigInt']>;
  userCount_lte?: Maybe<Scalars['BigInt']>;
  userCount_not?: Maybe<Scalars['BigInt']>;
  userCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Pool_OrderBy {
  AllocPoint = 'allocPoint',
  DepositFee = 'depositFee',
  Id = 'id',
  LastRewardTimestamp = 'lastRewardTimestamp',
  Leader = 'leader',
  Pair = 'pair',
  TotalStaked = 'totalStaked',
  TreasuryAmount = 'treasuryAmount',
  UserCount = 'userCount',
  Users = 'users'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  liquidation?: Maybe<Liquidation>;
  liquidations: Array<Liquidation>;
  orca?: Maybe<Orca>;
  orcas: Array<Orca>;
  podLeader?: Maybe<PodLeader>;
  podLeaders: Array<PodLeader>;
  pool?: Maybe<Pool>;
  poolUser?: Maybe<PoolUser>;
  poolUsers: Array<PoolUser>;
  pools: Array<Pool>;
  stablecoin?: Maybe<Stablecoin>;
  stablecoins: Array<Stablecoin>;
  staking?: Maybe<Staking>;
  stakingUser?: Maybe<StakingUser>;
  stakingUsers: Array<StakingUser>;
  stakings: Array<Staking>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaults: Array<Vault>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryBankArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBanksArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bank_Filter>;
};


export type QueryExchangeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExchangesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Exchange_Filter>;
};


export type QueryLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Liquidation_Filter>;
};


export type QueryOrcaArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrcasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Orca_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Orca_Filter>;
};


export type QueryPodLeaderArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPodLeadersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PodLeader_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PodLeader_Filter>;
};


export type QueryPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PoolUser_Filter>;
};


export type QueryPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pool_Filter>;
};


export type QueryStablecoinArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStablecoinsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Stablecoin_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Stablecoin_Filter>;
};


export type QueryStakingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakingUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakingUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StakingUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StakingUser_Filter>;
};


export type QueryStakingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Staking_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Staking_Filter>;
};


export type QueryTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<TokenPrice_Filter>;
};


export type QueryTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Token_Filter>;
};


export type QueryUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<User_Filter>;
};


export type QueryVaultArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Vault_Filter>;
};

export type Stablecoin = {
  __typename?: 'Stablecoin';
  bankCount: Scalars['Int'];
  banks: Array<Bank>;
  decimals: Scalars['BigInt'];
  id: Scalars['ID'];
  name: Scalars['String'];
  paused: Scalars['Boolean'];
  symbol: Scalars['String'];
  totalSupply: Scalars['BigInt'];
};


export type StablecoinBanksArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bank_Filter>;
};

export type Stablecoin_Filter = {
  bankCount?: Maybe<Scalars['Int']>;
  bankCount_gt?: Maybe<Scalars['Int']>;
  bankCount_gte?: Maybe<Scalars['Int']>;
  bankCount_in?: Maybe<Array<Scalars['Int']>>;
  bankCount_lt?: Maybe<Scalars['Int']>;
  bankCount_lte?: Maybe<Scalars['Int']>;
  bankCount_not?: Maybe<Scalars['Int']>;
  bankCount_not_in?: Maybe<Array<Scalars['Int']>>;
  decimals?: Maybe<Scalars['BigInt']>;
  decimals_gt?: Maybe<Scalars['BigInt']>;
  decimals_gte?: Maybe<Scalars['BigInt']>;
  decimals_in?: Maybe<Array<Scalars['BigInt']>>;
  decimals_lt?: Maybe<Scalars['BigInt']>;
  decimals_lte?: Maybe<Scalars['BigInt']>;
  decimals_not?: Maybe<Scalars['BigInt']>;
  decimals_not_in?: Maybe<Array<Scalars['BigInt']>>;
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
  paused?: Maybe<Scalars['Boolean']>;
  paused_in?: Maybe<Array<Scalars['Boolean']>>;
  paused_not?: Maybe<Scalars['Boolean']>;
  paused_not_in?: Maybe<Array<Scalars['Boolean']>>;
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
  totalSupply?: Maybe<Scalars['BigInt']>;
  totalSupply_gt?: Maybe<Scalars['BigInt']>;
  totalSupply_gte?: Maybe<Scalars['BigInt']>;
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: Maybe<Scalars['BigInt']>;
  totalSupply_lte?: Maybe<Scalars['BigInt']>;
  totalSupply_not?: Maybe<Scalars['BigInt']>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Stablecoin_OrderBy {
  BankCount = 'bankCount',
  Banks = 'banks',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Paused = 'paused',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply'
}

export type Staking = {
  __typename?: 'Staking';
  avaxPerSec: Scalars['BigInt'];
  endTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  startTimestamp: Scalars['BigInt'];
  totalAllocPoints: Scalars['BigInt'];
  totalStaked: Scalars['BigInt'];
  userCount: Scalars['BigInt'];
  users: Array<StakingUser>;
};


export type StakingUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StakingUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<StakingUser_Filter>;
};

export type StakingUser = {
  __typename?: 'StakingUser';
  id: Scalars['ID'];
  staked: Scalars['BigInt'];
  staking: Staking;
  user: User;
};

export type StakingUser_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  staked?: Maybe<Scalars['BigInt']>;
  staked_gt?: Maybe<Scalars['BigInt']>;
  staked_gte?: Maybe<Scalars['BigInt']>;
  staked_in?: Maybe<Array<Scalars['BigInt']>>;
  staked_lt?: Maybe<Scalars['BigInt']>;
  staked_lte?: Maybe<Scalars['BigInt']>;
  staked_not?: Maybe<Scalars['BigInt']>;
  staked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  staking?: Maybe<Scalars['String']>;
  staking_contains?: Maybe<Scalars['String']>;
  staking_ends_with?: Maybe<Scalars['String']>;
  staking_gt?: Maybe<Scalars['String']>;
  staking_gte?: Maybe<Scalars['String']>;
  staking_in?: Maybe<Array<Scalars['String']>>;
  staking_lt?: Maybe<Scalars['String']>;
  staking_lte?: Maybe<Scalars['String']>;
  staking_not?: Maybe<Scalars['String']>;
  staking_not_contains?: Maybe<Scalars['String']>;
  staking_not_ends_with?: Maybe<Scalars['String']>;
  staking_not_in?: Maybe<Array<Scalars['String']>>;
  staking_not_starts_with?: Maybe<Scalars['String']>;
  staking_starts_with?: Maybe<Scalars['String']>;
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

export enum StakingUser_OrderBy {
  Id = 'id',
  Staked = 'staked',
  Staking = 'staking',
  User = 'user'
}

export type Staking_Filter = {
  avaxPerSec?: Maybe<Scalars['BigInt']>;
  avaxPerSec_gt?: Maybe<Scalars['BigInt']>;
  avaxPerSec_gte?: Maybe<Scalars['BigInt']>;
  avaxPerSec_in?: Maybe<Array<Scalars['BigInt']>>;
  avaxPerSec_lt?: Maybe<Scalars['BigInt']>;
  avaxPerSec_lte?: Maybe<Scalars['BigInt']>;
  avaxPerSec_not?: Maybe<Scalars['BigInt']>;
  avaxPerSec_not_in?: Maybe<Array<Scalars['BigInt']>>;
  endTimestamp?: Maybe<Scalars['BigInt']>;
  endTimestamp_gt?: Maybe<Scalars['BigInt']>;
  endTimestamp_gte?: Maybe<Scalars['BigInt']>;
  endTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt?: Maybe<Scalars['BigInt']>;
  endTimestamp_lte?: Maybe<Scalars['BigInt']>;
  endTimestamp_not?: Maybe<Scalars['BigInt']>;
  endTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  startTimestamp?: Maybe<Scalars['BigInt']>;
  startTimestamp_gt?: Maybe<Scalars['BigInt']>;
  startTimestamp_gte?: Maybe<Scalars['BigInt']>;
  startTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt?: Maybe<Scalars['BigInt']>;
  startTimestamp_lte?: Maybe<Scalars['BigInt']>;
  startTimestamp_not?: Maybe<Scalars['BigInt']>;
  startTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalAllocPoints?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_gt?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_gte?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_in?: Maybe<Array<Scalars['BigInt']>>;
  totalAllocPoints_lt?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_lte?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_not?: Maybe<Scalars['BigInt']>;
  totalAllocPoints_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalStaked?: Maybe<Scalars['BigInt']>;
  totalStaked_gt?: Maybe<Scalars['BigInt']>;
  totalStaked_gte?: Maybe<Scalars['BigInt']>;
  totalStaked_in?: Maybe<Array<Scalars['BigInt']>>;
  totalStaked_lt?: Maybe<Scalars['BigInt']>;
  totalStaked_lte?: Maybe<Scalars['BigInt']>;
  totalStaked_not?: Maybe<Scalars['BigInt']>;
  totalStaked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  userCount?: Maybe<Scalars['BigInt']>;
  userCount_gt?: Maybe<Scalars['BigInt']>;
  userCount_gte?: Maybe<Scalars['BigInt']>;
  userCount_in?: Maybe<Array<Scalars['BigInt']>>;
  userCount_lt?: Maybe<Scalars['BigInt']>;
  userCount_lte?: Maybe<Scalars['BigInt']>;
  userCount_not?: Maybe<Scalars['BigInt']>;
  userCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Staking_OrderBy {
  AvaxPerSec = 'avaxPerSec',
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  StartTimestamp = 'startTimestamp',
  TotalAllocPoints = 'totalAllocPoints',
  TotalStaked = 'totalStaked',
  UserCount = 'userCount',
  Users = 'users'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  liquidation?: Maybe<Liquidation>;
  liquidations: Array<Liquidation>;
  orca?: Maybe<Orca>;
  orcas: Array<Orca>;
  podLeader?: Maybe<PodLeader>;
  podLeaders: Array<PodLeader>;
  pool?: Maybe<Pool>;
  poolUser?: Maybe<PoolUser>;
  poolUsers: Array<PoolUser>;
  pools: Array<Pool>;
  stablecoin?: Maybe<Stablecoin>;
  stablecoins: Array<Stablecoin>;
  staking?: Maybe<Staking>;
  stakingUser?: Maybe<StakingUser>;
  stakingUsers: Array<StakingUser>;
  stakings: Array<Staking>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaults: Array<Vault>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionBankArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBanksArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bank_Filter>;
};


export type SubscriptionExchangeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExchangesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Exchange_Filter>;
};


export type SubscriptionLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Liquidation_Filter>;
};


export type SubscriptionOrcaArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrcasArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Orca_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Orca_Filter>;
};


export type SubscriptionPodLeaderArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPodLeadersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PodLeader_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PodLeader_Filter>;
};


export type SubscriptionPoolArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PoolUser_Filter>;
};


export type SubscriptionPoolsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pool_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pool_Filter>;
};


export type SubscriptionStablecoinArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStablecoinsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Stablecoin_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Stablecoin_Filter>;
};


export type SubscriptionStakingArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakingUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakingUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StakingUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<StakingUser_Filter>;
};


export type SubscriptionStakingsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Staking_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Staking_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<TokenPrice_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Token_Filter>;
};


export type SubscriptionUserArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<User_Filter>;
};


export type SubscriptionVaultArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Vault_Filter>;
};

export type Token = {
  __typename?: 'Token';
  banks: Array<Bank>;
  decimals: Scalars['BigInt'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: TokenPrice;
  symbol: Scalars['String'];
};


export type TokenBanksArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bank_Filter>;
};

export type TokenPrice = {
  __typename?: 'TokenPrice';
  id: Scalars['ID'];
  priceUSD: Scalars['BigInt'];
};

export type TokenPrice_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  priceUSD?: Maybe<Scalars['BigInt']>;
  priceUSD_gt?: Maybe<Scalars['BigInt']>;
  priceUSD_gte?: Maybe<Scalars['BigInt']>;
  priceUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  priceUSD_lt?: Maybe<Scalars['BigInt']>;
  priceUSD_lte?: Maybe<Scalars['BigInt']>;
  priceUSD_not?: Maybe<Scalars['BigInt']>;
  priceUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum TokenPrice_OrderBy {
  Id = 'id',
  PriceUsd = 'priceUSD'
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
  price?: Maybe<Scalars['String']>;
  price_contains?: Maybe<Scalars['String']>;
  price_ends_with?: Maybe<Scalars['String']>;
  price_gt?: Maybe<Scalars['String']>;
  price_gte?: Maybe<Scalars['String']>;
  price_in?: Maybe<Array<Scalars['String']>>;
  price_lt?: Maybe<Scalars['String']>;
  price_lte?: Maybe<Scalars['String']>;
  price_not?: Maybe<Scalars['String']>;
  price_not_contains?: Maybe<Scalars['String']>;
  price_not_ends_with?: Maybe<Scalars['String']>;
  price_not_in?: Maybe<Array<Scalars['String']>>;
  price_not_starts_with?: Maybe<Scalars['String']>;
  price_starts_with?: Maybe<Scalars['String']>;
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
};

export enum Token_OrderBy {
  Banks = 'banks',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Price = 'price',
  Symbol = 'symbol'
}

export type User = {
  __typename?: 'User';
  balanceStable: Scalars['BigInt'];
  id: Scalars['ID'];
  liquidations?: Maybe<Array<Liquidation>>;
  pools?: Maybe<Array<PoolUser>>;
  staking?: Maybe<Array<StakingUser>>;
  vaults?: Maybe<Array<Vault>>;
};


export type UserLiquidationsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Liquidation_Filter>;
};


export type UserPoolsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PoolUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PoolUser_Filter>;
};


export type UserStakingArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StakingUser_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<StakingUser_Filter>;
};


export type UserVaultsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Vault_Filter>;
};

export type User_Filter = {
  balanceStable?: Maybe<Scalars['BigInt']>;
  balanceStable_gt?: Maybe<Scalars['BigInt']>;
  balanceStable_gte?: Maybe<Scalars['BigInt']>;
  balanceStable_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceStable_lt?: Maybe<Scalars['BigInt']>;
  balanceStable_lte?: Maybe<Scalars['BigInt']>;
  balanceStable_not?: Maybe<Scalars['BigInt']>;
  balanceStable_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  BalanceStable = 'balanceStable',
  Id = 'id',
  Liquidations = 'liquidations',
  Pools = 'pools',
  Staking = 'staking',
  Vaults = 'vaults'
}

export type Vault = {
  __typename?: 'Vault';
  bank: Bank;
  collateral: Scalars['BigInt'];
  debt: Scalars['BigInt'];
  id: Scalars['ID'];
  number: Scalars['Int'];
  user: User;
};

export type Vault_Filter = {
  bank?: Maybe<Scalars['String']>;
  bank_contains?: Maybe<Scalars['String']>;
  bank_ends_with?: Maybe<Scalars['String']>;
  bank_gt?: Maybe<Scalars['String']>;
  bank_gte?: Maybe<Scalars['String']>;
  bank_in?: Maybe<Array<Scalars['String']>>;
  bank_lt?: Maybe<Scalars['String']>;
  bank_lte?: Maybe<Scalars['String']>;
  bank_not?: Maybe<Scalars['String']>;
  bank_not_contains?: Maybe<Scalars['String']>;
  bank_not_ends_with?: Maybe<Scalars['String']>;
  bank_not_in?: Maybe<Array<Scalars['String']>>;
  bank_not_starts_with?: Maybe<Scalars['String']>;
  bank_starts_with?: Maybe<Scalars['String']>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debt?: Maybe<Scalars['BigInt']>;
  debt_gt?: Maybe<Scalars['BigInt']>;
  debt_gte?: Maybe<Scalars['BigInt']>;
  debt_in?: Maybe<Array<Scalars['BigInt']>>;
  debt_lt?: Maybe<Scalars['BigInt']>;
  debt_lte?: Maybe<Scalars['BigInt']>;
  debt_not?: Maybe<Scalars['BigInt']>;
  debt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  number?: Maybe<Scalars['Int']>;
  number_gt?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
  number_in?: Maybe<Array<Scalars['Int']>>;
  number_lt?: Maybe<Scalars['Int']>;
  number_lte?: Maybe<Scalars['Int']>;
  number_not?: Maybe<Scalars['Int']>;
  number_not_in?: Maybe<Array<Scalars['Int']>>;
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

export enum Vault_OrderBy {
  Bank = 'bank',
  Collateral = 'collateral',
  Debt = 'debt',
  Id = 'id',
  Number = 'number',
  User = 'user'
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

export type AvaiStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvaiStatsQuery = { __typename?: 'Query', stablecoin?: Maybe<{ __typename?: 'Stablecoin', id: string, totalSupply: any }> };

export type BankInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BankInfoQuery = { __typename?: 'Query', bank?: Maybe<{ __typename?: 'Bank', debtCeiling: any, totalDebt: any }> };

export type TotalSupplyFrontPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalSupplyFrontPageQuery = { __typename?: 'Query', stablecoins: Array<{ __typename?: 'Stablecoin', totalSupply: any }> };

export type BankInfoFrontPageQueryVariables = Exact<{ [key: string]: never; }>;


export type BankInfoFrontPageQuery = { __typename?: 'Query', banks: Array<{ __typename?: 'Bank', id: string, treasury: any, totalDebt: any, totalCollateral: any, tokenPeg: any, minimumCollateralPercentage: any, token: { __typename?: 'Token', symbol: string, decimals: any, price: { __typename?: 'TokenPrice', priceUSD: any } }, vaults: Array<{ __typename?: 'Vault', collateral: any, debt: any }> }> };

export type VaultInfoFrontPageQueryVariables = Exact<{ [key: string]: never; }>;


export type VaultInfoFrontPageQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', collateral: any, debt: any, bank: { __typename?: 'Bank', id: string } }> };

export type ExchangeInfoFrontPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ExchangeInfoFrontPageQuery = { __typename?: 'Query', exchanges: Array<{ __typename?: 'Exchange', treasury: any, usdHeld: any }> };

export type OrcaPerSecQueryVariables = Exact<{ [key: string]: never; }>;


export type OrcaPerSecQuery = { __typename?: 'Query', podLeaders: Array<{ __typename?: 'PodLeader', orcaPerSec: any }> };

export type GeneralYieldInfoQueryVariables = Exact<{
  pair: Scalars['Bytes'];
}>;


export type GeneralYieldInfoQuery = { __typename?: 'Query', pools: Array<{ __typename?: 'Pool', id: string, pair: any, allocPoint: any, totalStaked: any, depositFee: any, treasuryAmount: any, leader: { __typename?: 'PodLeader', orcaPerSec: any, totalAllocPoints: any } }> };

export type UserStakedQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserStakedQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', pools?: Maybe<Array<{ __typename?: 'PoolUser', staked: any, pool: { __typename?: 'Pool', pair: any } }>> }> };

export type MonitorVaultsQueryVariables = Exact<{
  bankID: Scalars['String'];
}>;


export type MonitorVaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', number: number, collateral: any, debt: any, id: string }> };

export type BankMcpQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BankMcpQuery = { __typename?: 'Query', bank?: Maybe<{ __typename?: 'Bank', minimumCollateralPercentage: any }> };

export type NewMonitorVaultsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewMonitorVaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', number: number, collateral: any, debt: any, id: string, bank: { __typename?: 'Bank', id: string, minimumCollateralPercentage: any } }> };

export type OrcaStatsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OrcaStatsQuery = { __typename?: 'Query', orca?: Maybe<{ __typename?: 'Orca', id: string, circulatingSupply: any, maxSupply: any }> };

export type GeneralStakingInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneralStakingInfoQuery = { __typename?: 'Query', staking?: Maybe<{ __typename?: 'Staking', totalStaked: any, avaxPerSec: any, totalAllocPoints: any }> };

export type PartnerStakingInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PartnerStakingInfoQuery = { __typename?: 'Query', staking?: Maybe<{ __typename?: 'Staking', totalStaked: any, avaxPerSec: any, totalAllocPoints: any }> };

export type UserStakingInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserStakingInfoQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', staking?: Maybe<Array<{ __typename?: 'StakingUser', staked: any, staking: { __typename?: 'Staking', id: string } }>> }> };

export type UserVaultsQueryVariables = Exact<{
  user: Scalars['String'];
  bank: Scalars['String'];
}>;


export type UserVaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', id: string, collateral: any, number: number, debt: any, bank: { __typename?: 'Bank', id: string, treasury: any } }> };

export type NewUserVaultsQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type NewUserVaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', id: string, collateral: any, number: number, debt: any, bank: { __typename?: 'Bank', id: string, treasury: any, token: { __typename?: 'Token', symbol: string, decimals: any } } }> };

export type VaultInfoQueryVariables = Exact<{
  vaultID: Scalars['ID'];
}>;


export type VaultInfoQuery = { __typename?: 'Query', vault?: Maybe<{ __typename?: 'Vault', id: string, collateral: any, number: number, debt: any, bank: { __typename?: 'Bank', id: string, minimumCollateralPercentage: any, closingFee: any, openingFee: any, tokenPeg: any }, user: { __typename?: 'User', id: string } }> };

export type AllBankInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBankInfoQuery = { __typename?: 'Query', banks: Array<{ __typename?: 'Bank', id: string, debtCeiling: any, totalDebt: any, minimumCollateralPercentage: any }> };


export const AvaiStatsDocument = gql`
    query AvaiStats @api(name: orca) {
  stablecoin(id: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6") {
    id
    totalSupply
  }
}
    `;

/**
 * __useAvaiStatsQuery__
 *
 * To run a query within a React component, call `useAvaiStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvaiStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvaiStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvaiStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AvaiStatsQuery, AvaiStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AvaiStatsQuery, AvaiStatsQueryVariables>(AvaiStatsDocument, options);
      }
export function useAvaiStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AvaiStatsQuery, AvaiStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AvaiStatsQuery, AvaiStatsQueryVariables>(AvaiStatsDocument, options);
        }
export type AvaiStatsQueryHookResult = ReturnType<typeof useAvaiStatsQuery>;
export type AvaiStatsLazyQueryHookResult = ReturnType<typeof useAvaiStatsLazyQuery>;
export type AvaiStatsQueryResult = Apollo.QueryResult<AvaiStatsQuery, AvaiStatsQueryVariables>;
export const BankInfoDocument = gql`
    query BankInfo($id: ID!) @api(name: orca) {
  bank(id: $id) {
    debtCeiling
    totalDebt
  }
}
    `;

/**
 * __useBankInfoQuery__
 *
 * To run a query within a React component, call `useBankInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
      }
export function useBankInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
        }
export type BankInfoQueryHookResult = ReturnType<typeof useBankInfoQuery>;
export type BankInfoLazyQueryHookResult = ReturnType<typeof useBankInfoLazyQuery>;
export type BankInfoQueryResult = Apollo.QueryResult<BankInfoQuery, BankInfoQueryVariables>;
export const TotalSupplyFrontPageDocument = gql`
    query TotalSupplyFrontPage @api(name: orca) {
  stablecoins {
    totalSupply
  }
}
    `;

/**
 * __useTotalSupplyFrontPageQuery__
 *
 * To run a query within a React component, call `useTotalSupplyFrontPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalSupplyFrontPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalSupplyFrontPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useTotalSupplyFrontPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalSupplyFrontPageQuery, TotalSupplyFrontPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TotalSupplyFrontPageQuery, TotalSupplyFrontPageQueryVariables>(TotalSupplyFrontPageDocument, options);
      }
export function useTotalSupplyFrontPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalSupplyFrontPageQuery, TotalSupplyFrontPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TotalSupplyFrontPageQuery, TotalSupplyFrontPageQueryVariables>(TotalSupplyFrontPageDocument, options);
        }
export type TotalSupplyFrontPageQueryHookResult = ReturnType<typeof useTotalSupplyFrontPageQuery>;
export type TotalSupplyFrontPageLazyQueryHookResult = ReturnType<typeof useTotalSupplyFrontPageLazyQuery>;
export type TotalSupplyFrontPageQueryResult = Apollo.QueryResult<TotalSupplyFrontPageQuery, TotalSupplyFrontPageQueryVariables>;
export const BankInfoFrontPageDocument = gql`
    query BankInfoFrontPage @api(name: orca) {
  banks {
    id
    treasury
    totalDebt
    totalCollateral
    tokenPeg
    minimumCollateralPercentage
    token {
      symbol
      decimals
      price {
        priceUSD
      }
    }
    vaults {
      collateral
      debt
    }
  }
}
    `;

/**
 * __useBankInfoFrontPageQuery__
 *
 * To run a query within a React component, call `useBankInfoFrontPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoFrontPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoFrontPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useBankInfoFrontPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankInfoFrontPageQuery, BankInfoFrontPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BankInfoFrontPageQuery, BankInfoFrontPageQueryVariables>(BankInfoFrontPageDocument, options);
      }
export function useBankInfoFrontPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankInfoFrontPageQuery, BankInfoFrontPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BankInfoFrontPageQuery, BankInfoFrontPageQueryVariables>(BankInfoFrontPageDocument, options);
        }
export type BankInfoFrontPageQueryHookResult = ReturnType<typeof useBankInfoFrontPageQuery>;
export type BankInfoFrontPageLazyQueryHookResult = ReturnType<typeof useBankInfoFrontPageLazyQuery>;
export type BankInfoFrontPageQueryResult = Apollo.QueryResult<BankInfoFrontPageQuery, BankInfoFrontPageQueryVariables>;
export const VaultInfoFrontPageDocument = gql`
    query VaultInfoFrontPage @api(name: orca) {
  vaults(where: {collateral_gt: 0}) {
    collateral
    debt
    bank {
      id
    }
  }
}
    `;

/**
 * __useVaultInfoFrontPageQuery__
 *
 * To run a query within a React component, call `useVaultInfoFrontPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useVaultInfoFrontPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVaultInfoFrontPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useVaultInfoFrontPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VaultInfoFrontPageQuery, VaultInfoFrontPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<VaultInfoFrontPageQuery, VaultInfoFrontPageQueryVariables>(VaultInfoFrontPageDocument, options);
      }
export function useVaultInfoFrontPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VaultInfoFrontPageQuery, VaultInfoFrontPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<VaultInfoFrontPageQuery, VaultInfoFrontPageQueryVariables>(VaultInfoFrontPageDocument, options);
        }
export type VaultInfoFrontPageQueryHookResult = ReturnType<typeof useVaultInfoFrontPageQuery>;
export type VaultInfoFrontPageLazyQueryHookResult = ReturnType<typeof useVaultInfoFrontPageLazyQuery>;
export type VaultInfoFrontPageQueryResult = Apollo.QueryResult<VaultInfoFrontPageQuery, VaultInfoFrontPageQueryVariables>;
export const ExchangeInfoFrontPageDocument = gql`
    query ExchangeInfoFrontPage @api(name: orca) {
  exchanges {
    treasury
    usdHeld
  }
}
    `;

/**
 * __useExchangeInfoFrontPageQuery__
 *
 * To run a query within a React component, call `useExchangeInfoFrontPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeInfoFrontPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeInfoFrontPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useExchangeInfoFrontPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ExchangeInfoFrontPageQuery, ExchangeInfoFrontPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ExchangeInfoFrontPageQuery, ExchangeInfoFrontPageQueryVariables>(ExchangeInfoFrontPageDocument, options);
      }
export function useExchangeInfoFrontPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ExchangeInfoFrontPageQuery, ExchangeInfoFrontPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ExchangeInfoFrontPageQuery, ExchangeInfoFrontPageQueryVariables>(ExchangeInfoFrontPageDocument, options);
        }
export type ExchangeInfoFrontPageQueryHookResult = ReturnType<typeof useExchangeInfoFrontPageQuery>;
export type ExchangeInfoFrontPageLazyQueryHookResult = ReturnType<typeof useExchangeInfoFrontPageLazyQuery>;
export type ExchangeInfoFrontPageQueryResult = Apollo.QueryResult<ExchangeInfoFrontPageQuery, ExchangeInfoFrontPageQueryVariables>;
export const OrcaPerSecDocument = gql`
    query OrcaPerSec @api(name: orca) {
  podLeaders(first: 1) {
    orcaPerSec
  }
}
    `;

/**
 * __useOrcaPerSecQuery__
 *
 * To run a query within a React component, call `useOrcaPerSecQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrcaPerSecQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrcaPerSecQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrcaPerSecQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrcaPerSecQuery, OrcaPerSecQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrcaPerSecQuery, OrcaPerSecQueryVariables>(OrcaPerSecDocument, options);
      }
export function useOrcaPerSecLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrcaPerSecQuery, OrcaPerSecQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrcaPerSecQuery, OrcaPerSecQueryVariables>(OrcaPerSecDocument, options);
        }
export type OrcaPerSecQueryHookResult = ReturnType<typeof useOrcaPerSecQuery>;
export type OrcaPerSecLazyQueryHookResult = ReturnType<typeof useOrcaPerSecLazyQuery>;
export type OrcaPerSecQueryResult = Apollo.QueryResult<OrcaPerSecQuery, OrcaPerSecQueryVariables>;
export const GeneralYieldInfoDocument = gql`
    query GeneralYieldInfo($pair: Bytes!) @api(name: orca) {
  pools(where: {pair: $pair}) {
    id
    pair
    allocPoint
    totalStaked
    depositFee
    treasuryAmount
    leader {
      orcaPerSec
      totalAllocPoints
    }
  }
}
    `;

/**
 * __useGeneralYieldInfoQuery__
 *
 * To run a query within a React component, call `useGeneralYieldInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralYieldInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralYieldInfoQuery({
 *   variables: {
 *      pair: // value for 'pair'
 *   },
 * });
 */
export function useGeneralYieldInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GeneralYieldInfoQuery, GeneralYieldInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GeneralYieldInfoQuery, GeneralYieldInfoQueryVariables>(GeneralYieldInfoDocument, options);
      }
export function useGeneralYieldInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GeneralYieldInfoQuery, GeneralYieldInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GeneralYieldInfoQuery, GeneralYieldInfoQueryVariables>(GeneralYieldInfoDocument, options);
        }
export type GeneralYieldInfoQueryHookResult = ReturnType<typeof useGeneralYieldInfoQuery>;
export type GeneralYieldInfoLazyQueryHookResult = ReturnType<typeof useGeneralYieldInfoLazyQuery>;
export type GeneralYieldInfoQueryResult = Apollo.QueryResult<GeneralYieldInfoQuery, GeneralYieldInfoQueryVariables>;
export const UserStakedDocument = gql`
    query UserStaked($id: ID!) @api(name: orca) {
  user(id: $id) {
    pools {
      staked
      pool {
        pair
      }
    }
  }
}
    `;

/**
 * __useUserStakedQuery__
 *
 * To run a query within a React component, call `useUserStakedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStakedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStakedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserStakedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserStakedQuery, UserStakedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserStakedQuery, UserStakedQueryVariables>(UserStakedDocument, options);
      }
export function useUserStakedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserStakedQuery, UserStakedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserStakedQuery, UserStakedQueryVariables>(UserStakedDocument, options);
        }
export type UserStakedQueryHookResult = ReturnType<typeof useUserStakedQuery>;
export type UserStakedLazyQueryHookResult = ReturnType<typeof useUserStakedLazyQuery>;
export type UserStakedQueryResult = Apollo.QueryResult<UserStakedQuery, UserStakedQueryVariables>;
export const MonitorVaultsDocument = gql`
    query MonitorVaults($bankID: String!) @api(name: orca) {
  vaults(where: {bank: $bankID, debt_gt: 0}) {
    number
    collateral
    debt
    id
  }
}
    `;

/**
 * __useMonitorVaultsQuery__
 *
 * To run a query within a React component, call `useMonitorVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonitorVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorVaultsQuery({
 *   variables: {
 *      bankID: // value for 'bankID'
 *   },
 * });
 */
export function useMonitorVaultsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MonitorVaultsQuery, MonitorVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MonitorVaultsQuery, MonitorVaultsQueryVariables>(MonitorVaultsDocument, options);
      }
export function useMonitorVaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MonitorVaultsQuery, MonitorVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MonitorVaultsQuery, MonitorVaultsQueryVariables>(MonitorVaultsDocument, options);
        }
export type MonitorVaultsQueryHookResult = ReturnType<typeof useMonitorVaultsQuery>;
export type MonitorVaultsLazyQueryHookResult = ReturnType<typeof useMonitorVaultsLazyQuery>;
export type MonitorVaultsQueryResult = Apollo.QueryResult<MonitorVaultsQuery, MonitorVaultsQueryVariables>;
export const BankMcpDocument = gql`
    query BankMCP($id: ID!) @api(name: orca) {
  bank(id: $id) {
    minimumCollateralPercentage
  }
}
    `;

/**
 * __useBankMcpQuery__
 *
 * To run a query within a React component, call `useBankMcpQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankMcpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankMcpQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankMcpQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BankMcpQuery, BankMcpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BankMcpQuery, BankMcpQueryVariables>(BankMcpDocument, options);
      }
export function useBankMcpLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankMcpQuery, BankMcpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BankMcpQuery, BankMcpQueryVariables>(BankMcpDocument, options);
        }
export type BankMcpQueryHookResult = ReturnType<typeof useBankMcpQuery>;
export type BankMcpLazyQueryHookResult = ReturnType<typeof useBankMcpLazyQuery>;
export type BankMcpQueryResult = Apollo.QueryResult<BankMcpQuery, BankMcpQueryVariables>;
export const NewMonitorVaultsDocument = gql`
    query NewMonitorVaults @api(name: orca) {
  vaults(where: {debt_gt: 0}) {
    number
    collateral
    debt
    id
    bank {
      id
      minimumCollateralPercentage
    }
  }
}
    `;

/**
 * __useNewMonitorVaultsQuery__
 *
 * To run a query within a React component, call `useNewMonitorVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewMonitorVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMonitorVaultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewMonitorVaultsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewMonitorVaultsQuery, NewMonitorVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NewMonitorVaultsQuery, NewMonitorVaultsQueryVariables>(NewMonitorVaultsDocument, options);
      }
export function useNewMonitorVaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewMonitorVaultsQuery, NewMonitorVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NewMonitorVaultsQuery, NewMonitorVaultsQueryVariables>(NewMonitorVaultsDocument, options);
        }
export type NewMonitorVaultsQueryHookResult = ReturnType<typeof useNewMonitorVaultsQuery>;
export type NewMonitorVaultsLazyQueryHookResult = ReturnType<typeof useNewMonitorVaultsLazyQuery>;
export type NewMonitorVaultsQueryResult = Apollo.QueryResult<NewMonitorVaultsQuery, NewMonitorVaultsQueryVariables>;
export const OrcaStatsDocument = gql`
    query OrcaStats($id: ID!) @api(name: orca) {
  orca(id: $id) {
    id
    circulatingSupply
    maxSupply
  }
}
    `;

/**
 * __useOrcaStatsQuery__
 *
 * To run a query within a React component, call `useOrcaStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrcaStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrcaStatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrcaStatsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<OrcaStatsQuery, OrcaStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrcaStatsQuery, OrcaStatsQueryVariables>(OrcaStatsDocument, options);
      }
export function useOrcaStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrcaStatsQuery, OrcaStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrcaStatsQuery, OrcaStatsQueryVariables>(OrcaStatsDocument, options);
        }
export type OrcaStatsQueryHookResult = ReturnType<typeof useOrcaStatsQuery>;
export type OrcaStatsLazyQueryHookResult = ReturnType<typeof useOrcaStatsLazyQuery>;
export type OrcaStatsQueryResult = Apollo.QueryResult<OrcaStatsQuery, OrcaStatsQueryVariables>;
export const GeneralStakingInfoDocument = gql`
    query GeneralStakingInfo @api(name: orca) {
  staking(id: "0xA3654801Ba6FB21d5A984F9a857441395dDeccFb") {
    totalStaked
    avaxPerSec
    totalAllocPoints
  }
}
    `;

/**
 * __useGeneralStakingInfoQuery__
 *
 * To run a query within a React component, call `useGeneralStakingInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralStakingInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralStakingInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGeneralStakingInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GeneralStakingInfoQuery, GeneralStakingInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GeneralStakingInfoQuery, GeneralStakingInfoQueryVariables>(GeneralStakingInfoDocument, options);
      }
export function useGeneralStakingInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GeneralStakingInfoQuery, GeneralStakingInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GeneralStakingInfoQuery, GeneralStakingInfoQueryVariables>(GeneralStakingInfoDocument, options);
        }
export type GeneralStakingInfoQueryHookResult = ReturnType<typeof useGeneralStakingInfoQuery>;
export type GeneralStakingInfoLazyQueryHookResult = ReturnType<typeof useGeneralStakingInfoLazyQuery>;
export type GeneralStakingInfoQueryResult = Apollo.QueryResult<GeneralStakingInfoQuery, GeneralStakingInfoQueryVariables>;
export const PartnerStakingInfoDocument = gql`
    query PartnerStakingInfo($id: ID!) @api(name: orca) {
  staking(id: $id) {
    totalStaked
    avaxPerSec
    totalAllocPoints
  }
}
    `;

/**
 * __usePartnerStakingInfoQuery__
 *
 * To run a query within a React component, call `usePartnerStakingInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerStakingInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerStakingInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartnerStakingInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PartnerStakingInfoQuery, PartnerStakingInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PartnerStakingInfoQuery, PartnerStakingInfoQueryVariables>(PartnerStakingInfoDocument, options);
      }
export function usePartnerStakingInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PartnerStakingInfoQuery, PartnerStakingInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PartnerStakingInfoQuery, PartnerStakingInfoQueryVariables>(PartnerStakingInfoDocument, options);
        }
export type PartnerStakingInfoQueryHookResult = ReturnType<typeof usePartnerStakingInfoQuery>;
export type PartnerStakingInfoLazyQueryHookResult = ReturnType<typeof usePartnerStakingInfoLazyQuery>;
export type PartnerStakingInfoQueryResult = Apollo.QueryResult<PartnerStakingInfoQuery, PartnerStakingInfoQueryVariables>;
export const UserStakingInfoDocument = gql`
    query UserStakingInfo($id: ID!) @api(name: orca) {
  user(id: $id) {
    staking {
      staked
      staking {
        id
      }
    }
  }
}
    `;

/**
 * __useUserStakingInfoQuery__
 *
 * To run a query within a React component, call `useUserStakingInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStakingInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStakingInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserStakingInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserStakingInfoQuery, UserStakingInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserStakingInfoQuery, UserStakingInfoQueryVariables>(UserStakingInfoDocument, options);
      }
export function useUserStakingInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserStakingInfoQuery, UserStakingInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserStakingInfoQuery, UserStakingInfoQueryVariables>(UserStakingInfoDocument, options);
        }
export type UserStakingInfoQueryHookResult = ReturnType<typeof useUserStakingInfoQuery>;
export type UserStakingInfoLazyQueryHookResult = ReturnType<typeof useUserStakingInfoLazyQuery>;
export type UserStakingInfoQueryResult = Apollo.QueryResult<UserStakingInfoQuery, UserStakingInfoQueryVariables>;
export const UserVaultsDocument = gql`
    query UserVaults($user: String!, $bank: String!) @api(name: orca) {
  vaults(where: {user: $user, bank: $bank}) {
    id
    collateral
    number
    debt
    bank {
      id
      treasury
    }
  }
}
    `;

/**
 * __useUserVaultsQuery__
 *
 * To run a query within a React component, call `useUserVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserVaultsQuery({
 *   variables: {
 *      user: // value for 'user'
 *      bank: // value for 'bank'
 *   },
 * });
 */
export function useUserVaultsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserVaultsQuery, UserVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserVaultsQuery, UserVaultsQueryVariables>(UserVaultsDocument, options);
      }
export function useUserVaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserVaultsQuery, UserVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserVaultsQuery, UserVaultsQueryVariables>(UserVaultsDocument, options);
        }
export type UserVaultsQueryHookResult = ReturnType<typeof useUserVaultsQuery>;
export type UserVaultsLazyQueryHookResult = ReturnType<typeof useUserVaultsLazyQuery>;
export type UserVaultsQueryResult = Apollo.QueryResult<UserVaultsQuery, UserVaultsQueryVariables>;
export const NewUserVaultsDocument = gql`
    query NewUserVaults($user: String!) @api(name: orca) {
  vaults(where: {user: $user}) {
    id
    collateral
    number
    debt
    bank {
      id
      treasury
      token {
        symbol
        decimals
      }
    }
  }
}
    `;

/**
 * __useNewUserVaultsQuery__
 *
 * To run a query within a React component, call `useNewUserVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewUserVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserVaultsQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useNewUserVaultsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<NewUserVaultsQuery, NewUserVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NewUserVaultsQuery, NewUserVaultsQueryVariables>(NewUserVaultsDocument, options);
      }
export function useNewUserVaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewUserVaultsQuery, NewUserVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NewUserVaultsQuery, NewUserVaultsQueryVariables>(NewUserVaultsDocument, options);
        }
export type NewUserVaultsQueryHookResult = ReturnType<typeof useNewUserVaultsQuery>;
export type NewUserVaultsLazyQueryHookResult = ReturnType<typeof useNewUserVaultsLazyQuery>;
export type NewUserVaultsQueryResult = Apollo.QueryResult<NewUserVaultsQuery, NewUserVaultsQueryVariables>;
export const VaultInfoDocument = gql`
    query VaultInfo($vaultID: ID!) @api(name: orca) {
  vault(id: $vaultID) {
    id
    collateral
    number
    debt
    bank {
      id
      minimumCollateralPercentage
      closingFee
      openingFee
      tokenPeg
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useVaultInfoQuery__
 *
 * To run a query within a React component, call `useVaultInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVaultInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVaultInfoQuery({
 *   variables: {
 *      vaultID: // value for 'vaultID'
 *   },
 * });
 */
export function useVaultInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<VaultInfoQuery, VaultInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<VaultInfoQuery, VaultInfoQueryVariables>(VaultInfoDocument, options);
      }
export function useVaultInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VaultInfoQuery, VaultInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<VaultInfoQuery, VaultInfoQueryVariables>(VaultInfoDocument, options);
        }
export type VaultInfoQueryHookResult = ReturnType<typeof useVaultInfoQuery>;
export type VaultInfoLazyQueryHookResult = ReturnType<typeof useVaultInfoLazyQuery>;
export type VaultInfoQueryResult = Apollo.QueryResult<VaultInfoQuery, VaultInfoQueryVariables>;
export const AllBankInfoDocument = gql`
    query AllBankInfo @api(name: orca) {
  banks {
    id
    debtCeiling
    totalDebt
    minimumCollateralPercentage
  }
}
    `;

/**
 * __useAllBankInfoQuery__
 *
 * To run a query within a React component, call `useAllBankInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBankInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBankInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBankInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllBankInfoQuery, AllBankInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AllBankInfoQuery, AllBankInfoQueryVariables>(AllBankInfoDocument, options);
      }
export function useAllBankInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllBankInfoQuery, AllBankInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AllBankInfoQuery, AllBankInfoQueryVariables>(AllBankInfoDocument, options);
        }
export type AllBankInfoQueryHookResult = ReturnType<typeof useAllBankInfoQuery>;
export type AllBankInfoLazyQueryHookResult = ReturnType<typeof useAllBankInfoLazyQuery>;
export type AllBankInfoQueryResult = Apollo.QueryResult<AllBankInfoQuery, AllBankInfoQueryVariables>;