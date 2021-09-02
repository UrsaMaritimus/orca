export default {
  '43113': {
    fuji: {
      name: 'fuji',
      chainId: '43113',
      contracts: {
        AVAI: {
          address: '0x4995da5DF5AA38e18206155f6F4178Af2158B6C4',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
              ],
              name: 'Upgraded',
              type: 'event',
            },
            {
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [],
              name: 'admin',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'implementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeTo',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes',
                },
              ],
              name: 'upgradeToAndCall',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
              ],
              name: 'CreateVaultType',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'Paused',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'previousAdminRole',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'newAdminRole',
                  type: 'bytes32',
                },
              ],
              name: 'RoleAdminChanged',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleGranted',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleRevoked',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'Unpaused',
              type: 'event',
            },
            {
              inputs: [],
              name: 'BURNER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'DEFAULT_ADMIN_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'DOMAIN_SEPARATOR',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'MINTER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'PAUSER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage_',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'name_',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'symbol_',
                  type: 'string',
                },
                {
                  internalType: 'address',
                  name: 'token_',
                  type: 'address',
                },
              ],
              name: 'addBank',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
              ],
              name: 'allowance',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'approve',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'balanceOf',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'banks',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'burn',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'changeTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'decimals',
              outputs: [
                {
                  internalType: 'uint8',
                  name: '',
                  type: 'uint8',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'subtractedValue',
                  type: 'uint256',
                },
              ],
              name: 'decreaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
              ],
              name: 'getRoleAdmin',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'grantRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'hasRole',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'addedValue',
                  type: 'uint256',
                },
              ],
              name: 'increaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address',
                  name: 'vault_',
                  type: 'address',
                },
              ],
              name: 'initialize',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'mint',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'name',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
              ],
              name: 'nonces',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'pause',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'paused',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'deadline',
                  type: 'uint256',
                },
                {
                  internalType: 'uint8',
                  name: 'v',
                  type: 'uint8',
                },
                {
                  internalType: 'bytes32',
                  name: 'r',
                  type: 'bytes32',
                },
                {
                  internalType: 'bytes32',
                  name: 's',
                  type: 'bytes32',
                },
              ],
              name: 'permit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'renounceRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'revokeRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setClosingFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'debtCeiling_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtCeiling',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'debtRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'gainRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setGainRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'gateway_',
                  type: 'address',
                },
              ],
              name: 'setGateway',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setOpeningFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
              ],
              name: 'setPriceSource',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'stabilityPool_',
                  type: 'address',
                },
              ],
              name: 'setStabilityPool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenPeg_',
                  type: 'uint256',
                },
              ],
              name: 'setTokenPeg',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'treasury_',
                  type: 'uint256',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes4',
                  name: 'interfaceId',
                  type: 'bytes4',
                },
              ],
              name: 'supportsInterface',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'symbol',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'totalSupply',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transfer',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'unpause',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeToNewBank',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'vaultCount',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'initialLogic',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'initialAdmin',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: '_data',
                  type: 'bytes',
                },
              ],
              stateMutability: 'payable',
              type: 'constructor',
            },
          ],
        },
        AVAI_Implementation: {
          address: '0x4Ab721a7a730aeB2A24FecEb0A2eF6641183a2ea',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
              ],
              name: 'CreateVaultType',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'Paused',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'previousAdminRole',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'newAdminRole',
                  type: 'bytes32',
                },
              ],
              name: 'RoleAdminChanged',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleGranted',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleRevoked',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'Unpaused',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'childImplementation',
                  type: 'address',
                },
              ],
              name: 'Upgraded',
              type: 'event',
            },
            {
              inputs: [],
              name: 'BURNER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'DEFAULT_ADMIN_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'DOMAIN_SEPARATOR',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'MINTER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'PAUSER_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage_',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'name_',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'symbol_',
                  type: 'string',
                },
                {
                  internalType: 'address',
                  name: 'token_',
                  type: 'address',
                },
              ],
              name: 'addBank',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
              ],
              name: 'allowance',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'approve',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'balanceOf',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'banks',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'burn',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'changeTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'decimals',
              outputs: [
                {
                  internalType: 'uint8',
                  name: '',
                  type: 'uint8',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'subtractedValue',
                  type: 'uint256',
                },
              ],
              name: 'decreaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
              ],
              name: 'getRoleAdmin',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'grantRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'hasRole',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'implementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'addedValue',
                  type: 'uint256',
                },
              ],
              name: 'increaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address',
                  name: 'vault_',
                  type: 'address',
                },
              ],
              name: 'initialize',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'mint',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'name',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
              ],
              name: 'nonces',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'pause',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'paused',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'deadline',
                  type: 'uint256',
                },
                {
                  internalType: 'uint8',
                  name: 'v',
                  type: 'uint8',
                },
                {
                  internalType: 'bytes32',
                  name: 'r',
                  type: 'bytes32',
                },
                {
                  internalType: 'bytes32',
                  name: 's',
                  type: 'bytes32',
                },
              ],
              name: 'permit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'renounceRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'revokeRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setClosingFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'debtCeiling_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtCeiling',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'debtRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'gainRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setGainRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'gateway_',
                  type: 'address',
                },
              ],
              name: 'setGateway',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setOpeningFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
              ],
              name: 'setPriceSource',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'stabilityPool_',
                  type: 'address',
                },
              ],
              name: 'setStabilityPool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenPeg_',
                  type: 'uint256',
                },
              ],
              name: 'setTokenPeg',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'bankID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'treasury_',
                  type: 'uint256',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes4',
                  name: 'interfaceId',
                  type: 'bytes4',
                },
              ],
              name: 'supportsInterface',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'symbol',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'totalSupply',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transfer',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'unpause',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeToNewBank',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'vaultCount',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        AVAI_Proxy: {
          address: '0x4995da5DF5AA38e18206155f6F4178Af2158B6C4',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'initialLogic',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'initialAdmin',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: '_data',
                  type: 'bytes',
                },
              ],
              stateMutability: 'payable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
              ],
              name: 'Upgraded',
              type: 'event',
            },
            {
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [],
              name: 'admin',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'implementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeTo',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes',
                },
              ],
              name: 'upgradeToAndCall',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        Bank: {
          address: '0x58aA3541106fa8D387b62E1EB52E15d667A41C4d',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'approved',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'operator',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'bool',
                  name: 'approved',
                  type: 'bool',
                },
              ],
              name: 'ApprovalForAll',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'BorrowToken',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'creator',
                  type: 'address',
                },
              ],
              name: 'CreateVault',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'DepositCollateral',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
              ],
              name: 'DestroyVault',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'buyer',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amountPaid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'tokenExtract',
                  type: 'uint256',
                },
              ],
              name: 'LiquidateVault',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'closingFee',
                  type: 'uint256',
                },
              ],
              name: 'PayBackToken',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'previousAdminRole',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'newAdminRole',
                  type: 'bytes32',
                },
              ],
              name: 'RoleAdminChanged',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleGranted',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
              ],
              name: 'RoleRevoked',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'TransferVault',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'WithdrawCollateral',
              type: 'event',
            },
            {
              inputs: [],
              name: 'DEFAULT_ADMIN_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'TREASURY_ROLE',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'approve',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
              ],
              name: 'balanceOf',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'borrowToken',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'changeTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultId_',
                  type: 'uint256',
                },
              ],
              name: 'checkCost',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultId_',
                  type: 'uint256',
                },
              ],
              name: 'checkExtract',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultId_',
                  type: 'uint256',
                },
              ],
              name: 'checkLiquidation',
              outputs: [],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'closingFee',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'createVault',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'debtCeiling',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'debtRatio',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'depositCollateral',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
              ],
              name: 'destroyVault',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'gainRatio',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'gateway',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'getApproved',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
              ],
              name: 'getPaid',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getPricePeg',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getPriceSource',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
              ],
              name: 'getRoleAdmin',
              outputs: [
                {
                  internalType: 'bytes32',
                  name: '',
                  type: 'bytes32',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'grantRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'hasRole',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage_',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: 'name_',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'symbol_',
                  type: 'string',
                },
                {
                  internalType: 'address',
                  name: 'token_',
                  type: 'address',
                },
              ],
              name: 'initialize',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'operator',
                  type: 'address',
                },
              ],
              name: 'isApprovedForAll',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID_',
                  type: 'uint256',
                },
              ],
              name: 'liquidateVault',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'minimumCollateralPercentage',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'name',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'openingFee',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'ownerOf',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'payBackToken',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'priceSource',
              outputs: [
                {
                  internalType: 'contract AggregatorV3Interface',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'renounceRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes32',
                  name: 'role',
                  type: 'bytes32',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'revokeRole',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'safeTransferFrom',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
                {
                  internalType: 'bytes',
                  name: '_data',
                  type: 'bytes',
                },
              ],
              name: 'safeTransferFrom',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'operator',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'approved',
                  type: 'bool',
                },
              ],
              name: 'setApprovalForAll',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setClosingFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'debtCeiling_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtCeiling',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'debtRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setDebtRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'gainRatio_',
                  type: 'uint256',
                },
              ],
              name: 'setGainRatio',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'gateway_',
                  type: 'address',
                },
              ],
              name: 'setGateway',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'setOpeningFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'priceSource_',
                  type: 'address',
                },
              ],
              name: 'setPriceSource',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'stabilityPool_',
                  type: 'address',
                },
              ],
              name: 'setStabilityPool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'tokenPeg_',
                  type: 'uint256',
                },
              ],
              name: 'setTokenPeg',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'treasury_',
                  type: 'uint256',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'stabilityPool',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'bytes4',
                  name: 'interfaceId',
                  type: 'bytes4',
                },
              ],
              name: 'supportsInterface',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'symbol',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'token',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'index',
                  type: 'uint256',
                },
              ],
              name: 'tokenByIndex',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'tokenDebt',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'index',
                  type: 'uint256',
                },
              ],
              name: 'tokenOfOwnerByIndex',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'tokenPeg',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'tokenURI',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'totalDebt',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'totalSupply',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'tokenId',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'transferVault',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'treasury',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'vaultCollateral',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'vaultCounts',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'vaultDebt',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
              ],
              name: 'vaultExists',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdrawCollateral',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        DefaultProxyAdmin: {
          address: '0x9eC1831eD9D828fc51A966460816aC75e71cE7A8',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'contract TransparentUpgradeableProxy',
                  name: 'proxy',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'newAdmin',
                  type: 'address',
                },
              ],
              name: 'changeProxyAdmin',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'contract TransparentUpgradeableProxy',
                  name: 'proxy',
                  type: 'address',
                },
              ],
              name: 'getProxyAdmin',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'contract TransparentUpgradeableProxy',
                  name: 'proxy',
                  type: 'address',
                },
              ],
              name: 'getProxyImplementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'contract TransparentUpgradeableProxy',
                  name: 'proxy',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
              ],
              name: 'upgrade',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'contract TransparentUpgradeableProxy',
                  name: 'proxy',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes',
                },
              ],
              name: 'upgradeAndCall',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
          ],
        },
        WAVAXGateway: {
          address: '0x4cC6E99dAE92608256405792fC8B79d788D3C7dC',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'wavax',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'vault',
                  type: 'address',
                },
              ],
              name: 'authorizeVault',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'vault',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
              ],
              name: 'depositAVAX',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'vault',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
              ],
              name: 'destroyVault',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'vault',
                  type: 'address',
                },
              ],
              name: 'getPaid',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'vault',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'vaultID',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdrawAVAX',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        FakeUSDC: {
          address: '0xE55Cd5fF426FaaD0450B4ADe03f02eCbC4770bb9',
          abi: [
            {
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
              ],
              name: 'allowance',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'approve',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'balanceOf',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'decimals',
              outputs: [
                {
                  internalType: 'uint8',
                  name: '',
                  type: 'uint8',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'subtractedValue',
                  type: 'uint256',
                },
              ],
              name: 'decreaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'addedValue',
                  type: 'uint256',
                },
              ],
              name: 'increaseAllowance',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'mint',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'name',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'symbol',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'totalSupply',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transfer',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        USDCExchange_Implementation: {
          address: '0x21d59b758342D769559ea01aa7c7711f9dA52D8E',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              inputs: [],
              name: 'avai',
              outputs: [
                {
                  internalType: 'contract IStablecoin',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'avaiRate',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'changeTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'usdc_',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'avai_',
                  type: 'address',
                },
              ],
              name: 'initialize',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'mint',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'redeem',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_rate',
                  type: 'uint256',
                },
              ],
              name: 'setAVAIRate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_rate',
                  type: 'uint256',
                },
              ],
              name: 'setUSDCRate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'treasury',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdReserves',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdc',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdcRate',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        USDCExchange_Proxy: {
          address: '0x69034A05940a60b25cB15c2F88bEFF1b6f5794aB',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'initialLogic',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'initialAdmin',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: '_data',
                  type: 'bytes',
                },
              ],
              stateMutability: 'payable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
              ],
              name: 'Upgraded',
              type: 'event',
            },
            {
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [],
              name: 'admin',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'implementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeTo',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes',
                },
              ],
              name: 'upgradeToAndCall',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        USDCExchange: {
          address: '0x69034A05940a60b25cB15c2F88bEFF1b6f5794aB',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'implementation',
                  type: 'address',
                },
              ],
              name: 'Upgraded',
              type: 'event',
            },
            {
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [],
              name: 'admin',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'implementation',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
              ],
              name: 'upgradeTo',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newImplementation',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes',
                },
              ],
              name: 'upgradeToAndCall',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              inputs: [],
              name: 'avai',
              outputs: [
                {
                  internalType: 'contract IStablecoin',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'avaiRate',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'changeTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'usdc_',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'avai_',
                  type: 'address',
                },
              ],
              name: 'initialize',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'mint',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'owner',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'redeem',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_rate',
                  type: 'uint256',
                },
              ],
              name: 'setAVAIRate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_rate',
                  type: 'uint256',
                },
              ],
              name: 'setUSDCRate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'treasury',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdReserves',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdc',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'usdcRate',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'initialLogic',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'initialAdmin',
                  type: 'address',
                },
                {
                  internalType: 'bytes',
                  name: '_data',
                  type: 'bytes',
                },
              ],
              stateMutability: 'payable',
              type: 'constructor',
            },
          ],
        },
      },
    },
  },
};