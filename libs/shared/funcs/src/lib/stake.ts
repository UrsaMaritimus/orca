import { Web3Provider } from '@ethersproject/providers';
import { ERC20__factory, OrcaStaking__factory } from '@orca/shared/contracts';

import contracts from '@orca/shared/deployments';
import { utils } from 'ethers';

export const getStaking = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return OrcaStaking__factory.connect(
    chainId === 43113
      ? contracts.fuji.OrcaStaking.address
      : chainId === 43114
      ? contracts.main.OrcaStaking.address
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const getRewardBalanceStaking = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    pid: number
  ) => {
    const leader = getStaking(library, chainId);
    return leader.pendingRewards(pid, account.toLowerCase());
  };
};

// swr function
export const tokenApprovedStaking = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    address: string,
    amount: string
  ) => {
    const token = ERC20__factory.connect(address, library.getSigner());
    const leader = getStaking(library, chainId);
    const allowance = await token.allowance(account, leader.address);
    return allowance.gte(utils.parseEther(amount));
  };
};

export const approveTokenStaking = (
  library: Web3Provider,
  chainId: number,
  address: string,
  amount: number | string
) => {
  const token = ERC20__factory.connect(address, library.getSigner());
  const leader = getStaking(library, chainId);

  return token.approve(
    leader.address,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const depositStaking = (
  library: Web3Provider,
  chainId: number,
  pid: number,
  amount: number | string
) => {
  const leader = getStaking(library, chainId, true);
  return leader.deposit(
    pid,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const withdrawStaking = (
  library: Web3Provider,
  chainId: number,
  pid: number,
  amount: number | string
) => {
  const leader = getStaking(library, chainId, true);
  return leader.withdraw(
    pid,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
