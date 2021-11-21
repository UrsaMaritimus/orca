// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '../PodLeader.sol';
import '../interfaces/IPair.sol';

contract SnapshotBridgeV2 {
  PodLeader staking;
  PodLeader podLeader;

  IERC20 xOrca;
  IERC20 orca;

  constructor(
    address payable _staking,
    address payable _podleader,
    address _orca,
    address _xorca
  ) {
    staking = PodLeader(_staking);
    podLeader = PodLeader(_podleader);
    orca = IERC20(_orca);
    xOrca = IERC20(_xorca);
  }

  function xOrcaVote(address user) public view returns (uint256) {
    uint256 xOrcaSupply = xOrca.totalSupply();
    uint256 xOrcaOrcaSupply = orca.balanceOf(address(xOrca));
    uint256 ratio = (xOrcaOrcaSupply * 10000) / xOrcaSupply;

    uint256 userBalance = (ratio * xOrca.balanceOf(user)) / 10000;
    return userBalance;
  }

  function xOrcaStakedVote(address user, uint256 pid)
    public
    view
    returns (uint256)
  {
    uint256 xOrcaSupply = xOrca.totalSupply();
    uint256 xOrcaOrcaSupply = orca.balanceOf(address(xOrca));
    uint256 ratio = (xOrcaOrcaSupply * 10000) / xOrcaSupply;

    (uint256 amount, ) = podLeader.userInfo(pid, user);
    uint256 userBalance = (ratio * amount) / 10000;
    return userBalance;
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
