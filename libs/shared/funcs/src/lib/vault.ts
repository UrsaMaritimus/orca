import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { getVault } from './getVault';
import { getGateway } from './gateway';

// callable
export const deleteVault = (
  library: Web3Provider,
  vaultID: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.destroyVault(vault.address, vaultID);
  }
  return vault.destroyVault(vaultID);
};

// callable
export const makeVault = (
  library: Web3Provider,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.createVault();
};
// callable
export const depositCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    const overrides = {
      value: utils.parseEther(
        typeof amount === 'number' ? amount.toFixed(18) : amount
      ),
    };
    return gateway.depositAVAX(vault.address, vaultID, overrides);
  }

  return vault.depositCollateral(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const withdrawCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.withdrawAVAX(
      vault.address,
      vaultID,
      utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
    );
  }
  return vault.withdrawCollateral(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const borrowToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.borrowToken(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const payBackToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.payBackToken(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
