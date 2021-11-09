// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../OracleBridge.sol';

contract YakAvaxBTCOracle is OracleBridge {
  constructor(
    address priceSource_,
    address underlyingToken_,
    address shareToken_
  ) OracleBridge(priceSource_, underlyingToken_, shareToken_) {}
}
