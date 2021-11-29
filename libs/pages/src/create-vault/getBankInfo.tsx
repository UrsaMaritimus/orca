import { utils, BigNumber } from 'ethers';

import { useAllBankInfoQuery } from '@orca/graphql';
import find from 'lodash/find';
import includes from 'lodash/includes';
import { TokenInfo, VaultContracts } from '@orca/shared';

export const useGetVaults = (chainID: number, collateral: TokenInfo[]) => {
  const { data: vaultData } = useAllBankInfoQuery({ pollInterval: 5000 });

  if (vaultData && chainID) {
    return {
      loading: false,
      rows: vaultData.banks
        .filter((bank) =>
          includes(
            chainID === 43114 ? VaultContracts.mainnet : VaultContracts.fuji,
            bank.id.toLowerCase()
          )
        )
        .map((bank) => {
          // Get the correct collateral type
          const collat = Object.keys(
            chainID === 43114 ? VaultContracts.mainnet : VaultContracts.fuji
          ).filter((key) =>
            chainID === 43114
              ? VaultContracts.mainnet[key] === bank.id
              : VaultContracts.fuji[key] === bank.id
          )[0];

          return {
            maxLTV: 10000 / Number(bank.minimumCollateralPercentage),
            key: collat,
            remainingAVAI: Number(
              utils.formatEther(
                BigNumber.from(bank.debtCeiling).sub(bank.totalDebt)
              )
            ),
            collatInfo: find(collateral, { erc20: collat }),
          };
        }),
    };
  }
  return { loading: true, rows: null };
};
