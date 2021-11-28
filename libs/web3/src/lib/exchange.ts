import { Web3Provider } from '@ethersproject/providers';
import {
  ERC20Upgradeable__factory,
  FakeUSDC__factory,
  USDCExchange__factory,
  AVAI__factory,
  DeployedContracts,
  ProtocolTokenInfo,
} from '@orca/shared';
import { BigNumber } from 'ethers';

export const getUSDCExchange = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return USDCExchange__factory.connect(
    chainId === 43113
      ? DeployedContracts.fuji.USDCExchange.address
      : chainId === 43114
      ? DeployedContracts.main.USDCExchange.address
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
        ? ProtocolTokenInfo[usdType].address.fuji
        : chainId === 43114
        ? ProtocolTokenInfo[usdType].address.mainnet
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
        ? DeployedContracts.fuji.AVAI.address
        : chainId === 43114
        ? DeployedContracts.main.AVAI.address
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
        ? ProtocolTokenInfo[usdType].address.fuji
        : chainId === 43114
        ? ProtocolTokenInfo[usdType].address.mainnet
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
      ? ProtocolTokenInfo[usdType].address.fuji
      : chainId === 43114
      ? ProtocolTokenInfo[usdType].address.mainnet
      : null,
    library.getSigner()
  );
  const exchange = getUSDCExchange(library, chainId);
  return usd.approve(exchange.address, amount);
};

// callable function
export const approveAvaiExchange = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber
) => {
  const avai = AVAI__factory.connect(
    chainId === 43113
      ? DeployedContracts.fuji.AVAI.address
      : chainId === 43114
      ? DeployedContracts.main.AVAI.address
      : null,
    library.getSigner()
  );
  const exchange = getUSDCExchange(library, chainId);
  return avai.approve(exchange.address, amount);
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
      ? ProtocolTokenInfo[usdType].address.fuji
      : chainId === 43114
      ? ProtocolTokenInfo[usdType].address.mainnet
      : null,
    library.getSigner()
  );
  return usd.mint(amount);
};
