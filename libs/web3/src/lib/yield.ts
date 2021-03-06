import { Web3Provider } from '@ethersproject/providers';
import {
  ERC20__factory,
  PodLeader__factory,
  DeployedContracts,
} from '@orca/shared';

import { utils } from 'ethers';

const all_pids = [0, 1, 2, 3];

export const getPodLeader = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return PodLeader__factory.connect(
    chainId === 43113
      ? DeployedContracts.fuji.PodLeader.address
      : chainId === 43114
      ? DeployedContracts.main.PodLeader.address
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const getTokenBalance = () => {
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
export const getRewardBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    pid: number
  ) => {
    const leader = getPodLeader(library, chainId);
    return leader.pendingRewards(pid, account.toLowerCase());
  };
};

// swr function
export const getTotalRewardBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number
  ) => {
    const leader = getPodLeader(library, chainId);
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
export const tokenApprovedFarm = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    address: string,
    amount: string
  ) => {
    const token = ERC20__factory.connect(address, library.getSigner());
    const leader = getPodLeader(library, chainId);
    const allowance = await token.allowance(account, leader.address);
    return allowance.gte(utils.parseEther(amount));
  };
};

export const approveTokenFarm = (
  library: Web3Provider,
  chainId: number,
  address: string,
  amount: number | string
) => {
  const token = ERC20__factory.connect(address, library.getSigner());
  const leader = getPodLeader(library, chainId);

  return token.approve(
    leader.address,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const depositFarm = (
  library: Web3Provider,
  chainId: number,
  pid: number,
  amount: number | string
) => {
  const leader = getPodLeader(library, chainId, true);
  return leader.deposit(
    pid,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const withdrawFarm = (
  library: Web3Provider,
  chainId: number,
  pid: number,
  amount: number | string
) => {
  const leader = getPodLeader(library, chainId, true);
  return leader.withdraw(
    pid,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
