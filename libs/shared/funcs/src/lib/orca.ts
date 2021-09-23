import { Web3Provider } from '@ethersproject/providers';
import { ORCA__factory } from '@orca/shared/contracts';
import contracts from '@orca/shared/deployments';

// swr function
export const orcaBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    account: string
  ) => {
    const orca = ORCA__factory.connect(
      chainId === 43113
        ? contracts.fuji.ORCA.address
        : chainId === 43114
        ? // TODO: Update
          contracts.fuji.ORCA.address
        : null,
      library.getSigner()
    );
    return orca.balanceOf(account);
  };
};
