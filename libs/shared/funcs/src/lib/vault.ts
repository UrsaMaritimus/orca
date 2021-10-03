import { Web3Provider } from '@ethersproject/providers';
import { utils, BigNumber } from 'ethers';

import { ERC20__factory } from '@orca/shared/contracts';
import { tokenInfo } from '@orca/shared/base';

import { getVault } from './getVault';
import { getGateway } from './gateway';

export const getToken = (
  tokenName: string,
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return ERC20__factory.connect(
    chainId === 43113
      ? tokenInfo[tokenName].address.fuji
      : chainId === 43114
      ? tokenInfo[tokenName].address.mainnet
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const tokenApproved = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    tokenName: string,
    chainId: number,
    amount: number,
    vaultType: string
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const token = getToken(tokenName, library, chainId);
    const allowance = await token.allowance(address, vault.address);

    return allowance.gte(
      utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
    );
  };
};

// callable function
export const approveToken = async (
  library: Web3Provider,
  chainId: number,
  amount: BigNumber,
  vaultType: string,
  tokenName: string
) => {
  const vault = getVault(vaultType, library, chainId);
  const token = getToken(tokenName, library, chainId, true);
  return token.approve(vault.address, amount);
};

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
