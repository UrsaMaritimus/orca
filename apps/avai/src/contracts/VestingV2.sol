// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

/**
 * @title ERC20VestingWallet
 * @dev This contract handles the vesting of ERC20 tokens for a given beneficiary. Custody of multiple tokens can be
 * given to this contract, which will release the token to the beneficiary following a given vesting schedule. The
 * vesting schedule is customizable through the {vestedAmount} function.
 *
 * Any token transferred to this contract will follow the vesting schedule as if they were locked from the beginning.
 * Consequently, if the vesting has already started, any amount of tokens sent to this contract will (at least partly)
 * be immediately releasable.
 */
contract VestingWallet is Ownable {
  using SafeERC20 for IERC20;
  event TokensReleased(uint256 amount, address to);
  event PaymentReceived(address from, uint256 amount);
  event BenefeciaryAdded(address account);
  event Revoked();
  uint256 private _totalReleased;
  address private immutable _beneficiary;
  uint256 private immutable _start;
  uint256 private immutable _duration;

  IERC20 private orca;
  bool private _revocable;
  bool private revoked;

  /**
   * @dev Set the beneficiary, start timestamp and vesting duration of the vesting wallet.
   */
  constructor(
    address orca_,
    address beneficiaryAddress,
    uint256 startTimestamp,
    uint256 durationSeconds,
    bool revocable
  ) {
    require(
      beneficiaryAddress != address(0),
      'ERC20VestingWallet: beneficiary is zero address'
    );

    require(
      orca_ != address(0),
      'ERC20VestingWallet: can not have orca token as zero address'
    );

    orca = IERC20(orca_);
    _beneficiary = beneficiaryAddress;
    _start = startTimestamp;
    _duration = durationSeconds;
    _revocable = revocable;

    emit BenefeciaryAdded(beneficiaryAddress);
  }

  /**
   * @dev The ORCA received will be logged with {PaymentReceived} events.
   */
  function receiveToken(uint256 amount) external onlyOwner {
    orca.safeTransferFrom(msg.sender, address(this), amount);
    emit PaymentReceived(_msgSender(), amount);
  }

  /**
   * @dev Getter for the beneficiary address.
   */
  function beneficiary() public view virtual returns (address) {
    return _beneficiary;
  }

  /**
   * @dev Getter for the start timestamp.
   */
  function start() public view virtual returns (uint256) {
    return _start;
  }

  /**
   * @dev Getter for the vesting duration.
   */
  function duration() public view virtual returns (uint256) {
    return _duration;
  }

  /**
   * @dev Getter for the total amount of Orca already released.
   */
  function totalReleased() public view returns (uint256) {
    return _totalReleased;
  }

  /**
   * @dev Release the tokens that have already vested.
   *
   * Emits a {TokensReleased} event.
   */
  function release() public virtual {
    uint256 releasable = vestedAmount(block.timestamp) - totalReleased();
    _totalReleased += releasable;
    emit TokensReleased(releasable, beneficiary());
    orca.safeTransfer(beneficiary(), releasable);
  }

  /**
   * @notice Allows the owner to revoke the vesting. Tokens already vested
   * remain in the contract, the rest are returned to the owner.
   */
  function revoke() public onlyOwner {
    require(_revocable, 'Cannot be revoked');

    uint256 balance = orca.balanceOf(address(this));

    uint256 unreleased = vestedAmount(block.timestamp) - totalReleased();

    uint256 refund = balance - unreleased;
    // Send to payment splitter
    release();
    orca.safeTransfer(owner(), refund);
    revoked = true;
    emit Revoked();
  }

  /**
   * @dev Calculates the amount that has already vested. Default implementation is a linear vesting curve.
   */
  function vestedAmount(uint256 timestamp)
    public
    view
    virtual
    returns (uint256)
  {
    if (timestamp < start()) {
      return 0;
    } else if (timestamp >= start() + duration()) {
      return _historicalBalance();
    } else {
      return (_historicalBalance() * (timestamp - start())) / duration();
    }
  }

  /**
   * @dev Calculates the historical balance (current balance + already released balance).
   */
  function _historicalBalance() internal view virtual returns (uint256) {
    return orca.balanceOf(address(this)) + totalReleased();
  }
}
