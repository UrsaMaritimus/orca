// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../BaseVault.sol';

contract AvaxVault is BaseVault {
  address admin;

  // Lets construct this beast
  constructor(address wavax) BaseVault('AVAX AVAI Vault', 'avAVAX', wavax) {
    admin = msg.sender;
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
   * @dev Transfer the admin to the stablecoin contract after initialization
   */
  function setAdmin(address _admin) public {
    require(admin == msg.sender);
    admin = _admin;
  }
}
