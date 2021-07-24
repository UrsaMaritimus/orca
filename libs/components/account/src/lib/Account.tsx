import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { toast } from 'react-hot-toast';
import { MButton } from '@ursa/components/material-extend/buttons';

import { useEagerConnect } from '@ursa/hooks';
import {
  formatEtherscanLink,
  shortenHex,
  injected,
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
} from '@ursa/util';

const Account = () => {
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
              params: [
                process.env.NODE_ENV === 'development'
                  ? AVALANCHE_TESTNET_PARAMS
                  : AVALANCHE_MAINNET_PARAMS,
              ],
            })
            .then(() => {
              activate(
                injected,
                (error) => {
                  toast.error(error.message);
                },
                false
              );
            })
            .catch((error: any) => {
              toast.error(error.message);
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

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return (
      <MButton
        variant="contained"
        size="large"
        sx={{ mr: 1.5 }}
        onClick={onClick}
      >
        Failed to connect
      </MButton>
    );
  }

  if (!triedToEagerConnect) {
    return (
      <MButton
        variant="contained"
        size="large"
        sx={{ mr: 1.5 }}
        onClick={onClick}
      >
        Attempting Connection
      </MButton>
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
          <MButton variant="contained" size="large" onClick={onClick}>
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? 'Connect to MetaMask'
              : 'Connect to Wallet'}
          </MButton>
        ) : (
          <MButton
            variant="contained"
            size="large"
            sx={{ mr: 1.5 }}
            onClick={() => onboarding.current?.startOnboarding()}
          >
            Install Metamask
          </MButton>
        )}
      </div>
    );
  }

  return (
    <MButton
      variant="contained"
      size="large"
      href={formatEtherscanLink('Account', [chainId as number, account])}
      // @ts-expect-error doesn't have target or rel on it
      target="_blank"
      rel="noopener noreferrer"
      sx={{ mr: 1.5 }}
    >
      {`${shortenHex(account, 4)}`}
    </MButton>
  );
};

export default Account;
