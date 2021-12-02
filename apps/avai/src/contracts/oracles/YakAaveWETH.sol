// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../OracleBridge.sol';

contract YakAvaxETHOracle is OracleBridge {
  constructor(
    address priceSource_,
    address underlyingToken_,
    address shareToken_
  ) OracleBridge(priceSource_, underlyingToken_, shareToken_) {}
}
