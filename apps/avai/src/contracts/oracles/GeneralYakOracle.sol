// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../OracleBridge.sol';

contract YakOracle is OracleBridge {
  constructor(
    address priceSource_,
    address underlyingToken_,
    address shareToken_
  ) OracleBridge(priceSource_, underlyingToken_, shareToken_) {}

  // The one we edit for compounder!
  function latestRoundData()
    external
    view
    virtual
    override
    returns (
      uint80,
      int256,
      uint256,
      uint256,
      uint80
    )
  {
    // Lets do some calcs!
    (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ) = priceSource.latestRoundData();

    require(answer >= 0, 'Chainlink pricefeed returned bad value.');
    // Return price of 1 YRT
    uint256 newPrice = ((shareToken.getDepositTokensForShares(10**18) *
      uint256(answer)) / 10**underlyingToken.decimals());

    return (roundId, int256(newPrice), startedAt, updatedAt, answeredInRound);
  }
}
