// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IWAVAX.sol';
import './interfaces/IBaseVault.sol';

contract WAVAXGateway is Ownable {
  IWAVAX internal immutable WAVAX;

  constructor(address wavax) {
    assert(wavax != address(0));
    WAVAX = IWAVAX(wavax);
  }

  /**
   * @dev Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultID, address vault) {
    require(IBaseVault(vault).vaultExists(vaultID), 'Vault does not exist');
    require(
      IBaseVault(vault).ownerOf(vaultID) == msg.sender,
      'Vault is not owned by you'
    );
    _;
  }

  /**
   * @dev Gives permission to the vault to spend gateway's WAVAX
   */
  function authorizeVault(address vault) external onlyOwner {
    WAVAX.approve(vault, type(uint256).max);
  }

  /**
   * @dev deposits WAVAX into the vault, using native AVAX.
   */
  function depositAVAX(address vault, uint256 vaultID)
    external
    payable
    onlyVaultOwner(vaultID, vault)
  {
    WAVAX.deposit{value: msg.value}();
    IBaseVault(vault).depositCollateral(vaultID, msg.value);
  }

  /**
   * @dev withdraws AVAX
   */
  function withdrawAVAX(
    address vault,
    uint256 vaultID,
    uint256 amount
  ) external payable onlyVaultOwner(vaultID, vault) {
    IBaseVault(vault).withdrawCollateral(vaultID, amount);
    WAVAX.withdraw(amount);
    payable(msg.sender).transfer(amount);
  }

  receive() external payable {}
}
