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

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
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
  stablecoin?: Maybe<Stablecoin>;
  stablecoins: Array<Stablecoin>;
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
};


export type QueryBanksArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bank_Filter>;
};


export type QueryExchangeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryExchangesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Exchange_Filter>;
};


export type QueryLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Liquidation_Filter>;
};


export type QueryStablecoinArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryStablecoinsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Stablecoin_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Stablecoin_Filter>;
};


export type QueryTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenPrice_Filter>;
};


export type QueryTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
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


export type QueryVaultArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryVaultsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
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
  stablecoin?: Maybe<Stablecoin>;
  stablecoins: Array<Stablecoin>;
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
};


export type SubscriptionBanksArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bank_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bank_Filter>;
};


export type SubscriptionExchangeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionExchangesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Exchange_Filter>;
};


export type SubscriptionLiquidationArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionLiquidationsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Liquidation_Filter>;
};


export type SubscriptionStablecoinArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionStablecoinsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Stablecoin_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Stablecoin_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenPrice_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
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


export type SubscriptionVaultArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionVaultsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Vault_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
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
  liquidations: Array<Liquidation>;
  vaults: Array<Vault>;
};


export type UserLiquidationsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Liquidation_Filter>;
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
  Vaults = 'vaults'
}

export type Vault = {
  __typename?: 'Vault';
  bank: Bank;
  collateral: Scalars['BigInt'];
  debt: Scalars['BigInt'];
  id: Scalars['ID'];
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

export type BankInfoSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BankInfoSubscription = { __typename?: 'Subscription', bank?: Maybe<{ __typename?: 'Bank', debtCeiling: any, totalDebt: any }> };

export type TotalSupplyFrontPageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TotalSupplyFrontPageSubscription = { __typename?: 'Subscription', stablecoins: Array<{ __typename?: 'Stablecoin', totalSupply: any }> };

export type BankInfoFrontPageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BankInfoFrontPageSubscription = { __typename?: 'Subscription', banks: Array<{ __typename?: 'Bank', id: string, treasury: any, totalDebt: any, totalCollateral: any, tokenPeg: any, minimumCollateralPercentage: any, token: { __typename?: 'Token', symbol: string, price: { __typename?: 'TokenPrice', priceUSD: any } } }> };

export type ExchangeInfoFrontPageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ExchangeInfoFrontPageSubscription = { __typename?: 'Subscription', exchanges: Array<{ __typename?: 'Exchange', treasury: any, usdHeld: any }> };

export type MonitorVaultsSubscriptionVariables = Exact<{
  bankID?: Maybe<Scalars['String']>;
}>;


export type MonitorVaultsSubscription = { __typename?: 'Subscription', vaults: Array<{ __typename?: 'Vault', collateral: any, debt: any, id: string }> };

export type GetUserVaultsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserVaultsQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', vaults: Array<{ __typename?: 'Vault', id: string, debt: any, collateral: any, bank: { __typename?: 'Bank', treasury: any } }> }> };

export type UserVaultsSubscriptionVariables = Exact<{
  user: Scalars['String'];
  bank: Scalars['String'];
}>;


export type UserVaultsSubscription = { __typename?: 'Subscription', vaults: Array<{ __typename?: 'Vault', id: string, collateral: any, debt: any, bank: { __typename?: 'Bank', treasury: any } }> };

export type VaultInfoSubscriptionVariables = Exact<{
  vaultID: Scalars['ID'];
}>;


export type VaultInfoSubscription = { __typename?: 'Subscription', vault?: Maybe<{ __typename?: 'Vault', id: string, collateral: any, debt: any, bank: { __typename?: 'Bank', id: string, minimumCollateralPercentage: any, closingFee: any, openingFee: any, tokenPeg: any }, user: { __typename?: 'User', id: string } }> };


export const BankInfoDocument = gql`
    subscription BankInfo($id: ID!) {
  bank(id: $id) {
    debtCeiling
    totalDebt
  }
}
    `;

/**
 * __useBankInfoSubscription__
 *
 * To run a query within a React component, call `useBankInfoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankInfoSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<BankInfoSubscription, BankInfoSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<BankInfoSubscription, BankInfoSubscriptionVariables>(BankInfoDocument, options);
      }
export type BankInfoSubscriptionHookResult = ReturnType<typeof useBankInfoSubscription>;
export type BankInfoSubscriptionResult = Apollo.SubscriptionResult<BankInfoSubscription>;
export const TotalSupplyFrontPageDocument = gql`
    subscription TotalSupplyFrontPage {
  stablecoins(first: 1) {
    totalSupply
  }
}
    `;

/**
 * __useTotalSupplyFrontPageSubscription__
 *
 * To run a query within a React component, call `useTotalSupplyFrontPageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTotalSupplyFrontPageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalSupplyFrontPageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTotalSupplyFrontPageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TotalSupplyFrontPageSubscription, TotalSupplyFrontPageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<TotalSupplyFrontPageSubscription, TotalSupplyFrontPageSubscriptionVariables>(TotalSupplyFrontPageDocument, options);
      }
export type TotalSupplyFrontPageSubscriptionHookResult = ReturnType<typeof useTotalSupplyFrontPageSubscription>;
export type TotalSupplyFrontPageSubscriptionResult = Apollo.SubscriptionResult<TotalSupplyFrontPageSubscription>;
export const BankInfoFrontPageDocument = gql`
    subscription BankInfoFrontPage {
  banks(first: 2) {
    id
    treasury
    totalDebt
    totalCollateral
    tokenPeg
    minimumCollateralPercentage
    token {
      symbol
      price {
        priceUSD
      }
    }
  }
}
    `;

/**
 * __useBankInfoFrontPageSubscription__
 *
 * To run a query within a React component, call `useBankInfoFrontPageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoFrontPageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoFrontPageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBankInfoFrontPageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<BankInfoFrontPageSubscription, BankInfoFrontPageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<BankInfoFrontPageSubscription, BankInfoFrontPageSubscriptionVariables>(BankInfoFrontPageDocument, options);
      }
export type BankInfoFrontPageSubscriptionHookResult = ReturnType<typeof useBankInfoFrontPageSubscription>;
export type BankInfoFrontPageSubscriptionResult = Apollo.SubscriptionResult<BankInfoFrontPageSubscription>;
export const ExchangeInfoFrontPageDocument = gql`
    subscription ExchangeInfoFrontPage {
  exchanges(first: 2) {
    treasury
    usdHeld
  }
}
    `;

/**
 * __useExchangeInfoFrontPageSubscription__
 *
 * To run a query within a React component, call `useExchangeInfoFrontPageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useExchangeInfoFrontPageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeInfoFrontPageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useExchangeInfoFrontPageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ExchangeInfoFrontPageSubscription, ExchangeInfoFrontPageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<ExchangeInfoFrontPageSubscription, ExchangeInfoFrontPageSubscriptionVariables>(ExchangeInfoFrontPageDocument, options);
      }
export type ExchangeInfoFrontPageSubscriptionHookResult = ReturnType<typeof useExchangeInfoFrontPageSubscription>;
export type ExchangeInfoFrontPageSubscriptionResult = Apollo.SubscriptionResult<ExchangeInfoFrontPageSubscription>;
export const MonitorVaultsDocument = gql`
    subscription MonitorVaults($bankID: String) {
  vaults(where: {bank: $bankID, debt_gt: 0}) {
    collateral
    debt
    id
  }
}
    `;

/**
 * __useMonitorVaultsSubscription__
 *
 * To run a query within a React component, call `useMonitorVaultsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMonitorVaultsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorVaultsSubscription({
 *   variables: {
 *      bankID: // value for 'bankID'
 *   },
 * });
 */
export function useMonitorVaultsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MonitorVaultsSubscription, MonitorVaultsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<MonitorVaultsSubscription, MonitorVaultsSubscriptionVariables>(MonitorVaultsDocument, options);
      }
