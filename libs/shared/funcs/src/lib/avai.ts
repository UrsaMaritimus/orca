import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { AVAI__factory } from '@orca/shared/contracts';
import contractAddresses from '@orca/shared/deployments';
import { getVault } from './getVault';

// swr function
export const avaiApproved = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    chainId: number,
    amount: number,
    vaultType: string
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
    const vault = getVault(vaultType, library, chainId, true);
    const allowance = await avai.allowance(address, vault.address);

    return allowance.gte(amount);
  };
};

// swr function
export const avaiBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    account: string
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
    return avai.balanceOf(account);
  };
};

// callable function
export const approveAvai = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber,
  vaultType: string
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

  const vault = getVault(vaultType, library, chainId, true);

  return avai.increaseAllowance(vault.address, amount);
};
