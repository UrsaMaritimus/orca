// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import './interfaces/IBank.sol';
import './interfaces/IYakStrategy.sol';
import './interfaces/IAxialSwap.sol';

contract Looper is Ownable {
  using SafeERC20 for IERC20Metadata;
  IBank public bank;
  IYakStrategy public shareToken;
  IERC20Metadata public underlyingToken;
  IAxialSwap public swap;
  uint8 public avaiIndex = 0;
  uint8 public underlyingIndex = 2;
  uint16 maxLTV = 8500;

  IERC20Metadata public constant avai =
    IERC20Metadata(0x346A59146b9b4a77100D369a3d18E8007A9F46a6);

  /**
   * @dev Only vault owner can do anything with this modifier
   */
  modifier onlyVaultOwner(uint256 vaultID) {
    require(bank.vaultExists(vaultID), 'Vault does not exist');
    require(bank.ownerOf(vaultID) == msg.sender, 'Vault is not owned by you');
    _;
  }

  /**
   * @dev Construction time
   * @param _bank The bank that we will be looping through
   * @param _shareToken The share token through yield yak
   * @param _underlyingToken The underlying token that we put into yield yak
   * @param _swap The axial swap route we are using to swap avai to underlying
   */

  constructor(
    IBank _bank,
    IYakStrategy _shareToken,
    IERC20Metadata _underlyingToken,
    IAxialSwap _swap
  ) {
    assert(address(_bank) != address(0));
    assert(address(_shareToken) != address(0));
    assert(address(_underlyingToken) != address(0));
    assert(address(_swap) != address(0));
    bank = _bank;
    shareToken = _shareToken;
    underlyingToken = _underlyingToken;
    swap = _swap;
  }

  /**
   * @dev Gives permission to the vault and share token to spend gateway's underlying and sharetoken etc
   */
  function authorizeVault() external onlyOwner {
    shareToken.approve(address(bank), type(uint256).max);
    underlyingToken.approve(address(shareToken), type(uint256).max);
  }

  /**
   * @dev deposits WAVAX into the vault, using native AVAX.
   * @param vaultID The vault to deposit underlying into
   * @param amount Amount of underlying to transfer
   * @param loops Amount of loops to do
   * @param maxBorrow borrow % to attempt, in bips
   */
  function deposit(
    uint256 vaultID,
    uint256 amount,
    uint8 loops,
    uint16 maxBorrow
  ) external payable onlyOwner {
    require(loops <= 20, 'No point looping more than 20 times');
    require(maxBorrow <= maxLTV, 'Cannot borrow above max LTV%');

    // Transfer initial tokens
    underlyingToken.safeTransferFrom(msg.sender, address(this), amount);

    // Get price
    uint256 price = bank.getPriceSource();
    uint256 peg = bank.getPricePeg();

    // Loop and deposit
    for (uint8 i; i < loops; i++) {
      // Deposit into yak and deposit into avai
      shareToken.deposit(amount);
      uint256 shareBalance = shareToken.balanceOf(address(this));
      bank.depositCollateral(vaultID, shareBalance);

      // Borrow avai
      uint256 borrowAmount = (shareBalance * price * maxBorrow) / (10000 * peg);
      bank.borrowToken(vaultID, borrowAmount);

      // Swap avai for underlying
      uint256 balanceAvai = avai.balanceOf(address(this));
      swap.swap(
        avaiIndex,
        underlyingIndex,
        balanceAvai,
        swap.calculateSwap(avaiIndex, underlyingIndex, balanceAvai),
        block.timestamp + 120
      );
      amount = underlyingToken.balanceOf(address(this));
    }
  }

  /**
   * @dev withdraws AVAX
   */
  function withdraw(uint256 vaultID, uint256 amount)
    external
    payable
    onlyOwner
  {
    uint256 totalCollateral = bank.vaultCollateral(vaultID);
    require(totalCollateral > 0, 'Cannot withdraw, no collateral');

    uint256 totalDebt = bank.vaultDebt(vaultID);
    bank.withdrawCollateral(vaultID, amount);
    payable(msg.sender).transfer(amount);
  }

  /**
   * @dev withdraws avax to the user upone destroying vault
   */
  function destroyVault(uint256 vaultID) external payable onlyOwner {
    bank.destroyVault(vaultID);
    uint256 balance = underlyingToken.balanceOf(address(this));
    underlyingToken.safeTransfer(msg.sender, balance);
  }
}
