// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import './Stablecoin.sol';

contract AVAI is Stablecoin, Ownable {
  constructor(
    string memory name,
    string memory symbol,
    address vaultAddress
  ) Stablecoin(name, symbol, vaultAddress) {
    treasury = 0;
  }

  function mint(address account, uint256 amount) external onlyOwner() {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external onlyOwner() {
    _burn(account, amount);
  }

  function setStabilityPool(address _pool) external onlyOwner() {
    stabilityPool = _pool;
  }

  function setTreasury(uint256 _treasury) external onlyOwner() {
    require(vaults.isKnownVault(_treasury), 'Vault does not exist');
    treasury = _treasury;
  }
}
