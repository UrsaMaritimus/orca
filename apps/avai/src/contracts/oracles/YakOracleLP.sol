// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

import '../interfaces/IYakStrategy.sol';
import '../interfaces/IPair.sol';

contract YakOracleLPBridge is AggregatorV3Interface {
  // Chainlink price source
  AggregatorV3Interface public immutable priceSource1;
  AggregatorV3Interface public immutable priceSource2;

  IPair public immutable underlyingToken;

  // The YRT token
  IYakStrategy public immutable shareToken;

  constructor(
    address priceSource1_,
    address priceSource2_,
    address underlyingToken_,
    address shareToken_
  ) {
    assert(priceSource1_ != address(0));
    assert(priceSource2_ != address(0));
    assert(shareToken_ != address(0));
    assert(underlyingToken_ != address(0));
    priceSource1 = AggregatorV3Interface(priceSource1_);
    priceSource2 = AggregatorV3Interface(priceSource2_);
    underlyingToken = IPair(underlyingToken_);
    shareToken = IYakStrategy(shareToken_); // YRT token
  }

  function sqrt(uint256 x) internal pure returns (uint128) {
    if (x == 0) return 0;
    uint256 xx = x;
    uint256 r = 1;
    if (xx >= 0x100000000000000000000000000000000) {
      xx >>= 128;
      r <<= 64;
    }
    if (xx >= 0x10000000000000000) {
      xx >>= 64;
      r <<= 32;
    }
    if (xx >= 0x100000000) {
      xx >>= 32;
      r <<= 16;
    }
    if (xx >= 0x10000) {
      xx >>= 16;
      r <<= 8;
    }
    if (xx >= 0x100) {
      xx >>= 8;
      r <<= 4;
    }
    if (xx >= 0x10) {
      xx >>= 4;
      r <<= 2;
    }
    if (xx >= 0x8) {
      r <<= 1;
    }
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1;
    r = (r + x / r) >> 1; // Seven iterations should be enough
    uint256 r1 = x / r;
    return uint128(r < r1 ? r : r1);
  }

  function decimals() external pure override returns (uint8) {
    return 8;
  }

  function description() external view override returns (string memory) {
    return
      string(
        abi.encodePacked(priceSource1.description(), priceSource2.description())
      );
  }

  function version() external view override returns (uint256) {
    return priceSource1.version();
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
    return priceSource1.getRoundData(_roundId);
  }

  function calculateLPPrice(int256 answer1, int256 answer2)
    internal
    view
    returns (uint256)
  {
    // get reserves
    (uint256 reserve0, uint256 reserve1, ) = underlyingToken.getReserves();

    // Normalize everything to 18 decimals (useful for usdc, btc)
    uint256 normalizedReserve0 = reserve0 *
      (10**(18 - IERC20Metadata(underlyingToken.token0()).decimals()));
    uint256 normalizedReserve1 = reserve1 *
      (10**(18 - IERC20Metadata(underlyingToken.token1()).decimals()));

    // Fair pricing, based off: https://blog.alphafinance.io/fair-lp-token-pricing/
    uint256 k = sqrt(normalizedReserve0 * normalizedReserve1);
    // Calculate the fair price
    uint256 totalValue = (2 *
      k *
      sqrt(
        uint256(answer1 * answer2) *
          10**(36 - priceSource1.decimals() - priceSource2.decimals())
      )) / underlyingToken.totalSupply();
    return totalValue / 1e10;
  }

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
      int256 answer1,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ) = priceSource1.latestRoundData();
    // Lets do some calcs!
    (, int256 answer2, , , ) = priceSource2.latestRoundData();

    require(answer1 >= 0, 'Chainlink pricefeed 1 returned bad value.');
    require(answer2 >= 0, 'Chainlink pricefeed 2 returned bad value.');
    uint256 totalValue = calculateLPPrice(answer1, answer2);
    uint256 newPrice = (shareToken.getDepositTokensForShares(
      10**underlyingToken.decimals()
    ) * uint256(totalValue)) / 10**underlyingToken.decimals();
    return (roundId, int256(newPrice), startedAt, updatedAt, answeredInRound);
  }
}
