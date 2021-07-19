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

  Stablecoin public stablecoin;
  BaseVault public vault;

  uint256 public debtRatio;
  uint256 public gainRatio;

  uint256 private _minimumCollateralPercentage;

  mapping(address => uint256) public tokenDebt;

  constructor(address stablecoin_, address vault_) {
    require(
      stablecoin_ != address(0),
      'Cannot set stablecoin to the zero address'
    );
    require(vault_ != address(0), 'Cannot set vault to the zero address');

    stablecoin = Stablecoin(stablecoin_);
    vault = BaseVault(vault_);

    debtRatio = 2; // 50%
    gainRatio = 11; // /10 so 1.1, or 10%

    _minimumCollateralPercentage = 150;

    // Initially set msg.sender as treasury
    treasury = msg.sender;
  }

  /**
   * @dev careful. This transfers treasury AND ownership to the new treasury.
   */
  function setTreasury(address newTreasury_) external onlyOwner() {
    require(
      newTreasury_ != address(0),
      'Cannot set treasury to the zero address'
    );
    treasury = newTreasury_;
    transferOwnership(newTreasury_);
  }

  /**
   * @dev sets the gain ratio
   */
  function setGainRatio(uint256 gainRatio_) external onlyOwner() {
    gainRatio = gainRatio_;
  }

  /**
   * @dev sets the debt ratio
   */
  function setDebtRatio(uint256 debtRatio_) external onlyOwner() {
    debtRatio = debtRatio_;
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
    assert(vault.getPriceSource() != 0);
    assert(vault.getPricePeg() != 0);

    uint256 collateralValue = collateral * vault.getPriceSource();

    assert(collateralValue >= collateral);

    uint256 debtValue = debt * vault.getPricePeg();

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
  function getPaid() external virtual nonReentrant {
    require(tokenDebt[msg.sender] != 0, "Don't have anything for you.");
    uint256 amount = tokenDebt[msg.sender];
    // Set first in case nonReentrant fails somehow
    tokenDebt[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
  }

  /**
   * @dev checks if the vault can be liquidated
   */
  function checkLiquidation(uint256 vaultId_) public view {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
      vault.vaultCollateral(vaultId_),
      vault.vaultDebt(vaultId_)
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
  function checkCost(uint256 vaultId_) public view returns (uint256) {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      vault.vaultCollateral(vaultId_),
      vault.vaultDebt(vaultId_)
    );

    debtValue = debtValue / 1e8;

    return debtValue / debtRatio;
  }

  /**
   * @dev checks how much token gets extract
   */
  function checkExtract(uint256 vaultId_) public view returns (uint256) {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      vault.vaultCollateral(vaultId_),
      vault.vaultDebt(vaultId_)
    );

    uint256 tokenExtract = (debtValue * gainRatio) /
      (10 * vault.getPriceSource() * debtRatio);

    return tokenExtract;
  }

  /**
   * @dev Gives all the variables
   */
  function checkValid(uint256 vaultId_)
    external
    view
    returns (
      bool,
      uint256,
      uint256,
      uint256
    )
  {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    uint256 halfDebt = checkCost(vaultId_);
    uint256 tokenExtract = checkExtract(vaultId_);

    uint256 newCollateral = vault.vaultCollateral(vaultId_) - tokenExtract;
    assert(newCollateral <= vault.vaultCollateral(vaultId_));

    return (
      isValidCollateral(newCollateral, halfDebt),
      newCollateral,
      halfDebt,
      tokenExtract
    );
  }

  // Gives collateral
  function checkCollat(uint256 vaultId_)
    external
    view
    returns (uint256, uint256)
  {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    return
      calculateCollateralProperties(
        vault.vaultCollateral(vaultId_),
        vault.vaultDebt(vaultId_)
      );
  }

  /**
   * @dev Liquidate the vault using this function
   */
  function liquidateVault(uint256 vaultId_) external nonReentrant {
    require(vault.vaultExistence(vaultId_), 'Vault must exist');
    // Transfer any remaining stablecoin to treasury
    uint256 ogBalance = stablecoin.balanceOf(address(this));
    require(
      stablecoin.transfer(treasury, ogBalance),
      'Dust failed to send to treasury'
    );
    address ogOwner = vault.ownerOf(vaultId_);
    // check liquidation ratio.
    // require its under 150;
    checkLiquidation(vaultId_);

    uint256 tokenExtract = checkExtract(vaultId_);
    uint256 halfDebt = checkCost(vaultId_);

    require(
      stablecoin.transferFrom(msg.sender, address(this), halfDebt),
      'Unable to send stablecoin to liquidator'
    );

    // if we successfully transfer user's funds we can now buy risky vault.
    vault.buyRiskyVault(vaultId_);

    uint256 newBalance = stablecoin.balanceOf(address(this));

    // Pay back whatever wasn't needed to pay
    vault.payBackToken(vaultId_, newBalance);

    // Withdraw the fee
    vault.withdrawCollateral(vaultId_, tokenExtract);

    // Trasnfer back to original owner
    vault.transferVault(vaultId_, ogOwner);

    // and let the liquidator have their fee!
    tokenDebt[msg.sender] = tokenDebt[msg.sender] + tokenExtract;
  }

  receive() external payable {}
}
