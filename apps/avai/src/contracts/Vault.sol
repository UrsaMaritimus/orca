// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import './interfaces/IBaseVault.sol';
import './VaultInfo.sol';

contract Vault is ERC721, VaultInfo, ReentrancyGuard, IBaseVault {
  using SafeERC20 for IERC20;

  using Counters for Counters.Counter;
  Counters.Counter private _vaultTypes;

  // Vault characteristics
  struct UserVault {
    address owner;
    uint256 collateral;
    uint256 debt;
    uint256 vaultType;
  }

  // All the vaults
  mapping(uint256 => UserVault) private vaults;
  mapping(uint256 => bool) private knownVault;

  constructor(string memory name_, string memory symbol_)
    ERC721(name_, symbol_)
  {}

  /**
   * @dev Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultID) {
    require(knownVault[vaultID], 'Vault does not exist');
    require(vaults[vaultID].owner == msg.sender, 'Vault is not owned by you');
    _;
  }

  /**
   * @dev Checks if vault exists
   */
  function isKnownVault(uint256 vaultID) external view override returns (bool) {
    return knownVault[vaultID];
  }

  function getVaultCollateral(uint256 vaultID)
    external
    view
    override
    returns (uint256)
  {
    return vaults[vaultID].collateral;
  }

  function getVaultOwner(uint256 vaultID)
    external
    view
    override
    returns (address)
  {
    return vaults[vaultID].owner;
  }

  function getVaultDebt(uint256 vaultID)
    external
    view
    override
    returns (uint256)
  {
    return vaults[vaultID].debt;
  }

  function getVaultVaultType(uint256 vaultID)
    external
    view
    override
    returns (uint256)
  {
    return vaults[vaultID].vaultType;
  }

  /**
   * @dev Adds to the vault collateral
   *
   */
  function addVaultCollateral(uint256 vaultID, uint256 amount)
    external
    override
  {
    uint256 newCollateral = vaults[vaultID].collateral + amount;
    assert(newCollateral >= vaults[vaultID].collateral);

    // Adjust and save it
    vaults[vaultID].collateral = newCollateral;
  }

  /**
   * @dev subtracts from the vault collateral
   *
   * Requirements:
   * - Must be less than or equal to current collateral
   */

  function subVaultCollateral(uint256 vaultID, uint256 amount)
    external
    override
    onlyVaultOwner(vaultID)
  {
    require(
      amount <= vaults[vaultID].collateral,
      'Cannot remove more than the deposited collateral'
    );
    uint256 newCollateral = vaults[vaultID].collateral - amount;

    assert(newCollateral <= vaults[vaultID].collateral);

    // Adjust and save it
    vaults[vaultID].collateral = newCollateral;
  }

  /**
   * @dev Adds debt to the vault
   *
   * Requirements:
   * - new user debt cannot be above debt ceiling
   */
  function addVaultDebt(uint256 vaultID, uint256 amount)
    external
    override
    onlyVaultOwner(vaultID)
  {
    uint256 newTotalDebt = amount +
      this.getTotalDebt(vaults[vaultID].vaultType);

    assert(newTotalDebt >= this.getTotalDebt(vaults[vaultID].vaultType));
    require(
      newTotalDebt <= this.getDebtCeiling(vaults[vaultID].vaultType),
      'Cannot exceed debt ceiling for this vault'
    );

    uint256 userNewDebt = amount + vaults[vaultID].debt;
    assert(userNewDebt >= vaults[vaultID].debt);

    _addToTotalDebt(vaults[vaultID].vaultType, amount);

    vaults[vaultID].debt = userNewDebt;
  }

  /**
   * @dev Subs debt to the vault
   *
   * Requirements:
   * - user cannot remove more than total debt
   * - user cannot remove more than their total debt
   */
  function subVaultDebt(uint256 vaultID, uint256 amount)
    external
    override
    onlyVaultOwner(vaultID)
  {
    require(
      this.getTotalDebt(vaults[vaultID].vaultType) >= amount,
      'Cannot get rid of more debt than exists.'
    );

    require(
      vaults[vaultID].debt >= amount,
      'Cannot get rid of more debt than user has'
    );

    uint256 newTotalDebt = this.getTotalDebt(vaults[vaultID].vaultType) -
      amount;
    assert(newTotalDebt <= this.getTotalDebt(vaults[vaultID].vaultType));

    uint256 userNewDebt = vaults[vaultID].debt - amount;
    assert(userNewDebt <= vaults[vaultID].debt);

    _subFromTotalDebt(vaults[vaultID].vaultType, amount);
    vaults[vaultID].debt = userNewDebt;
  }

  /**
   * @dev Internal function for creating a vault of specific type
   */
  function _createVault(
    uint256 vaultID,
    address owner,
    uint256 vaultType
  ) internal {
    // Checks for zero address etc done in mint prior
    UserVault memory newUserVault = UserVault(owner, 0, 0, vaultType);
    vaults[vaultID] = newUserVault;
    knownVault[vaultID] = true;
    emit CreateVault(vaultID, owner);
  }

  /**
   * @dev Internal function to destory the vault data
   */
  function _destroyVault(uint256 vaultID)
    internal
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(vaults[vaultID].debt == 0, 'Vault as outstanding debt');

    // Transfer collateral back only if no debt left.
    if (vaults[vaultID].collateral != 0) {
      payable(msg.sender).transfer(vaults[vaultID].collateral);
    }

    emit DestroyVault(vaultID);
    // Delete this vault
    delete vaults[vaultID];
  }

  /**
   * @dev Simple function to transfer the vault internally
   */
  function _transferVault(uint256 vaultID, address to)
    internal
    onlyVaultOwner(vaultID)
  {
    emit TransferVault(vaultID, vaults[vaultID].owner, to);
    vaults[vaultID].owner = to;
  }
}
