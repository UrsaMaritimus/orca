// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import './IVaultInfo.sol';

interface IBaseVault is IVaultInfo {
  // Events for general vault operations
  event CreateVault(uint256 vaultID, address creator);
  event DestroyVault(uint256 vaultID);
  event TransferVault(uint256 vaultID, address from, address to);

  // Buying out a vault event
  event LiquidateVault(
    uint256 vaultID,
    address owner,
    address buyer,
    uint256 amountPaid
  );

  // Events for collateral operations
  event DepositCollateral(uint256 vaultID, uint256 amount);
  event WithdrawCollateral(uint256 vaultID, uint256 amount);

  function isKnownVault(uint256 vaultID) external view returns (bool);

  function createVault() external returns (uint256);

  function destroyVault(uint256 vaultID) external;

  function transferVault(uint256 vaultID, address to) external;
}
