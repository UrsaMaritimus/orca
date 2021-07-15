// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import './interfaces/IVaultType.sol';

contract BaseVaultType is Ownable, IVaultType {
  using Counters for Counters.Counter;
  Counters.Counter private _vaultTypes;

  // Type of vaults that exist
  struct VaultType {
    address base;
    uint256 debtCeiling;
    uint256 totalDebt;
    uint256 closingFee;
    uint256 openingFee;
    uint256 tokenPeg;
    address avaxPriceSourceAddress;
    uint256 minimumCollateralPercentage;
  }

  // Type of vaults allowed
  mapping(uint256 => VaultType) private vaultTypes;

  /**
   * Owner can create a vault type i.e. make a vault for eth, avax, btc, etc.
   */
  function createVaultType(
    address base,
    uint256 debtCeiling,
    uint256 closingFee,
    uint256 openingFee,
    uint256 tokenPeg,
    address avaxPriceSourceAddress,
    uint256 minimumCollateralPercentage
  ) public override onlyOwner() {
    // Cannot be zero address for avax price source
    assert(avaxPriceSourceAddress != address(0));

    // Cannot have 0% collateral, obviously
    assert(minimumCollateralPercentage != 0);

    _vaultTypes.increment();
    uint256 newVaultTypeID = _vaultTypes.current();

    // Create new vault in memory and then add to dict
    VaultType memory newVaultType = VaultType(
      base,
      debtCeiling,
      0,
      closingFee,
      openingFee,
      tokenPeg,
      avaxPriceSourceAddress,
      minimumCollateralPercentage
    );
    vaultTypes[newVaultTypeID] = newVaultType;

    // Emit create vault type event
    emit CreateVaultType(newVaultTypeID, base);
  }

  /**
    @dev returns the debt ceiling 
  */
  function getDebtCeiling(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].debtCeiling;
  }

  /**
    @dev returns the closing fee
  */
  function getClosingFee(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].closingFee;
  }

  /**
    @dev returns the opening fee
  */
  function getOpeningFee(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].openingFee;
  }

  /**
    @dev returns the token peg (i.e. USDC)
  */
  function getTokenPriceSource(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].tokenPeg;
  }

  /**
    @dev returns the base
  */
  function getBase(uint256 vaultType) external view override returns (address) {
    return vaultTypes[vaultType].base;
  }

  /**
    @dev returns the base
  */
  function getMinimumCollateralPercentage(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].minimumCollateralPercentage;
  }

  /**
    @dev returns the base token's address
  */
  function getPriceSource(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    // Make an aggregator of the price sources
    AggregatorV3Interface priceSource = AggregatorV3Interface(
      vaultTypes[vaultType].avaxPriceSourceAddress
    );
    // And get the latest round data
    (, int256 price, , , ) = priceSource.latestRoundData();
    return uint256(price);
  }

  function getTotalDebt(uint256 vaultType)
    external
    view
    override
    returns (uint256)
  {
    return vaultTypes[vaultType].totalDebt;
  }

  /**
   * @dev sets the price source for this vault type from i.e. chainlink
   */
  function setPriceSource(uint256 vaultType, address _avaxPriceSourceAddress)
    external
    override
    onlyOwner()
  {
    require(
      _avaxPriceSourceAddress != address(0),
      'Price source cannot be zero address'
    );

    vaultTypes[vaultType].avaxPriceSourceAddress = _avaxPriceSourceAddress;
  }

  /**
   * @dev Set the token price peg
   */
  function setTokenPricePeg(uint256 vaultType, uint256 _tokenPeg)
    external
    override
    onlyOwner()
  {
    require(_tokenPeg != 0, 'Peg must be larger than 0');
    vaultTypes[vaultType].tokenPeg = _tokenPeg;
  }

  /**
   * @dev Set the debt celing for this vault
   */
  function setDebtCeiling(uint256 vaultType, uint256 _debtCeiling)
    external
    override
    onlyOwner()
  {
    require(
      vaultTypes[vaultType].debtCeiling <= _debtCeiling,
      'setCeiling: Must be over the amount of current debt ceiling.'
    );
    vaultTypes[vaultType].debtCeiling = _debtCeiling;
  }

  /**
   * @dev Set the closing fee for this vault
   */
  function setClosingFee(uint256 vaultType, uint256 _closingFee)
    external
    override
    onlyOwner()
  {
    vaultTypes[vaultType].closingFee = _closingFee;
  }

  /**
   * @dev Set the opening fee for this vault
   */
  function setOpeningFee(uint256 vaultType, uint256 _openingFee)
    external
    override
    onlyOwner()
  {
    vaultTypes[vaultType].openingFee = _openingFee;
  }

  /**
   * @dev Set the minimum debt collateral percentage
   */
  function setMinimumCollateralPercentage(
    uint256 vaultType,
    uint256 _percentage
  ) external override onlyOwner() {
    vaultTypes[vaultType].minimumCollateralPercentage = _percentage;
  }

  /**
   * @dev Set the base token i.e. avax address
   */
  function setBase(uint256 vaultType, address _base)
    external
    override
    onlyOwner()
  {
    vaultTypes[vaultType].base = _base;
  }

  /**
   * @dev Adds debt to the vault
   *
   * Requirements:
   * - new user debt cannot be above debt ceiling
   */
  function _addToTotalDebt(uint256 vaultType, uint256 amount) internal {
    uint256 newDebt = vaultTypes[vaultType].totalDebt + amount;
    require(
      newDebt <= vaultTypes[vaultType].debtCeiling,
      'Debt can not go above debt ceiling'
    );

    vaultTypes[vaultType].totalDebt = newDebt;
  }

  /**
   * @dev Subtract from the total debt of this vault type
   */
  function _subFromTotalDebt(uint256 vaultType, uint256 amount) internal {
    require(
      amount <= vaultTypes[vaultType].totalDebt,
      'Debt can not go below 0.'
    );
    uint256 newDebt = vaultTypes[vaultType].totalDebt - amount;

    vaultTypes[vaultType].totalDebt = newDebt;
  }
}
