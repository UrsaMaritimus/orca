import json from './deploymentContracts';

export const DeployedContracts = {
  fuji: json[43113].fuji.contracts,
  main: json[43114].mainnet.contracts,
};

export default DeployedContracts;
