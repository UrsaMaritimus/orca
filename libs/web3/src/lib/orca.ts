import { Web3Provider } from '@ethersproject/providers';
import { ORCA__factory, ProtocolTokenInfo } from '@orca/shared';

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
        ? ProtocolTokenInfo['ORCA'].address.fuji
        : chainId === 43114
        ? ProtocolTokenInfo['ORCA'].address.mainnet
        : null,
      library.getSigner()
    );
    return orca.balanceOf(account);
  };
};
