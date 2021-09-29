import { Web3Provider } from '@ethersproject/providers';
import { ORCA__factory } from '@orca/shared/contracts';
import { tokenInfo } from '@orca/shared/base';

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
        ? tokenInfo['ORCA'].address.fuji
        : chainId === 43114
        ? tokenInfo['ORCA'].address.mainnet
        : null,
      library.getSigner()
    );
    return orca.balanceOf(account);
  };
};
