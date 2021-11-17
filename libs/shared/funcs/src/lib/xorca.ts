import { JsonRpcProvider } from '@ethersproject/providers';
import { ERC20__factory, OrcaPod__factory } from '@orca/shared/contracts';

import contracts from '@orca/shared/deployments';
import { utils, ethers } from 'ethers';

export const getxORCA = (
  library: JsonRpcProvider,
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
    library: JsonRpcProvider,
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
  return async (_: string, library: JsonRpcProvider, chainId: number) => {
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

// swr function
export const xORCARatioNoWeb3 = () => {
  return async (_: string) => {
    const fuji = process.env.NEXT_PUBLIC_GRAPH_HTTP.includes('orcadao')
      ? true
      : false;

    const provider = new ethers.providers.JsonRpcProvider(
      fuji
        ? 'https://api.avax-test.network/ext/bc/C/rpc'
        : 'https://api.avax.network/ext/bc/C/rpc'
    );
    const orca = ERC20__factory.connect(
      fuji ? contracts.fuji.ORCA.address : contracts.main.ORCA.address,
      provider
    );
    const leader = getxORCA(provider, fuji ? 43113 : 43114);
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
  library: JsonRpcProvider,
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
  library: JsonRpcProvider,
  chainId: number,
  amount: number | string
) => {
  const leader = getxORCA(library, chainId, true);
  return leader.enter(
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};

export const withdrawxORCA = (
  library: JsonRpcProvider,
  chainId: number,
  amount: number | string
) => {
  const leader = getxORCA(library, chainId, true);
  return leader.leave(
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
