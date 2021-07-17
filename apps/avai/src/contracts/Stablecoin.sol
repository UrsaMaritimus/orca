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

  using Counters for Counters.Counter;
  Counters.Counter private _vaultIds;

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // The vaults that users can use
  mapping(uint256 => BaseVault) public vaults;
  mapping(uint256 => bool) public vaultExists;

  // Events for token operations
  event BorrowToken(uint256 vaultID, uint256 amount);
  event PayBackToken(uint256 vaultID, uint256 amount, uint256 closingFee);

  event CreateVaultType(uint256 vaultID, address vault);

  constructor(string memory name) ERC20(name, name) ERC20Permit(name) {
    // Treasury
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  /**
   * Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultType, uint256 vaultID) {
    require(vaultExists[vaultType], 'Vault type does not exist');
    require(vaults[vaultType].vaultExistence(vaultID), 'Vault does not exist');

    require(
      vaults[vaultType].ownerOf(vaultID) == msg.sender,
      'Vault is not owned by you'
    );

    _;
  }

  /**
   * @dev check on the current number of vault types deployed
   */
  function vaultCount() public view returns (uint256) {
    return _vaultIds.current();
  }

  /**
   * @dev give a burner role so that vaults can burn the token upon liquidation.
   */
  function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
    _burn(from, amount);
  }

  /**
   * @dev Adds a vault after creation for book keeping on the stablecoin
   */
  function addVault(address vaultAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
    // Increment ID
    _vaultIds.increment();
    // Assign ID to vault
    uint256 newVaultId = _vaultIds.current();

    vaults[newVaultId] = BaseVault(vaultAddress);
    vaultExists[newVaultId] = true;
    // Allow the vault to burn stablecoin
    _setupRole(BURNER_ROLE, vaultAddress);

    emit CreateVaultType(newVaultId, vaultAddress);
  }

  /**
   * @dev Lets a vault owner borrow stablecoin against collateral
   *
   * Requirements:
   * - Vault type must exist
   * - Vault must exist
   * - Must borrow greater than 0 stablecoin
   * - Must be below the debt ceiling when borrowing
   * - Must maintain minimum collateral percentage
   *
   * Emits BorrowToken event
   */
  function borrowToken(
    uint256 vaultType,
    uint256 vaultID,
    uint256 amount
  ) external onlyVaultOwner(vaultType, vaultID) nonReentrant {
    require(amount > 0, 'Must borrow non-zero amount');
    require(
      vaults[vaultType].totalDebt() + amount <= vaults[vaultType].debtCeiling(),
      'Cannot mint over debt ceiling.'
    );

    uint256 newDebt = vaults[vaultType].vaultDebt(vaultID) + amount;
    assert(newDebt > vaults[vaultType].vaultDebt(vaultID));

    require(
      vaults[vaultType].isValidCollateral(
        vaults[vaultType].vaultCollateral(vaultID),
        newDebt
      ),
      'Borrow would put vault below minimum collateral percentage'
    );

    // Mint stable coin for the user
    vaults[vaultType].addVaultDebt(vaultID, amount);
    _mint(msg.sender, amount);
    emit BorrowToken(vaultID, amount);
  }

  /**
   * @dev Pay back the stablecoin to reduce debt
   *
   * Requirements:
   * - User must have enough balance to repay `amount`
   * - Cannot pay back more than the required debt. `amount` must be less than debt.
   */
  function payBackToken(
    uint256 vaultType,
    uint256 vaultID,
    uint256 amount
  ) external onlyVaultOwner(vaultType, vaultID) nonReentrant {
    require(balanceOf(msg.sender) >= amount, 'Token balance too low');
    require(
      vaults[vaultType].vaultDebt(vaultID) >= amount,
      'Vault debt less than amount to pay back'
    );

    // Closing fee calculation
    uint256 _closingFee = ((amount * vaults[vaultType].closingFee()) *
      vaults[vaultType].getPricePeg()) /
      (vaults[vaultType].getPriceSource() * 10000);

    vaults[vaultType].subVaultDebt(vaultID, amount);
    vaults[vaultType].subVaultCollateral(vaultID, _closingFee);
    vaults[vaultType].addVaultCollateralTreasury(_closingFee);

    // Burns the stablecoin
    _burn(msg.sender, amount);

    emit PayBackToken(vaultID, amount, _closingFee);
  }
}
