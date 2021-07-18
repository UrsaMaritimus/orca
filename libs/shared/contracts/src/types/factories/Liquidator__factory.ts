/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Liquidator, LiquidatorInterface } from "../Liquidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "stablecoin",
        type: "address",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vaultID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "CreateVaultType",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "_stablecoin",
    outputs: [
      {
        internalType: "contract Stablecoin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_vault",
    outputs: [
      {
        internalType: "contract BaseVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "checkCollat",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "checkCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "checkExtract",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "checkLiquidation",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "checkValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "debtRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gainRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "liquidateVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_debtRatio",
        type: "uint256",
      },
    ],
    name: "setDebtRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gainRatio",
        type: "uint256",
      },
    ],
    name: "setGainRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newTreasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001d9d38038062001d9d8339810160408190526200003491620001d6565b6001600055620000443362000167565b6001600160a01b038216620000b25760405162461bcd60e51b815260206004820152602960248201527f43616e6e6f742073657420737461626c65636f696e20746f20746865207a65726044820152686f206164647265737360b81b60648201526084015b60405180910390fd5b6001600160a01b038116620001165760405162461bcd60e51b8152602060048201526024808201527f43616e6e6f7420736574207661756c7420746f20746865207a65726f206164646044820152637265737360e01b6064820152608401620000a9565b600380546001600160a01b039384166001600160a01b03199182161790915560048054929093169181169190911790915560026005819055600b60065560966007558054909116331790556200020d565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b0381168114620001d157600080fd5b919050565b60008060408385031215620001e9578182fd5b620001f483620001b9565b91506200020460208401620001b9565b90509250929050565b611b80806200021d6000396000f3fe6080604052600436106101485760003560e01c806390cf0bba116100c0578063eb6a887d11610074578063f2fde38b11610059578063f2fde38b14610399578063fd243da3146103b9578063ffc73da7146103d957600080fd5b8063eb6a887d14610359578063f0f442601461037957600080fd5b8063cea55f57116100a5578063cea55f571461030e578063cf41d6f814610324578063e49805971461033957600080fd5b806390cf0bba146102ce578063b86f6aef146102ee57600080fd5b8063715018a6116101175780637b53f790116100fc5780637b53f790146102395780638da5cb5b1461026e5780638f11039d1461028c57600080fd5b8063715018a6146101f55780637558abc81461020c57600080fd5b806311b4a83214610154578063311f392a1461018757806356572ac01461019d57806361d027b3146101bd57600080fd5b3661014f57005b600080fd5b34801561016057600080fd5b5061017461016f366004611a81565b6103f9565b6040519081526020015b60405180910390f35b34801561019357600080fd5b5061017460065481565b3480156101a957600080fd5b506101746101b8366004611a81565b6105ff565b3480156101c957600080fd5b506002546101dd906001600160a01b031681565b6040516001600160a01b03909116815260200161017e565b34801561020157600080fd5b5061020a6107bb565b005b34801561021857600080fd5b50610174610227366004611a29565b60086020526000908152604090205481565b34801561024557600080fd5b50610259610254366004611a81565b610821565b6040805192835260208301919091520161017e565b34801561027a57600080fd5b506001546001600160a01b03166101dd565b34801561029857600080fd5b506102ac6102a7366004611a81565b61091d565b604080519415158552602085019390935291830152606082015260800161017e565b3480156102da57600080fd5b5061020a6102e9366004611a81565b610b3e565b3480156102fa57600080fd5b5061020a610309366004611a81565b61117b565b34801561031a57600080fd5b5061017460055481565b34801561033057600080fd5b5061020a6112fe565b34801561034557600080fd5b506003546101dd906001600160a01b031681565b34801561036557600080fd5b5061020a610374366004611a81565b6113fb565b34801561038557600080fd5b5061020a610394366004611a29565b61145a565b3480156103a557600080fd5b5061020a6103b4366004611a29565b611566565b3480156103c557600080fd5b506004546101dd906001600160a01b031681565b3480156103e557600080fd5b5061020a6103f4366004611a81565b611645565b6004805460405163a525323d60e01b81529182018390526000916001600160a01b039091169063a525323d9060240160206040518083038186803b15801561044057600080fd5b505afa158015610454573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104789190611a61565b6104bc5760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064015b60405180910390fd5b6004805460405163d4a9b2c560e01b81529182018490526000916105d6916001600160a01b03169063d4a9b2c5906024015b60206040518083038186803b15801561050657600080fd5b505afa15801561051a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053e9190611a99565b600480546040517fd310f49b0000000000000000000000000000000000000000000000000000000081529182018790526001600160a01b03169063d310f49b9060240160206040518083038186803b15801561059957600080fd5b505afa1580156105ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d19190611a99565b6116a4565b91506105e890506305f5e10082611ac9565b9050600554816105f89190611ac9565b9392505050565b6004805460405163a525323d60e01b81529182018390526000916001600160a01b039091169063a525323d9060240160206040518083038186803b15801561064657600080fd5b505afa15801561065a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067e9190611a61565b6106bd5760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064016104b3565b6004805460405163d4a9b2c560e01b81529182018490526000916106f3916001600160a01b03169063d4a9b2c5906024016104ee565b9150506000600554826107069190611ac9565b90506000600460009054906101000a90046001600160a01b03166001600160a01b031663048de3816040518163ffffffff1660e01b815260040160206040518083038186803b15801561075857600080fd5b505afa15801561076c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107909190611a99565b61079b90600a611ae9565b6006546107a89084611ae9565b6107b29190611ac9565b95945050505050565b6001546001600160a01b031633146108155760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b3565b61081f600061199b565b565b6004805460405163a525323d60e01b815291820183905260009182916001600160a01b03169063a525323d9060240160206040518083038186803b15801561086857600080fd5b505afa15801561087c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a09190611a61565b6108df5760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064016104b3565b6004805460405163d4a9b2c560e01b8152918201859052610914916001600160a01b039091169063d4a9b2c5906024016104ee565b91509150915091565b6004805460405163a525323d60e01b81529182018390526000918291829182916001600160a01b03169063a525323d9060240160206040518083038186803b15801561096857600080fd5b505afa15801561097c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109a09190611a61565b6109df5760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064016104b3565b60006109ea866103f9565b905060006109f7876105ff565b6004805460405163d4a9b2c560e01b81529182018a905291925060009183916001600160a01b039091169063d4a9b2c59060240160206040518083038186803b158015610a4357600080fd5b505afa158015610a57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7b9190611a99565b610a859190611b08565b6004805460405163d4a9b2c560e01b81529293506001600160a01b03169163d4a9b2c591610ab9918c910190815260200190565b60206040518083038186803b158015610ad157600080fd5b505afa158015610ae5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b099190611a99565b811115610b2657634e487b7160e01b600052600160045260246000fd5b610b3081846119fa565b989097509195509350915050565b60026000541415610b915760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016104b3565b60026000556004805460405163a525323d60e01b81529182018390526001600160a01b03169063a525323d9060240160206040518083038186803b158015610bd857600080fd5b505afa158015610bec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c109190611a61565b610c4f5760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064016104b3565b6003546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610c9357600080fd5b505afa158015610ca7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ccb9190611a99565b6003546002546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b03918216600482015260248101849052929350169063a9059cbb90604401602060405180830381600087803b158015610d3657600080fd5b505af1158015610d4a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6e9190611a61565b50600480546040517f6352211e0000000000000000000000000000000000000000000000000000000081529182018490526000916001600160a01b0390911690636352211e9060240160206040518083038186803b158015610dcf57600080fd5b505afa158015610de3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e079190611a45565b9050610e128361117b565b6000610e1d846105ff565b90506000610e2a856103f9565b6003546040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018390529192506001600160a01b0316906323b872dd90606401602060405180830381600087803b158015610e9657600080fd5b505af1158015610eaa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ece9190611a61565b50600480546040517fce77f2430000000000000000000000000000000000000000000000000000000081529182018790526001600160a01b03169063ce77f24390602401600060405180830381600087803b158015610f2c57600080fd5b505af1158015610f40573d6000803e3d6000fd5b50506003546040516370a0823160e01b8152306004820152600093506001600160a01b0390911691506370a082319060240160206040518083038186803b158015610f8a57600080fd5b505afa158015610f9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc29190611a99565b600480546040517f85af3c160000000000000000000000000000000000000000000000000000000081529293506001600160a01b0316916385af3c1691611016918a91869101918252602082015260400190565b600060405180830381600087803b15801561103057600080fd5b505af1158015611044573d6000803e3d6000fd5b5050600480546040517f767a7b050000000000000000000000000000000000000000000000000000000081529182018a9052602482018790526001600160a01b0316925063767a7b059150604401600060405180830381600087803b1580156110ac57600080fd5b505af11580156110c0573d6000803e3d6000fd5b5050600480546040517f3e61facd0000000000000000000000000000000000000000000000000000000081529182018a90526001600160a01b038881166024840152169250633e61facd9150604401600060405180830381600087803b15801561112957600080fd5b505af115801561113d573d6000803e3d6000fd5b50503360009081526008602052604090205461115c9250859150611ab1565b3360009081526008602052604081209190915560019055505050505050565b6004805460405163a525323d60e01b81529182018390526001600160a01b03169063a525323d9060240160206040518083038186803b1580156111bd57600080fd5b505afa1580156111d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f59190611a61565b6112345760405162461bcd60e51b815260206004820152601060248201526f15985d5b1d081b5d5cdd08195e1a5cdd60821b60448201526064016104b3565b6004805460405163d4a9b2c560e01b8152918201839052600091829161126e916001600160a01b039091169063d4a9b2c5906024016104ee565b9092509050600061127f8284611ac9565b905060075481106112f85760405162461bcd60e51b815260206004820152603060248201527f5661756c74206973206e6f742062656c6f77206d696e696d756d20636f6c6c6160448201527f746572616c2070657263656e746167650000000000000000000000000000000060648201526084016104b3565b50505050565b600260005414156113515760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016104b3565b60026000908155338152600860205260409020546113b15760405162461bcd60e51b815260206004820152601c60248201527f446f6e2774206861766520616e797468696e6720666f7220796f752e0000000060448201526064016104b3565b33600081815260086020526040808220805490839055905190929183156108fc02918491818181858888f193505050501580156113f2573d6000803e3d6000fd5b50506001600055565b6001546001600160a01b031633146114555760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b3565b600555565b6001546001600160a01b031633146114b45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b3565b6002546001600160a01b03166115325760405162461bcd60e51b815260206004820152602760248201527f43616e6e6f742073657420747265617375727920746f20746865207a65726f2060448201527f616464726573730000000000000000000000000000000000000000000000000060648201526084016104b3565b6002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03831617905561156381611566565b50565b6001546001600160a01b031633146115c05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b3565b6001600160a01b03811661163c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104b3565b6115638161199b565b6001546001600160a01b0316331461169f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b3565b600655565b60048054604080517f048de381000000000000000000000000000000000000000000000000000000008152905160009384936001600160a01b03169263048de3819281830192602092829003018186803b15801561170157600080fd5b505afa158015611715573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117399190611a99565b61175357634e487b7160e01b600052600160045260246000fd5b60048054604080517f9fc30f1c00000000000000000000000000000000000000000000000000000000815290516001600160a01b0390921692639fc30f1c928282019260209290829003018186803b1580156117ae57600080fd5b505afa1580156117c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e69190611a99565b61180057634e487b7160e01b600052600160045260246000fd5b6000600460009054906101000a90046001600160a01b03166001600160a01b031663048de3816040518163ffffffff1660e01b815260040160206040518083038186803b15801561185057600080fd5b505afa158015611864573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118889190611a99565b6118929086611ae9565b9050848110156118b257634e487b7160e01b600052600160045260246000fd5b6000600460009054906101000a90046001600160a01b03166001600160a01b0316639fc30f1c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561190257600080fd5b505afa158015611916573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061193a9190611a99565b6119449086611ae9565b90508481101561196457634e487b7160e01b600052600160045260246000fd5b6000611971836064611ae9565b905082811161199057634e487b7160e01b600052600160045260246000fd5b969095509350505050565b600180546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000806000611a0985856116a4565b90925090506000611a1a8284611ac9565b60075411159695505050505050565b600060208284031215611a3a578081fd5b81356105f881611b35565b600060208284031215611a56578081fd5b81516105f881611b35565b600060208284031215611a72578081fd5b815180151581146105f8578182fd5b600060208284031215611a92578081fd5b5035919050565b600060208284031215611aaa578081fd5b5051919050565b60008219821115611ac457611ac4611b1f565b500190565b600082611ae457634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615611b0357611b03611b1f565b500290565b600082821015611b1a57611b1a611b1f565b500390565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b038116811461156357600080fdfea26469706673582212206e1a902f8d2424c1153c6f24d0b1b0acba3427419596470a85cb4e1bd8190a3764736f6c63430008040033";

export class Liquidator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    stablecoin: string,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Liquidator> {
    return super.deploy(
      stablecoin,
      vault,
      overrides || {}
    ) as Promise<Liquidator>;
  }
  getDeployTransaction(
    stablecoin: string,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(stablecoin, vault, overrides || {});
  }
  attach(address: string): Liquidator {
    return super.attach(address) as Liquidator;
  }
  connect(signer: Signer): Liquidator__factory {
    return super.connect(signer) as Liquidator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LiquidatorInterface {
    return new utils.Interface(_abi) as LiquidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Liquidator {
    return new Contract(address, _abi, signerOrProvider) as Liquidator;
  }
}
