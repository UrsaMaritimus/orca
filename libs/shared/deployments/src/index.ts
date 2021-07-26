// Address
import AVAIjson from './deployments/fuji/AVAI.json';
import AVAXVaultjson from './deployments/fuji/AVAXVault.json';
import AVAXLiquidatorjson from './deployments/fuji/AVAXLiquidator.json';

export const contractAddresses = {
  fuji: {
    AVAI: AVAIjson.address,
    AVAXVault: AVAXVaultjson.address,
    AVAXLiquidatorjson: AVAXLiquidatorjson.address,
  },
};

export const contractABI = {
  fuji: {
    AVAI: AVAIjson.abi,
    AVAXVault: AVAXVaultjson.abi,
    AVAXLiquidator: AVAXLiquidatorjson.abi,
  },
};
