export default {
  '43113': {
    fuji: {
      name: 'fuji',
      chainId: '43113',
      contracts: {
        OrcaStaking: {
          address: '0xD6Dd95C483bEfe87bf8cf9CE74438b057C93510E',
          abi: [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: '_rewardsPerSecond',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '_treasury',
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
                  internalType: 'string',
                  name: 'addressType',
                  type: 'string',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldAddress',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newAddress',
                  type: 'address',
                },
              ],
              name: 'ChangedAddress',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldEndTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newEndTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsEndTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldRewardsPerSecond',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsPerSecond',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldTreasury',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'ChangedTreasury',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Deposit',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'EmergencyWithdraw',
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
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'allocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'totalAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'rewardStartTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'PoolAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'oldAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newTotalAllocPoints',
                  type: 'uint256',
                },
              ],
              name: 'PoolUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'SetRewardsStartTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Withdraw',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'add',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'addRewardsBalance',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'deposit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'emergencyWithdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'endTimestamp',
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
                  name: 'from',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'to',
                  type: 'uint256',
                },
              ],
              name: 'getMultiplier',
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
              name: 'massUpdatePools',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'pendingRewards',
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
              name: 'poolInfo',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastRewardTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'accRewardsPerShare',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'totalStaked',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'poolLength',
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
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'rewardsActive',
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
              name: 'rewardsPerSecond',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'setRewardsPerSecond',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_treasury',
                  type: 'address',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'startTimestamp',
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
              name: 'totalAllocPoint',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'updatePool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'userInfo',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardTokenDebt',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        AVAI: {
          address: '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385',
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
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'priceSource',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'bank',
                  type: 'address',
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
          address: '0x05Ed8abeef9EdE006bc8dFc9B3D272441D370488',
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
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'priceSource',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'bank',
                  type: 'address',
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
          address: '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385',
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
          address: '0xa79A50CdBef164869c12f1DCAA31ec15423b46C9',
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
                  name: 'newDebtRatio',
                  type: 'uint256',
                },
              ],
              name: 'ChangeDebtRatio',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newGainRatio',
                  type: 'uint256',
                },
              ],
              name: 'ChangeGainRatio',
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
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
              ],
              name: 'GetPaid',
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
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'closingFee',
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
                  name: 'newClosingFee',
                  type: 'uint256',
                },
              ],
              name: 'NewClosingFee',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newDebtCeiling',
                  type: 'uint256',
                },
              ],
              name: 'NewDebtCeiling',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newOpeningFee',
                  type: 'uint256',
                },
              ],
              name: 'NewOpeningFee',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newPew',
                  type: 'uint256',
                },
              ],
              name: 'NewPeg',
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
          address: '0xFA6bb95465eA6b1c5B24137e2FE1b114BdC504b3',
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
        FakeUSDC: {
          address: '0xC1517ac40949643188efF133E2d4d6954eb23378',
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
        ORCA: {
          address: '0xb3308FD93936e5EFb9A1F2C6a513DEf68175Cb5d',
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
                  name: 'delegator',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'fromDelegate',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'toDelegate',
                  type: 'address',
                },
              ],
              name: 'DelegateChanged',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'delegate',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'previousBalance',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newBalance',
                  type: 'uint256',
                },
              ],
              name: 'DelegateVotesChanged',
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
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint32',
                  name: 'pos',
                  type: 'uint32',
                },
              ],
              name: 'checkpoints',
              outputs: [
                {
                  components: [
                    {
                      internalType: 'uint32',
                      name: 'fromBlock',
                      type: 'uint32',
                    },
                    {
                      internalType: 'uint224',
                      name: 'votes',
                      type: 'uint224',
                    },
                  ],
                  internalType: 'struct ERC20Votes.Checkpoint',
                  name: '',
                  type: 'tuple',
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
                  name: 'delegatee',
                  type: 'address',
                },
              ],
              name: 'delegate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'delegatee',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'nonce',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'expiry',
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
              name: 'delegateBySig',
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
              ],
              name: 'delegates',
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
                  name: 'blockNumber',
                  type: 'uint256',
                },
              ],
              name: 'getPastTotalSupply',
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
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'blockNumber',
                  type: 'uint256',
                },
              ],
              name: 'getPastVotes',
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
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'getVotes',
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
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'numCheckpoints',
              outputs: [
                {
                  internalType: 'uint32',
                  name: '',
                  type: 'uint32',
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
        OrcaStaking: {
          address: '0x72d62b0f3a0CEAdcD771b90537151774BD746FEA',
          abi: [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: '_rewardsPerSecond',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '_treasury',
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
                  internalType: 'string',
                  name: 'addressType',
                  type: 'string',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldAddress',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newAddress',
                  type: 'address',
                },
              ],
              name: 'ChangedAddress',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldEndTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newEndTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsEndTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldRewardsPerSecond',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsPerSecond',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldTreasury',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'ChangedTreasury',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Deposit',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'EmergencyWithdraw',
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
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'allocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'totalAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'rewardStartTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'PoolAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'oldAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newTotalAllocPoints',
                  type: 'uint256',
                },
              ],
              name: 'PoolUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'SetRewardsStartTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Withdraw',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'add',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'addRewardsBalance',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'deposit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'emergencyWithdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'endTimestamp',
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
                  name: 'from',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'to',
                  type: 'uint256',
                },
              ],
              name: 'getMultiplier',
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
              name: 'massUpdatePools',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'pendingRewards',
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
              name: 'poolInfo',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastRewardTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'accRewardsPerShare',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'totalStaked',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'poolLength',
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
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'rewardsActive',
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
              name: 'rewardsPerSecond',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'setRewardsPerSecond',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_treasury',
                  type: 'address',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'startTimestamp',
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
              name: 'totalAllocPoint',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'updatePool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'userInfo',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardTokenDebt',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        PodLeader: {
          address: '0x2cD766a722622395E74daD1647aae3AAAc097930',
          abi: [
            {
              inputs: [
                {
                  internalType: 'contract IERC20',
                  name: '_orca',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: '_startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: '_rewardsPerSecond',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '_treasury',
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
                  internalType: 'string',
                  name: 'addressType',
                  type: 'string',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldAddress',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newAddress',
                  type: 'address',
                },
              ],
              name: 'ChangedAddress',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldEndTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newEndTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsEndTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldRewardsPerSecond',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsPerSecond',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldTreasury',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'ChangedTreasury',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Deposit',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'oldFee',
                  type: 'uint16',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'newFee',
                  type: 'uint16',
                },
              ],
              name: 'DepositFeeUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'EmergencyWithdraw',
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
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'allocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'totalAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'rewardStartTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'depositFeeBP',
                  type: 'uint16',
                },
              ],
              name: 'PoolAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'oldAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newTotalAllocPoints',
                  type: 'uint256',
                },
              ],
              name: 'PoolUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'SetRewardsStartTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Withdraw',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
                {
                  internalType: 'uint16',
                  name: '_depositFeeBp',
                  type: 'uint16',
                },
              ],
              name: 'add',
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
              name: 'addRewardsBalance',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'deposit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'emergencyWithdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'endTimestamp',
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
                  name: 'from',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'to',
                  type: 'uint256',
                },
              ],
              name: 'getMultiplier',
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
              name: 'massUpdatePools',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'orca',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'pendingRewards',
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
              name: 'poolInfo',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastRewardTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'accRewardsPerShare',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'totalStaked',
                  type: 'uint256',
                },
                {
                  internalType: 'uint16',
                  name: 'depositFeeBP',
                  type: 'uint16',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'poolLength',
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
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'rewardsActive',
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
              name: 'rewardsPerSecond',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'setRewardsPerSecond',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_treasury',
                  type: 'address',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'startTimestamp',
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
              name: 'totalAllocPoint',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint16',
                  name: 'depositFee',
                  type: 'uint16',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'updateDepositFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'updatePool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'userInfo',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardTokenDebt',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        TeamPayment: {
          address: '0x327E60E06b6B7999A341d6aB4c90A305A540D7EB',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'orca_',
                  type: 'address',
                },
                {
                  internalType: 'address[]',
                  name: 'payees',
                  type: 'address[]',
                },
                {
                  internalType: 'uint256[]',
                  name: 'shares_',
                  type: 'uint256[]',
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
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'shares',
                  type: 'uint256',
                },
              ],
              name: 'PayeeAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReceived',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReleased',
              type: 'event',
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
                  name: 'shares_',
                  type: 'uint256',
                },
              ],
              name: 'addPayee',
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
                  name: 'index',
                  type: 'uint256',
                },
              ],
              name: 'payee',
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
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'release',
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
              ],
              name: 'released',
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
              name: 'renounceOwnership',
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
              ],
              name: 'shares',
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
              name: 'totalReleased',
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
              name: 'totalShares',
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
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        USDCExchange: {
          address: '0x76c09De72a38C54B3a42065fC543CfaC140e22B8',
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
                  indexed: false,
                  internalType: 'address',
                  name: 'minter',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Mint',
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
                  name: 'redeemer',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Redeem',
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
        USDCExchange_Implementation: {
          address: '0xa728c215fE370F13c22d3643A0037f167484Fe01',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'minter',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Mint',
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
                  name: 'redeemer',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Redeem',
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
          address: '0x76c09De72a38C54B3a42065fC543CfaC140e22B8',
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
        VestingWallet: {
          address: '0x7bd04f4785073AA95ac327B8E3F4F27f395e034A',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'orca_',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'beneficiaryAddress',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'durationSeconds',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'revocable',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
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
              name: 'BenefeciaryAdded',
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
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReceived',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [],
              name: 'Revoked',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'TokensReleased',
              type: 'event',
            },
            {
              inputs: [],
              name: 'beneficiary',
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
              name: 'duration',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'receiveToken',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'release',
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
              inputs: [],
              name: 'revoke',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'start',
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
              name: 'totalReleased',
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
                  internalType: 'uint256',
                  name: 'timestamp',
                  type: 'uint256',
                },
              ],
              name: 'vestedAmount',
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
        WAVAXGateway: {
          address: '0x9383EfA379028f223A0f047962C892fc55E71AD6',
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
      },
    },
  },
  '43114': {
    mainnet: {
      name: 'mainnet',
      chainId: '43114',
      contracts: {
        AVAI: {
          address: '0x346A59146b9b4a77100D369a3d18E8007A9F46a6',
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
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'priceSource',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'bank',
                  type: 'address',
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
          address: '0x541e4b5bE4aDd212146f0d8A2ae08e6277Bb5E85',
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
                  internalType: 'uint256',
                  name: 'minimumCollateralPercentage',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'priceSource',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'bank',
                  type: 'address',
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
          address: '0x346A59146b9b4a77100D369a3d18E8007A9F46a6',
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
          address: '0xEfBc93FE683b6483b446CfAdee8745dF506E99e4',
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
                  name: 'newDebtRatio',
                  type: 'uint256',
                },
              ],
              name: 'ChangeDebtRatio',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newGainRatio',
                  type: 'uint256',
                },
              ],
              name: 'ChangeGainRatio',
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
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
              ],
              name: 'GetPaid',
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
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'closingFee',
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
                  name: 'newClosingFee',
                  type: 'uint256',
                },
              ],
              name: 'NewClosingFee',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newDebtCeiling',
                  type: 'uint256',
                },
              ],
              name: 'NewDebtCeiling',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newOpeningFee',
                  type: 'uint256',
                },
              ],
              name: 'NewOpeningFee',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newPew',
                  type: 'uint256',
                },
              ],
              name: 'NewPeg',
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
          address: '0xf5f06b408543b498d4bA51D1c0625B164444C4D1',
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
        ORCA: {
          address: '0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
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
                  name: 'delegator',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'fromDelegate',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'toDelegate',
                  type: 'address',
                },
              ],
              name: 'DelegateChanged',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'delegate',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'previousBalance',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newBalance',
                  type: 'uint256',
                },
              ],
              name: 'DelegateVotesChanged',
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
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint32',
                  name: 'pos',
                  type: 'uint32',
                },
              ],
              name: 'checkpoints',
              outputs: [
                {
                  components: [
                    {
                      internalType: 'uint32',
                      name: 'fromBlock',
                      type: 'uint32',
                    },
                    {
                      internalType: 'uint224',
                      name: 'votes',
                      type: 'uint224',
                    },
                  ],
                  internalType: 'struct ERC20Votes.Checkpoint',
                  name: '',
                  type: 'tuple',
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
                  name: 'delegatee',
                  type: 'address',
                },
              ],
              name: 'delegate',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'delegatee',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'nonce',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'expiry',
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
              name: 'delegateBySig',
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
              ],
              name: 'delegates',
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
                  name: 'blockNumber',
                  type: 'uint256',
                },
              ],
              name: 'getPastTotalSupply',
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
                  name: 'account',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'blockNumber',
                  type: 'uint256',
                },
              ],
              name: 'getPastVotes',
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
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'getVotes',
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
              inputs: [
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'numCheckpoints',
              outputs: [
                {
                  internalType: 'uint32',
                  name: '',
                  type: 'uint32',
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
        PodLeader: {
          address: '0x111E1E97435b57467E79d4930acc4B7EB3d478ad',
          abi: [
            {
              inputs: [
                {
                  internalType: 'contract IERC20',
                  name: '_orca',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: '_startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: '_rewardsPerSecond',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '_treasury',
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
                  internalType: 'string',
                  name: 'addressType',
                  type: 'string',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldAddress',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newAddress',
                  type: 'address',
                },
              ],
              name: 'ChangedAddress',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldEndTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newEndTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsEndTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldRewardsPerSecond',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsPerSecond',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldTreasury',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'ChangedTreasury',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Deposit',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'oldFee',
                  type: 'uint16',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'newFee',
                  type: 'uint16',
                },
              ],
              name: 'DepositFeeUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'EmergencyWithdraw',
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
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'allocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'totalAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'rewardStartTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint16',
                  name: 'depositFeeBP',
                  type: 'uint16',
                },
              ],
              name: 'PoolAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'oldAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newTotalAllocPoints',
                  type: 'uint256',
                },
              ],
              name: 'PoolUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'SetRewardsStartTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Withdraw',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
                {
                  internalType: 'uint16',
                  name: '_depositFeeBp',
                  type: 'uint16',
                },
              ],
              name: 'add',
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
              name: 'addRewardsBalance',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'deposit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'emergencyWithdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'endTimestamp',
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
                  name: 'from',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'to',
                  type: 'uint256',
                },
              ],
              name: 'getMultiplier',
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
              name: 'massUpdatePools',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'orca',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'pendingRewards',
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
              name: 'poolInfo',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastRewardTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'accRewardsPerShare',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'totalStaked',
                  type: 'uint256',
                },
                {
                  internalType: 'uint16',
                  name: 'depositFeeBP',
                  type: 'uint16',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'poolLength',
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
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'rewardsActive',
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
              name: 'rewardsPerSecond',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'setRewardsPerSecond',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_treasury',
                  type: 'address',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'startTimestamp',
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
              name: 'totalAllocPoint',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint16',
                  name: 'depositFee',
                  type: 'uint16',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'updateDepositFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'updatePool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'userInfo',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardTokenDebt',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        TeamPayment: {
          address: '0x4422fB9aFb547E8ed7A61AC9dE0255C760Ea55C1',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'orca_',
                  type: 'address',
                },
                {
                  internalType: 'address[]',
                  name: 'payees',
                  type: 'address[]',
                },
                {
                  internalType: 'uint256[]',
                  name: 'shares_',
                  type: 'uint256[]',
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
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'shares',
                  type: 'uint256',
                },
              ],
              name: 'PayeeAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReceived',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReleased',
              type: 'event',
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
                  name: 'shares_',
                  type: 'uint256',
                },
              ],
              name: 'addPayee',
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
                  name: 'index',
                  type: 'uint256',
                },
              ],
              name: 'payee',
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
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'release',
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
              ],
              name: 'released',
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
              name: 'renounceOwnership',
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
              ],
              name: 'shares',
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
              name: 'totalReleased',
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
              name: 'totalShares',
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
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'transferOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        USDCExchange: {
          address: '0x2bb9c8c7FB619aD669C99FEa6947eE52c30eb0A5',
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
                  indexed: false,
                  internalType: 'address',
                  name: 'minter',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Mint',
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
                  name: 'redeemer',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Redeem',
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
        USDCExchange_Implementation: {
          address: '0x79E16708cBBA01c83Cd5f0029fAAC2D030A89628',
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'minter',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Mint',
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
                  name: 'redeemer',
                  type: 'address',
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
                  name: 'fee',
                  type: 'uint256',
                },
              ],
              name: 'Redeem',
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
          address: '0x2bb9c8c7FB619aD669C99FEa6947eE52c30eb0A5',
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
        VestingWallet: {
          address: '0x318DFBE56155F9999FA913cddcaA5764A2B52134',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'orca_',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'beneficiaryAddress',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'durationSeconds',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'revocable',
                  type: 'bool',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
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
              name: 'BenefeciaryAdded',
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
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'PaymentReceived',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [],
              name: 'Revoked',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
              ],
              name: 'TokensReleased',
              type: 'event',
            },
            {
              inputs: [],
              name: 'beneficiary',
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
              name: 'duration',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'receiveToken',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'release',
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
              inputs: [],
              name: 'revoke',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'start',
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
              name: 'totalReleased',
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
                  internalType: 'uint256',
                  name: 'timestamp',
                  type: 'uint256',
                },
              ],
              name: 'vestedAmount',
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
        WAVAXGateway: {
          address: '0x4FFFa5602112fd0C7B327A503F67f229F6D0828A',
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
        OrcaStaking: {
          address: '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb',
          abi: [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_startTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: '_rewardsPerSecond',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '_treasury',
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
                  internalType: 'string',
                  name: 'addressType',
                  type: 'string',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldAddress',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newAddress',
                  type: 'address',
                },
              ],
              name: 'ChangedAddress',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldEndTimestamp',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newEndTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsEndTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'oldRewardsPerSecond',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'ChangedRewardsPerSecond',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'oldTreasury',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'newTreasury',
                  type: 'address',
                },
              ],
              name: 'ChangedTreasury',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Deposit',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'EmergencyWithdraw',
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
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'allocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'totalAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'rewardStartTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'PoolAdded',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'oldAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newAllocPoints',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'newTotalAllocPoints',
                  type: 'uint256',
                },
              ],
              name: 'PoolUpdated',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'startTimestamp',
                  type: 'uint256',
                },
              ],
              name: 'SetRewardsStartTimestamp',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'user',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'Withdraw',
              type: 'event',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'add',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'addRewardsBalance',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'deposit',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'emergencyWithdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'endTimestamp',
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
                  name: 'from',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'to',
                  type: 'uint256',
                },
              ],
              name: 'getMultiplier',
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
              name: 'massUpdatePools',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'account',
                  type: 'address',
                },
              ],
              name: 'pendingRewards',
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
              name: 'poolInfo',
              outputs: [
                {
                  internalType: 'contract IERC20',
                  name: 'token',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastRewardTimestamp',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'accRewardsPerShare',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'totalStaked',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'poolLength',
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
              name: 'renounceOwnership',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'rewardsActive',
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
              name: 'rewardsPerSecond',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'allocPoint',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'withUpdate',
                  type: 'bool',
                },
              ],
              name: 'set',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'newRewardsPerSecond',
                  type: 'uint256',
                },
              ],
              name: 'setRewardsPerSecond',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_treasury',
                  type: 'address',
                },
              ],
              name: 'setTreasury',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'startTimestamp',
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
              name: 'totalAllocPoint',
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
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'pid',
                  type: 'uint256',
                },
              ],
              name: 'updatePool',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'userInfo',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardTokenDebt',
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
                  name: 'pid',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'amount',
                  type: 'uint256',
                },
              ],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
      },
    },
  },
};
