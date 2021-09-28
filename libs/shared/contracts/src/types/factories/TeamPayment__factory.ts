/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TeamPayment, TeamPaymentInterface } from "../TeamPayment";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "orca_",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "payees",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shares_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "PayeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "shares_",
        type: "uint256",
      },
    ],
    name: "addPayee",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "payee",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "released",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "shares",
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
    name: "totalReleased",
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
    name: "totalShares",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200144938038062001449833981016040819052620000349162000501565b6200003f3362000230565b8051825114620000b15760405162461bcd60e51b815260206004820152603260248201527f5061796d656e7453706c69747465723a2070617965657320616e6420736861726044820152710cae640d8cadccee8d040dad2e6dac2e8c6d60731b60648201526084015b60405180910390fd5b6000825111620001045760405162461bcd60e51b815260206004820152601a60248201527f5061796d656e7453706c69747465723a206e6f207061796565730000000000006044820152606401620000a8565b6001600160a01b038316620001825760405162461bcd60e51b815260206004820152603860248201527f5061796d656e7453706c69747465723a2063616e206e6f742068617665206f7260448201527f636120746f6b656e206173207a65726f206164647265737300000000000000006064820152608401620000a8565b60005b82518110156200020657620001f1838281518110620001b457634e487b7160e01b600052603260045260246000fd5b6020026020010151838381518110620001dd57634e487b7160e01b600052603260045260246000fd5b60200260200101516200028060201b60201c565b80620001fd816200065a565b91505062000185565b5050600680546001600160a01b0319166001600160a01b03939093169290921790915550620006a4565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038216620002ed5760405162461bcd60e51b815260206004820152602c60248201527f5061796d656e7453706c69747465723a206163636f756e74206973207468652060448201526b7a65726f206164647265737360a01b6064820152608401620000a8565b600081116200033f5760405162461bcd60e51b815260206004820152601d60248201527f5061796d656e7453706c69747465723a207368617265732061726520300000006044820152606401620000a8565b6001600160a01b03821660009081526003602052604090205415620003bb5760405162461bcd60e51b815260206004820152602b60248201527f5061796d656e7453706c69747465723a206163636f756e7420616c726561647960448201526a206861732073686172657360a81b6064820152608401620000a8565b6005805460018082019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b038516908117909155600090815260036020526040902082905554620004249082906200063f565b600155604080516001600160a01b0384168152602081018390527f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac910160405180910390a15050565b80516001600160a01b03811681146200048557600080fd5b919050565b600082601f8301126200049b578081fd5b81516020620004b4620004ae8362000619565b620005e6565b80838252828201915082860187848660051b8901011115620004d4578586fd5b855b85811015620004f457815184529284019290840190600101620004d6565b5090979650505050505050565b60008060006060848603121562000516578283fd5b62000521846200046d565b602085810151919450906001600160401b038082111562000540578485fd5b818701915087601f83011262000554578485fd5b815162000565620004ae8262000619565b8082825285820191508585018b878560051b880101111562000585578889fd5b8895505b83861015620005b2576200059d816200046d565b83526001959095019491860191860162000589565b5060408a01519097509450505080831115620005cc578384fd5b5050620005dc868287016200048a565b9150509250925092565b604051601f8201601f191681016001600160401b03811182821017156200061157620006116200068e565b604052919050565b60006001600160401b038211156200063557620006356200068e565b5060051b60200190565b6000821982111562000655576200065562000678565b500190565b600060001982141562000671576200067162000678565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b610d9580620006b46000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638da5cb5b11610076578063ce7c2ac21161005b578063ce7c2ac21461016f578063e33b7de314610198578063f2fde38b146101a057600080fd5b80638da5cb5b146101355780639852595c1461014657600080fd5b80633a98ef39116100a75780633a98ef39146100eb578063715018a6146101025780638b83209b1461010a57600080fd5b806318f9b023146100c357806319165587146100d8575b600080fd5b6100d66100d1366004610be3565b6101b3565b005b6100d66100e6366004610bc9565b610220565b6001545b6040519081526020015b60405180910390f35b6100d66104ba565b61011d610118366004610c2c565b610520565b6040516001600160a01b0390911681526020016100f9565b6000546001600160a01b031661011d565b6100ef610154366004610bc9565b6001600160a01b031660009081526004602052604090205490565b6100ef61017d366004610bc9565b6001600160a01b031660009081526003602052604090205490565b6002546100ef565b6100d66101ae366004610bc9565b61055e565b6000546001600160a01b031633146102125760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b61021c8282610640565b5050565b6001600160a01b0381166000908152600360205260409020546102ab5760405162461bcd60e51b815260206004820152602660248201527f5061796d656e7453706c69747465723a206163636f756e7420686173206e6f2060448201527f73686172657300000000000000000000000000000000000000000000000000006064820152608401610209565b6002546006546040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152600092916001600160a01b0316906370a082319060240160206040518083038186803b15801561030c57600080fd5b505afa158015610320573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103449190610c44565b61034e9190610cab565b6001600160a01b03831660009081526004602090815260408083205460015460039093529083205493945091926103859085610ce3565b61038f9190610cc3565b6103999190610d02565b90508061040e5760405162461bcd60e51b815260206004820152602b60248201527f5061796d656e7453706c69747465723a206163636f756e74206973206e6f742060448201527f647565207061796d656e740000000000000000000000000000000000000000006064820152608401610209565b6001600160a01b038316600090815260046020526040902054610432908290610cab565b6001600160a01b038416600090815260046020526040902055600254610459908290610cab565b600255600654610473906001600160a01b03168483610855565b604080516001600160a01b0385168152602081018390527fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056910160405180910390a1505050565b6000546001600160a01b031633146105145760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610209565b61051e60006108da565b565b60006005828154811061054357634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b031692915050565b6000546001600160a01b031633146105b85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610209565b6001600160a01b0381166106345760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610209565b61063d816108da565b50565b6001600160a01b0382166106bc5760405162461bcd60e51b815260206004820152602c60248201527f5061796d656e7453706c69747465723a206163636f756e74206973207468652060448201527f7a65726f206164647265737300000000000000000000000000000000000000006064820152608401610209565b6000811161070c5760405162461bcd60e51b815260206004820152601d60248201527f5061796d656e7453706c69747465723a207368617265732061726520300000006044820152606401610209565b6001600160a01b038216600090815260036020526040902054156107985760405162461bcd60e51b815260206004820152602b60248201527f5061796d656e7453706c69747465723a206163636f756e7420616c726561647960448201527f20686173207368617265730000000000000000000000000000000000000000006064820152608401610209565b6005805460018082019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03851690811790915560009081526003602052604090208290555461080c908290610cab565b600155604080516001600160a01b0384168152602081018390527f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac910160405180910390a15050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790526108d5908490610937565b505050565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600061098c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610a1c9092919063ffffffff16565b8051909150156108d557808060200190518101906109aa9190610c0c565b6108d55760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610209565b6060610a2b8484600085610a35565b90505b9392505050565b606082471015610aad5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610209565b843b610afb5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610209565b600080866001600160a01b03168587604051610b179190610c5c565b60006040518083038185875af1925050503d8060008114610b54576040519150601f19603f3d011682016040523d82523d6000602084013e610b59565b606091505b5091509150610b69828286610b74565b979650505050505050565b60608315610b83575081610a2e565b825115610b935782518084602001fd5b8160405162461bcd60e51b81526004016102099190610c78565b80356001600160a01b0381168114610bc457600080fd5b919050565b600060208284031215610bda578081fd5b610a2e82610bad565b60008060408385031215610bf5578081fd5b610bfe83610bad565b946020939093013593505050565b600060208284031215610c1d578081fd5b81518015158114610a2e578182fd5b600060208284031215610c3d578081fd5b5035919050565b600060208284031215610c55578081fd5b5051919050565b60008251610c6e818460208701610d19565b9190910192915050565b6020815260008251806020840152610c97816040850160208701610d19565b601f01601f19169190910160400192915050565b60008219821115610cbe57610cbe610d49565b500190565b600082610cde57634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615610cfd57610cfd610d49565b500290565b600082821015610d1457610d14610d49565b500390565b60005b83811015610d34578181015183820152602001610d1c565b83811115610d43576000848401525b50505050565b634e487b7160e01b600052601160045260246000fdfea264697066735822122091d7cf7f41adb9410a0ca95c8955e71e46c1440586fc1ea3c034f79295df863164736f6c63430008040033";

export class TeamPayment__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    orca_: string,
    payees: string[],
    shares_: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TeamPayment> {
    return super.deploy(
      orca_,
      payees,
      shares_,
      overrides || {}
    ) as Promise<TeamPayment>;
  }
  getDeployTransaction(
    orca_: string,
    payees: string[],
    shares_: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(orca_, payees, shares_, overrides || {});
  }
  attach(address: string): TeamPayment {
    return super.attach(address) as TeamPayment;
  }
  connect(signer: Signer): TeamPayment__factory {
    return super.connect(signer) as TeamPayment__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TeamPaymentInterface {
    return new utils.Interface(_abi) as TeamPaymentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TeamPayment {
    return new Contract(address, _abi, signerOrProvider) as TeamPayment;
  }
}
