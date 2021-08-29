import { Web3Provider } from '@ethersproject/providers';
import {
  ERC20Upgradeable__factory,
  FakeUSDC__factory,
  USDCExchange__factory,
  AVAI__factory,
} from '@orca/shared/contracts';
import contractAddresses from '@orca/shared/deployments';
import { erc20Tokens } from '@orca/shared/base';
import { BigNumber } from 'ethers';

export const getUSDCExchange = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return USDCExchange__factory.connect(
    chainId === 43113
      ? contractAddresses.fuji.USDCExchange.address
      : chainId === 43114
      ? // TODO: Update
        contractAddresses.fuji.USDCExchange.address
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const usdApprovedExchange = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    chainId: number,
    amount: number,
    usdType: string
  ) => {
    const usd = ERC20Upgradeable__factory.connect(
      chainId === 43113
        ? erc20Tokens[usdType].fuji.address
        : chainId === 43114
        ? erc20Tokens[usdType].mainnet.address
        : null,
      library
    );
    const exchange = getUSDCExchange(library, chainId);
    const allowance = await usd.allowance(address, exchange.address);

    return allowance.gte(amount);
  };
};

// swr function
export const avaiApprovedExchange = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    chainId: number,
    amount: number
  ) => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI.address
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAI.address
        : null,
      library
    );

    const exchange = getUSDCExchange(library, chainId);
    const allowance = await avai.allowance(address, exchange.address);

    return allowance.gte(amount);
  };
};

// swr function
export const usdBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    account: string,
    usdType: string
  ) => {
    const usd = ERC20Upgradeable__factory.connect(
      chainId === 43113
        ? erc20Tokens[usdType].fuji.address
        : chainId === 43114
        ? erc20Tokens[usdType].mainnet.address
        : null,
      library.getSigner()
    );
    return usd.balanceOf(account);
  };
};

// swr function
export const usdBalanceExchange = () => {
  return async (_: string, library: Web3Provider, chainId: number) => {
    const exchange = getUSDCExchange(library, chainId);
    return exchange.usdReserves();
  };
};

export const exchangeInfo = () => {
  return async (_: string, library: Web3Provider, chainId: number) => {
    const exchange = getUSDCExchange(library, chainId);
    const reserves = await exchange.usdReserves();
    const mintingFee = (await exchange.usdcRate()).sub(10000);
    const redeemFee = (await exchange.avaiRate()).sub(9900);
    return {
      reserves,
      mintingFee,
      redeemFee,
    };
  };
};

// callable function
export const approveUsdExchange = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber,
  usdType: string
) => {
  const usd = ERC20Upgradeable__factory.connect(
    chainId === 43113
      ? erc20Tokens[usdType].fuji.address
      : chainId === 43114
      ? erc20Tokens[usdType].mainnet.address
      : null,
    library.getSigner()
  );
  const exchange = getUSDCExchange(library, chainId);
  return usd.increaseAllowance(exchange.address, amount);
};

// callable function
export const approveAvaiExchange = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber
) => {
  const avai = AVAI__factory.connect(
    chainId === 43113
      ? contractAddresses.fuji.AVAI.address
      : chainId === 43114
      ? // TODO: Update
        contractAddresses.fuji.AVAI.address
      : null,
    library.getSigner()
  );
  const exchange = getUSDCExchange(library, chainId);
  return avai.increaseAllowance(exchange.address, amount);
};

// callable function
export const mintFromExchange = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber
) => {
  const exchange = getUSDCExchange(library, chainId, true);
  return exchange.mint(amount);
};

// callable function
export const redeemFromExchange = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber
) => {
  const exchange = getUSDCExchange(library, chainId, true);
  return exchange.redeem(amount);
};

export const mintFakeUSDC = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber,
  usdType: string
) => {
  const usd = FakeUSDC__factory.connect(
    chainId === 43113
      ? erc20Tokens[usdType].fuji.address
      : chainId === 43114
      ? erc20Tokens[usdType].mainnet.address
      : null,
    library.getSigner()
  );
  return usd.mint(amount);
};
