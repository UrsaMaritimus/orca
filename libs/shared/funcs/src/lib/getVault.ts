import { JsonRpcProvider } from '@ethersproject/providers';
import { Bank__factory, VaultContracts } from '@orca/shared/contracts';

export const getVault = (
  vaultType: string,
  library: JsonRpcProvider,
  chainId: number,
  signer = false
) => {
  return chainId === 43113
    ? vaultType in VaultContracts.fuji
      ? Bank__factory.connect(
          VaultContracts.fuji[vaultType],
          signer ? library.getSigner() : library
        )
      : null
    : chainId === 43114
    ? vaultType in VaultContracts.mainnet
      ? Bank__factory.connect(
          VaultContracts.mainnet[vaultType],
          signer ? library.getSigner() : library
        )
      : null
    : null;
};
