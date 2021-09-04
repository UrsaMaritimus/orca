import { ContractTransaction } from 'ethers';
import toast from 'react-hot-toast';
import { NextLink } from '@orca/components/links';
import { formatEtherscanLink } from '@orca/util';
import { Button } from '@material-ui/core';

type HandleTransactionType = {
  transaction: Promise<ContractTransaction>;
  messages: {
    loading: string;
    success: string;
    error: string;
  };
  mutates?: ((data?: any, shouldRevalidate?: boolean) => Promise<any>)[];
  chainId: number;
};

// For minting USDC
export const handleTransaction = async ({
  transaction,
  messages,
  mutates,
  chainId,
}: HandleTransactionType) => {
  let result: ContractTransaction;
  try {
    result = await transaction;
    await toast.promise(
      result.wait(1),
      {
        loading: (
          <NextLink
            href={formatEtherscanLink('Transaction', [chainId, result.hash])}
            target="_blank"
            underline="none"
            variant="subtitle2"
            sx={{
              mr: 5,
              transition: (theme) =>
                theme.transitions.create('opacity', {
                  duration: theme.transitions.duration.shortest,
                }),
              '&:hover': { opacity: 0.48 },
            }}
          >
            {messages.loading}
          </NextLink>
        ),
        success: (
          <b>
            <NextLink
              href={formatEtherscanLink('Transaction', [chainId, result.hash])}
              target="_blank"
              underline="none"
              variant="subtitle2"
              sx={{
                mr: 5,
                transition: (theme) =>
                  theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                  }),
                '&:hover': { opacity: 0.48 },
              }}
            >
              {messages.success}
            </NextLink>
          </b>
        ),
        error: <b>{messages.error}</b>,
      },
      {
        style: {
          minWidth: '100px',
        },
        loading: {
          duration: Infinity,
        },
        success: {
          duration: 5000,
        },
      }
    );
    if (mutates && mutates.length > 0)
      mutates.forEach((mutate) => {
        mutate(undefined, true);
      });
    return { success: true, hash: result.hash };
  } catch (err) {
    toast.error(err.data ? err.data.message : err.message);
    return { success: false, hash: result.hash };
  }
};