export type MonitorVaultsSubscriptionHookResult = ReturnType<typeof useMonitorVaultsSubscription>;
export type MonitorVaultsSubscriptionResult = Apollo.SubscriptionResult<MonitorVaultsSubscription>;
export const GetUserVaultsDocument = gql`
    query getUserVaults($id: ID!) {
  user(id: $id) {
    vaults {
      id
      debt
      collateral
      bank {
        treasury
      }
    }
  }
}
    `;

/**
 * __useGetUserVaultsQuery__
 *
 * To run a query within a React component, call `useGetUserVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserVaultsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserVaultsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserVaultsQuery, GetUserVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserVaultsQuery, GetUserVaultsQueryVariables>(GetUserVaultsDocument, options);
      }
export function useGetUserVaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserVaultsQuery, GetUserVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserVaultsQuery, GetUserVaultsQueryVariables>(GetUserVaultsDocument, options);
        }
export type GetUserVaultsQueryHookResult = ReturnType<typeof useGetUserVaultsQuery>;
export type GetUserVaultsLazyQueryHookResult = ReturnType<typeof useGetUserVaultsLazyQuery>;
export type GetUserVaultsQueryResult = Apollo.QueryResult<GetUserVaultsQuery, GetUserVaultsQueryVariables>;
export const UserVaultsDocument = gql`
    subscription UserVaults($user: String!, $bank: String!) {
  vaults(where: {user: $user, bank: $bank}) {
    id
    collateral
    debt
    bank {
      treasury
    }
  }
}
    `;

/**
 * __useUserVaultsSubscription__
 *
 * To run a query within a React component, call `useUserVaultsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserVaultsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserVaultsSubscription({
 *   variables: {
 *      user: // value for 'user'
 *      bank: // value for 'bank'
 *   },
 * });
 */
export function useUserVaultsSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<UserVaultsSubscription, UserVaultsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<UserVaultsSubscription, UserVaultsSubscriptionVariables>(UserVaultsDocument, options);
      }
export type UserVaultsSubscriptionHookResult = ReturnType<typeof useUserVaultsSubscription>;
export type UserVaultsSubscriptionResult = Apollo.SubscriptionResult<UserVaultsSubscription>;
export const VaultInfoDocument = gql`
    subscription VaultInfo($vaultID: ID!) {
  vault(id: $vaultID) {
    id
    collateral
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
 * __useVaultInfoSubscription__
 *
 * To run a query within a React component, call `useVaultInfoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVaultInfoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVaultInfoSubscription({
 *   variables: {
 *      vaultID: // value for 'vaultID'
 *   },
 * });
 */
export function useVaultInfoSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<VaultInfoSubscription, VaultInfoSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<VaultInfoSubscription, VaultInfoSubscriptionVariables>(VaultInfoDocument, options);
      }
export type VaultInfoSubscriptionHookResult = ReturnType<typeof useVaultInfoSubscription>;
export type VaultInfoSubscriptionResult = Apollo.SubscriptionResult<VaultInfoSubscription>;