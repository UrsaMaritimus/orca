// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract AVAIVault is ERC721 {
  address admin;

  constructor() ERC721('AVAI Vault', 'AVTV') {
    admin = msg.sender;
  }

  // Can change admin
  function setAdmin(address _admin) public {
    require(admin == msg.sender);
    admin = _admin;
  }

  function _transferFrom() internal pure {
    // Eliminate any transfering of vaults
    revert('transfer: disabled');
  }

  function burn(uint256 tokenId) public {
    // Must be token creator to burn
    require(msg.sender == admin, 'Token: account does not have burn role');
    _burn(tokenId);
  }

  function mint(address to, uint256 tokenId) public {
    // Must be token creator to burn
    require(msg.sender == admin, 'Token: account does not have minter role');
    _mint(to, tokenId);
  }
}
