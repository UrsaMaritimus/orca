// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import './Stablecoin.sol';

contract AVAI is Stablecoin {
  constructor(string memory name, address vault) Stablecoin(name, vault) {}
}
