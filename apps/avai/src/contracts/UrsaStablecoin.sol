// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import './Stablecoin.sol';

contract AVAI is Stablecoin {
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

  constructor(string memory name) Stablecoin(name) {}

  function mint(address account, uint256 amount)
    external
    onlyRole(MINTER_ROLE)
  {
    _mint(account, amount);
  }
}
