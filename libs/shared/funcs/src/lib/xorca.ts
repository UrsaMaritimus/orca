import { Web3Provider } from '@ethersproject/providers';
import { ERC20__factory, OrcaPod__factory } from '@orca/shared/contracts';

import contracts from '@orca/shared/deployments';
import { utils } from 'ethers';

export const getxORCA = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return OrcaPod__factory.connect(
    chainId === 43113
      ? contracts.fuji.OrcaPod.address
      : chainId === 43114
      ? contracts.main.OrcaPod.address
      : null,
    signer ? library.getSigner() : library
  );
};

// swr function
export const tokenApprovedxORCA = () => {
  return async (
    _: string,
    library: Web3Provider,
    account: string,
    chainId: number,
    address: string,
    amount: string
  ) => {
    const token = ERC20__factory.connect(address, library.getSigner());
    const leader = getxORCA(library, chainId);
    const allowance = await token.allowance(account, leader.address);
    return allowance.gte(utils.parseEther(amount));
  };
};

// swr function
export const xORCARatio = () => {
  return async (_: string, library: Web3Provider, chainId: number) => {
    const orca = ERC20__factory.connect(
      chainId === 43113
        ? contracts.fuji.ORCA.address
        : chainId === 43114
        ? contracts.main.ORCA.address
        : null,
      library.getSigner()
    );
    const leader = getxORCA(library, chainId);
    const orcaBalance = await orca.balanceOf(leader.address);
    const xOrcaSupply = await leader.totalSupply();
    if (xOrcaSupply.isZero()) return 0;
    return {
      ratio:
        Number(utils.formatEther(orcaBalance)) /
        Number(utils.formatEther(xOrcaSupply)),
      totalSupply: Number(utils.formatEther(xOrcaSupply)),
    };
  };
};

export const approveTokenxORCA = (
  library: Web3Provider,
  chainId: number,
  address: string,
  amount: number | string
) => {
  const token = ERC20__factory.connect(address, library.getSigner());
  const leader = getxORCA(library, chainId);

  return token.approve(
    leader.address,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const depositxORCA = (
  library: Web3Provider,
  chainId: number,
  amount: number | string
) => {
  const leader = getxORCA(library, chainId, true);
  return leader.enter(
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const withdrawxORCA = (
  library: Web3Provider,
  chainId: number,
  amount: number | string
) => {
  const leader = getxORCA(library, chainId, true);
  return leader.leave(
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
