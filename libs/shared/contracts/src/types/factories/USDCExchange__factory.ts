/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { USDCExchange, USDCExchangeInterface } from "../USDCExchange";

const _abi = [
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
    name: "avai",
    outputs: [
      {
        internalType: "contract IStablecoin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "avaiRate",
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
        name: "newTreasury",
        type: "address",
      },
    ],
    name: "changeTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usdc_",
        type: "address",
      },
      {
        internalType: "address",
        name: "avai_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "setAVAIRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "setUSDCRate",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "usdReserves",
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
    name: "usdc",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcRate",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611317806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063e00424cf11610066578063e00424cf146101e1578063eb7f5121146101ea578063ece9c23f146101fd578063f2fde38b1461020557600080fd5b80638da5cb5b14610197578063a0712d68146101a8578063b14f2a39146101bb578063db006a75146101ce57600080fd5b8063485cc955116100d3578063485cc9551461015457806361d027b31461016957806368297ff81461017c578063715018a61461018f57600080fd5b8063277ce7d9146100fa578063356397d21461012a5780633e413bee14610141575b600080fd5b60985461010d906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61013360995481565b604051908152602001610121565b60975461010d906001600160a01b031681565b610167610162366004611178565b610218565b005b609b5461010d906001600160a01b031681565b61016761018a3660046111ca565b61033e565b61016761039d565b6065546001600160a01b031661010d565b6101676101b63660046111ca565b610403565b6101676101c936600461115e565b6105b0565b6101676101dc3660046111ca565b610642565b610133609a5481565b6101676101f83660046111ca565b61099c565b6101336109fb565b61016761021336600461115e565b610a7c565b600054610100900460ff1680610231575060005460ff16155b6102995760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b600054610100900460ff161580156102bb576000805461ffff19166101011790555b6102c3610b5e565b6102cb610c10565b6102d3610cb7565b609780546001600160a01b0380861673ffffffffffffffffffffffffffffffffffffffff199283161790925560988054928516928216929092179091556126c5609a5561275b609955609b8054909116331790558015610339576000805461ff00191690555b505050565b6065546001600160a01b031633146103985760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610290565b609955565b6065546001600160a01b031633146103f75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610290565b6104016000610d6d565b565b600260015414156104565760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610290565b6002600155806104a85760405162461bcd60e51b815260206004820152601260248201527f43616e6e6f74206d696e742030204156414900000000000000000000000000006044820152606401610290565b6099546000906104ba83612710611269565b6104c49190611249565b6104ce9083611288565b9050600060995483662386f26fc100006104e89190611269565b6104f29190611249565b60975490915061050d906001600160a01b0316333086610dcc565b609b5460975461052a916001600160a01b03918216911684610e83565b6098546040517f40c10f19000000000000000000000000000000000000000000000000000000008152336004820152602481018390526001600160a01b03909116906340c10f1990604401600060405180830381600087803b15801561058f57600080fd5b505af11580156105a3573d6000803e3d6000fd5b5050600180555050505050565b6065546001600160a01b0316331461060a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610290565b61061381610a7c565b609b805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b600260015414156106955760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610290565b6002600155806106e75760405162461bcd60e51b815260206004820152601460248201527f43616e6e6f742072656465656d203020555344430000000000000000000000006044820152606401610290565b6097546040516370a0823160e01b81523060048201526001600160a01b03909116906370a082319060240160206040518083038186803b15801561072a57600080fd5b505afa15801561073e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076291906111e2565b6107ae5760405162461bcd60e51b815260206004820152601b60248201527f4e6f7420656e6f756768205553444320696e20726573657276657300000000006044820152606401610290565b6107bd64e8d4a5100082611249565b6097546040516370a0823160e01b81523060048201526001600160a01b03909116906370a082319060240160206040518083038186803b15801561080057600080fd5b505afa158015610814573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083891906111e2565b10156108865760405162461bcd60e51b815260206004820152601b60248201527f4e6f7420656e6f756768205553444320696e20726573657276657300000000006044820152606401610290565b6000662386f26fc10000609a548361089e9190611269565b6108a89190611249565b90506000816108bc64e8d4a5100085611249565b6108c69190611288565b6098549091506108e1906001600160a01b0316333086610dcc565b6098546040517f9dc29fac000000000000000000000000000000000000000000000000000000008152306004820152602481018590526001600160a01b0390911690639dc29fac90604401600060405180830381600087803b15801561094657600080fd5b505af115801561095a573d6000803e3d6000fd5b505060975461097692506001600160a01b031690503384610e83565b609b54609754610993916001600160a01b03918216911683610e83565b50506001805550565b6065546001600160a01b031633146109f65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610290565b609a55565b6097546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610a3f57600080fd5b505afa158015610a53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7791906111e2565b905090565b6065546001600160a01b03163314610ad65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610290565b6001600160a01b038116610b525760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610290565b610b5b81610d6d565b50565b600054610100900460ff1680610b77575060005460ff16155b610bda5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610290565b600054610100900460ff16158015610bfc576000805461ffff19166101011790555b8015610b5b576000805461ff001916905550565b600054610100900460ff1680610c29575060005460ff16155b610c8c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610290565b600054610100900460ff16158015610cae576000805461ffff19166101011790555b610bfc33610d6d565b600054610100900460ff1680610cd0575060005460ff16155b610d335760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610290565b600054610100900460ff16158015610d55576000805461ffff19166101011790555b600180558015610b5b576000805461ff001916905550565b606580546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040516001600160a01b0380851660248301528316604482015260648101829052610e7d9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610ecc565b50505050565b6040516001600160a01b0383166024820152604481018290526103399084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401610e19565b6000610f21826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610fb19092919063ffffffff16565b8051909150156103395780806020019051810190610f3f91906111aa565b6103395760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610290565b6060610fc08484600085610fca565b90505b9392505050565b6060824710156110425760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610290565b843b6110905760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610290565b600080866001600160a01b031685876040516110ac91906111fa565b60006040518083038185875af1925050503d80600081146110e9576040519150601f19603f3d011682016040523d82523d6000602084013e6110ee565b606091505b50915091506110fe828286611109565b979650505050505050565b60608315611118575081610fc3565b8251156111285782518084602001fd5b8160405162461bcd60e51b81526004016102909190611216565b80356001600160a01b038116811461115957600080fd5b919050565b60006020828403121561116f578081fd5b610fc382611142565b6000806040838503121561118a578081fd5b61119383611142565b91506111a160208401611142565b90509250929050565b6000602082840312156111bb578081fd5b81518015158114610fc3578182fd5b6000602082840312156111db578081fd5b5035919050565b6000602082840312156111f3578081fd5b5051919050565b6000825161120c81846020870161129f565b9190910192915050565b602081526000825180602084015261123581604085016020870161129f565b601f01601f19169190910160400192915050565b60008261126457634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615611283576112836112cb565b500290565b60008282101561129a5761129a6112cb565b500390565b60005b838110156112ba5781810151838201526020016112a2565b83811115610e7d5750506000910152565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220fc71259afb2e357d17fd1ba73478792367e82f04a6d47719dfd8ba5d6591c70f64736f6c63430008040033";

export class USDCExchange__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<USDCExchange> {
    return super.deploy(overrides || {}) as Promise<USDCExchange>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): USDCExchange {
    return super.attach(address) as USDCExchange;
  }
  connect(signer: Signer): USDCExchange__factory {
    return super.connect(signer) as USDCExchange__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): USDCExchangeInterface {
    return new utils.Interface(_abi) as USDCExchangeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): USDCExchange {
    return new Contract(address, _abi, signerOrProvider) as USDCExchange;
  }
}
