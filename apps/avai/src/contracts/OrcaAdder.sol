// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

import './interfaces/IBank.sol';
import './interfaces/IYakStrategy.sol';
import './interfaces/IPair.sol';
import './lib/DexLibrary.sol';

contract OrcaAdder is Initializable, OwnableUpgradeable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  IERC20 public pod;
  IERC20 private orca;
  IERC20 private wavax;
  IERC20 private usdc;

  address public seafund;
  address public treasury;
  address public dev;

  uint256 treasuryAmount;
  uint256 devAmount;
  uint256 seafundAmount;
  uint256 podAmount;

  EnumerableSet.AddressSet banks;
  EnumerableSet.AddressSet yakStrats;
  EnumerableSet.AddressSet lpTokens;
  EnumerableSet.AddressSet tokens;
  mapping(address => address) swapLPs;

  /**
   * @notice Initializes the Adder. We are doing proxy here as we might add seperate fees that need to be converted later. Easier than changing treasuries over.
   */
  function initialize(
    address _pod,
    address _orca,
    address _wavax,
    address _usdc,
    address _seafund,
    address _treasury,
    address _dev,
    uint256 _treasuryAmount,
    uint256 _devAmount,
    uint256 _seafundAmount,
    uint256 _podAmount
  ) public initializer {
    __Context_init_unchained();
    __Ownable_init_unchained();

    require(_pod != address(0), 'Pod cannot be zero address');
    require(_orca != address(0), 'ORCA cannot be zero address');
    require(_wavax != address(0), 'WAVAX cannot be zero address');
    require(_usdc != address(0), 'USDC cannot be zero address');
    require(_seafund != address(0), 'Seafund cannot be zero address');
    require(_treasury != address(0), 'Treasury cannot be zero address');
    require(_dev != address(0), 'Dev cannot be zero address');
    require(
      _treasuryAmount + _devAmount + _seafundAmount + _podAmount == 10000,
      'Must add up to 100%'
    );

    pod = IERC20(_pod);
    orca = IERC20(_orca);
    wavax = IERC20(_wavax);
    usdc = IERC20(_usdc);

    seafund = _seafund;
    treasury = _treasury;
    dev = _dev;

    devAmount = _devAmount;
    seafundAmount = _seafundAmount;
    treasuryAmount = _treasuryAmount;
    podAmount = _podAmount;
  }

  modifier onlyEOA() {
    // Try to make flash-loan exploit harder to do by only allowing externally owned addresses.
    require(msg.sender == tx.origin, 'OrcaAdder: must use EOA');
    _;
  }

  /**
   * @notice Gets the numbers of banks this account controls
   */
  function getBankCount() public view returns (uint256) {
    return banks.length();
  }

  /**
   * @notice Gets the number of yield yak banks (tokens) this account controls
   */
  function getYakCount() public view returns (uint256) {
    return yakStrats.length();
  }

  /**
   * @notice Gets the number of LP tokens this account controls
   */
  function getLPTokens() public view returns (uint256) {
    return lpTokens.length();
  }

  /**
   * @notice Gets the number of tokens this account controls
   */
  function getTokens() public view returns (uint256) {
    return tokens.length();
  }

  /**
   * @notice Adds a bank that this can get fees from
   * @param bank The address of the bank
   */
  function addBank(address bank) public onlyOwner {
    require(bank != address(0), 'Cannot add a bank with zero address');
    banks.add(bank);
  }

  /**
   * @notice Adds a yield yak token, to allow withdrawing
   * @param yak The address of the yak
   */
  function addYakStrat(address yak) public onlyOwner {
    require(yak != address(0), 'Cannot add a yakStrat with zero address');
    yakStrats.add(yak);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param token The address of the token
   */
  function addToken(address token) public onlyOwner {
    require(token != address(0), 'Cannot add a token with zero address');
    tokens.add(token);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param lp The address of the LP token
   */
  function addLPToken(address lp) public onlyOwner {
    require(lp != address(0), 'Cannot add a LP token with zero address');
    lpTokens.add(lp);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param lp The address of the LP token
   */
  function addSwapLP(address token, address lp) public onlyOwner {
    require(token != address(0), 'Cannot add a token with zero address');
    require(lp != address(0), 'Cannot add a LP token with zero address');
    lpTokens.add(lp);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param _seafund The address of the LP token
   */
  function changeSeafund(address _seafund) public onlyOwner {
    require(_seafund != address(0), 'Seafund cannot be zero address');
    seafund = _seafund;
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param _dev The address of the LP token
   */
  function changeDev(address _dev) public onlyOwner {
    require(_dev != address(0), 'Dev cannot be zero address');
    dev = _dev;
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param _treasury The address of the LP token
   */
  function changeTreasury(address _treasury) public onlyOwner {
    require(_treasury != address(0), 'Treasury cannot be zero address');
    treasury = _treasury;
  }

  /**
   * @notice for transfering treasury bank vault. Only use if changing contracts.
   * @param bank The bank id
   * @param vault the vault id
   * @param to who you're transfering it to
   */
  function transferBankVault(
    uint256 bank,
    uint256 vault,
    address to
  ) public onlyOwner {
    require(bank < getBankCount(), 'Bank does not exist');
    require(to != address(0), 'Cannot transfer to zero address');
    IBank(banks.at(bank)).transferVault(vault, to);
  }

  /**
   * @notice For allocating the revenue to the correct locations.
   */
  function allocate() public onlyEOA {
    // Withdraw collaterals from banks
    for (uint256 i = 0; i < getBankCount(); i++) {
      IBank bank = IBank(banks.at(i));
      uint256 vault = bank.tokenOfOwnerByIndex(address(this), 0);
      uint256 collateral = bank.vaultCollateral(vault);
      bank.withdrawCollateral(vault, collateral);
    }

    // Withdraw from yield yak
    for (uint256 i = 0; i < getYakCount(); i++) {
      IYakStrategy yakStrat = IYakStrategy(yakStrats.at(i));
      uint256 balance = yakStrat.balanceOf(address(this));
      yakStrat.withdraw(balance);
    }

    // Convert LPs
    for (uint256 i = 0; i < getLPTokens(); i++) {
      DexLibrary.removeLiquidity(lpTokens.at(i));
    }

    // Convert everything to avax
    for (uint256 i = 0; i < getTokens(); i++) {
      address token = tokens.at(i);
      IPair pair = IPair(swapLPs[tokens.at(i)]);
      require(address(pair) != address(0), 'swap LP does not exist');

      DexLibrary.swap(
        IERC20(token).balanceOf(address(this)),
        token,
        address(wavax),
        IPair(swapLPs[tokens.at(i)])
      );
    }

    // Convert correct amount of WAVAX to ORCA
    uint256 wavaxBalance = wavax.balanceOf(address(this));
    uint256 wavaxToPod = (wavaxBalance * podAmount) / 10000;
    uint256 wavaxToUSDC = (wavaxBalance * (10000 - podAmount)) / 10000;

    DexLibrary.swap(
      wavaxToPod,
      address(wavax),
      address(orca),
      IPair(address(orca))
    );

    // Convert wavax to usdc
    DexLibrary.swap(
      wavaxToUSDC,
      address(wavax),
      address(usdc),
      IPair(address(wavax))
    );

    // Send off orca
    orca.safeTransfer(address(pod), orca.balanceOf(address(this)));

    // send off usdc
    uint256 usdcBalance = usdc.balanceOf(address(this));

    // Seafund
    usdc.safeTransfer(
      seafund,
      (usdcBalance * seafundAmount) / (10000 - podAmount)
    );

    // Seafund
    usdc.safeTransfer(
      seafund,
      (usdcBalance * seafundAmount) / (10000 - podAmount)
    );

    // Treasury
    usdc.safeTransfer(
      treasury,
      (usdcBalance * treasuryAmount) / (10000 - podAmount)
    );

    // dev
    usdc.safeTransfer(dev, usdc.balanceOf(address(this)));

    // DONE!
  }
}
