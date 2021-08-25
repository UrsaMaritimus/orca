import { Web3Provider } from '@ethersproject/providers';
import { Bank__factory, VaultContracts } from '@orca/shared/contracts';

export const getVault = (
  vaultType: string,
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return Bank__factory.connect(
    chainId === 43113
      ? VaultContracts.fuji[vaultType]
      : chainId === 43114
      ? // TODO: Update
        VaultContracts.mainnet[vaultType]
      : null,
    signer ? library.getSigner() : library
  );
};
