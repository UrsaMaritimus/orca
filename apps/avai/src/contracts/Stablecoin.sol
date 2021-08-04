// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

import '@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol';
import '@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol';

import './BaseVault.sol';

contract Stablecoin is ERC20, ERC20Permit, AccessControl {
  bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // The vaults that users can use
  UpgradeableBeacon immutable baseVault;
  address[] public vaults;

  event CreateVaultType(uint256 vaultID, address vault);

  constructor(string memory name, address vault_)
    ERC20(name, name)
    ERC20Permit(name)
  {
    baseVault = UpgradeableBeacon(vault_);
    // Treasury
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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
    BeaconProxy proxy = new BeaconProxy(
      address(baseVault),
      abi.encodeWithSignature(
        'initialize(uint256 minimumCollateralPercentage_, address priceSource_, string memory name_, string memory symbol_, address token_, address stablecoin_)',
        minimumCollateralPercentage_,
        priceSource_,
        name_,
        symbol_,
        token_,
        address(this)
      )
    );

    vaults.push(address(proxy));
    _setupRole(BURNER_ROLE, address(proxy));
    // Allow the vault to burn stablecoin
    _setupRole(MINTER_ROLE, address(proxy));
  }
}
