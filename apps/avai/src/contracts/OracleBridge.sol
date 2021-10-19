// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract OracleBridge is AggregatorV3Interface {
  // Chainlink price source
  AggregatorV3Interface public immutable priceSource;
  IERC20Metadata public immutable underlyingToken;
  IERC20Metadata public immutable shareToken;

  constructor(
    address priceSource_,
    address underlyingToken_,
    address shareToken_
  ) {
    assert(priceSource_ != address(0));
    assert(underlyingToken_ != address(0));
    assert(shareToken_ != address(0));
    priceSource = AggregatorV3Interface(priceSource_);
    underlyingToken = IERC20Metadata(underlyingToken_);
    shareToken = IERC20Metadata(shareToken_);
  }

  function decimals() external view override returns (uint8) {
    return priceSource.decimals();
  }

  function description() external view override returns (string memory) {
    return priceSource.description();
  }

  function version() external view override returns (uint256) {
    return priceSource.version();
  }

  function getRoundData(uint80 _roundId)
    external
    view
    override
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    )
  {
    return priceSource.getRoundData(_roundId);
  }

  // The one we edit for compounder!
  function latestRoundData()
    external
    view
    override
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    )
  {}
}