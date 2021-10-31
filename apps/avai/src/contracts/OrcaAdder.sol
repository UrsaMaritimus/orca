// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

import './interfaces/IBank.sol';
import './interfaces/IYakStrategy.sol';
import './interfaces/IPair.sol';

contract OrcaAdder is Initializable, OwnableUpgradeable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  IERC20 public pod;
  IERC20 private orca;
  IERC20 private wavax;
  IERC20 private usdc;

  EnumerableSet.AddressSet banks;
  EnumerableSet.AddressSet yakStrats;
  EnumerableSet.AddressSet lpTokens;

  /**
   * @notice Initializes the Adder. We are doing proxy here as we might add seperate fees that need to be converted later. Easier than changing treasuries over.
   */
  function initialize(
    address _pod,
    address _orca,
    address _wavax,
    address _usdc
  ) public initializer {
    __Context_init_unchained();
    __Ownable_init_unchained();

    require(_pod != address(0), 'Pod cannot be zero address');
    require(_orca != address(0), 'ORCA cannot be zero address');
    require(_wavax != address(0), 'WAVAX cannot be zero address');
    require(_usdc != address(0), 'USDC cannot be zero address');

    pod = IERC20(_pod);
    orca = IERC20(_orca);
    wavax = IERC20(_wavax);
    usdc = IERC20(_usdc);
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
   * @param lp The address of the LP token
   */
  function addLPToken(address lp) public onlyOwner {
    require(lp != address(0), 'Cannot add a LP token with zero address');
    lpTokens.add(lp);
  }
}
