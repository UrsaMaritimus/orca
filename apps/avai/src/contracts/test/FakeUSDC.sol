// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

contract FakeUSDC is ERC20 {
  uint8 private constant TOKEN_DECIMALS = 6;

  constructor() ERC20('USD Coin', 'USDC') {
    _mint(msg.sender, 1000000000000);
  }

  function decimals() public view virtual override returns (uint8) {
    return TOKEN_DECIMALS;
  }
}
