// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../BaseVault.sol';

contract AVAXVault is BaseVault {
  // Lets construct this beast
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
    // Initially set up admin as stablecoin and sender as the treasury
    // Treasury can change attributes but contract owned by stablecoin
    _setupRole(DEFAULT_ADMIN_ROLE, stablecoin);
    _setupRole(TREASURY_ROLE, msg.sender);
    _setRoleAdmin(TREASURY_ROLE, TREASURY_ROLE);
  }

  /**
   * @dev changes the Treasury. Can only every be one treasury!
   */
  function changeTreasury(address to) public onlyRole(TREASURY_ROLE) {
    _setupRole(TREASURY_ROLE, to);
    revokeRole(TREASURY_ROLE, msg.sender);
  }

  /**
   * @dev ALlows vault owner to deposit ERC20 collateral
   *
   * Emits Deposit Collateral event
   *
   */
  function depositCollateral(uint256 vaultID)
    public
    payable
    onlyVaultOwner(vaultID)
  {
    uint256 newCollateral = vaultCollateral[vaultID] + msg.value;

    assert(newCollateral >= vaultCollateral[vaultID]);

    vaultCollateral[vaultID] = newCollateral;

    emit DepositCollateral(vaultID, msg.value);
  }

  /**
   * @dev allows vault owner to withdraw the collateral
   *
   * Requirements:
   * - Withdraw amount is less than or equal to current collateral
   * - Collateral withdrawal amount does not put debt below minimum collateral
   *
   * Emits WithdrawCollateral event
   */
  function withdrawCollateral(uint256 vaultID, uint256 amount)
    public
    override
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(
      vaultCollateral[vaultID] >= amount,
      'Vault does not have enough collateral'
    );

    uint256 newCollateral = vaultCollateral[vaultID] - amount;

    if (vaultDebt[vaultID] != 0) {
      require(
        isValidCollateral(newCollateral, vaultDebt[vaultID]),
        'Withdrawal would put vault below minimum collateral percentage'
      );
    }

    vaultCollateral[vaultID] = newCollateral;
    payable(msg.sender).transfer(amount);

    emit WithdrawCollateral(vaultID, amount);
  }

  /**
   * @dev User can destroy a vault. Will return all collateral upon destroying.
   *
   * Emits a DestroyVault event
   *
   * Requirements:
   *
   * - User must have paid off all outstanding debt first
   */
  function destroyVault(uint256 vaultID)
    external
    override
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(vaultDebt[vaultID] == 0, 'Vault as outstanding debt');

    if (vaultCollateral[vaultID] != 0) {
      payable(msg.sender).transfer(vaultCollateral[vaultID]);
    }

    _burn(vaultID);

    delete vaultExistence[vaultID];
    delete vaultCollateral[vaultID];
    delete vaultDebt[vaultID];

    emit DestroyVault(vaultID);
  }
}
