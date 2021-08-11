// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface IBaseVault is IERC721 {
  function transferVault(uint256 vaultID, address to) external;

  function vaultExists(uint256 vaultID) external view returns (bool);

  function depositCollateral(uint256 vaultID, uint256 amount) external;

  function withdrawCollateral(uint256 vaultID, uint256 amount) external;

  function initialize(
    uint256 minimumCollateralPercentage_,
    address priceSource_,
    string memory name_,
    string memory symbol_,
    address token_,
    address owner
  ) external;
}
