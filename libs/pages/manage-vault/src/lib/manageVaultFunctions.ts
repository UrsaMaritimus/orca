import { Web3Provider } from '@ethersproject/providers';
import { AVAXVault__factory } from '@ursa/shared/contracts';
import { contractAddresses } from '@ursa/shared/deployments';
import { utils } from 'ethers';

export const getVault = (
  vaultType: string,
  library: Web3Provider,
  chainId: number,
  signer = false
) => {
  switch (vaultType) {
    case 'AVAX':
      return AVAXVault__factory.connect(
        chainId === 43113
          ? contractAddresses.fuji.AVAXVault
          : chainId === 43114
          ? // TODO: Update
            contractAddresses.fuji.AVAXVault
          : null,
        signer ? library.getSigner() : library
      );
    default:
      return AVAXVault__factory.connect(
        chainId === 43113
          ? contractAddresses.fuji.AVAXVault
          : chainId === 43114
          ? // TODO: Update
            contractAddresses.fuji.AVAXVault
          : null,
        signer ? library.getSigner() : library
      );
  }
};

export const getVaultInfo = () => {
  return async (
    library: Web3Provider,
    chainId: number,
    vaultType: string,
    vaultID: number
  ) => {
    const vault = getVault(vaultType, library, chainId);
    // Check if vault exists
    const exists = await vault.vaultExistence(vaultID);

    if (exists) {
      const collateral = await vault.vaultCollateral(vaultID);
      const debt = await vault.vaultDebt(vaultID);

      const LTV = collateral.isZero()
        ? utils.parseUnits('0', 0).toNumber()
        : debt.div(collateral).mul(100).toNumber(); // Loan to value ratio

      const maxLTV =
        utils
          .parseUnits('10000000000', 0)
          .div(await vault.minimumCollateralPercentage())
          .toNumber() / 1000000;

      const price =
        (await vault.getPriceSource()).toNumber() /
        (await vault.getPricePeg()).toNumber();

      const borrowingPower = LTV / maxLTV;
      return {
        collateral: Number(utils.formatEther(collateral)),
        debt: Number(utils.formatUnits(debt, 8)),
        LTV,
        maxLTV,
        borrowingPower,
        tokenPrice: price,
      };
    } else {
      return undefined;
    }
  };
};

export const vaultOwner = () => {
  return async (
    library: Web3Provider,
    vaultID: number,
    address: string,
    vaultType: string,
    chainId: number
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const owner = await vault.ownerOf(vaultID);
    return owner === address;
  };
};

export const deleteVault = (
  library: Web3Provider,
  vaultID: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.destroyVault(vaultID);
};

export const depositCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  const overrides = {
    value: utils.parseEther(amount.toString()),
  };
  return vault.depositCollateral(vaultID, overrides);
};
