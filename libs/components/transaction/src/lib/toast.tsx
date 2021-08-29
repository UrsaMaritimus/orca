import { ContractTransaction } from 'ethers';
import toast from 'react-hot-toast';

type HandleTransactionType = {
  transaction: Promise<ContractTransaction>;
  messages: {
    loading: string;
    success: string;
    error: string;
  };
  mutates?: ((data?: any, shouldRevalidate?: boolean) => Promise<boolean>)[];
};

// For minting USDC
export const handleTransaction = async ({
  transaction,
  messages,
  mutates,
}: HandleTransactionType) => {
  try {
    const result = await transaction;

    await toast.promise(
      result.wait(1),
      {
        loading: messages.loading,
        success: <b>{messages.success}</b>,
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
  } catch (err) {
    toast.error(err.data ? err.data.message : err.message);
  }
};
