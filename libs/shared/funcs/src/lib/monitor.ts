import { Web3Provider } from '@ethersproject/providers';
import { VaultTypes } from '@orca/shared/contracts';
import { getVault } from './getVault';
import { getGateway } from './gateway';

export const monitorAllRewards = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    address: string
  ) => {
    return Promise.all(
      VaultTypes.map(async (vaultType) => {
        const vault = getVault(vaultType.name, library, chainId);
        const tokenDebt = await vault.tokenDebt(address);
        return {
          isReward: !tokenDebt.isZero(),
          reward: tokenDebt,
          symbol: vaultType.symbol,
          name: vaultType.name,
        };
      })
    );
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
