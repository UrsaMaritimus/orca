// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

import './interfaces/IMyVault.sol';

contract Stablecoin is ERC20, ReentrancyGuard {
  // Feed of price on avalanche from chainlink
  AggregatorV3Interface internal avaxPriceSource;

  // No need for SafeMath in solidity ^0.8.0, built in overflow checking
  // using SafeMath for uint256;

  // Miniumum amount of collateral needed
  uint256 private _minimumCollateralPercentage;

  // The vault that a user opens to create Stablecoin
  IMyVault public erc721;

  // Number of vaults
  uint256 public vaultCount;

  // How much can be minted
  uint256 public debtCeiling;

  // Fee for closing vault
  uint256 public closingFee;

  // Fee for opening vault
  uint256 public openingFee;

  // Vault that corresponds to treasury
  uint256 public treasury;

  // The token peg value
  uint256 public tokenPeg;

  mapping(uint256 => bool) public vaultExistence;
  mapping(uint256 => address) public vaultOwner;
  mapping(uint256 => uint256) public vaultCollateral;
  mapping(uint256 => uint256) public vaultDebt;

  address public stabilityPool;

  // Events for general vault operations
  event CreateVault(uint256 vaultID, address creator);
  event DestroyVault(uint256 vaultID);
  event TransferVault(uint256 vaultID, address from, address to);
  // Events for collateral operations
  event DepositCollateral(uint256 vaultID, uint256 amount);
  event WithdrawCollateral(uint256 vaultID, uint256 amount);

  // Events for token operations
  event BorrowToken(uint256 vaultID, uint256 amount);
  event PayBackToken(uint256 vaultID, uint256 amount, uint256 closingFee);

  // Buying out a vault event
  event BuyRiskyVault(
    uint256 vaultID,
    address owner,
    address buyer,
    uint256 amountPaid
  );

  constructor(
    address avaxPriceSourceAddress,
    uint256 minimumCollateralPercentage,
    string memory name,
    string memory symbol,
    address vaultAddress
  ) ERC20(name, symbol) {
    // Cannot be zero address for avax price source
    assert(avaxPriceSourceAddress != address(0));

    // Cannot have 0% collateral, obviously
    assert(minimumCollateralPercentage != 0);

    //  | decimals start here
    debtCeiling = 10 * 10**18; // 10 dollars
    closingFee = 50; // 0.5%
    openingFee = 0; // 0.0%
    avaxPriceSource = AggregatorV3Interface(avaxPriceSourceAddress);
    // Initially, will deploy later
    stabilityPool = address(0);
    // USDC has 8 sig figs
    tokenPeg = 10**8; // $1

    // Set inital vault!
    erc721 = IMyVault(vaultAddress);

    _minimumCollateralPercentage = minimumCollateralPercentage;
  }

  /**
 Only vault owner can do anything with this modifier */
  modifier onlyVaultOwner(uint256 vaultID) {
    require(vaultExistence[vaultID], 'Vault does not exist');
    require(vaultOwner[vaultID] == msg.sender, 'Vault is not owned by you');
    _;
  }

  /**
    @dev returns the current debt ceiling 
  */
  function getDebtCeiling() external view returns (uint256) {
    return debtCeiling;
  }

  /**
    @dev returns the current closing fee
  */
  function getClosingFee() external view returns (uint256) {
    return closingFee;
  }

  /**
    @dev returns the current opening fee
  */
  function getOpeningFee() external view returns (uint256) {
    return openingFee;
  }

  /**
    @dev returns the current token peg (i.e. USDC)
  */
  function getTokenPriceSource() public view returns (uint256) {
    return tokenPeg;
  }

  /**
    @dev returns the current avax price from chainlink as a uint256
  */
  function getAvaxPriceSource() public view returns (uint256) {
    (, int256 price, , , ) = avaxPriceSource.latestRoundData();
    return uint256(price);
  }

  /**
   * @dev returns the current debt ceiling
   *
   *
   * Requirements:
   *
   * - Avax price cannot be zero
   * - Token (i.e. usdc) price cannot be zero
   */
  function calculateCollateralProperties(uint256 collateral, uint256 debt)
    private
    view
    returns (uint256, uint256)
  {
    assert(getAvaxPriceSource() != 0);
    assert(getTokenPriceSource() != 0);

    // Value of collateral on avalanche network
    uint256 collateralValue = collateral * getAvaxPriceSource();
    assert(collateralValue >= collateral);

    // Get the current debt in our token (i.e. usdc)
    uint256 debtValue = debt * getTokenPriceSource();
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
    private
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
  function createVault() external returns (uint256) {
    uint256 id = vaultCount;
    vaultCount += 1;

    assert(vaultCount >= id);

    // Create a vault for the user
    vaultExistence[id] = true;
    vaultOwner[id] = msg.sender;

    emit CreateVault(id, msg.sender);

    // mint erc721 (vaultId)
    erc721.mint(msg.sender, id);

    // Return vault id
    return id;
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
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(vaultDebt[vaultID] == 0, 'Vault has outstanding debt');

    if (vaultCollateral[vaultID] != 0) {
      payable(msg.sender).transfer(vaultCollateral[vaultID]);
    }

    // burn erc721 (vaultId)
    erc721.burn(vaultID);

    // Destroy everything
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
    onlyVaultOwner(vaultID)
  {
    vaultOwner[vaultID] = to;

    // burn erc721 (vaultId)
    erc721.burn(vaultID);
    // mint erc721 (vaultId)
    erc721.mint(to, vaultID);

    emit TransferVault(vaultID, msg.sender, to);
  }

  /**
   * @dev ALlows vault owner to deposit collateral
   *
   * Emits Deposit Collateral event
   *
   */
  function depositCollateral(uint256 vaultID)
    external
    payable
    onlyVaultOwner(vaultID)
  {
    // Add to previous collateral values
    uint256 newCollateral = vaultCollateral[vaultID] + msg.value;
    assert(newCollateral >= vaultCollateral[vaultID]);

    // Adjust and save it
    vaultCollateral[vaultID] = newCollateral;

    emit DepositCollateral(vaultID, msg.value);
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
    external
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(
      vaultCollateral[vaultID] >= amount,
      'Vault does not have enough collateral'
    );

    uint256 newCollateral = vaultCollateral[vaultID] - amount;

    // Ensure debt doesn't dip below minimum required
    if (vaultDebt[vaultID] != 0) {
      require(
        isValidCollateral(newCollateral, vaultDebt[vaultID]),
        'Withdrawal would put vault below minimum collateral percentage'
      );
    }

    // Return the collateral
    vaultCollateral[vaultID] = newCollateral;
    payable(msg.sender).transfer(amount);

    emit WithdrawCollateral(vaultID, amount);
  }

  /**
   * @dev Lets a vault owner borrow stablecoin against collateral
   *
   * Requirements:
   * - Must borrow greater than 0 stablecoin
   * - Must be below the debt ceiling when borrowing
   * - Must maintain minimum collateral percentage
   *
   * Emits BorrowToken event
   */
  function borrowToken(uint256 vaultID, uint256 amount)
    external
    onlyVaultOwner(vaultID)
  {
    require(amount > 0, 'Must borrow non-zero amount');
    require(
      totalSupply() + amount <= debtCeiling,
      'borrowToken: Cannot mint over totalSupply.'
    );

    uint256 newDebt = vaultDebt[vaultID] + amount;
    assert(newDebt > vaultDebt[vaultID]);

    require(
      isValidCollateral(vaultCollateral[vaultID], newDebt),
      'Borrow would put vault below minimum collateral percentage'
    );

    // Mint stable coin for the user
    vaultDebt[vaultID] = newDebt;
    _mint(msg.sender, amount);
    emit BorrowToken(vaultID, amount);
  }

  /**
   * Pay back the stablecoin to reduce debt
   *
   * Requirements:
   * - User must have enough balance to repay `amount`
   * - Cannot pay back more than the required debt. `amount` must be less than debt.
   */
  function payBackToken(uint256 vaultID, uint256 amount)
    external
    onlyVaultOwner(vaultID)
  {
    require(balanceOf(msg.sender) >= amount, 'Token balance too low');
    require(
      vaultDebt[vaultID] >= amount,
      'Vault debt less than amount to pay back'
    );

    // Closing fee calculation
    uint256 _closingFee = (amount * closingFee * getTokenPriceSource()) /
      (getAvaxPriceSource() * 10000);

    vaultDebt[vaultID] -= amount;
    vaultCollateral[vaultID] -= _closingFee;
    vaultCollateral[treasury] += _closingFee;

    // Burns the stablecoin
    _burn(msg.sender, amount);

    emit PayBackToken(vaultID, amount, _closingFee);
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
  function buyRiskyVault(uint256 vaultID) external {
    require(vaultExistence[vaultID], 'Vault does not exist');
    require(
      stabilityPool == address(0) || msg.sender == stabilityPool,
      'buyRiskyVault disabled for public'
    );

    // Calculates the debt and collateral
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
      vaultCollateral[vaultID],
      vaultDebt[vaultID]
    );

    // Calculates collateral ratio
    uint256 collateralPercentage = collateralValueTimes100 / debtValue;
    require(
      collateralPercentage < _minimumCollateralPercentage,
      'Vault is not below minimum collateral percentage'
    );

    // Calculates the maximum debt
    uint256 maximumDebtValue = collateralValueTimes100 /
      _minimumCollateralPercentage;

    // In our token price
    uint256 maximumDebt = maximumDebtValue / getTokenPriceSource();
    uint256 debtDifference = vaultDebt[vaultID] - maximumDebt;

    require(
      balanceOf(msg.sender) >= debtDifference,
      'Token balance too low to pay off outstanding debt'
    );

    address previousOwner = vaultOwner[vaultID];

    vaultOwner[vaultID] = msg.sender;
    vaultDebt[vaultID] = maximumDebt;

    uint256 _closingFee = (debtDifference *
      closingFee *
      getTokenPriceSource()) / (getAvaxPriceSource() * 10000);

    vaultCollateral[vaultID] -= _closingFee;
    vaultCollateral[treasury] += _closingFee;

    _burn(msg.sender, debtDifference);

    // burn erc721 (vaultId)
    erc721.burn(vaultID);
    // mint erc721 (vaultId)
    erc721.mint(msg.sender, vaultID);

    emit BuyRiskyVault(vaultID, previousOwner, msg.sender, debtDifference);
  }
}
