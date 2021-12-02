// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';

import '@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

import '../overrides/UpgradeableBeacon.sol';
import '../interfaces/IBank.sol';

contract AVAIv2 is
  Initializable,
  ERC20Upgradeable,
  ERC20PermitUpgradeable,
  PausableUpgradeable,
  AccessControlUpgradeable,
  UpgradeableBeacon
{
  // Add the library methods
  using EnumerableSet for EnumerableSet.AddressSet;

  bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // The banks that users can use
  address[] public banks;

  mapping(bytes32 => EnumerableSet.AddressSet) private _roleMembers;

  event CreateVaultType(
    address token,
    uint256 minimumCollateralPercentage,
    address priceSource,
    string name,
    address bank
  );

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
   * @dev check on the current number of bank types deployed
   */
  function bankCount() external view returns (uint256) {
    return banks.length;
  }

  /**
   * @dev give a burner role so that banks can burn the token upon liquidation and paying back.
   */
  function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
    _burn(from, amount);
  }

  /**
   * @dev give a minter role so that banks can mint upon borrowing.
   */
  function mint(address account, uint256 amount)
    external
    onlyRole(MINTER_ROLE)
  {
    _mint(account, amount);
  }

  /**
   * @dev Adds a bank after creation for book keeping on the stablecoin
   */
  function addBank(
    uint256 minimumCollateralPercentage_,
    address priceSource_,
    string calldata name_,
    string calldata symbol_,
    address token_
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    address bank = address(
      new BeaconProxy(
        address(this),
        abi.encodeWithSignature(
          'initialize(uint256,address,string,string,address)',
          minimumCollateralPercentage_,
          priceSource_,
          name_,
          symbol_,
          token_
        )
      )
    );

    banks.push(bank);

    _setupRole(BURNER_ROLE, bank);
    // Allow the bank to burn stablecoin
    _setupRole(MINTER_ROLE, bank);

    emit CreateVaultType(
      token_,
      minimumCollateralPercentage_,
      priceSource_,
      name_,
      bank
    );
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

  //--------------------------------------
  // Bank stuff

  /**
   * @dev sets the minimum debt
   */
  function setMinimumDebt(uint256 bankID, uint256 minimumDebt_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setMinimumDebt(minimumDebt_);
  }

  /**
   * @dev sets the gain ratio
   */
  function setGainRatio(uint256 bankID, uint256 gainRatio_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setGainRatio(gainRatio_);
  }

  /**
   * @dev sets the debt ratio
   */
  function setDebtRatio(uint256 bankID, uint256 debtRatio_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setDebtRatio(debtRatio_);
  }

  /**
   * @dev Set the debt ceiling for this bank
   */
  function setDebtCeiling(uint256 bankID, uint256 debtCeiling_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setDebtCeiling(debtCeiling_);
  }

  /**
   * @dev Set the price source for this bank
   */
  function setPriceSource(uint256 bankID, address priceSource_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setPriceSource(priceSource_);
  }

  /**
   * @dev Set the token peg for this bank
   */
  function setTokenPeg(uint256 bankID, uint256 tokenPeg_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setTokenPeg(tokenPeg_);
  }

  /**
   * @dev Set the stability pool (liquidator) for this bank
   */
  function setStabilityPool(uint256 bankID, address stabilityPool_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setStabilityPool(stabilityPool_);
  }

  /**
   * @dev Set the WAVAX gateway for this bank if it needs one
   */
  function setGateway(uint256 bankID, address gateway_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setGateway(gateway_);
  }

  /**
   * @dev Set the minimum collateral percentage for this bank
   */
  function setMinimumCollateralPercentage(uint256 bankID, uint256 mcp_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setMinimumCollateralPercentage(mcp_);
  }

  /**
   * @dev Set the closing fee for this bank
   */
  function setClosingFee(uint256 bankID, uint256 amount)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setClosingFee(amount);
  }

  /**
   * @dev Set the opening fee for this bank
   */
  function setOpeningFee(uint256 bankID, uint256 amount)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setOpeningFee(amount);
  }

  /**
   * @dev Set the treasury bank for this bank
   */
  function setTreasury(uint256 bankID, uint256 treasury_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setTreasury(treasury_);
  }

  /**
   * @dev Pauses minting for a bank if exploit or if deprecated
   */
  function setMintingPaused(uint256 bankID, bool paused_)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    IBank(banks[bankID]).setMintingPaused(paused_);
  }

  function getRoleMember(bytes32 role, uint256 index)
    public
    view
    returns (address)
  {
    return _roleMembers[role].at(index);
  }

  /**
   * @dev Returns the number of accounts that have `role`. Can be used
   * together with {getRoleMember} to enumerate all bearers of a role.
   */
  function getRoleMemberCount(bytes32 role) public view returns (uint256) {
    return _roleMembers[role].length();
  }

  /**
   * @dev Overload {grantRole} to track enumerable memberships
   */
  function grantRole(bytes32 role, address account)
    public
    virtual
    override(AccessControlUpgradeable)
  {
    super.grantRole(role, account);
    _roleMembers[role].add(account);
  }

  /**
   * @dev Overload {revokeRole} to track enumerable memberships
   */
  function revokeRole(bytes32 role, address account)
    public
    virtual
    override(AccessControlUpgradeable)
  {
    super.revokeRole(role, account);
    _roleMembers[role].remove(account);
  }

  /**
   * @dev Overload {renounceRole} to track enumerable memberships
   */
  function renounceRole(bytes32 role, address account)
    public
    virtual
    override(AccessControlUpgradeable)
  {
    super.renounceRole(role, account);
    _roleMembers[role].remove(account);
  }

  /**
   * @dev Overload {_setupRole} to track enumerable memberships
   */
  function _setupRole(bytes32 role, address account) internal virtual override {
    super._setupRole(role, account);
    _roleMembers[role].add(account);
  }
}
