import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAVAXBalance } from '@ursa/hooks';

const AvaxBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useAVAXBalance(account as string);

  return <p>Balance: Ξ{data}</p>;
};

export default AvaxBalance;
