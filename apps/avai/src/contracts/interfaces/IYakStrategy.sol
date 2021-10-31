// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';

interface IYakStrategy is IERC20Metadata {
  function getSharesForDepositTokens(uint256 amount)
    external
    view
    returns (uint256);

  function getDepositTokensForShares(uint256 amount)
    external
    view
    returns (uint256);

  function totalDeposits() external view returns (uint256);

  function estimateReinvestReward() external view returns (uint256);

  function checkReward() external view returns (uint256);

  function estimateDeployedBalance() external view returns (uint256);

  function withdraw(uint256 amount) external;
}
