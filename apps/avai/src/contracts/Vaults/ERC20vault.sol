// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../BaseVault.sol';
import '../interfaces/IVault.sol';
import '../interfaces/IWAVAX.sol';

contract ERC20Vault is BaseVault {
  address admin;

  // Lets construct this beast
  constructor(address token) BaseVault('AVAX AVAI Vault', 'avAVAX', token) {
    admin = msg.sender;
  }

  function depositAVAXCollateral(uint256 vaultID) public payable {
    depositCollateral(vaultID, msg.value);
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

  /**
   * @dev Transfer the admin to the stablecoin contract after initialization
   */
  function setAdmin(address _admin) public {
    require(admin == msg.sender);
    admin = _admin;
  }
}
