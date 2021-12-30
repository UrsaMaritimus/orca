/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  YakOracleLPBridge,
  YakOracleLPBridgeInterface,
} from "../YakOracleLPBridge";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "priceSource1_",
        type: "address",
      },
      {
        internalType: "address",
        name: "priceSource2_",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlyingToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "shareToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
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
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceSource1",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceSource2",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "shareToken",
    outputs: [
      {
        internalType: "contract IYakStrategy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "underlyingToken",
    outputs: [
      {
        internalType: "contract IPair",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
  "0x6101006040523480156200001257600080fd5b506040516200170638038062001706833981016040819052620000359162000116565b6001600160a01b0384166200005a57634e487b7160e01b600052600160045260246000fd5b6001600160a01b0383166200007f57634e487b7160e01b600052600160045260246000fd5b6001600160a01b038116620000a457634e487b7160e01b600052600160045260246000fd5b6001600160a01b038216620000c957634e487b7160e01b600052600160045260246000fd5b6001600160601b0319606094851b811660805292841b831660a05290831b821660c05290911b1660e05262000172565b80516001600160a01b03811681146200011157600080fd5b919050565b600080600080608085870312156200012c578384fd5b6200013785620000f9565b93506200014760208601620000f9565b92506200015760408601620000f9565b91506200016760608601620000f9565b905092959194509250565b60805160601c60a05160601c60c05160601c60e05160601c6114e6620002206000396000818161013d015261076c01526000818160ad015281816106cf0152818161079b015281816108d50152818161098d01528181610ab20152610bff0152600081816101c30152818161031e0152818161055d0152610c93015260008181610116015281816101f10152818161028901528181610423015281816104c00152610d2401526114e66000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80636c9fa59e116100765780639a6fc8f51161005b5780639a6fc8f514610174578063b487ab30146101be578063feaf968c146101e557600080fd5b80636c9fa59e146101385780637284e4161461015f57600080fd5b80632495a599146100a8578063313ce567146100ec57806354fd4d50146100fb57806361d8f23014610111575b600080fd5b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b604051600881526020016100e3565b6101036101ed565b6040519081526020016100e3565b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b610167610285565b6040516100e391906111e6565b610187610182366004611123565b6103d6565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a0016100e3565b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b6101876104af565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b15801561024857600080fd5b505afa15801561025c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610280919061110b565b905090565b60607f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b1580156102e057600080fd5b505afa1580156102f4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261031c9190810190611014565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b15801561037557600080fd5b505afa158015610389573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103b19190810190611014565b6040516020016103c29291906111b7565b604051602081830303815290604052905090565b6040517f9a6fc8f500000000000000000000000000000000000000000000000000000000815269ffffffffffffffffffff8216600482015260009081908190819081906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690639a6fc8f59060240160a06040518083038186803b15801561046557600080fd5b505afa158015610479573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049d919061113f565b939a9299509097509550909350915050565b6000806000806000806000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561051757600080fd5b505afa15801561052b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054f919061113f565b9450945094509450945060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156105b457600080fd5b505afa1580156105c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ec919061113f565b505050915050600085121561065a5760405162461bcd60e51b815260206004820152602960248201527f436861696e6c696e6b2070726963656665656420312072657475726e6564206260448201526830b2103b30b63ab29760b91b60648201526084015b60405180910390fd5b60008112156106bd5760405162461bcd60e51b815260206004820152602960248201527f436861696e6c696e6b2070726963656665656420322072657475726e6564206260448201526830b2103b30b63ab29760b91b6064820152608401610651565b60006106c986836108ce565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561072657600080fd5b505afa15801561073a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075e9190611196565b61076990600a611294565b827f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663eab89a5a7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156107f257600080fd5b505afa158015610806573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082a9190611196565b61083590600a611294565b6040518263ffffffff1660e01b815260040161085391815260200190565b60206040518083038186803b15801561086b57600080fd5b505afa15801561087f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a3919061110b565b6108ad91906113f7565b6108b79190611231565b979d979c50949a5092985090965093945050505050565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561092c57600080fd5b505afa158015610940573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096491906110bd565b506dffffffffffffffffffffffffffff1691506dffffffffffffffffffffffffffff16915060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b1580156109e457600080fd5b505afa1580156109f8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1c9190610fe6565b6001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610a5457600080fd5b505afa158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c9190611196565b610a97906012611416565b610aa290600a611294565b610aac90846113f7565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b158015610b0957600080fd5b505afa158015610b1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b419190610fe6565b6001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610b7957600080fd5b505afa158015610b8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb19190611196565b610bbc906012611416565b610bc790600a611294565b610bd190846113f7565b90506000610be7610be283856113f7565b610e38565b6fffffffffffffffffffffffffffffffff16905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610c5657600080fd5b505afa158015610c6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8e919061110b565b610de77f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610cea57600080fd5b505afa158015610cfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d229190611196565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610d7b57600080fd5b505afa158015610d8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db39190611196565b610dbe906024611416565b610dc89190611416565b610dd390600a611294565b610ddd8b8d61133f565b610be291906113f7565b6fffffffffffffffffffffffffffffffff16610e048460026113f7565b610e0e91906113f7565b610e189190611231565b9050610e296402540be40082611231565b96505050505050505b92915050565b600081610e4757506000919050565b8160017001000000000000000000000000000000008210610e6d5760809190911c9060401b5b680100000000000000008210610e885760409190911c9060201b5b6401000000008210610e9f5760209190911c9060101b5b620100008210610eb45760109190911c9060081b5b6101008210610ec85760089190911c9060041b5b60108210610edb5760049190911c9060021b5b60088210610ee75760011b5b6001610ef38286611231565b610efd9083611219565b901c90506001610f0d8286611231565b610f179083611219565b901c90506001610f278286611231565b610f319083611219565b901c90506001610f418286611231565b610f4b9083611219565b901c90506001610f5b8286611231565b610f659083611219565b901c90506001610f758286611231565b610f7f9083611219565b901c90506001610f8f8286611231565b610f999083611219565b901c90506000610fa98286611231565b9050808210610fb85780610fba565b815b95945050505050565b80516dffffffffffffffffffffffffffff81168114610fe157600080fd5b919050565b600060208284031215610ff7578081fd5b81516001600160a01b038116811461100d578182fd5b9392505050565b600060208284031215611025578081fd5b815167ffffffffffffffff8082111561103c578283fd5b818401915084601f83011261104f578283fd5b8151818111156110615761106161147f565b604051601f8201601f19908116603f011681019083821181831017156110895761108961147f565b816040528281528760208487010111156110a1578586fd5b6110b2836020830160208801611439565b979650505050505050565b6000806000606084860312156110d1578182fd5b6110da84610fc3565b92506110e860208501610fc3565b9150604084015163ffffffff81168114611100578182fd5b809150509250925092565b60006020828403121561111c578081fd5b5051919050565b600060208284031215611134578081fd5b813561100d81611495565b600080600080600060a08688031215611156578081fd5b855161116181611495565b80955050602086015193506040860151925060608601519150608086015161118881611495565b809150509295509295909350565b6000602082840312156111a7578081fd5b815160ff8116811461100d578182fd5b600083516111c9818460208801611439565b8351908301906111dd818360208801611439565b01949350505050565b6020815260008251806020840152611205816040850160208701611439565b601f01601f19169190910160400192915050565b6000821982111561122c5761122c611469565b500190565b60008261124c57634e487b7160e01b81526012600452602481fd5b500490565b600181815b8085111561128c57816000190482111561127257611272611469565b8085161561127f57918102915b93841c9390800290611256565b509250929050565b600061100d60ff8416836000826112ad57506001610e32565b816112ba57506000610e32565b81600181146112d057600281146112da576112f6565b6001915050610e32565b60ff8411156112eb576112eb611469565b50506001821b610e32565b5060208310610133831016604e8410600b8410161715611319575081810a610e32565b6113238383611251565b806000190482111561133757611337611469565b029392505050565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8184138284138583048511828216161561137e5761137e611469565b7f8000000000000000000000000000000000000000000000000000000000000000848712868205881281841616156113b8576113b8611469565b8587129250878205871284841616156113d3576113d3611469565b878505871281841616156113e9576113e9611469565b505050929093029392505050565b600081600019048311821515161561141157611411611469565b500290565b600060ff821660ff84168082101561143057611430611469565b90039392505050565b60005b8381101561145457818101518382015260200161143c565b83811115611463576000848401525b50505050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b69ffffffffffffffffffff811681146114ad57600080fd5b5056fea2646970667358221220728bf9d6a0b88c3d9efb09939cb5b13254a84ba46ea7a9e5a066b4b93c6f34fe64736f6c63430008040033";

export class YakOracleLPBridge__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    priceSource1_: string,
    priceSource2_: string,
    underlyingToken_: string,
    shareToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<YakOracleLPBridge> {
    return super.deploy(
      priceSource1_,
      priceSource2_,
      underlyingToken_,
      shareToken_,
      overrides || {}
    ) as Promise<YakOracleLPBridge>;
  }
  getDeployTransaction(
    priceSource1_: string,
    priceSource2_: string,
    underlyingToken_: string,
    shareToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      priceSource1_,
      priceSource2_,
      underlyingToken_,
      shareToken_,
      overrides || {}
    );
  }
  attach(address: string): YakOracleLPBridge {
    return super.attach(address) as YakOracleLPBridge;
  }
  connect(signer: Signer): YakOracleLPBridge__factory {
    return super.connect(signer) as YakOracleLPBridge__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YakOracleLPBridgeInterface {
    return new utils.Interface(_abi) as YakOracleLPBridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YakOracleLPBridge {
    return new Contract(address, _abi, signerOrProvider) as YakOracleLPBridge;
  }
}