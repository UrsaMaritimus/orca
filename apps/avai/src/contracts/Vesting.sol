// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/finance/PaymentSplitter.sol';

contract OrcaTeamVesting is PaymentSplitter {
  constructor(address[] memory payees, uint256[] memory shares_)
    PaymentSplitter(payees, shares_)
  {}
}
