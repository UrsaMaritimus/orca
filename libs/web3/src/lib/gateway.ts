import { Web3Provider } from '@ethersproject/providers';
import { WAVAXGateway__factory, DeployedContracts } from '@orca/shared';

export const getGateway = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return WAVAXGateway__factory.connect(
    chainId === 43113
      ? DeployedContracts.fuji.WAVAXGateway.address
      : chainId === 43114
      ? DeployedContracts.main.WAVAXGateway.address
      : null,
    signer ? library.getSigner() : library
  );
};
