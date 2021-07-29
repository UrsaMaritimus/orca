import { Web3Provider } from '@ethersproject/providers';
import { AVAXVault__factory, AVAI__factory } from '@ursa/shared/contracts';
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
      try {
        // Get basics
        const collateral = await vault.vaultCollateral(vaultID);
        const debt = await vault.vaultDebt(vaultID);
        const mcp = await vault.minimumCollateralPercentage();
        const price = await vault.getPriceSource();
        const peg = await vault.getPricePeg();
        // Get max LTV in % and USD
        const maxLTV = 10000 / mcp.toNumber(); // 66.666%
        const maxLTVUSD = collateral.mul(price).mul(100).div(peg).div(mcp);
        // Current LTV in the vault
        const LTV = collateral.isZero()
          ? utils.parseUnits('0', 0)
          : debt.mul(1e8).mul(peg).div(collateral.mul(price)); // Loan to value ratio

        // Borrow power
        const borrowingPowerUsed = LTV.mul(mcp).div(100);
        const borrowingPowerUsedUSD = debt;
        const borrowingPowerAvailable = utils
          .parseUnits('100', 6)
          .sub(borrowingPowerUsed);

        const borrowingPowerAvailableUSD = maxLTVUSD.sub(debt);

        const availableWithdraw = collateral.sub(
          debt.mul(peg).div(price).mul(mcp).div(100)
        );

        return {
          collateral: collateral,
          debt: debt,
          LTV,
          maxLTV,
          maxLTVUSD,
          borrowingPowerAvailable,
          borrowingPowerAvailableUSD,
          borrowingPowerUsed,
          borrowingPowerUsedUSD,
          availableWithdraw,
          tokenPrice: price,
          peg,
          mcp,
        };
      } catch (err) {
        console.log(err.message);
      }
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

export const withdrawCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.withdrawCollateral(vaultID, utils.parseEther(amount.toString()));
};

export const borrowToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.borrowToken(vaultID, utils.parseEther(amount.toString()));
};

export const payBackToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.payBackToken(vaultID, utils.parseEther(amount.toString()));
};

export const getAVAIBalance = () => {
  return async (library: Web3Provider, chainId: number, address: string) => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAI
        : null,
      library
    );
    return avai.balanceOf(address);
  };
};
