// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

import './interfaces/IBank.sol';
import './interfaces/IYakStrategy.sol';
import './interfaces/IPair.sol';
import './interfaces/IWAVAX.sol';
import './lib/DexLibrary.sol';

contract OrcaAdder is Initializable, OwnableUpgradeable {
  using SafeERC20 for IERC20;

  IERC20 public pod;
  IERC20 private orca;
  IWAVAX private wavax;
  IERC20 private usdc;

  address private orcaLP;
  address private usdcLP;

  address public seafund;
  address public treasury;
  address public dev;

  uint256 public treasuryAmount;
  uint256 public devAmount;
  uint256 public seafundAmount;
  uint256 public podAmount;

  address[] public banks;
  address[] public yakStrats;
  address[] public lpTokens;
  address[] public tokens;
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
    address _orcaLP,
    address _usdcLP
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
    require(_orcaLP != address(0), 'ORCA LP cannot be zero address');
    require(_usdcLP != address(0), 'USDC LP cannot be zero address');

    pod = IERC20(_pod);
    orca = IERC20(_orca);
    wavax = IWAVAX(_wavax);
    usdc = IERC20(_usdc);

    seafund = _seafund;
    treasury = _treasury;
    dev = _dev;

    devAmount = 500;
    seafundAmount = 1500;
    treasuryAmount = 4000;
    podAmount = 4000;

    orcaLP = _orcaLP;
    usdcLP = _usdcLP;
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
    return banks.length;
  }

  /**
   * @notice Gets the number of yield yak banks (tokens) this account controls
   */
  function getYakCount() public view returns (uint256) {
    return yakStrats.length;
  }

  /**
   * @notice Gets the number of LP tokens this account controls
   */
  function getLPTokens() public view returns (uint256) {
    return lpTokens.length;
  }

  /**
   * @notice Gets the number of tokens this account controls
   */
  function getTokens() public view returns (uint256) {
    return tokens.length;
  }

  /**
   * @notice Adds a bank that this can get fees from
   * @param bank The address of the bank
   */
  function addBank(address bank) public onlyOwner {
    require(bank != address(0), 'Cannot add a bank with zero address');
    banks.push(bank);
  }

  /**
   * @notice Adds a yield yak token, to allow withdrawing
   * @param yak The address of the yak
   */
  function addYakStrat(address yak) public onlyOwner {
    require(yak != address(0), 'Cannot add a yakStrat with zero address');
    yakStrats.push(yak);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param lp The address of the LP token
   */
  function addLPToken(address lp) public onlyOwner {
    require(lp != address(0), 'Cannot add a LP token with zero address');
    lpTokens.push(lp);
  }

  /**
   * @notice Adds a LP token, to allow transfering
   * @param lp The address of the LP token
   */
  function addSwapLP(address token, address lp) public onlyOwner {
    require(token != address(0), 'Cannot add a token with zero address');
    require(lp != address(0), 'Cannot add a LP token with zero address');
    tokens.push(token);
    swapLPs[token] = lp;
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
   * @notice Changes distribution ratio
   * @param _treasuryAmount The treasury amount
   * @param _devAmount The dev amount
   * @param _seafundAmount The seafund amount
   * @param _podAmount The pod amount
   */
  function changeDistributionRatio(
    uint256 _treasuryAmount,
    uint256 _devAmount,
    uint256 _seafundAmount,
    uint256 _podAmount
  ) public onlyOwner {
    require(
      _treasuryAmount + _devAmount + _seafundAmount + _podAmount == 10000,
      'Must add up to 10000'
    );
    treasuryAmount = _treasuryAmount;
    devAmount = _devAmount;
    seafundAmount = _seafundAmount;
    podAmount = _podAmount;
  }

  /**
   * @notice Safe function to ensure we can emergency remove things
   * @param _to The address to send it to
   * @param _token The token to send
   * @param _amount The amount to send
   */
  function transferToken(
    address _to,
    address _token,
    uint256 _amount
  ) public onlyOwner {
    IERC20(_token).safeTransfer(_to, _amount);
  }

  /**
   * @notice Safe function to ensure we can emergency remove things
   * @param _to The address to send it to
   * @param _amount The amount to send
   */
  function transferAvax(address payable _to, uint256 _amount)
    external
    onlyOwner
  {
    (bool sent, ) = _to.call{value: _amount}('');
    require(sent, 'failed to send avax');
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
    IBank(banks[bank]).transferVault(vault, to);
  }

  /**
   * @notice For allocating the revenue to the correct locations.
   */
  function allocate() public onlyEOA {
    // Withdraw collaterals from banks
    for (uint256 i = 0; i < getBankCount(); i++) {
      IBank bank = IBank(banks[i]);
      if (bank.balanceOf(address(this)) > 0) {
        uint256 vault = bank.tokenOfOwnerByIndex(address(this), 0);
        uint256 collateral = bank.vaultCollateral(vault);
        bank.withdrawCollateral(vault, collateral);
      }
    }

    // Withdraw from yield yak
    for (uint256 i = 0; i < getYakCount(); i++) {
      IYakStrategy yakStrat = IYakStrategy(yakStrats[i]);
      uint256 balance = yakStrat.balanceOf(address(this));
      if (balance > 0) {
        yakStrat.withdraw(balance);
      }
    }

    // Convert LPs
    for (uint256 i = 0; i < getLPTokens(); i++) {
      IPair pair = IPair(address(lpTokens[i]));
      if (pair.balanceOf(address(this)) > 0) {
        DexLibrary.removeLiquidity(lpTokens[i]);
      }
    }

    // Convert everything to avax
    for (uint256 i = 0; i < getTokens(); i++) {
      address token = tokens[i];
      IPair pair = IPair(swapLPs[tokens[i]]);
      if (address(pair) != address(0)) {
        uint256 tokenBalance = IERC20(token).balanceOf(address(this));
        if (tokenBalance > 0) {
          DexLibrary.swap(tokenBalance, token, address(wavax), pair);
        }
      }
    }

    // Convert USDC to wavax if we have any
    if (usdc.balanceOf(address(this)) > 0) {
      // Convert wavax to usdc
      DexLibrary.swap(
        usdc.balanceOf(address(this)),
        address(usdc),
        address(wavax),
        IPair(usdcLP)
      );
    }

    // Convert avax to wavax if we have any
    uint256 avaxBalance = address(this).balance;
    wavax.deposit{value: avaxBalance}();

    // Convert correct amount of WAVAX to ORCA
    uint256 wavaxBalance = wavax.balanceOf(address(this));
    uint256 wavaxToPod = (wavaxBalance * podAmount) / 10000;
    uint256 wavaxToUSDC = (wavaxBalance * (10000 - podAmount)) / 10000;

    DexLibrary.swap(wavaxToPod, address(wavax), address(orca), IPair(orcaLP));

    // Convert wavax to usdc
    DexLibrary.swap(wavaxToUSDC, address(wavax), address(usdc), IPair(usdcLP));

    // Send off orca
    orca.safeTransfer(address(pod), orca.balanceOf(address(this)));

    // send off usdc
    uint256 usdcBalance = usdc.balanceOf(address(this));

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

  receive() external payable {}
}
