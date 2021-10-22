// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../SingleStaking.sol';

contract StormSingleStaking is SingleStaking {
  constructor(
    IERC20 _rewardToken,
    uint256 _startTimestamp,
    uint256 _rewardsPerSecond
  ) SingleStaking(_rewardToken, _startTimestamp, _rewardsPerSecond) {}
}
