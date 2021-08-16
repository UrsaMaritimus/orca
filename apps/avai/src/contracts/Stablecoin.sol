// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol';

import './overrides/UpgradeableBeacon.sol';

contract AVAI is
  Initializable,
  ERC20Upgradeable,
  ERC20PermitUpgradeable,
  PausableUpgradeable,
  AccessControlUpgradeable,
  UpgradeableBeacon
{
  bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // The vaults that users can use
  address[] public vaults;

  event CreateVaultType(address token, string name);

  function initialize(string memory name, address vault_) public initializer {
    __Context_init_unchained();
    __ERC165_init_unchained();
    __AccessControl_init_unchained();
    __ERC20_init_unchained(name, name);
    __Pausable_init_unchained();
    __EIP712_init_unchained(name, '1');
    __ERC20Permit_init_unchained(name);
    __UpgradeableBeacon__init(vault_);
    // Treasury
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(PAUSER_ROLE, _msgSender());
  }

  /**
   * @dev check on the current number of vault types deployed
   */
  function vaultCount() external view returns (uint256) {
    return vaults.length;
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
  function addVault(
    uint256 minimumCollateralPercentage_,
    address priceSource_,
    string calldata name_,
    string calldata symbol_,
    address token_
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    address vault = address(
      new BeaconProxy(
        address(this),
        abi.encodeWithSignature(
          'initialize(uint256,address,string,string,address,address)',
          minimumCollateralPercentage_,
          priceSource_,
          name_,
          symbol_,
          token_,
          msg.sender
        )
      )
    );

    vaults.push(vault);

    _setupRole(BURNER_ROLE, vault);
    // Allow the vault to burn stablecoin
    _setupRole(MINTER_ROLE, vault);

    emit CreateVaultType(token_, name_);
  }

  /**
   * @dev Pauses all token transfers.
   *
   * See {ERC20Pausable} and {Pausable-_pause}.
   *
   * Requirements:
   *
   * - the caller must have the `PAUSER_ROLE`.
   */
  function pause() public onlyRole(PAUSER_ROLE) {
    require(
      hasRole(PAUSER_ROLE, _msgSender()),
      'ERC20PresetMinterPauser: must have pauser role to pause'
    );
    _pause();
  }

  /**
   * @dev Unpauses all token transfers.
   *
   * See {ERC20Pausable} and {Pausable-_unpause}.
   *
   * Requirements:
   *
   * - the caller must have the `PAUSER_ROLE`.
   */
  function unpause() public onlyRole(PAUSER_ROLE) {
    require(
      hasRole(PAUSER_ROLE, _msgSender()),
      'ERC20PresetMinterPauser: must have pauser role to unpause'
    );
    _unpause();
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC20Upgradeable) {
    super._beforeTokenTransfer(from, to, tokenId);
    require(!paused(), 'Pausable: token transfer while paused');
  }
}
