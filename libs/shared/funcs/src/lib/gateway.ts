import { Web3Provider } from '@ethersproject/providers';
import { WAVAXGateway__factory } from '@orca/shared/contracts';
import contractAddresses from '@orca/shared/deployments';

export const getGateway = (
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  return WAVAXGateway__factory.connect(
    chainId === 43113
      ? contractAddresses.fuji.WAVAXGateway.address
      : chainId === 43114
      ? contractAddresses.main.WAVAXGateway.address
      : null,
    signer ? library.getSigner() : library
  );
};
