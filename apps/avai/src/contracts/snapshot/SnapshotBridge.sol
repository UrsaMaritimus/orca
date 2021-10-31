// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '../PodLeader.sol';
import '../interfaces/IPair.sol';

contract SnapshotBridge {
  PodLeader staking;
  PodLeader podLeader;
  IERC20 orca;

  constructor(
    address payable _staking,
    address payable _podleader,
    address _orca
  ) {
    staking = PodLeader(_staking);
    podLeader = PodLeader(_podleader);
    orca = IERC20(_orca);
  }

  function stakingPoolVote(uint256 pid, address user)
    public
    view
    returns (uint256)
  {
    (uint256 amount, ) = staking.userInfo(pid, user);
    return amount;
  }

  function podLeaderVote(uint256 pid, address user)
    public
    view
    returns (uint256)
  {
    (IERC20 token, , , , , ) = podLeader.poolInfo(pid);
    (uint256 amount, ) = podLeader.userInfo(pid, user);

    IPair pool = IPair(address(token));
    address token0 = pool.token0();
    uint256 totalSupply = pool.totalSupply();
    uint256 decimals = pool.decimals();

    (uint256 reserves0, uint256 reserves1, ) = pool.getReserves();
    require(totalSupply > 0, 'Cannot divide by zero');
    if (address(orca) == token0) {
      uint256 tokensPerLP = (reserves0 * 10**decimals) / totalSupply;
      uint256 tokenCount = (amount * tokensPerLP) / (10**decimals);
      return tokenCount;
    } else {
      uint256 tokensPerLP = (reserves1 * 10**decimals) / totalSupply;
      uint256 tokenCount = (amount * tokensPerLP) / (10**decimals);
      return tokenCount;
    }
  }
}
