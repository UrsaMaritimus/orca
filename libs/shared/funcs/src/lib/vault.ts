import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';

import { getVault } from './getVault';
import { getGateway } from './gateway';

// swr
export const getVaultInfo = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    vaultType: string,
    vaultID: number
  ) => {
    const vault = getVault(vaultType, library, chainId);
    // Check if vault exists
    const exists = await vault.vaultExists(vaultID);

    if (exists) {
      try {
        // Get basics
        const collateral = await vault.vaultCollateral(vaultID);
        const debt = await vault.vaultDebt(vaultID);
        const mcp = await vault.minimumCollateralPercentage();
        const price = await vault.getPriceSource();
        const peg = await vault.getPricePeg();
        const closingFee = await vault.closingFee();
        const openingFee = await vault.openingFee();
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
          closingFee,
          openingFee,
        };
      } catch (err) {
        console.log(err.message);
      }
    } else {
      return undefined;
    }
  };
};

// swr
export const getVaults = () => {
  return async (
    _: string,
    library: Web3Provider,
    address: string,
    chainId: number,
    vaultType: string
  ) => {
    const tokenVault = getVault(vaultType, library, chainId);
    const balance = Number(
      utils.formatUnits(await tokenVault.balanceOf(address), 0)
    );

    const vaults = await Promise.all(
      [...Array(balance)].map(async (_, i) => {
        return await tokenVault.tokenOfOwnerByIndex(address, i);
      })
    );
    const price = await tokenVault.getPriceSource();
    const peg = await tokenVault.getPricePeg();

    //Get each vault's collateral and debt
    return Promise.all(
      vaults.map(async (vault) => {
        try {
          const collateral = await tokenVault.vaultCollateral(vault);
          const debt = await tokenVault.vaultDebt(vault);

          const ratio = debt.isZero()
            ? utils.formatUnits(0, 0)
            : debt.mul(peg).mul(100).div(collateral.mul(price));

          return {
            vaultID: vault.toString(),
            collateral: utils.formatEther(collateral),
            debt: utils.formatEther(debt),
            ratio: ratio.toString(),
          };
        } catch (err) {
          console.log(err.message);
        }
      })
    );
  };
};

// swr
export const vaultOwner = () => {
  return async (
    _: string,
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

// swr
export const mintCeiling = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    vaultType: string
  ) => {
    const vault = getVault(vaultType, library, chainId);

    const debtCeiling = await vault.debtCeiling();
    const totalDebt = await vault.totalDebt();
    return {
      debtCeiling,
      totalDebt,
    };
  };
};

// callable
export const deleteVault = (
  library: Web3Provider,
  vaultID: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.destroyVault(vault.address, vaultID);
  }
  return vault.destroyVault(vaultID);
};

// callable
export const makeVault = (
  library: Web3Provider,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.createVault();
};
// callable
export const depositCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    const overrides = {
      value: utils.parseEther(
        typeof amount === 'number' ? amount.toFixed(18) : amount
      ),
    };
    return gateway.depositAVAX(vault.address, vaultID, overrides);
  }

  return vault.depositCollateral(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const withdrawCollateral = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.withdrawAVAX(
      vault.address,
      vaultID,
      utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
    );
  }
  return vault.withdrawCollateral(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const borrowToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.borrowToken(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
// callable
export const payBackToken = (
  library: Web3Provider,
  vaultID: number,
  amount: number,
  vaultType: string,
  chainId: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.payBackToken(
    vaultID,
    utils.parseEther(typeof amount === 'number' ? amount.toFixed(18) : amount)
  );
};
