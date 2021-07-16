// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import './Stablecoin.sol';

contract AVAI is Stablecoin {
  constructor(string memory name) Stablecoin(name) {}

  function mint(address account, uint256 amount)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    _mint(account, amount);
  }
}
