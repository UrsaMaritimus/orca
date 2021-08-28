// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import './interfaces/IStablecoin.sol';

contract USDCExchange is
  Initializable,
  ReentrancyGuardUpgradeable,
  OwnableUpgradeable
{
  using SafeERC20 for IERC20;
  using SafeERC20 for IStablecoin;

  IERC20 public usdc;
  IStablecoin public avai;

  uint256 public usdcRate;
  uint256 public avaiRate;
  address public treasury;

  function initialize(address usdc_, address avai_) public initializer {
    __Context_init_unchained();
    __Ownable_init_unchained();
    __ReentrancyGuard_init_unchained();

    usdc = IERC20(usdc_);
    avai = IStablecoin(avai_);
    avaiRate = 9925;
    usdcRate = 10075;
    treasury = msg.sender;
  }

  /**
   * @dev Transfers ownership (and treasury) to new treasury address
   */
  function changeTreasury(address newTreasury) public onlyOwner {
    transferOwnership(newTreasury);
    treasury = newTreasury;
  }

  /**
   * @dev Set the rate that USDC is traded for AVAI
   */
  function setUSDCRate(uint256 _rate) public onlyOwner {
    usdcRate = _rate;
  }

  /**
   * @dev Set the rate that AVAI is traded for USDC
   */
  function setAVAIRate(uint256 _rate) public onlyOwner {
    avaiRate = _rate;
  }

  /**
   * @dev Returns the current supply of USDC in the contract.
   * @dev AVAI is minted as it goes.
   */
  function usdReserves() public view returns (uint256) {
    return usdc.balanceOf(address(this));
  }

  /**
   * @dev will mint 1 AVAI for 1.0075 USDC
   */
  function mint(uint256 amount) public nonReentrant {
    require(amount != 0, 'Cannot mint 0 AVAI');

    // This is because USDC has 6 decimal points, and avai has 18. USDC has 4. 18-6+4=16
    uint256 fee = amount - (amount * 1e4) / usdcRate;
    uint256 amountToSend = (amount * 1e16) / usdcRate;
    // Transfer USDC to contract
    usdc.safeTransferFrom(msg.sender, address(this), amount);

    // Transfer USDC fee to treasury
    usdc.safeTransfer(treasury, fee);
    // Transfer miMatic to sender
    avai.mint(msg.sender, amountToSend);
  }

  /**
   * @dev will redeem 1 AVAI for 0.9925 USDC
   */
  function redeem(uint256 amount) public nonReentrant {
    require(amount != 0, 'Cannot redeem 0 USDC');
    require(usdc.balanceOf(address(this)) != 0, 'Not enough USDC in reserves');
    require(
      usdc.balanceOf(address(this)) >= amount / 1e12,
      'Not enough USDC in reserves'
    );
    // This is because USDC has 6 decimal points, and avai has 18. 18-6+4=16
    uint256 amountToSend = (amount * avaiRate) / (1e16);
    uint256 fee = amount / 1e12 - amountToSend;

    // Tranfer tokens from sender to this contract
    avai.safeTransferFrom(msg.sender, address(this), amount);
    // Burn excess, keep fee
    avai.burn(address(this), amount);
    // Transfer amount minus fees to sender
    usdc.safeTransfer(msg.sender, amountToSend);
    // Transfer USDC fee to treasury
    usdc.safeTransfer(treasury, fee);
  }
}
