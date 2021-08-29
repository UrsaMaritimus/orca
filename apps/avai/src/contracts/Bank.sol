// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import './interfaces/IStablecoin.sol';

contract Bank is
  Initializable,
  ERC721Upgradeable,
  ERC721EnumerableUpgradeable,
  ReentrancyGuardUpgradeable,
  AccessControlUpgradeable
{
  bytes32 public constant TREASURY_ROLE = keccak256('TREASURY_ROLE');
  using SafeERC20 for IERC20;
  using SafeERC20 for IStablecoin;
  using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter private _userVaultIds;
  /**
   * Set all of these upon initalization
   */
  uint256 public minimumCollateralPercentage;
  uint256 public debtCeiling;
  uint256 public closingFee;
  uint256 public openingFee;
  uint256 public tokenPeg;
  uint256 public totalDebt;
  // For liquidation
  uint256 public debtRatio;
  uint256 public gainRatio;
  mapping(address => uint256) public tokenDebt;

  // Chainlink price source
  AggregatorV3Interface public priceSource;

  // Token used as collateral
  IERC20 public token;
  // Token used as debt
  IStablecoin internal stablecoin;

  // Address that corresponds to liquidater
  address public stabilityPool;
  // address that corresponds to gateway, if there is one
  address public gateway;
  // Vault that corresponds to the treasury
  uint256 public treasury;

  // Vault information
  mapping(uint256 => bool) private vaultExistence;
  mapping(uint256 => uint256) public vaultCollateral;
  mapping(uint256 => uint256) public vaultDebt;

  // Events for general vault operations
  event CreateVault(uint256 vaultID, address creator);
  event DestroyVault(uint256 vaultID);
  event TransferVault(uint256 vaultID, address from, address to);

  // Buying out a vault event
  event LiquidateVault(
    uint256 vaultID,
    address owner,
    address buyer,
    uint256 amountPaid,
    uint256 tokenExtract
  );

  // Events for collateral operations
  event DepositCollateral(uint256 vaultID, uint256 amount);
  event WithdrawCollateral(uint256 vaultID, uint256 amount);

  // Events for token operations
  event BorrowToken(uint256 vaultID, uint256 amount);
  event PayBackToken(uint256 vaultID, uint256 amount, uint256 closingFee);

  // Lets begin!
  function initialize(
    uint256 minimumCollateralPercentage_,
    address priceSource_,
    string memory name_,
    string memory symbol_,
    address token_
  ) public initializer {
    // Initializations
    __Context_init_unchained();
    __ERC165_init_unchained();
    __ERC721_init_unchained(name_, symbol_);
    __ERC721Enumerable_init_unchained();
    __ReentrancyGuard_init_unchained();
    __AccessControl_init_unchained();
    assert(priceSource_ != address(0));
    assert(minimumCollateralPercentage_ != 0);
    //Initial settings!
    debtCeiling = 10e18; // 10 dollas
    closingFee = 75; // 0.75%
    openingFee = 0; // 0.0%
    tokenPeg = 1e8; // $1
    debtRatio = 2; // 50%
    gainRatio = 11; // /10 so 1.1, or 10%
    // Initially, will deploy later
    stabilityPool = address(0);
    gateway = address(0);
    priceSource = AggregatorV3Interface(priceSource_);

    token = IERC20(token_);
    stablecoin = IStablecoin(msg.sender);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(TREASURY_ROLE, msg.sender);
    _setRoleAdmin(TREASURY_ROLE, TREASURY_ROLE);

    minimumCollateralPercentage = minimumCollateralPercentage_;
  }

  /**
   * @dev Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultID) {
    require(vaultExistence[vaultID], 'Vault does not exist');
    // Either owner of vault or gateway for AVAX.
    require(
      ownerOf(vaultID) == msg.sender || msg.sender == gateway,
      'Vault is not owned by you'
    );
    _;
  }
  /**
   * @dev Only liquidater can do anything with this modifier (if address === 0, then all users can liquidate)
   */
  modifier onlyLiquidater() {
    require(
      stabilityPool == address(0) || msg.sender == stabilityPool,
      'buyRiskyVault disabled for public'
    );
    _;
  }

  /**
   * @dev Only gateway allowed, or user if its not WAVAX.
   */
  modifier onlyUser(address user) {
    require(
      msg.sender == user || msg.sender == gateway,
      'Cannot get paid if not yours'
    );
    _;
  }

  /**
   * @dev allows checking if vault exists or not
   */
  function vaultExists(uint256 vaultID) public view returns (bool) {
    return vaultExistence[vaultID];
  }

  /**
   * @dev changes the Treasury. Can only every be one treasury!
   */
  function changeTreasury(address to) external onlyRole(TREASURY_ROLE) {
    _setupRole(TREASURY_ROLE, to);
    revokeRole(TREASURY_ROLE, msg.sender);
  }

  /**
   * @dev sets the gain ratio
   */
  function setGainRatio(uint256 gainRatio_) external onlyRole(TREASURY_ROLE) {
    gainRatio = gainRatio_;
  }

  /**
   * @dev sets the debt ratio
   */
  function setDebtRatio(uint256 debtRatio_) external onlyRole(TREASURY_ROLE) {
    debtRatio = debtRatio_;
  }

  /**
   * @dev Set the debt ceiling for this vault
   */
  function setDebtCeiling(uint256 debtCeiling_)
    external
    onlyRole(TREASURY_ROLE)
  {
    require(
      debtCeiling <= debtCeiling_,
      'setCeiling: Must be over the amount of current debt ceiling.'
    );
    debtCeiling = debtCeiling_;
  }

  /**
   * @dev Set the price source for this vault
   */
  function setPriceSource(address priceSource_)
    external
    onlyRole(TREASURY_ROLE)
  {
    require(priceSource_ != address(0), 'Price source cannot be zero address');
    priceSource = AggregatorV3Interface(priceSource_);
  }

  /**
   * @dev Set the price source for this vault
   */
  function setTokenPeg(uint256 tokenPeg_) external onlyRole(TREASURY_ROLE) {
    require(tokenPeg_ > 0, 'Peg cannot be zero');
    tokenPeg = tokenPeg_;
  }

  /**
   * @dev Set the stability pool (liquidator) for this vault
   */
  function setStabilityPool(address stabilityPool_)
    external
    onlyRole(TREASURY_ROLE)
  {
    require(
      stabilityPool_ != address(0),
      'Stability pool cannot be zero address'
    );
    stabilityPool = stabilityPool_;
  }

  /**
   * @dev Set the WAVAX gateway for this vault if it needs one
   */
  function setGateway(address gateway_) external onlyRole(TREASURY_ROLE) {
    require(gateway_ != address(0), 'Gateway cannot be zero address');
    gateway = gateway_;
  }

  /**
   * @dev Set the closing fee for this vault
   */
  function setClosingFee(uint256 amount) external onlyRole(TREASURY_ROLE) {
    closingFee = amount;
  }

  /**
   * @dev Set the opening fee for this vault
   */
  function setOpeningFee(uint256 amount) external onlyRole(TREASURY_ROLE) {
    openingFee = amount;
  }

  /**
   * @dev Set the treasury vault for this vault
   */
  function setTreasury(uint256 treasury_) external onlyRole(TREASURY_ROLE) {
    require(vaultExistence[treasury_], 'Vault does not exist');
    treasury = treasury_;
  }

  /**
    @dev returns the base token's address
  */
  function getPriceSource() public view returns (uint256) {
    // And get the latest round data
    (, int256 price, , , ) = priceSource.latestRoundData();
    return uint256(price);
  }

  /**
    @dev returns the base token's address
  */
  function getPricePeg() public view returns (uint256) {
    return tokenPeg;
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
    uint256 debtValue = debt * getPricePeg();
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
    internal
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
    return collateralPercentage >= minimumCollateralPercentage;
  }

  /**
   * @dev Create a vault for interacting with the platform
   *
   * Emits a CreateVault event
   */
  function createVault() external {
    // Increment ID
    _userVaultIds.increment();
    // Assign ID to vault
    uint256 newVaultId = _userVaultIds.current();

    vaultExistence[newVaultId] = true;

    emit CreateVault(newVaultId, msg.sender);
    // mint erc721 vault (vaultId)
    _mint(msg.sender, newVaultId);
  }

  function vaultCounts() external view returns (uint256) {
    return _userVaultIds.current();
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
    virtual
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(vaultDebt[vaultID] == 0, 'Vault as outstanding debt');

    if (vaultCollateral[vaultID] != 0) {
      token.safeTransfer(msg.sender, vaultCollateral[vaultID]);
    }

    _burn(vaultID);

    delete vaultExistence[vaultID];
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
    // burn erc721 (vaultId)
    _burn(vaultID);
    // mint erc721 (vaultId)
    _mint(to, vaultID);

    emit TransferVault(vaultID, msg.sender, to);
  }

  /**
   * @dev ALlows vault owner to deposit ERC20 collateral
   *
   * Emits Deposit Collateral event
   *
   */
  function depositCollateral(uint256 vaultID, uint256 amount)
    external
    onlyVaultOwner(vaultID)
  {
    token.safeTransferFrom(msg.sender, address(this), amount);

    uint256 newCollateral = vaultCollateral[vaultID] + amount;

    assert(newCollateral >= vaultCollateral[vaultID]);

    vaultCollateral[vaultID] = newCollateral;

    emit DepositCollateral(vaultID, amount);
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
  function borrowToken(uint256 vaultID, uint256 amount)
    external
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(amount > 0, 'Must borrow non-zero amount');
    require(
      totalDebt + amount <= debtCeiling,
      'Cannot mint over debt ceiling.'
    );

    uint256 newDebt = vaultDebt[vaultID] + amount;
    assert(newDebt > vaultDebt[vaultID]);

    require(
      isValidCollateral(vaultCollateral[vaultID], newDebt),
      'Borrow would put vault below minimum collateral percentage'
    );

    // Mint stable coin for the user
    _addVaultDebt(vaultID, amount);
    // Should have minter role
    stablecoin.mint(msg.sender, amount);
    emit BorrowToken(vaultID, amount);
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

    if (vaultDebt[vaultID] != 0) {
      require(
        isValidCollateral(newCollateral, vaultDebt[vaultID]),
        'Withdrawal would put vault below minimum collateral percentage'
      );
    }

    vaultCollateral[vaultID] = newCollateral;

    token.safeTransfer(msg.sender, amount);

    emit WithdrawCollateral(vaultID, amount);
  }

  /**
   * @dev Pay back the stablecoin to reduce debt
   *
   * Requirements:
   * - User must have enough balance to repay `amount`
   * - Cannot pay back more than the required debt. `amount` must be less than debt.
   */
  function payBackToken(uint256 vaultID, uint256 amount)
    external
    onlyVaultOwner(vaultID)
    nonReentrant
  {
    require(
      stablecoin.balanceOf(msg.sender) >= amount,
      'Token balance too low'
    );
    require(
      vaultDebt[vaultID] >= amount,
      'Vault debt less than amount to pay back'
    );

    // Closing fee calculation
    uint256 _closingFee = ((amount * closingFee) * getPricePeg()) /
      (getPriceSource() * 10000);

    _subVaultDebt(vaultID, amount);
    _subVaultCollateral(vaultID, _closingFee);
    _addVaultCollateralTreasury(_closingFee);

    // Burns the stablecoin
    stablecoin.burn(msg.sender, amount);

    emit PayBackToken(vaultID, amount, _closingFee);
  }

  /*************
   * Liquidation functions
   ************** */

  /**
   * @dev pays the user
   * Returns the ERC20 token that was liquidated
   */
  function getPaid(address user) external nonReentrant onlyUser(user) {
    require(tokenDebt[user] != 0, 'No liquidations associated with account.');
    uint256 amount = tokenDebt[user];
    // Set first in case nonReentrant fails somehow
    tokenDebt[user] = 0;
    token.safeTransfer(msg.sender, amount);
  }

  /**
   * @dev checks if the vault can be liquidated
   */
  function checkLiquidation(uint256 vaultId_) public view {
    require(vaultExistence[vaultId_], 'Vault must exist');
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
        vaultCollateral[vaultId_],
        vaultDebt[vaultId_]
      );

    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    require(
      collateralPercentage < minimumCollateralPercentage,
      'Vault is not below minimum collateral percentage'
    );
  }

  /**
   * @dev checks cost of liquidating
   */
  function checkCost(uint256 vaultId_) public view returns (uint256) {
    require(vaultExistence[vaultId_], 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      vaultCollateral[vaultId_],
      vaultDebt[vaultId_]
    );

    debtValue = debtValue / tokenPeg;

    return debtValue / debtRatio;
  }

  /**
   * @dev checks how much token gets extract
   */
  function checkExtract(uint256 vaultId_) public view returns (uint256) {
    require(vaultExistence[vaultId_], 'Vault must exist');
    (, uint256 debtValue) = calculateCollateralProperties(
      vaultCollateral[vaultId_],
      vaultDebt[vaultId_]
    );

    uint256 tokenExtract = (debtValue * gainRatio) /
      (10 * getPriceSource() * debtRatio);

    return tokenExtract;
  }

  /**
   * @dev allows liquidator to buy out a risky vault
   *
   * Requirements:
   * - Vault id must exist
   * - Vault must be below minimum collateral percentage
   * - User must have enough of the token to pay vault off
   *
   * Emits BuyRiskyVault event
   */
  function liquidateVault(uint256 vaultID_)
    external
    onlyLiquidater
    nonReentrant
  {
    require(vaultExistence[vaultID_], 'Vault does not exist');
    (
      uint256 collateralValueTimes100,
      uint256 debtValue
    ) = calculateCollateralProperties(
        vaultCollateral[vaultID_],
        vaultDebt[vaultID_]
      );

    uint256 collateralPercentage = collateralValueTimes100 / debtValue;

    require(
      collateralPercentage < minimumCollateralPercentage,
      'Vault is not below minimum collateral percentage'
    );

    uint256 tokenExtract = checkExtract(vaultID_);
    uint256 halfDebt = checkCost(vaultID_);
    require(
      stablecoin.balanceOf(msg.sender) >= halfDebt,
      'Token balance too low to pay off outstanding debt'
    );

    stablecoin.safeTransferFrom(msg.sender, address(this), halfDebt);

    vaultDebt[vaultID_] -= halfDebt;

    uint256 _closingFee = (halfDebt * closingFee * getPricePeg()) /
      (getPriceSource() * 10000);

    vaultCollateral[vaultID_] -= (_closingFee + tokenExtract);
    vaultCollateral[treasury] += _closingFee;

    tokenDebt[msg.sender] += tokenExtract;
    stablecoin.burn(address(this), halfDebt);

    _subFromTotalDebt(halfDebt);

    emit LiquidateVault(
      vaultID_,
      ownerOf(vaultID_),
      msg.sender,
      halfDebt,
      tokenExtract
    );
  }

  /**
   * @dev Adds to the vault collateral
   *
   */
  function _addVaultCollateralTreasury(uint256 amount) internal {
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

  function _subVaultCollateral(uint256 vaultID, uint256 amount) internal {
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
  function _addVaultDebt(uint256 vaultID, uint256 amount) internal {
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
  function _subVaultDebt(uint256 vaultID, uint256 amount) internal {
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

  function _transfer(
    address from,
    address to,
    uint256 tokenId
  ) internal pure override {
    revert('transfer: disabled');
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(
      ERC721Upgradeable,
      ERC721EnumerableUpgradeable,
      AccessControlUpgradeable
    )
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
