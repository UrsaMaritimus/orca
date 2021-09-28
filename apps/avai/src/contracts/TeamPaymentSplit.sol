// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import '@openzeppelin/contracts/access/Ownable.sol';

contract TeamPayment is Ownable {
  using SafeERC20 for IERC20;
  event PayeeAdded(address account, uint256 shares);
  event PaymentReleased(address to, uint256 amount);
  event PaymentReceived(address from, uint256 amount);

  uint256 private _totalShares;
  uint256 private _totalReleased;

  mapping(address => uint256) private _shares;
  mapping(address => uint256) private _released;
  address[] private _payees;

  IERC20 private orca;

  constructor(
    address orca_,
    address[] memory payees,
    uint256[] memory shares_
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

    for (uint256 i = 0; i < payees.length; i++) {
      _addPayee(payees[i], shares_[i]);
    }

    orca = IERC20(orca_);
  }

  /**
   * @dev Getter for the total shares held by payees.
   */
  function totalShares() public view returns (uint256) {
    return _totalShares;
  }

  /**
   * @dev Getter for the total amount of Ether already released.
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
   * @dev Getter for the amount of Ether already released to a payee.
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
   * @dev Add a new payee to the contract.
   * @param account The address of the payee to add.
   * @param shares_ The number of shares owned by the payee.
   */
  function addPayee(address account, uint256 shares_) public onlyOwner {
    _addPayee(account, shares_);
  }

  /**
   * @dev Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the
   * total shares and their previous withdrawals.
   * @param account The account that payment can be released to
   */
  function release(address account) public virtual {
    require(_shares[account] > 0, 'PaymentSplitter: account has no shares');

    uint256 totalReceived = orca.balanceOf(address(this)) + _totalReleased;
    uint256 payment = (totalReceived * _shares[account]) /
      _totalShares -
      _released[account];

    require(payment != 0, 'PaymentSplitter: account is not due payment');

    _released[account] = _released[account] + payment;
    _totalReleased = _totalReleased + payment;

    orca.safeTransfer(account, payment);
    emit PaymentReleased(account, payment);
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
}
