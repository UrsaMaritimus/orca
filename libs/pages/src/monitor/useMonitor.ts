import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { allBankPrices } from '@orca/web3';
import { useNewMonitorVaultsQuery } from '@orca/graphql';
import { BankTokenInfo, VaultContracts } from '@orca/shared';
import { filter } from 'lodash';

export const useMonitorVaults = (library: Web3Provider, chainId: number) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useNewMonitorVaultsQuery({ pollInterval: 5000 });

  // Grab bank prices
  const { data: prices, mutate: priceMutate } = useSwr(
    shouldFetch ? [`getAllPrices`, library, chainId] : null,
    allBankPrices()
  );

  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  return {
    loading: prices && vaultData ? false : true,
    rows:
      prices && vaultData
        ? vaultData.vaults
            .map((vault) => {
              // Correct bank
              const name =
                chainId === 43114
                  ? Object.keys(VaultContracts.mainnet).find(
                      (key) =>
                        VaultContracts.mainnet[key].toLowerCase() ===
                        vault.bank.id.toLowerCase()
                    )
                  : Object.keys(VaultContracts.fuji).find(
                      (key) =>
                        VaultContracts.fuji[key].toLowerCase() ===
                        vault.bank.id.toLowerCase()
                    );
              const price = prices.filter((temp) => temp.name === name)[0];

              if (price) {
                const collateral = BigNumber.from(vault.collateral);
                const debt = BigNumber.from(vault.debt);
                const cp = collateral
                  .mul(
                    10 **
                      (18 - filter(BankTokenInfo, { erc20: name })[0].decimals)
                  )
                  .mul(1000)
                  .mul(price.price)
                  .div(debt.mul(price.peg));

                const mcp = BigNumber.from(
                  vault.bank.minimumCollateralPercentage
                );
                if (cp.lte(mcp.mul(10).add(500)))
                  return {
                    num: BigNumber.from(vault.number).toNumber(),
                    collateral: Number(
                      utils.formatUnits(
                        collateral.mul(price.price).div(price.peg),
                        filter(BankTokenInfo, { erc20: name })[0].decimals
                      )
                    ),
                    debt: Number(utils.formatEther(debt)),
                    cp: cp.toNumber() / 10,
                    mcp: mcp.toNumber(),
                    ratio: mcp.toNumber() / (cp.toNumber() / 10),
                    collatInfo: filter(BankTokenInfo, { erc20: name })[0],
                  };
              }
            })
            .filter((n) => n) // Gets rid of undefined
            .filter((row) => row.ratio > 0.8)
        : null,
  };
};
