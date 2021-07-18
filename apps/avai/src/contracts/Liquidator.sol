// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

import './Stablecoin.sol';
import './BaseVault.sol';
import './interfaces/ILiquidator.sol';

contract Liquidator is ILiquidator, ReentrancyGuard, Ownable {
  address public treasury;

  Stablecoin public _stablecoin;
  BaseVault public _vault;

  uint256 public debtRatio;
  uint256 public gainRatio;

  uint256 private _minimumCollateralPercentage;

  mapping(address => uint256) public tokenDebt;

  constructor(address stablecoin, address vault) {
    require(
      stablecoin != address(0),
      'Cannot set stablecoin to the zero address'
    );
    require(vault != address(0), 'Cannot set vault to the zero address');

    _stablecoin = Stablecoin(stablecoin);
    _vault = BaseVault(vault);

    debtRatio = 2; // 50%
    gainRatio = 11; // /10 so 1.1, or 10%

    _minimumCollateralPercentage = 150;

    // Initially set msg.sender as treasury
    treasury = msg.sender;
  }

  /**
   * @dev careful. This transfers treasury AND ownership to the new treasury.
   */
  function setTreasury(address _newTreasury) public onlyOwner() {
    require(treasury != address(0), 'Cannot set treasury to the zero address');
    treasury = _newTreasury;
    transferOwnership(_newTreasury);
  }

  /**
   * @dev sets the gain ratio
   */
  function setGainRatio(uint256 _gainRatio) public onlyOwner() {
    gainRatio = _gainRatio;
  }

  /**
   * @dev sets the debt ratio
   */
  function setDebtRatio(uint256 _debtRatio) public onlyOwner() {
    debtRatio = _debtRatio;
  }

  /**
   * @dev returns the current debt and collateral
   *
   * Requirements:
   *
   * - Token price cannot be zero
   * - PEG (i.e. usdc) price cannot be zero
   */
  function calculateCollateralProperties(uint256 collateral, uint256 debt)
    private
    view
    returns (uint256, uint256)
  {
    assert(_vault.getPriceSource() != 0);
    assert(_vault.getPricePeg() != 0);

    uint256 collateralValue = collateral * _vault.getPriceSource();

    assert(collateralValue >= collateral);

    uint256 debtValue = debt * _vault.getPricePeg();

    assert(debtValue >= debt);

    uint256 collateralValueTimes100 = collateralValue * 100;

    assert(collateralValueTimes100 > collateralValue);

    return (collateralValueTimes100, debtValue);
  }

  /**
   * @dev Checks if the current collateral is valid
   */
  function isValidCollateral(uint256 collateral, uint256 debt)
    private
    view
    returns (bool)
  {
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(collateral, debt);

    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    return collateralPercentage >= _minimumCollateralPercentage;
  }

  /**
   * @dev pays the user
   * Override this in other liquidators if you wish you pay not in AVAX but in a ERC20
   */
  function getPaid() public virtual nonReentrant {
    require(tokenDebt[msg.sender] != 0, "Don't have anything for you.");
    uint256 amount = tokenDebt[msg.sender];
    // Set first in case nonReentrant fails somehow
    tokenDebt[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
  }

  /**
   * @dev checks if the vault can be liquidated
   */
  function checkLiquidation(uint256 _vaultId) public view {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
      _vault.vaultCollateral(_vaultId),
      _vault.vaultDebt(_vaultId)
    );

    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    require(
      collateralPercentage < _minimumCollateralPercentage,
      'Vault is not below minimum collateral percentage'
    );
  }

  /**
   * @dev checks cost of liquidating
   */
  function checkCost(uint256 _vaultId) public view returns (uint256) {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      _vault.vaultCollateral(_vaultId),
      _vault.vaultDebt(_vaultId)
    );

    debtValue = debtValue / 100000000;

    return debtValue / debtRatio;
  }

  /**
   * @dev checks how much token gets extract
   */
  function checkExtract(uint256 _vaultId) public view returns (uint256) {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      _vault.vaultCollateral(_vaultId),
      _vault.vaultDebt(_vaultId)
    );

    uint256 halfDebt = debtValue / debtRatio;

    uint256 tokenExtract = (halfDebt * gainRatio) /
      (10 * _vault.getPriceSource());

    return tokenExtract;
  }

  /**
   * @dev Gives all the variables
   */
  function checkValid(uint256 _vaultId)
    public
    view
    returns (
      bool,
      uint256,
      uint256,
      uint256
    )
  {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    uint256 halfDebt = checkCost(_vaultId);
    uint256 tokenExtract = checkExtract(_vaultId);

    uint256 newCollateral = _vault.vaultCollateral(_vaultId) - tokenExtract;
    assert(newCollateral <= _vault.vaultCollateral(_vaultId));

    return (
      isValidCollateral(newCollateral, halfDebt),
      newCollateral,
      halfDebt,
      tokenExtract
    );
  }

  // Gives collateral
  function checkCollat(uint256 _vaultId)
    public
    view
    returns (uint256, uint256)
  {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    return
      calculateCollateralProperties(
        _vault.vaultCollateral(_vaultId),
        _vault.vaultDebt(_vaultId)
      );
  }

  /**
   * @dev Liquidate the vault using this function
   */
  function liquidateVault(uint256 _vaultId) public nonReentrant {
    require(_vault.vaultExistence(_vaultId), 'Vault must exist');
    // Transfer any remaining stablecoin to treasury
    uint256 ogBalance = _stablecoin.balanceOf(address(this));
    _stablecoin.transfer(treasury, ogBalance);
    address ogOwner = _vault.ownerOf(_vaultId);
    // check liquidation ratio.
    // require its under 150;
    checkLiquidation(_vaultId);

    uint256 tokenExtract = checkExtract(_vaultId);
    uint256 halfDebt = checkCost(_vaultId);

    _stablecoin.transferFrom(msg.sender, address(this), halfDebt);

    // if we successfully transfer user's funds we can now buy risky vault.
    _vault.buyRiskyVault(_vaultId);

    uint256 newBalance = _stablecoin.balanceOf(address(this));

    // Pay back whatever wasn't needed to pay
    _vault.payBackToken(_vaultId, newBalance);

    // Withdraw the fee
    _vault.withdrawCollateral(_vaultId, tokenExtract);

    // Trasnfer back to original owner
    _vault.transferVault(_vaultId, ogOwner);

    // and let the liquidator have their fee!
    tokenDebt[msg.sender] = tokenDebt[msg.sender] + tokenExtract;
  }

  receive() external payable {}
}
