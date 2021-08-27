import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { getVault } from './getVault';
import { getGateway } from './gateway';

export const monitorBadVaults = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    vaultType: string
  ) => {
    const vault = getVault(vaultType, library, chainId);

    const balance = await vault.vaultCounts();
    const pricePeg = await vault.getPricePeg();
    const priceSource = await vault.getPriceSource();

    const numVaults = [...Array(Number(utils.formatUnits(balance, 0)))];

    const vaults = await numVaults.reduce(async (filtered, _, i) => {
      const acc = await filtered;
      try {
        const collateral = await vault.vaultCollateral(i + 1);
        const debt = await vault.vaultDebt(i + 1);

        if (!debt.isZero()) {
          const cp = collateral
            .mul(100)
            .mul(priceSource)
            .div(debt.mul(pricePeg));
          // Anything below 200% is getting close, I suppose
          if (cp.lte(200)) {
            acc.push({
              num: i + 1,
              debt,
              cp,
              collateral: collateral.mul(priceSource).div(pricePeg),
            });
          }
        }
        return acc;
      } catch (error) {
        return acc;
      }
    }, Promise.resolve([]));

    return vaults;
  };
};

export const monitorRewards = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    vaultType: string,
    address: string
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const tokenDebt = await vault.tokenDebt(address);
    return { isReward: !tokenDebt.isZero(), reward: tokenDebt };
  };
};

export const getReward = async (
  library: Web3Provider,
  chainId: number,
  vaultType: string,
  address: string
) => {
  const vault = getVault(vaultType, library, chainId, true);
  if (vaultType === 'wavax') {
    const gateway = getGateway(library, chainId, true);
    return gateway.getPaid(vault.address);
  }
  return vault.getPaid(address);
};
