// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

interface IVaultInfo {
  function setDebtCeiling(uint256 _debtCeiling) external;

  function getPriceSource() external view returns (uint256);

  function getPricePeg() external view returns (uint256);
}
