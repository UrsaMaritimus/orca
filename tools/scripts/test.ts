import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
  WAVAXGateway__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

const test = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);

  // One for now, will be zero for launch
  const vaultNum = 0;
  const wavaxVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );

  console.log('Bank address:', wavaxVault.address);
  // Set up gateway
  const gateway = WAVAXGateway__factory.connect(
    contracts.fuji.WAVAXGateway.address,
    accounts[0]
  );
  console.log(avai.address);
  console.log(await wavaxVault.token());
  await gateway.depositAVAX(wavaxVault.address, 6, {
    value: ethers.utils.parseEther('2'),
  });
};

test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
