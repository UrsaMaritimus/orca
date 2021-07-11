// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import './Stablecoin.sol';

contract AVAI is Stablecoin, Ownable {
  constructor(
    address avaxPriceSourceAddress,
    uint256 minimumCollateralPercentage,
    string memory name,
    string memory symbol,
    address vaultAddress
  )
    Stablecoin(
      avaxPriceSourceAddress,
      minimumCollateralPercentage,
      name,
      symbol,
      vaultAddress
    )
  {
    treasury = 0;
  }

  function mint(address account, uint256 amount) external onlyOwner() {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external onlyOwner() {
    _burn(account, amount);
  }

  function changeAvaxPriceSource(address avaxPriceSourceAddress)
    external
    onlyOwner()
  {
    avaxPriceSource = AggregatorV3Interface(avaxPriceSourceAddress);
  }

  function setTokenPeg(uint256 _tokenPeg) external onlyOwner() {
    tokenPeg = _tokenPeg;
  }

  function setStabilityPool(address _pool) external onlyOwner() {
    stabilityPool = _pool;
  }

  function setDebtCeiling(uint256 amount) external onlyOwner() {
    require(
      totalSupply() <= amount,
      'setCeiling: Must be over the amount of outstanding debt.'
    );
    debtCeiling = amount;
  }

  function setClosingFee(uint256 amount) external onlyOwner() {
    closingFee = amount;
  }

  function setOpeningFee(uint256 amount) external onlyOwner() {
    openingFee = amount;
  }

  function setTreasury(uint256 _treasury) external onlyOwner() {
    require(vaultExistence[_treasury], 'Vault does not exist');
    treasury = _treasury;
  }
}
