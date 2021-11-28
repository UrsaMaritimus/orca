import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { IYakStrategy__factory } from '@orca/shared';

import { getVault } from './getVault';

// swr function
export const yakTrueBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    chainId: number,
    vaultType: string,
    vaultID: number
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const yak = IYakStrategy__factory.connect(address, library.getSigner());
    return utils.formatEther(
      await yak.getDepositTokensForShares(await vault.vaultCollateral(vaultID))
    );
  };
};
