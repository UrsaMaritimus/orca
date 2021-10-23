import { Web3Provider } from '@ethersproject/providers';
import { ERC20__factory, SingleStaking__factory } from '@orca/shared/contracts';

import contracts from '@orca/shared/deployments';
import { utils } from 'ethers';

const all_pids = [0];

export const getStaker = (
  library: Web3Provider,
  chainId: number,
  type: string,
  signer = false
) => {
  return SingleStaking__factory.connect(
    chainId === 43113
      ? contracts.fuji[type].address
      : chainId === 43114
      ? contracts.main[type].address
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const getTokenBalancePartner = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    address: string
  ) => {
    const token = ERC20__factory.connect(address, library.getSigner());
    return token.balanceOf(account);
  };
};

// swr function
export const getRewardBalancePartner = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    type: string
  ) => {
    const leader = getStaker(library, chainId, type);
    return leader.pendingRewards(0, account.toLowerCase());
  };
};

// swr function
export const getTotalRewardBalancePartner = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    type: string
  ) => {
    const leader = getStaker(library, chainId, type);
    return Promise.all(
      all_pids.map(async (pid) => {
        return {
          pid,
          pending: await leader.pendingRewards(pid, account.toLowerCase()),
        };
      })
    );
  };
};

// swr function
export const tokenApprovedFarmPartner = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    address: string,
    amount: string,
    type: string
  ) => {
    const token = ERC20__factory.connect(address, library.getSigner());
    const leader = getStaker(library, chainId, type);
    const allowance = await token.allowance(account, leader.address);
    return allowance.gte(utils.parseEther(amount));
  };
};

export const approveTokenFarmPartner = (
  library: Web3Provider,
  chainId: number,
  address: string,
  amount: number | string,
  type: string
) => {
  const token = ERC20__factory.connect(address, library.getSigner());
  const leader = getStaker(library, chainId, type);

  return token.approve(
    leader.address,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const depositFarmPartner = (
  library: Web3Provider,
  chainId: number,
  amount: number | string,
  type: string
) => {
  const leader = getStaker(library, chainId, type, true);
  return leader.deposit(
    0,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const withdrawFarmPartner = (
  library: Web3Provider,
  chainId: number,
  amount: number | string,
  type: string
) => {
  const leader = getStaker(library, chainId, type, true);
  return leader.withdraw(
    0,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
