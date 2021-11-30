import { FC } from 'react';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Button, Stack, Box, Typography } from '@mui/material';

type AddTokenProps = {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenImage: string;
};

export const AddToken: FC<AddTokenProps> = ({
  tokenAddress,
  tokenDecimals,
  tokenImage,
  tokenSymbol,
}) => {
  const { library } = useWeb3React<Web3Provider>();
  const onAddToken = async () => {
    if (library) {
      await library.provider.request({
        method: 'wallet_watchAsset',
        params: {
          // @ts-expect-error wrong type for params, but this is what works
          type: 'ERC20',
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: `${
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:4200'
                : 'https://app.avai.finance'
            }${tokenImage}`, // A string url of the token logo
          },
        },
      });
    }
  };
  return (
    <Button
      variant="contained"
      disabled={!library}
      color="primary"
      onClick={onAddToken}
    >
      <Stack direction="row" spacing={1} alignItems={'center'}>
        <Typography variant="button">Add {tokenSymbol} </Typography>
        <Image
          src="/static/icons/ic_metamask.svg"
          color="inherit"
          width={30}
          height={30}
        />
      </Stack>
    </Button>
  );
};
