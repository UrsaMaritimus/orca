import { Web3Provider } from '@ethersproject/providers';

import { getVault } from './getVault';
import { getGateway } from './gateway';

export const monitorRewards = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    vaultType: string,
    address: string
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const tokenDebt = await vault.tokenDebt(address);
    return { isReward: !tokenDebt.isZero(), reward: tokenDebt };
  };
};

export const getReward = async (
  library: Web3Provider,
  chainId: number,
  vaultType: string,
  address: string
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.getPaid(vault.address);
  }
  return vault.getPaid(address);
};
