// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

contract FakeUSDC is ERC20 {
  uint8 private constant TOKEN_DECIMALS = 6;

  constructor() ERC20('USD Coin', 'USDC') {
    _mint(msg.sender, 1000000000000);
  }

  /**
   * Minting for all, for testnet!
   */
  function mint(uint256 amount) external {
    _mint(msg.sender, amount);
  }

  function decimals() public view virtual override returns (uint8) {
    return TOKEN_DECIMALS;
  }
}
