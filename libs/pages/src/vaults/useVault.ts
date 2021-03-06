import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { allBankPrices } from '@orca/web3';
import { useNewUserVaultsQuery } from '@orca/graphql';
import { VaultContracts, BankTokenInfo } from '@orca/shared';
import filter from 'lodash/filter';

export const useGetVaults = (
  library: Web3Provider,
  chainId: number,
  account: string
) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useNewUserVaultsQuery({
    variables: {
      user: account ? account.toLowerCase() : '',
    },
    pollInterval: 5000,
  });

  // Grab bank prices
  const { data: prices, mutate: priceMutate } = useSwr(
    shouldFetch ? [`getAllPrices`, library, chainId] : null,
    allBankPrices()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  if (prices && vaultData) {
    return {
      loading: false,
      rows:
        vaultData.vaults.length > 0
          ? vaultData.vaults
              .map((vault) => {
                const collateral = BigNumber.from(vault.collateral);
                const debt = BigNumber.from(vault.debt);

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
                  const ratio = debt.isZero()
                    ? utils.formatUnits(0, 0)
                    : debt
                        .mul(price.peg)
                        .mul(10000)
                        .div(
                          collateral
                            .mul(price.price)
                            .mul(10 ** (18 - Number(vault.bank.token.decimals)))
                        )
                        .toNumber() / 100;

                  return {
                    vaultID: BigNumber.from(vault.number).toNumber().toString(),
                    collateral: Number(
                      vault.id === '0x1-' + vault.bank.id
                        ? utils.formatUnits(
                            BigNumber.from(vault.bank.treasury)
                              .mul(price.price)
                              .div(price.peg),
                            Number(vault.bank.token.decimals)
                          )
                        : utils.formatUnits(
                            BigNumber.from(collateral)
                              .mul(price.price)
                              .div(price.peg),
                            Number(vault.bank.token.decimals)
                          )
                    ),
                    debt: Number(utils.formatEther(debt)),
                    ratio: Number(ratio.toString()),
                    symbol: filter(BankTokenInfo, { erc20: name })[0].display,
                    icon: filter(BankTokenInfo, { erc20: name })[0].icon,
                    type: Object.keys(BankTokenInfo).find(
                      (key) => BankTokenInfo[key].erc20 === name
                    ),
                  };
                }
              })
              .filter((n) => n) // Gets rid of undefined
          : null,
    };
  }
  return { loading: true, rows: null };
};
