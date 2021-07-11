// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

interface IMyVault {
  function burn(uint256 tokenId) external;

  function mint(address to, uint256 tokenId) external;
}
