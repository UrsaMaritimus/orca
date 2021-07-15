// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import './interfaces/IStablecoin.sol';
import './interfaces/IBaseVault.sol';

contract BaseVault is ERC721, ReentrancyGuard, IBaseVault, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _userVaultIds;
  /**
   * Set all of these upon initalization
   */
  uint256 private _minimumCollateralPercentage;

  uint256 public debtCeiling;
  uint256 public closingFee;
  uint256 public openingFee;
  uint256 public tokenPeg;
  uint256 public totalDebt;
  AggregatorV3Interface public priceSource;
  IERC20 internal immutable _token;
  IStablecoin internal immutable _stablecoin;

  // Address that corresponds to liquidater
  address public stabilityPool;
  // Vault that corresponds to the treasury
  uint256 treasury;

  // Vault information
  mapping(uint256 => bool) public vaultExistence;
  mapping(uint256 => address) public vaultOwner;
  mapping(uint256 => uint256) public vaultCollateral;
  mapping(uint256 => uint256) public vaultDebt;

  // Lets begin!
  constructor(
    string memory name_,
    string memory symbol_,
    address token,
    address stablecoin
  ) ERC721(name_, symbol_) {
    //Initial settings!
    debtCeiling = 10000000000000000000; // 10 dollas
    closingFee = 50; // 0.5%
    openingFee = 0; // 0.0%
    tokenPeg = 100000000; // $1
    // Initially, will deploy later
    stabilityPool = address(0);

    _token = IERC20(token);
    _stablecoin = IStablecoin(stablecoin);
  }

  /**
   * @dev Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultID) {
    require(!vaultExistence[vaultID], 'Vault does not exist');
    require(vaultOwner[vaultID] == msg.sender, 'Vault is not owned by you');
    _;
  }
  /**
   * @dev Only liquidater can do anything with this modifier
   */
  modifier onlyLiquidater() {
    require(
      stabilityPool == address(0) || msg.sender == stabilityPool,
      'buyRiskyVault disabled for public'
    );
    _;
  }

  /**
   * @dev Set the debt ceiling for this vault
   */
  function setDebtCeiling(uint256 _debtCeiling) external override onlyOwner() {
    require(
      debtCeiling <= _debtCeiling,
      'setCeiling: Must be over the amount of current debt ceiling.'
    );
    debtCeiling = _debtCeiling;
  }

  /**
    @dev returns the base token's address
  */
  function getPriceSource() public view override returns (uint256) {
    // And get the latest round data
    (, int256 price, , , ) = priceSource.latestRoundData();
    return uint256(price);
  }

  /**
    @dev returns the base token's address
  */
  function getPricePeg() public view override returns (uint256) {
    return tokenPeg;
  }

  /**
   * @dev Checks if vault exists
   */
  function isKnownVault(uint256 vaultID) external view override returns (bool) {
    return vaultExistence[vaultID];
  }

  /**
   * @dev returns the current debt and collateral
   *
   * Requirements:
   *
   * - Avax price cannot be zero
   * - Token (i.e. usdc) price cannot be zero
   */
  function calculateCollateralProperties(uint256 collateral, uint256 debt)
    internal
    view
    returns (uint256, uint256)
  {
    assert(getPriceSource() != 0);
    assert(getPricePeg() != 0);

    // Value of collateral on avalanche network
    uint256 collateralValue = collateral * getPriceSource();
    assert(collateralValue >= collateral);

    // Get the current debt in our token (i.e. usdc)
    uint256 debtValue = debt * getPriceSource();
    assert(debtValue >= debt);

    // Multiple collateral by 100
    uint256 collateralValueTimes100 = collateralValue * 100;
    assert(collateralValueTimes100 > collateralValue);

    return (collateralValueTimes100, debtValue);
  }

  /**
   * @dev Checks if the current collateral is valid
   */
  function isValidCollateral(uint256 collateral, uint256 debt)
    public
    view
    returns (bool)
  {
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(collateral, debt);

    // Get current ratio of debt
    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    // and check if it's above 150%
    return collateralPercentage >= _minimumCollateralPercentage;
  }

  /**
   * @dev Create a vault for interacting with the platform
   *
   * Emits a CreateVault event
   */
  function createVault() external override returns (uint256) {
    // Increment ID
    _userVaultIds.increment();
    // Assign ID to vault
    uint256 newVaultId = _userVaultIds.current();

    vaultExistence[newVaultId] = true;
    vaultOwner[newVaultId] = msg.sender;

    emit CreateVault(newVaultId, msg.sender);
    // mint erc721 vault (vaultId)
    _mint(msg.sender, newVaultId);
    // Return vault id
    return newVaultId;
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
    delete vaultOwner[vaultID];
    delete vaultCollateral[vaultID];
    delete vaultDebt[vaultID];

    emit DestroyVault(vaultID);
  }

  /**
   * @dev user can transfer vault to another address
   *
   * Emits TransferVault event
   */
  function transferVault(uint256 vaultID, address to)
    external
    override
    onlyVaultOwner(vaultID)
  {
    vaultOwner[vaultID] = to;

    // burn erc721 (vaultId)
    _burn(vaultID);
    // mint erc721 (vaultId)
    _mint(to, vaultID);

    emit TransferVault(vaultID, msg.sender, to);
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
    virtual
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
    _token.transferFrom(address(this), msg.sender, amount);

    emit WithdrawCollateral(vaultID, amount);
  }

  /**
   * @dev allows any user to buy out a risky vault
   *
   * Requirements:
   * - Vault id must exist
   * - Vault must be below minimum collateral percentage
   * - User must have enough of the token to pay vault off
   *
   * Emits BuyRiskyVault event
   */
  function buyRiskyVault(uint256 vaultID) public onlyLiquidater() {
    require(vaultExistence[vaultID], 'Vault does not exist');
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
      vaultCollateral[vaultID],
      vaultDebt[vaultID]
    );

    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    require(
      collateralPercentage < _minimumCollateralPercentage,
      'Vault is not below minimum collateral percentage'
    );

    uint256 maximumDebtValue = collateralValueTimes100 /
      _minimumCollateralPercentage;

    uint256 maximumDebt = maximumDebtValue / getPricePeg();

    uint256 debtDifference = vaultDebt[vaultID] - maximumDebt;

    require(
      _stablecoin.balanceOf(msg.sender) >= debtDifference,
      'Token balance too low to pay off outstanding debt'
    );

    address previousOwner = vaultOwner[vaultID];
    vaultOwner[vaultID] = msg.sender;
    vaultDebt[vaultID] = maximumDebt;

    uint256 _closingFee = (debtDifference * closingFee * getPricePeg()) /
      (getPriceSource() * 10000);

    vaultCollateral[vaultID] -= _closingFee;
    vaultCollateral[treasury] += _closingFee;

    _stablecoin.burn(msg.sender, debtDifference);
    _subFromTotalDebt(debtDifference);
    // burn erc721 (vaultId)
    _burn(vaultID);
    // mint erc721 (vaultId)
    _mint(msg.sender, vaultID);

    emit LiquidateVault(vaultID, previousOwner, msg.sender, debtDifference);
  }

  /**
   * @dev Adds to the vault collateral
   *
   */
  function addVaultCollateral(uint256 vaultID, uint256 amount)
    external
    onlyOwner()
  {
    uint256 newCollateral = vaultCollateral[vaultID] + amount;
    assert(newCollateral >= vaultCollateral[vaultID]);

    // Adjust and save it
    vaultCollateral[vaultID] = newCollateral;
  }

  /**
   * @dev Adds to the vault collateral
   *
   */
  function addVaultCollateralTreasury(uint256 amount) external onlyOwner() {
    uint256 newCollateral = vaultCollateral[treasury] + amount;
    assert(newCollateral >= vaultCollateral[treasury]);

    // Adjust and save it
    vaultCollateral[treasury] = newCollateral;
  }

  /**
   * @dev subtracts from the vault collateral
   *
   * Requirements:
   * - Must be less than or equal to current collateral
   */

  function subVaultCollateral(uint256 vaultID, uint256 amount)
    external
    onlyOwner()
  {
    require(
      amount <= vaultCollateral[vaultID],
      'Cannot remove more than the deposited collateral'
    );
    uint256 newCollateral = vaultCollateral[vaultID] - amount;

    assert(newCollateral <= vaultCollateral[vaultID]);

    // Adjust and save it
    vaultCollateral[vaultID] = newCollateral;
  }

  /**
   * @dev Adds debt to the vault
   *
   * Requirements:
   * - new user debt cannot be above debt ceiling
   */
  function addVaultDebt(uint256 vaultID, uint256 amount) external onlyOwner() {
    uint256 newTotalDebt = amount + totalDebt;

    assert(newTotalDebt >= totalDebt);
    require(
      newTotalDebt <= debtCeiling,
      'Cannot exceed debt ceiling for this vault'
    );

    uint256 userNewDebt = amount + vaultDebt[vaultID];
    assert(userNewDebt >= vaultDebt[vaultID]);

    _addToTotalDebt(amount);

    vaultDebt[vaultID] = userNewDebt;
  }

  /**
   * @dev Subs debt to the vault
   *
   * Requirements:
   * - user cannot remove more than total debt
   * - user cannot remove more than their total debt
   */
  function subVaultDebt(uint256 vaultID, uint256 amount) external onlyOwner() {
    require(totalDebt >= amount, 'Cannot get rid of more debt than exists.');

    require(
      vaultDebt[vaultID] >= amount,
      'Cannot get rid of more debt than user has'
    );

    uint256 newTotalDebt = totalDebt - amount;
    assert(newTotalDebt <= totalDebt);

    uint256 userNewDebt = vaultDebt[vaultID] - amount;
    assert(userNewDebt <= vaultDebt[vaultID]);

    _subFromTotalDebt(amount);
    vaultDebt[vaultID] = userNewDebt;
  }

  /**
   * @dev Adds debt to the vault
   *
   * Requirements:
   * - new user debt cannot be above debt ceiling
   */
  function _addToTotalDebt(uint256 amount) internal {
    uint256 newDebt = totalDebt + amount;
    require(newDebt <= debtCeiling, 'Debt can not go above debt ceiling');

    totalDebt = newDebt;
  }

  /**
   * @dev Subtract from the total debt of this vault type
   */
  function _subFromTotalDebt(uint256 amount) internal {
    require(amount <= totalDebt, 'Debt can not go below 0.');
    uint256 newDebt = totalDebt - amount;

    totalDebt = newDebt;
  }

  function _transferFrom(
    address from, // solhint-disable-line
    address to, // solhint-disable-line
    uint256 tokenId // solhint-disable-line
  ) internal pure {
    revert('transfer: disabled');
  }
}
