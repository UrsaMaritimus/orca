// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '../Liquidator.sol';

contract AVAXLiquidator is Liquidator {
  constructor(address stablecoin, address vault)
    Liquidator(stablecoin, vault)
  {}

  // No need to override getPaid, already set up for payables
  // Only for ERC20 vaults
}
