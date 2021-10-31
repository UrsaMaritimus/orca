// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

// This contract handles swapping to and from xORCA, join the pod
contract OrcaPod is ERC20 {
  using SafeERC20 for IERC20;

  IERC20 public immutable orca;

  event Enter(address user, uint256 amountIn, uint256 amountOut);
  event Leave(address user, uint256 amountIn, uint256 amountOut);

  // Define the orca token contract
  constructor(address _orca) ERC20('OrcaPod', 'xORCA') {
    assert(_orca != address(0));
    orca = IERC20(_orca);
  }

  /**
   * @notice Helper function to display how much ORCA a users xORCA is worth
   */
  function ratio(uint256 _amount) public view returns (uint256) {
    // Gets the amount of orca locked in the contract
    uint256 totalOrca = orca.balanceOf(address(this));
    // Gets the amount of xorca in existence
    uint256 totalShares = totalSupply();
    return (_amount * totalShares) / totalOrca;
  }

  // Enter the pod. Pay some orcas.
  // Locks orca and mints xORCA
  /**
   * @notice Mints xORCA, either 1 or less per ORCA, depending on deposited amount and number of xORCA
   * @param _amount Amount of orca to deposit
   */
  function enter(uint256 _amount) public {
    // Gets the amount of orca locked in the contract
    uint256 totalOrca = orca.balanceOf(address(this));
    // Gets the amount of xorca in existence
    uint256 totalShares = totalSupply();

    uint256 sendAmount;
    // If no xORCA exists, mint it 1:1 to the amount put in
    if (totalShares == 0 || totalOrca == 0) {
      sendAmount = _amount;
    }
    // Calculate and mint the amount of xorca the orca is worth. The ratio will change overtime, as xorca is burned/minted and orca deposited + gained from revenue / withdrawn.
    else {
      sendAmount = (_amount * totalShares) / totalOrca;
    }

    _mint(msg.sender, sendAmount);
    // Lock the orca in the contract
    orca.safeTransferFrom(msg.sender, address(this), _amount);

    emit Enter(msg.sender, _amount, sendAmount);
  }

  /**
   * @notice Burns xORCA, returns ORCA, either 1 or more per xORCA, depending on deposited amount and number of xORCA/ORCA
   * @param _share Amount of xOrca to redeem
   */
  function leave(uint256 _share) public {
    // Gets the amount of xorca in existence
    uint256 totalShares = totalSupply();
    // Calculates the amount of orca the xorca is worth
    uint256 what = (_share * orca.balanceOf(address(this))) / totalShares;

    orca.safeTransfer(msg.sender, what);
    _burn(msg.sender, _share);

    emit Leave(msg.sender, _share, what);
  }
}
