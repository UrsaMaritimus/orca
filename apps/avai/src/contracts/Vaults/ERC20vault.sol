// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../BaseVault.sol';
import '../interfaces/IVault.sol';
import '../interfaces/IWAVAX.sol';

contract ERC20Vault is BaseVault {
  address admin;

  constructor(
    uint256 minimumCollateralPercentage,
    address priceSource_,
    string memory name_,
    string memory symbol_,
    address token,
    address stablecoin
  )
    BaseVault(
      minimumCollateralPercentage,
      priceSource_,
      name_,
      symbol_,
      token,
      stablecoin
    )
  {
    // Initially set up role as admin and treasury
    _setupRole(DEFAULT_ADMIN_ROLE, stablecoin);
    _setupRole(TREASURY_ROLE, msg.sender);
  }

  /**
   * @dev ALlows vault owner to deposit ERC20 collateral
   *
   * Emits Deposit Collateral event
   *
   */
  function depositCollateral(uint256 vaultID, uint256 amount)
    public
    onlyVaultOwner(vaultID)
  {
    uint256 newCollateral = vaultCollateral[vaultID] + amount;

    assert(newCollateral >= vaultCollateral[vaultID]);

    vaultCollateral[vaultID] = newCollateral;

    _token.transferFrom(msg.sender, address(this), amount);

    emit DepositCollateral(vaultID, amount);
  }
}
