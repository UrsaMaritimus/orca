// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

import './BaseVault.sol';

contract Stablecoin is ERC20, ERC20Permit, AccessControl, ReentrancyGuard {
  bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

  using Counters for Counters.Counter;
  Counters.Counter private _vaultIds;

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // The vaults that users can use
  mapping(uint256 => BaseVault) public vaults;
  mapping(uint256 => bool) public vaultExists;

  event CreateVaultType(uint256 vaultID, address vault);

  constructor(string memory name) ERC20(name, name) ERC20Permit(name) {
    // Treasury
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  /**
   * @dev check on the current number of vault types deployed
   */
  function vaultCount() external view returns (uint256) {
    return _vaultIds.current();
  }

  /**
   * @dev give a burner role so that vaults can burn the token upon liquidation and paying back.
   */
  function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
    _burn(from, amount);
  }

  /**
   * @dev give a minter role so that vaults can mint upon borrowing.
   */
  function mint(address account, uint256 amount)
    external
    onlyRole(MINTER_ROLE)
  {
    _mint(account, amount);
  }

  /**
   * @dev Adds a vault after creation for book keeping on the stablecoin
   */
  function addVault(address vaultAddress)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    // Increment ID
    _vaultIds.increment();
    // Assign ID to vault
    uint256 newVaultId = _vaultIds.current();

    vaults[newVaultId] = BaseVault(vaultAddress);
    vaultExists[newVaultId] = true;
    // Allow the vault to burn stablecoin
    _setupRole(BURNER_ROLE, vaultAddress);
    _setupRole(MINTER_ROLE, vaultAddress);

    emit CreateVaultType(newVaultId, vaultAddress);
  }
}
