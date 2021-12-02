// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface IStablecoin is IERC20 {
  function burn(address from, uint256 amount) external;

  function mint(address account, uint256 amount) external;
}
