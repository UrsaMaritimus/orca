import { useEffect, useLayoutEffect, useRef, FC, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

import { Box, Button, Stack, Typography } from '@mui/material';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { styled } from '@mui/material/styles';

import { useEagerConnect } from '@orca/hooks';
import { shortenHex, injected, AVALANCHE_MAINNET_PARAMS } from '@orca/util';
import { seeAccount } from './atom';

const ModifiedJazzicon = styled(Jazzicon)({
  width: 30,
  height: 30,
});

const Account: FC = () => {
  const setSeeAccount = useSetRecoilState(seeAccount);
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const triedToEagerConnect = useEagerConnect();
  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();
  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);

  const onClick = () => {
    setConnecting(true);

    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        toast.error('User rejected metamask');
        setConnecting(false);
      } else if (error instanceof UnsupportedChainIdError) {
        injected.getProvider().then((provider) => {
          provider
            .request({
              method: 'wallet_addEthereumChain',
              params: [AVALANCHE_MAINNET_PARAMS],
            })
            .then(() => {
              activate(
                injected,
                (error) => {
                  console.log(error.message);
                },
                false
              );
            })
            .catch((error: any) => {
              setError(error);
            });
        });
      } else {
        toast.error(error.message);
        setConnecting(false);
        setError(error);
      }
    });
  };

  const seeAccountInfo = () => {
    setSeeAccount((seeAccount) => {
      return seeAccount ? false : true;
    });
  };

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1.5 }}
        onClick={onClick}
      >
        <Stack direction="row" alignItems={'center'} spacing={1}>
          <Typography variant="button">Failed to Connect</Typography>
          <Box
            component="img"
            src="/static/icons/ic_metamask.svg"
            color="inherit"
            width={30}
            height={30}
          />
        </Stack>
      </Button>
    );
  }

  if (!triedToEagerConnect) {
    return (
      <Button
        color="primary"
        variant="contained"
        sx={{ mr: 1.5 }}
        onClick={onClick}
      >
        <Stack direction="row" alignItems={'center'} spacing={1}>
          <Typography variant="button">Connecting...</Typography>
          <Box
            component="img"
            src="/static/icons/ic_metamask.svg"
            color="inherit"
            width={30}
            height={30}
          />
        </Stack>
      </Button>
    );
  }

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      (window as any)?.ethereum ||
      (window as any)?.web3;
    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <Button variant="contained" color="primary" onClick={onClick}>
            {MetaMaskOnboarding.isMetaMaskInstalled() ? (
              <Stack direction="row" alignItems={'center'} spacing={1}>
                <Typography variant="button">Connect</Typography>
                <Box
                  component="img"
                  src="/static/icons/ic_metamask.svg"
                  color="inherit"
                  width={30}
                  height={30}
                />
              </Stack>
            ) : (
              'Connect to Wallet'
            )}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1.5 }}
            onClick={() => onboarding.current?.startOnboarding()}
          >
            Install Metamask
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={seeAccountInfo}
    >
      <Stack direction="row" alignItems={'center'} spacing={1}>
        <Typography variant="button">{`${shortenHex(account, 4)}`}</Typography>
        <ModifiedJazzicon address={account} />
      </Stack>
    </Button>
  );
};

export default Account;
