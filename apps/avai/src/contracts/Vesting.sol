// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract OrcaTeamVesting is Ownable {
  using SafeERC20 for IERC20;

  event PayeeAdded(address account, uint256 shares);
  event PaymentReleased(address to, uint256 amount);
  event PaymentReceived(address from, uint256 amount);
  event Revoked();

  uint256 private _totalShares;
  uint256 private _totalReleased;

  mapping(address => uint256) private _shares;
  mapping(address => uint256) private _released;
  address[] private _payees;

  uint256 private _start;
  uint256 private _duration;
  bool private _revocable;

  IERC20 private orca;

  constructor(
    address orca_,
    address[] memory payees,
    uint256[] memory shares_,
    uint256 start_,
    uint256 duration_,
    bool revocable
  ) {
    require(
      payees.length == shares_.length,
      'PaymentSplitter: payees and shares length mismatch'
    );
    require(payees.length > 0, 'PaymentSplitter: no payees');
    require(
      orca_ != address(0),
      'PaymentSplitter: can not have orca token as zero address'
    );

    orca = IERC20(orca_);

    for (uint256 i = 0; i < payees.length; i++) {
      _addPayee(payees[i], shares_[i]);
    }

    _revocable = revocable;
    _duration = duration_;
    _start = start_;
  }

  /**
   * @dev The ORCA received will be logged with {PaymentReceived} events.
   */
  function receiveToken(uint256 amount) external onlyOwner {
    orca.safeTransferFrom(msg.sender, address(this), amount);
    emit PaymentReceived(_msgSender(), amount);
  }

  /**
   * @dev Getter for the total shares held by payees.
   */
  function totalShares() public view returns (uint256) {
    return _totalShares;
  }

  /**
   * @dev Getter for the total amount of Orca already released.
   */
  function totalReleased() public view returns (uint256) {
    return _totalReleased;
  }

  /**
   * @dev Getter for the amount of shares held by an account.
   */
  function shares(address account) public view returns (uint256) {
    return _shares[account];
  }

  /**
   * @dev Getter for the amount of Orca already released to a payee.
   */
  function released(address account) public view returns (uint256) {
    return _released[account];
  }

  /**
   * @dev Getter for the address of the payee number `index`.
   */
  function payee(uint256 index) public view returns (address) {
    return _payees[index];
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
   * @dev Triggers a transfer to `account` of the amount of Orca they are owed, according to their percentage of the
   * total shares and their previous withdrawals.
   */
  function release(address account) public {
    require(_shares[account] > 0, 'Account has no shares');

    uint256 releasable = vestedAmount(account, block.timestamp) -
      released(account);
    require(releasable != 0, 'Account is not due payment');

    _released[account] += releasable;
    _totalReleased = _totalReleased + releasable;

    orca.safeTransfer(account, releasable);
    emit PaymentReleased(account, releasable);
  }

  /**
   * @dev Calculates the amount that has already vested. Default implementation is a linear vesting curve.
   */
  function vestedAmount(address account, uint256 timestamp)
    public
    view
    virtual
    returns (uint256)
  {
    if (timestamp < start()) {
      return 0;
    } else if (timestamp >= start() + duration()) {
      return _historicalBalance(account);
    } else {
      return (_historicalBalance(account) * (timestamp - start())) / duration();
    }
  }

  /**
   * @notice Allows the owner to revoke the vesting. Tokens already vested
   * remain in the contract, the rest are returned to the owner.
   */
  function revoke() public onlyOwner {
    require(_revocable, 'Cannot be revoked');

    uint256 balance = orca.balanceOf(address(this));

    uint256 unreleased = 0;
    for (uint256 i; i < _payees.length; i++) {
      unreleased +=
        vestedAmount(_payees[i], block.timestamp) -
        released(_payees[i]);
    }
    uint256 refund = balance - unreleased;

    orca.safeTransfer(owner(), refund);

    emit Revoked();
  }

  /**
   * @dev Add a new payee to the contract.
   * @param account The address of the payee to add.
   * @param shares_ The number of shares owned by the payee.
   */
  function _addPayee(address account, uint256 shares_) private {
    require(
      account != address(0),
      'PaymentSplitter: account is the zero address'
    );
    require(shares_ > 0, 'PaymentSplitter: shares are 0');
    require(
      _shares[account] == 0,
      'PaymentSplitter: account already has shares'
    );

    _payees.push(account);
    _shares[account] = shares_;
    _totalShares = _totalShares + shares_;
    emit PayeeAdded(account, shares_);
  }

  /**
   * @dev Calculates the historical balance (current balance + already released balance).
   */
  function _historicalBalance(address account)
    internal
    view
    virtual
    returns (uint256)
  {
    return
      ((orca.balanceOf(address(this)) + totalReleased()) * _shares[account]) /
      _totalShares;
  }
}
