// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PriceSource {
  int256 internal immutable price;

  constructor(int256 _price) {
    price = _price;
  }

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    )
  {
    roundId = 1;
    answer = price;
    startedAt = 1;
    updatedAt = 2;
    answeredInRound = 98129381;
  }
}
