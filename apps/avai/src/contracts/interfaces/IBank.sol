// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';

interface IBank is IERC721, IERC721Enumerable {
  function vaultCollateral(uint256 vaultID) external view returns (uint256);

  function vaultDebt(uint256 vaultID) external view returns (uint256);

  function transferVault(uint256 vaultID, address to) external;

  function vaultExists(uint256 vaultID) external view returns (bool);

  function depositCollateral(uint256 vaultID, uint256 amount) external;

  function borrowToken(uint256 vaultID, uint256 amount) external;

  function payBackToken(uint256 vaultID, uint256 amount) external;

  function withdrawCollateral(uint256 vaultID, uint256 amount) external;

  function destroyVault(uint256 vaultID) external;

  function getPaid(address user) external;

  function getPriceSource() external view returns (uint256);

  function getPricePeg() external view returns (uint256);

  function changeTreasury(address to) external;

  function setGainRatio(uint256 gainRatio_) external;

  function setDebtRatio(uint256 debtRatio_) external;

  function setDebtCeiling(uint256 debtCeiling_) external;

  function setPriceSource(address priceSource_) external;

  function setTokenPeg(uint256 tokenPeg_) external;

  function setStabilityPool(address stabilityPool_) external;

  function setGateway(address gateway_) external;

  function setClosingFee(uint256 amount) external;

  function setOpeningFee(uint256 amount) external;

  function setTreasury(uint256 treasury_) external;

  function setMinimumDebt(uint256 minimumDebt_) external;

  function setMintingPaused(bool paused_) external;

  function setMinimumCollateralPercentage(uint256 mcp_) external;

  function initialize(
    uint256 minimumCollateralPercentage_,
    address priceSource_,
    string memory name_,
    string memory symbol_,
    address token_,
    address owner
  ) external;
}
