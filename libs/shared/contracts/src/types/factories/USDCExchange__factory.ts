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
        indexed: false,
        internalType: "uint256",
        name: "newAVAIRate",
        type: "uint256",
      },
    ],
    name: "ChangeAVAIRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newHourlyLimit",
        type: "uint256",
      },
    ],
    name: "ChangeHourlyLimit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newTreasury",
        type: "address",
      },
    ],
    name: "ChangeTreasury",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newUSDCRate",
        type: "uint256",
      },
    ],
    name: "ChangeUSDCRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "Mint",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "Redeem",
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
    inputs: [],
    name: "hourlyLimit",
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
        name: "_limit",
        type: "uint256",
      },
    ],
    name: "setHourlyLimit",
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
  "0x608060405234801561001057600080fd5b506117d1806100206000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806379a3c6ed116100b2578063db006a7511610081578063eb7f512111610066578063eb7f51211461022c578063ece9c23f1461023f578063f2fde38b1461024757600080fd5b8063db006a7514610210578063e00424cf1461022357600080fd5b806379a3c6ed146101d05780638da5cb5b146101d9578063a0712d68146101ea578063b14f2a39146101fd57600080fd5b806361d027b3116100ee57806361d027b31461018f57806368297ff8146101a2578063715018a6146101b557806377e27400146101bd57600080fd5b8063277ce7d914610120578063356397d2146101505780633e413bee14610167578063485cc9551461017a575b600080fd5b609854610133906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61015960995481565b604051908152602001610147565b609754610133906001600160a01b031681565b61018d61018836600461161a565b61025a565b005b609b54610133906001600160a01b031681565b61018d6101b036600461166c565b610380565b61018d610476565b61018d6101cb36600461166c565b6104dc565b610159609c5481565b6065546001600160a01b0316610133565b61018d6101f836600461166c565b61056b565b61018d61020b366004611600565b61092e565b61018d61021e36600461166c565b610a39565b610159609a5481565b61018d61023a36600461166c565b610dae565b610159610e9d565b61018d610255366004611600565b610f1e565b600054610100900460ff1680610273575060005460ff16155b6102db5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b600054610100900460ff161580156102fd576000805461ffff19166101011790555b610305611000565b61030d6110b2565b610315611159565b609780546001600160a01b0380861673ffffffffffffffffffffffffffffffffffffffff199283161790925560988054928516928216929092179091556126c5609a5561275b609955609b805490911633179055801561037b576000805461ff00191690555b505050565b6065546001600160a01b031633146103da5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b61277481111580156103ee57506127108110155b61043a5760405162461bcd60e51b815260206004820152601060248201527f4d75737420626520302d3125206665650000000000000000000000000000000060448201526064016102d2565b60998190556040518181527fa5a6e753adc1d5a4b46c8ab0281e4ba933af57985e3d4bb57b49d736aca25894906020015b60405180910390a150565b6065546001600160a01b031633146104d05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b6104da600061120f565b565b6065546001600160a01b031633146105365760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b609c8190556040518181527fed8edd16012d23ad0de39ad8ba59aede4aba5e1556e2617613b2dad925365d769060200161046b565b600260015414156105be5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102d2565b6002600155806106105760405162461bcd60e51b815260206004820152601260248201527f43616e6e6f74206d696e7420302041564149000000000000000000000000000060448201526064016102d2565b60995460009061062283612710611723565b61062c9190611703565b6106369083611742565b9050600060995483662386f26fc100006106509190611723565b61065a9190611703565b905069d3c21bcecceda1000000609860009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106b557600080fd5b505afa1580156106c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ed9190611684565b1115610830576000610701610e1042611703565b9050612710609c54609860009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561075757600080fd5b505afa15801561076b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078f9190611684565b6107999190611723565b6107a39190611703565b6000828152609d60205260409020546107bd9084906116eb565b111561080b5760405162461bcd60e51b815260206004820152601e60248201527f546f6f206d7563682041564149206d696e746564207468697320686f7572000060448201526064016102d2565b6000818152609d6020526040812080548492906108299084906116eb565b9091555050505b609754610848906001600160a01b031633308661126e565b609b54609754610865916001600160a01b03918216911684611325565b6098546040517f40c10f19000000000000000000000000000000000000000000000000000000008152336004820152602481018390526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156108ca57600080fd5b505af11580156108de573d6000803e3d6000fd5b505060408051338152602081018590529081018590527f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f925060600190505b60405180910390a150506001805550565b6065546001600160a01b031633146109885760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b6001600160a01b0381166109de5760405162461bcd60e51b815260206004820181905260248201527f54726561737572792063616e206e6f74206265207a65726f206164647265737360448201526064016102d2565b609b805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040519081527f307e35806d2460623a3d217b5f70b195611f99aba68ed9df4ed39cf88ce2303f9060200161046b565b60026001541415610a8c5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102d2565b600260015580610ade5760405162461bcd60e51b815260206004820152601460248201527f43616e6e6f742072656465656d2030205553444300000000000000000000000060448201526064016102d2565b6097546040516370a0823160e01b81523060048201526001600160a01b03909116906370a082319060240160206040518083038186803b158015610b2157600080fd5b505afa158015610b35573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b599190611684565b610ba55760405162461bcd60e51b815260206004820152601b60248201527f4e6f7420656e6f756768205553444320696e207265736572766573000000000060448201526064016102d2565b610bb464e8d4a5100082611703565b6097546040516370a0823160e01b81523060048201526001600160a01b03909116906370a082319060240160206040518083038186803b158015610bf757600080fd5b505afa158015610c0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2f9190611684565b1015610c7d5760405162461bcd60e51b815260206004820152601b60248201527f4e6f7420656e6f756768205553444320696e207265736572766573000000000060448201526064016102d2565b6000662386f26fc10000609a5483610c959190611723565b610c9f9190611703565b9050600081610cb364e8d4a5100085611703565b610cbd9190611742565b6098546040517f9dc29fac000000000000000000000000000000000000000000000000000000008152336004820152602481018690529192506001600160a01b031690639dc29fac90604401600060405180830381600087803b158015610d2357600080fd5b505af1158015610d37573d6000803e3d6000fd5b5050609754610d5392506001600160a01b031690503384611325565b609b54609754610d70916001600160a01b03918216911683611325565b60408051338152602081018490529081018290527fe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a9299060600161091d565b6065546001600160a01b03163314610e085760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b6127108111158015610e1c57506126ac8110155b610e685760405162461bcd60e51b815260206004820152601060248201527f4d75737420626520302d3125206665650000000000000000000000000000000060448201526064016102d2565b609a8190556040518181527f59a874406cd7392ce894de270bdd747a244067a1279d0801ae882f1bc349c6a09060200161046b565b6097546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610ee157600080fd5b505afa158015610ef5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f199190611684565b905090565b6065546001600160a01b03163314610f785760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102d2565b6001600160a01b038116610ff45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016102d2565b610ffd8161120f565b50565b600054610100900460ff1680611019575060005460ff16155b61107c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102d2565b600054610100900460ff1615801561109e576000805461ffff19166101011790555b8015610ffd576000805461ff001916905550565b600054610100900460ff16806110cb575060005460ff16155b61112e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102d2565b600054610100900460ff16158015611150576000805461ffff19166101011790555b61109e3361120f565b600054610100900460ff1680611172575060005460ff16155b6111d55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102d2565b600054610100900460ff161580156111f7576000805461ffff19166101011790555b600180558015610ffd576000805461ff001916905550565b606580546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040516001600160a01b038085166024830152831660448201526064810182905261131f9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009093169290921790915261136e565b50505050565b6040516001600160a01b03831660248201526044810182905261037b9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016112bb565b60006113c3826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166114539092919063ffffffff16565b80519091501561037b57808060200190518101906113e1919061164c565b61037b5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016102d2565b6060611462848460008561146c565b90505b9392505050565b6060824710156114e45760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016102d2565b843b6115325760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102d2565b600080866001600160a01b0316858760405161154e919061169c565b60006040518083038185875af1925050503d806000811461158b576040519150601f19603f3d011682016040523d82523d6000602084013e611590565b606091505b50915091506115a08282866115ab565b979650505050505050565b606083156115ba575081611465565b8251156115ca5782518084602001fd5b8160405162461bcd60e51b81526004016102d291906116b8565b80356001600160a01b03811681146115fb57600080fd5b919050565b600060208284031215611611578081fd5b611465826115e4565b6000806040838503121561162c578081fd5b611635836115e4565b9150611643602084016115e4565b90509250929050565b60006020828403121561165d578081fd5b81518015158114611465578182fd5b60006020828403121561167d578081fd5b5035919050565b600060208284031215611695578081fd5b5051919050565b600082516116ae818460208701611759565b9190910192915050565b60208152600082518060208401526116d7816040850160208701611759565b601f01601f19169190910160400192915050565b600082198211156116fe576116fe611785565b500190565b60008261171e57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561173d5761173d611785565b500290565b60008282101561175457611754611785565b500390565b60005b8381101561177457818101518382015260200161175c565b8381111561131f5750506000910152565b634e487b7160e01b600052601160045260246000fdfea264697066735822122003ac3f4f354605f7746a2a87d2ac40358cc6f1582372040dbff73952fef15eaa64736f6c63430008040033";

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
