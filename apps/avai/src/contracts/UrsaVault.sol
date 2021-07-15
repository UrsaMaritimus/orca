// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import './interfaces/IUrsaVault.sol';
import './Vault.sol';

contract AvaxAVAIVault is ERC721, Vault, IUrsaVault {
  using Counters for Counters.Counter;
  Counters.Counter private _userVaultIds;

  address admin;

  constructor() Vault('AVAI Vault', 'AVTV') {
    admin = msg.sender;
  }

  function setAdmin(address _admin) public {
    require(admin == msg.sender);
    admin = _admin;
  }

  // TokenId is the same as VaultId
  function burn(uint256 tokenId) public override onlyOwner() {
    require(msg.sender == admin, 'Token: account does not have burn role');
    _destroyVault(tokenId);
    _burn(tokenId);
  }

  // Custom Mint Function
  function mint(address to, uint256 vaultType)
    public
    override
    returns (uint256)
  {
    require(msg.sender == admin, 'Token: account does not have burn role');
    // Increment ID
    _userVaultIds.increment();

    // Assign ID to vault and to token URI
    uint256 newVaultId = _userVaultIds.current();
    _mint(to, newVaultId);
    _createVault(newVaultId, to, vaultType);
    return (newVaultId);
  }

  // Custom transfer function
  function transfer(address to, uint256 tokenId) external override onlyOwner() {
    require(msg.sender == admin, 'Token: account does not have burn role');
    _transferVault(tokenId, to);
    _burn(tokenId);
    _mint(to, tokenId);
  }

  // Returns the total number of vaults
  function totalVaults() external view override returns (uint256) {
    return _userVaultIds.current();
  }

  // Eliminate any transfering of vaults
  function _transferFrom() internal pure {
    revert('transfer: disabled');
  }
}
